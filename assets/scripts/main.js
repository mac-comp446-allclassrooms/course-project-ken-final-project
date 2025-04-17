class CharacterSheet {
    constructor(name, species, charClass, level) {
        console.log("Constructing " + name

        );

        // for stat in charprofileStats
        //  set stats
        //  display stat
        //  class-ify stats? (strings and integers?)
        this.name = name;
        this.level = level;

        this.species = species;

        this.charClass = charClass;

        this.level = level;
        this.currhealth = 10;
        this.maxhealth = 10;
        this.armorclass = 15;

        // This part would read in from database
        // for ability in abilities (in database?) ->
        //  map.put(ability.name, new Ability(ability.name, ability.score))
        //  shortened name somewhere?
        this.abilities = new Map([
            ["Strength", new Ability("Strength", 10)],
            ["Dexterity", new Ability("Dexterity", 10)],
            ["Constitution", new Ability("Constitution", 10)],
            ["Intelligence", new Ability("Intelligence", 10)],
            ["Wisdom", new Ability("Wisdom", 10)],
            ["Charisma", new Ability("Charisma", 10)]
        ]);

        console.log("Created");

        this.strskills = ["Athletics"];
        this.dexskills = ["Acrobatics", "Slight of Hand", "Stealth"];
        this.conskills = [];
        this.intskills = ["Arcana", "History", "Nature", "Religion"];
        this.wisskills = ["Animal Handling", "Insight", "Medicine", "Perception", "Survival"];
        this.chaskills = ["Deception", "Intimidation", "Performance", "Persuasion"];
        
        this.skills = new Map();
        this.generateDefaultStats();
        
        this.weaponsList = [];
    }
    
    // generateStats()
    // This will be different later on when JSON is working
    // And templates. And stuff.
    generateDefaultStats() {
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
        this.generateSubStats("Intelligence", this.intskills);
        // wis
        this.generateSubStats("Wisdom", this.wisskills);
        // cha
        this.generateSubStats("Charisma", this.chaskills);
    }

    // generateSubStats()
    // Temporary  
    generateSubStats(parent, list) {
        list.forEach(skillname => {
            let thisskill = new Skill(skillname, parent, this.abilities.get(parent).score);
            this.skills.set(skillname, thisskill);
        });
    }

    // renderUI()
    // Creates and places elements
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
        // this.abilities.forEach(abilityname => {
        //     let ability = new Ability(abilityname, 12);
        //     ability.renderElement();
        // });

        this.abilities.keys().forEach(abilityname => {
            let ability = this.abilities.get(abilityname);
            ability.renderElement();
        });

        // render skillsblock
        // statblock = document.getElementById("skillblock");
        this.skills.keys().forEach(skillname => {
            let skill = this.skills.get(skillname);
            skill.renderElement();
        });

        this.weaponsList.forEach(weapon => {
            weapon.renderElement() 
        });
        console.log("Rendered");

    }
    
    createWeapon(name, weapontype, finesse, range, damageroll, damagetype) {
        this.weaponsList.push(new Weapon(name, weapontype, finesse, range, damageroll, damagetype));
    }
    
}

class User {
    constructor(username) {
        this.username = username;
        this.characterList = [];

        // Reads characters
    }

    newCharacter(name, species, characterClass, level) {
        this.characterList.push(new CharacterSheet(name, species, characterClass, level))
    }

    renderCharacterSheet(i) {
        this.characterList.at(i).renderUI();
    }

    renderMenu() {
        this.renderThumbnails();
    }

    renderThumbnails() {
        const characterdisplay = document.getElementById("characterlist");
        this.characterList.forEach(character => {
            const characterThumbnail = this.createThumbnail(character);
            characterdisplay.appendChild(characterThumbnail);
        });
    }

    createThumbnail(character) {
        let newThumbnail = document.createElement("div");
        newThumbnail.classList.add("character_thumbnail");
        newThumbnail.innerHTML = "<h2>"+ character.name + " </h2>"
                + "<p><i>(Level: "+ character.level+")</i></p>"
                + "<p><strong>Species:</strong> <i>" + character.species + "</i></p>"
                + "<p><strong>Class:</strong> <i>" + character.charClass + "</i></p>"
                + "<button>Open</button>" + "<button>Delete</button>";
        return newThumbnail;
    }
    
}

class Ability {
    constructor(name, score) {
        this.name = name;
        this.score = score;
        this.mod = Math.floor((score-10)/2);
        this.statelement;
    }

    createSkillElement(){
        let newSkill = document.createElement("tr");
        newSkill.classList.add("stat");
        
        var moddisplay = ""
        if (this.mod >= 0) {
            moddisplay = "+" + this.mod;
        } else {
            moddisplay = this.mod;
        }

        newSkill.innerHTML = "<td>" + this.name + '</button></td>'
                + '<td><input type="number"'
                + 'min="-15" max="30" value="' + this.score + '" onchange ="updateMod(this, value)"></td>'
                + '<td>'+ moddisplay + '</td>';
        return newSkill;
    }

    // renderElement()
    renderElement() {
        const statblock = document.getElementById("abilityblock");
        this.statelement = this.createSkillElement();
        statblock.appendChild(this.statelement);
    }
}

function updateMod(loc, val) {
    console.log("Changed " + val);
    mod = Math.floor((val-10)/2);
    
    var moddisplay = ""
        if (mod >= 0) {
            moddisplay = "+" + mod;
        } else {
            moddisplay = mod;
        }
    const currtar = loc.parentNode.nextSibling;
    currtar.innerHTML = moddisplay;
}

class Skill {
    constructor(name, parent, score) {
        this.name = name;
        this.parent = parent;
        this.score = score;
        this.mod = Math.floor((score-10)/2);
        this.statelement;
    }

    createSkillElement(){
        let newSkill = document.createElement("tr");
        newSkill.classList.add("stat");
        var moddisplay = ""
        if (this.mod >= 0) {
            moddisplay = "+" + this.mod;
            // console.log(this.mod);
        } else {
            moddisplay = this.mod;
        }
        newSkill.innerHTML = "<td>" + this.name + "</td>"
                + "<td><i>(" + this.parent.slice(0, 3) + ")</i></td>"
                + '<td><input type="number" min="-15" max="30" value="' + this.score + '" onchange ="updateMod(this, value)"></td>'
                + "<td>" + moddisplay + "</td>";
        return newSkill;
    }

    // renderElement()
    renderElement() {
        const statblock = document.getElementById("skillblock");
        this.statelement = this.createSkillElement();
        statblock.appendChild(this.statelement);
    }
}

class Weapon {
    constructor(name, weapontype, finesse, range, damageroll, damagetype) {
        this.name = name;
        this.weapontype = weapontype;
        this.finesse = finesse;
        this.range = range;
        this.damageroll = damageroll;
        this.damagetype = damagetype;
        
        this.statelement;
    }

    
    createWeaponElement(){
        let newWeapon = document.createElement("tr");
        newWeapon.classList.add("weapon");

        newWeapon.innerHTML = "<td> <input type='text' value =" + this.name + "></input></td>"
                + "<td><input type='text' value =" + this.weapontype + "></input></td>"
                + "<td>" + "<select name='mod'>"
                        + "<option value='Dexterity'>Dex</option>"
                        + "<option value='Strength'>Str</option>"
                +" </select>" + "</td>"
                + "<td><input type='text' value =" + this.range + "></input></td>"
                + "<td><input type='text' value =" + this.damageroll + "></input></td>"
                + "<td><input type='text' value =" + this.damagetype + "></input></td>"
                + "<td><button type='button' onclick = 'deleteWeaponElement(this)'>delete</button></td>"
        return newWeapon;
    }

    

    // renderElement()

    renderElement() {
        const statblock = document.getElementById("weaponblock");
        this.statelement = this.createWeaponElement();
        statblock.appendChild(this.statelement);
    }
}

function renderNewWeaponElement() {
    const newWeapon = new Weapon("", "", "", "", "", "");
    newWeapon.renderElement()
    console.log("Weapon created");
    // const statblock = document.getElementById("weaponblock");
    // this.statelement = this.createWeaponElement();
    // statblock.appendChild(this.statelement);
}

function deleteWeaponElement(loc) {
    console.log("Weapon Deleted");
    grandparent = loc.parentNode.parentNode;
    // console.log("Delete " + grandparent);
    grandparent.remove();
}

let user1 = new User("Jimothy");
user1.newCharacter("Default", "Default", "Default", 1);
user1.newCharacter("Tav", "Tiefling", "Sorcerer", 1);
user1.newCharacter("Aayla Secura", "Twi'lek", "Jedi", 4);
user1.newCharacter("Groot", "Tree", "Monk", 10);
user1.newCharacter("Cassian Andor", "Human (Kenari)", "Rebel", 3);
user1.newCharacter("Shrek", "Ogre", "Barbarian, Rogue", 3);


user1.characterList.at(0).createWeapon("Dagger", "Versatile", "True", "20ft/60ft", "1d4", "piercing")                                                                               
user1.characterList.at(2).createWeapon("Lightsaber", "Versatile", "False", "10ft", "4d10", "laser")                                                                               
user1.renderCharacterSheet(0);
// user1.renderMenu();