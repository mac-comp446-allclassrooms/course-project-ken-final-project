
// Creates new weapon row in HTML weapon table
function createNewAttack() {
    const newAttack = document.createElement("tr");
    newAttack.classList.add("attack");

    newAttack.innerHTML = "<td> <input type='text' name='name_attack' placeholder='Name'></td>"
            + "<td><input type='text' name='range_attack' placeholder='Range'></td>"
            + "<td><input type='text' name='damage_roll_attack' placeholder='Damage Roll'></td>"
            + "<td><input type='text' name='bonus_attack' placeholder='Bonus'</td>"
            + "<td><input type='text' name='damage_type_attack' placeholder='Damage Type'></td>"
            + "<td><input type='text' name='notes_attack' placeholder='Notes'></td>"
            + "<td><button type='button' onclick = 'deleteAttack(this)'>Delete</button></td>"

    const statblock = document.getElementById("attackblock");
    statblock.appendChild(newAttack);
}

// Deletes weapon row in HTML weapon table
function deleteAttack(loc) {
    grandparent = loc.parentNode.parentNode;
    grandparent.remove();
}

// Creates new spell row in HTML weapon table
function createNewSpell() {
    const newWeapon = document.createElement("tr");
    newWeapon.classList.add("spell");
    newWeapon.innerHTML = "<td><input type='number' class='level-input' value='0'></td>"
            + "<td> <input type='text' placeholder='Name'></td>"
            + "<td><textarea placeholder='Description'></textarea></td>"
            + "<td><input type='text' placeholder='School'></td>"
            + "<td><button type='button' onclick = 'deleteSpell(this)'>Delete</button></td>"

    const statblock = document.getElementById("spellblock");
    statblock.appendChild(newWeapon);
}

// Deletes spell row in HTML weapon table
function deleteSpell(loc) {
    grandparent = loc.parentNode.parentNode;
    grandparent.remove();
}

// Creates new spell row in HTML weapon table
function createNewItem() {
    const newWeapon = document.createElement("tr");
    newWeapon.classList.add("item");
    newWeapon.innerHTML = "<td><input type='number' name='item_quantity' value='1'></td>"
            + "<td><input type='text' name='item_name' placeholder='Item Name'></td>"
            + "<td><input type='text' name='item_description' placeholder='Description'></td>"
            + "<td><input type='number' name='item_weight' value='0'></td>"
            + "<td><button type='button' onclick = 'deleteItem(this)'>Delete</button></td>"

    const statblock = document.getElementById("inventoryblock");
    statblock.appendChild(newWeapon);
}

// Deletes spell row in HTML weapon table
function deleteItem(loc) {
    grandparent = loc.parentNode.parentNode;
    grandparent.remove();
}

// Creates new proficiency row in HTML weapon table
function createNewProficiency() {
    const newProficiency = document.createElement("tr");
    newProficiency.classList.add("proficiency");
    newProficiency.innerHTML = "<td><input type='text' name='proficiency_type' placeholder='Type'></td>"
            + "<td><input type='text' name='proficiency_name' placeholder='Name'></td>"
            + "<td><button type='button' onclick = 'deleteProficiency(this)'>Delete</button></td>"

    const statblock = document.getElementById("proficiencyblock");
    statblock.appendChild(newProficiency);
}

// Deletes feat row in HTML weapon table
function deleteProficiency(loc) {
    grandparent = loc.parentNode.parentNode;
    grandparent.remove();
}

// Creates new feat row in HTML weapon table
function createNewFeat() {
    const newFeat = document.createElement("tr");
    newFeat.classList.add("feat");
    newFeat.innerHTML = "<td><input type='text' name='feat_name' placeholder='Name'></td>"
            + "<td><input type='text' name='feat_description' placeholder='Description'></td>"
            + "<td><button type='button' onclick = 'deleteFeat(this)'>Delete</button></td>"

    const statblock = document.getElementById("featblock");
    statblock.appendChild(newFeat);
}

// Deletes feat row in HTML weapon table
function deleteFeat(loc) {
    grandparent = loc.parentNode.parentNode;
    grandparent.remove();
}

// Creates new feature row in HTML weapon table
function createNewFeature() {
    const newFeat = document.createElement("tr");
    newFeat.classList.add("feature");
    newFeat.innerHTML = "<td><input type='text' name='feature_name' placeholder='Name'></td>"
            + "<td><input type='text' name='feature_description' placeholder='Description'></td>"
            + "<td><button type='button' onclick = 'deleteFeature(this)'>Delete</button></td>"

    const statblock = document.getElementById("featureblock");
    statblock.appendChild(newFeat);
}

// Deletes feature row in HTML weapon table
function deleteFeat(loc) {
    grandparent = loc.parentNode.parentNode;
    grandparent.remove();
}

// Creates new trait row in HTML weapon table
function createNewTrait() {
    const newTrait = document.createElement("tr");
    newTrait.classList.add("trait");
    newTrait.innerHTML = "<td><input type='text' name='trait_name' placeholder='Name'></td>"
            + "<td><input type='text' name='trait_description' placeholder='Description'></td>"
            + "<td><button type='button' onclick = 'deleteTrait(this)'>Delete</button></td>"

    const statblock = document.getElementById("traitblock");
    statblock.appendChild(newTrait);
}

// Deletes trait row in HTML weapon table
function deleteTrait(loc) {
    grandparent = loc.parentNode.parentNode;
    grandparent.remove();
}

// Creates new physical trait row in HTML weapon table
function createNewPhysicalTrait() {
    const newPhysicalTrait = document.createElement("tr");
    newPhysicalTrait.classList.add("trait");
    newPhysicalTrait.innerHTML = "<td><input type='text' name='physicaltrait_name' placeholder='Trait'></td>"
            + "<td><input type='text' name='physicaltrait_description' placeholder='Description'></td>"
            + "<td><button type='button' onclick = 'deletePhysicalTrait(this)'>Delete</button></td>"

    const statblock = document.getElementById("physicaldescriptionblock");
    statblock.appendChild(newPhysicalTrait);
}

// Deletes physical trait row in HTML weapon table
function deletePhysicalTrait(loc) {
    grandparent = loc.parentNode.parentNode;
    grandparent.remove();
}


// Creates new physical trait row in HTML weapon table
function createNewPersonalityTrait() {
    const newPersonalityTrait = document.createElement("tr");
    newPersonalityTrait.classList.add("trait");
    newPersonalityTrait.innerHTML = "<td><input type='text' name='physicaltrait_name' placeholder='Trait'></td>"
            + "<td><input type='text' name='physicaltrait_description' placeholder='Description'></td>"
            + "<td><button type='button' onclick = 'deletePhysicalTrait(this)'>Delete</button></td>"

    const statblock = document.getElementById("personalityblock");
    statblock.appendChild(newPersonalityTrait);
}

// Deletes physical trait row in HTML weapon table
function deletePhysicalTrait(loc) {
    grandparent = loc.parentNode.parentNode;
    grandparent.remove();
}

// ABILITIES AND SKILLS
// Updates Ability mod when skill input is changed
function updateAbilityMod(loc) {
    let score = loc.value;
    let mod = calculateMod(score); 
    let name = loc.parentNode.parentNode.firstChild.nextSibling.textContent;
    let currtar = loc.parentNode.nextSibling.nextSibling;

    let skillList = document.getElementsByClassName(name+"-skill");

    for (const skill of skillList) {
        updateSkillMod(skill, mod);
    }

    currtar.innerHTML = mod;

    updateSavingThrows();
}


// UpdatSkillMod
// skill is skill display element, mod is parent mod (int)
function updateSkillMod(skill, mod) {
    let proficiency = skill.parentNode.firstChild.nextSibling.firstChild.value;
    // newmod = skill.parentNode.firstChild.nextSibling.classList;
    let newmod = parseInt(mod) + parseInt(proficiency);
    // let newmod = parseInt(mod) + (proficiency_bonus * parseInt(proficiency));
    if (newmod >= 0) {
        moddisplay = "+" + newmod;
    } else {
        moddisplay = newmod;
    } 

    skill.innerHTML = moddisplay;
}

// Calculates mod from a given score
function calculateMod(score) {
    mod = Math.floor((score-10)/2);
    if (mod >= 0) {
        moddisplay = "+" + mod;
    } else {
        moddisplay = mod;
    } 
    return moddisplay;
}

function updateAllAbilities() {
    let abilityList = document.getElementsByClassName("ability-score");
    for (const ability of abilityList) {
        updateAbilityMod(ability);
    }
}

function updateSavingThrows() {
    // Get Table
    let savingthrowtable = document.getElementById("extra_ability_block");
    savingthrowtable.innerHTML = "<tr><th>Ability</th><th class='modcolumn'>Mod</th></tr>";
    let saved = document.getElementsByClassName("saving-check-box");
    
    let initiativebonus = document.getElementsByClassName("ability-score Dexterity-score")[0].parentNode.nextSibling.nextSibling.innerText;
    const newsave = document.createElement("tr");
    newsave.innerHTML = "<td> Initiative </td>"
            + "<td>" + initiativebonus + "</td>"
    savingthrowtable.appendChild(newsave);

    for (const savingThrow of saved) {
        if (savingThrow.checked == true) {
            // Gets ability name
            let abilityname = savingThrow.parentNode.parentNode.firstChild.nextSibling.textContent;
            let abilityscore = savingThrow.parentNode.previousSibling.previousSibling.textContent;
            const newsave = document.createElement("tr");
        
            newsave.innerHTML = "<td>" + abilityname + "</td>"
                    + "<td>" + abilityscore + "</td>"

            savingthrowtable.appendChild(newsave);
        }
    }

}

function populate() {
    updateAllAbilities();
    updateSavingThrows();
}
window.addEventListener("load", populate);
