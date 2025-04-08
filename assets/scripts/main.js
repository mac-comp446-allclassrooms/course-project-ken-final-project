class Character {
    constructor(name, level) {
        this.name = name;
        this.level = level;

        this.species = "Tiefling";
        this.charClass = "Sorcerer";

        this.level = level;
        this.currhealth = 23;
        this.maxhealth = 32;
        this.armorclass = 15;




        this.abilities = ["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"];

        this.strskills = ["Athletics"];
        this.dexskills = ["Acrobatics", "Slight of Hand", "Stealth"];
        this.conskills = [];
        this.intskills = ["Arcana", "History", "Nature", "Religion"];
        this.wisskills = ["Animal Handling", "Insight", "Medicine", "Perception", "Survival"];
        this.chaskills = ["Deception", "Intimidation", "Performance", "Persuasion"];
        
        this.skills = new Map();

        console.log("Created");

        this.generateStats();

        this.renderUI();
        console.log("Rendered");
    }
    
    // generateStatsMap()
    generateStats() {
        // Resets stats
        this.skills.clear();

        // Generates stats objects
        // str
        this.generateSubStats("Strength", this.strskills);
        // dex
        this.generateSubStats("Dexterity", this.dexskills);
        // con
        this.generateSubStats("Constitution", this.conskills);
        // int
        this.generateSubStats("Intelligence", this.strskills);
        // wis
        this.generateSubStats("Wisdom", this.wisskills);
        // cha
        this.generateSubStats("Charisma", this.chaskills);
    }

    generateSubStats(parent, list) {
        list.forEach(skillname => {
            let thisskill = new Skill(skillname, parent, 10);
            this.skills.set(skillname, thisskill);
        });
    }

    // generateStats()
    // Calls generateStatsMap() and then creates and places elements
    // Would either create as new (with value 10) or read from file
    renderUI() {

        // render profileblock
        const namedisplay = document.getElementById("namedisplay");
        namedisplay.setAttribute("value", this.name);

        const charclass = document.getElementById("classdisplay");
        charclass.setAttribute("value", this.charClass);

        const species = document.getElementById("speciesdisplay");
        species.setAttribute("value", this.species);

        const level = document.getElementById("leveldisplay");
        level.setAttribute("value", this.level);

        const currhealth = document.getElementById("currhealthdisplay");
        currhealth.setAttribute("value", this.currhealth);

        const maxhealth = document.getElementById("maxhealthdisplay");
        maxhealth.setAttribute("value", this.maxhealth);

        const armorclass = document.getElementById("armorclassdisplay");
        armorclass.setAttribute("value", this.armorclass);

        // render abilitiesblock
        this.abilities.forEach(abilityname => {
            let ability = new Ability(abilityname, 10);
            ability.renderElement();
        });

        // render skillsblock
        this.skills.keys().forEach(key => {
            let skill = this.skills.get(key);
            skill.renderElement();
        });
    }
    
}

class Ability {
    constructor(name, score) {
        this.name = name;
        this.score = score;
    }

    createSkillElement(){
        let newSkill = document.createElement("div");
        newSkill.classList.add("stat");
        newSkill.innerHTML = "<label>" + this.name + "</label>"
                + '<input type="number" value="10">';
        return newSkill;
    }

    // renderElement()
    renderElement() {
        const statblock = document.getElementById("abilityblock");
        const newSkillElement = this.createSkillElement();
        statblock.appendChild(newSkillElement);
    }
}

class Skill {
    constructor(name, parent, score) {
        this.name = name;
        this.parent = parent;
        this.score = score;
        this.mod = Math.floor((score-10)/2)
    }

    createSkillElement(){
        let newSkill = document.createElement("div");
        newSkill.classList.add("stat");
        newSkill.innerHTML = "<label>" + this.name + "</label>"
                + '<input type="number" value="10">';
        return newSkill;
    }

    // renderElement()
    renderElement() {
        const statblock = document.getElementById("skillblock");
        const newSkillElement = this.createSkillElement();
        statblock.appendChild(newSkillElement);
    }
}

const char1 = new Character("Mainty", 3);
