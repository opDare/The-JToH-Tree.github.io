addLayer("s", {
    name: "Skill", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Skills", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1);
        //S up
        if (hasUpgrade('s', 13)) mult = mult.times(upgradeEffect('s', 13));
        if (hasUpgrade('s', 22)) mult = mult.times(upgradeEffect('s', 22));
        if (hasUpgrade('s', 23)) mult = mult.times(2);
        if (hasUpgrade('s', 31)) mult = mult.times(1.05);
        if (hasUpgrade('s', 34)) mult = mult.times(2);
        if (hasUpgrade('s', 41)) mult = mult.times(2);
        if (hasUpgrade('s', 42)) mult = mult.times(1.1);
        if (hasUpgrade('s', 43)) mult = mult.times(1.1);
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "s", description: "S: Reset for Skills", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},

    upgrades: {
        11: {
            title: "Beat ToAST",
            description: "You beat your first tower in JToH, double your point gain",
            cost: new Decimal(1),
        },
        12: {
            title: "Beat ToA",
            description: "You beat your second tower. Increase your point gain base on skills",
            tooltip: "(Skills+1)^0.2",
            cost: new Decimal(2),
            unlocked() {
                return hasUpgrade('s', 11)
            },
            effect() {
                let eff = player[this.layer].points.add(1).pow(0.2)
                if (hasAchievement('a', 13)) eff = eff.pow(1.125)
                return eff
            },
            effectDisplay() { 
                return format(upgradeEffect(this.layer, this.id))+"x" 
            }

        },
        13: {
            title: "Beat ToM",
            description: "You beat your first medium tower. Increase your skill gain base on points",
            tooltip: "(Points+1)^0.15",
            cost: new Decimal(5),
            unlocked() {
                return hasUpgrade('s', 12)
            },
            effect() {
                return player.points.add(1).pow(0.15)
            },
            effectDisplay() { 
                return format(upgradeEffect(this.layer, this.id))+"x" 
            }
        },
        14: {
            title: "Watching a guide",
            description: "You are trying to beat your new hardest tower with some help, 1.5x points gain",
            cost: new Decimal(15),
            unlocked() {
                return hasUpgrade('s', 13)
            }
        },
        21: {
            title: "Grind ToK",
            description: "You start grinding your first hard tower, double point gain but tenfold increase the cost of <b>ALL</b> ToH upgrades",
            cost() {
                if (hasUpgrade('s', 23)){return 250} else {return 25} 
            },
            unlocked() {
                return hasUpgrade('s', 14)
            }
        },
        22: {
            title: "Forgetful",
            description: "You forgot to heal in killbrick walking section, see how dumb was you. <br> boost skill base on skills",
            tooltip: "(Skills+1)^0.15",
            cost() {
                if (hasUpgrade('s', 23)){return 500} else {return 50} 
            },
            unlocked() {
                return hasUpgrade('s', 21)
            },
            effect() {
                return player[this.layer].points.add(1).pow(0.15)
            },
            effectDisplay() { 
                return format(upgradeEffect(this.layer, this.id))+"x" 
            }
        },
        23: {
            title: "Grind ToH",
            description: "You start grinding your first hard tower, double skill gain but tenfold increase the cost of <b>ALL</b> ToK upgrade",
            cost() {
                if (hasUpgrade('s', 21)){return 250} else {return 25} 
            },
            unlocked() {
                return hasUpgrade('s', 14)
            }
        },
        24: {
            title: "Overestimate",
            description: "You thought you can skip 6 outside with 8 studs warp. Boost points base on points",
            tooltip: "(Points+1)^0.1",
            cost(){
                if (hasUpgrade('s', 21)){return 500} else {return 50}
            },
            unlocked() {
                return hasUpgrade('s', 23)
            },
            effect() {
                return player.points.add(1).pow(0.1)
            },
            effectDisplay() { 
                return format(upgradeEffect(this.layer, this.id))+"x" 
            }
        },
        31: {
            title: "Cannot push",
            description: "Rage quit in pushing block section becuase you stuck 20 minutes there. x1.05 Skill",
            cost() {
                if (hasUpgrade('s', 23)){return 2000} else {return 200}
            },
            unlocked() {
                return hasUpgrade('s', 22)
            }
        },
        32: {
            title: "Beat ToK",
            description: "Fun. Double point gain",
            cost() {
                if (hasUpgrade('s', 23)){return 3000} else {return 300}
            },
            unlocked() {
                return hasUpgrade('s', 31)
            }
        },
        33: {
            title: "Broken winpad",
            description: "F. x1.2 points",
            cost(){
                if (hasUpgrade('s', 21)){return 2000} else {return 200}
            },
            unlocked() {
                return hasUpgrade('s', 24)
            }
        },
        34: {
            title: "Beat ToH",
            description: "Hecc. Double skill gain",
            cost() {
                if (hasUpgrade('s', 21)){return 3000} else {return 300}
            },
            unlocked() {
                return hasUpgrade('s', 33)
            }
        },
        41: {
            title: "Find Forgotten Ridge",
            description: "Tram travel~~~~ <br> Unlock new layer and double point and skill gain",
            cost: new Decimal(700),
            unlocked() {
                return hasUpgrade('s',32) || hasUpgrade('s', 34)
            }
        },
        42: {
            title: "Secret UP: Find SoFM",
            description: "how this tower allowed in game. x1.1 clicks and skills gain",
            cost: new Decimal(10000),
            tooltip: "Unlock requirement: click <= 2",
            unlocked() {
                if (!(hasUpgrade('c', 14))) 
                {return false} 
                else if ((player.c.points <= 2)||(hasUpgrade('s', 42))) 
                {return true}
            }
        },
        43: {
            title: "Go to ring 2",
            description: "Finally go to ring 2. x1.2 skills gain",
            cost: new Decimal(50000),
            unlocked() {
                return hasUpgrade('c', 14)
            }
        }
    }
}),
addLayer("c", {
    name: "Clicker",
    symbol: "C",
    position: 1,
    startData() { return{
        unlocked() {
            return hasUpgrade('s', 41)
        },
        points: new Decimal(0),
    }},
    color: "#EEEEEE",
    requires: new Decimal(10000),
    resource: "Clicks",
    type: "none",
    branches: ["s"],
    exponent: 0.5,
    gainMult() {
        gain = new Decimal(1);
        if (hasUpgrade('s', 42)) gain = gain.times(1.1);
        if (hasUpgrade('c', 11)) gain = gain.times(2);
        if (hasUpgrade('c', 12)) gain = gain.times(2);
        if (hasUpgrade('c', 13)) gain = gain.times(upgradeEffect('s', 12));

        return gain
    },
    gainExp() {
        return new Decimal(1)
    },
    row: 0,
    hotkeys: [
        {key: "c", description: "C: Click", 
        onClick() {
            player.c.points = player.c.points.plus(gain)
        }}
    ],
    layerShown() { return hasUpgrade('s', 41)},
    clickables: {
        11: {
            title: "Click",
            display() { return "Click to gain clicks" },
            style: {
                transform: "translate(0px, -10px)"
            },
            canClick() {return true},
            onClick() {
                player.c.points = player.c.points.plus(gain)
            }
        },
        12: {
            title: "Reset click to 0",
            description: "For fix clicks",
            canClick() {return true},
            onClick() {
                if (confirm("Are you sure you want to do this? You will lose clicks!") == true) 
                {
                    player.c.points = 0;
			save(true);
                    window.location.reload();
                } 
                
            }
        }
    },
    upgrades: {
        11: {
            title: "Double click",
            description: "Bau Bau",
            cost: new Decimal(50),
            unlocked() {
                return (player.c.points >= 25) || hasUpgrade('c', 11)
            }
        },
        12: {
            title: "Beat SoMD",
            description: "First steeple... x1.5 points and double clicks",
            cost: new Decimal(150),
            unlocked() {
                return hasUpgrade('c', 11)
            }
        },
        13: {
            title: "Beat ToJGF",
            description: "Hard for new players. click boost base on digit of clicks",
            tooltip: "floor(log10(Clicks+1)",
            cost: new Decimal(300),
            unlocked() {
                return hasUpgrade('c',11)
            },
            effect() {
                return Math.floor(Math.log10(player[this.layer].points.add(1)))
            },
            effectDisplay() { 
                return format(upgradeEffect(this.layer, this.id))+"x" 
            }

        },
        14: {
            title: "Exploring FR",
            description: "You find ToMB and unlocked some upgrades in Skills",
            cost: new Decimal(2500),
            unlocked() {
                return hasUpgrade('c', 12) || hasUpgrade('c', 13)
            }
        }
    }

}),
addLayer("a", {
    startData() {
        return {
            unlocked: true,

        }
    },
    color: "yellow",
    row: "side",
    exponent: 0.3,
    layerShown() { return true },
    tooltip() {
        return ("Achievements")
    },
    gainMult() {
        mult = new Decimal(0);
        if (hasAchievement('a', 11)) mult = mult.plus(1);
        if (hasAchievement('a', 12)) mult = mult.plus(1);
        if (hasAchievement('a', 91)) mult = mult.plus(1);
        if (hasAchievement('a', 92)) mult = mult.plus(1);
        if (hasAchievement('a', 93)) mult = mult.plus(1);

        player.a.points = mult;
        return player.a.points
    },
    achievements: {
        rows: 20,
        columns: 5,
        11: {
            name: "First win",
            tooltip: "Beat any tower",
            done() {
                return hasUpgrade('s', 11) || hasUpgrade('s', 12) || hasUpgrade('s', 13)
            }
        },
        12: {
            name: "Classic Subrealm",
            tooltip: "KToH Ring 1",
            done() {
                return hasUpgrade('s', 41)
            }
        },
        13: {
            name: "First Steeple",
            tooltip: "500 studs shorter. <br> Reward: ^1.125 to Beat ToA boost ",
            done() {
                return hasUpgrade('c', 12)
            }
        },
        91: {
            name: "Easy",
            tooltip: "Get any upgrade which is easy tower. <br> Reward: Boost point by (i<sup>2</sup>+2)*tan(45\u00B0)",
            done() {
                return hasUpgrade('s', 11) || hasUpgrade('s', 12)
            }
        },
        92: {
            name: "Medium",
            tooltip: "Harder than ToOD <br> Reward: Point boost itself by short amount <br> 1+(Points^0.01)",
            done() {
                return hasUpgrade('s', 13)
            },
        },
        93: {
            name: "Hard",
            tooltip: "Not even hard <br> Reward: Achievements amount boost point gain <br> Achievements^0.125",
            done() {
                return hasUpgrade('s', 32) || hasUpgrade('s', 34)
            }
            
        }
    }
})
/*addLayer("dev", {
    startData() {
        return {
            unlocked: true
        }
    },
    color: "white",
    row: "side",
    layerShown() { return true },
    tooltip() {
        return ("Dev Test Buttons")
    },
    //lol dev buttons for testing, ignore it if you want to beat it legit

    clickables: {
        11:{
            title: "reset points",
            canClick() {return true},
            onClick() {
                player.points = 0
            }
        },
        12: {
            title: "100 points",
            canClick() {return true},
            onClick() {
                player.points = player.points.plus(100)
            }
        },
        13: {
            title: "1M points",
            canClick() {return true},
            onClick() {
                player.points = player.points.plus(1e6)
            }
        },
        21:{
            title: "reset skills",
            canClick() {return true},
            onClick() {
                player.s.points = 0
            }
        },
        22: {
            title: "100 skills",
            canClick() {return true},
            onClick() {
                player.s.points = player.s.points.plus(100)
            }
        },
        23: {
            title: "10K skills",
            canClick() {return true},
            onClick() {
                player.s.points = player.s.points.plus(10000)
            }
        },
        31:{
            title: "reset clicks",
            canClick() {return true},
            onClick() {
                player.c.points = 0
            }
        },
        32: {
            title: "100 Clicks",
            canClick() {return true},
            onClick() {
                player.c.points = player.c.points.plus(100)
            }
        },
        33: {
            title: "10K Clicks",
            canClick() {return true},
            onClick() {
                player.c.points = player.c.points.plus(10000)
            }
        }
    }
})*/
