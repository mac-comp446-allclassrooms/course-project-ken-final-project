
// Creates new attack row in HTML weapon table
function createNewAttack() {
    const newAttack = document.createElement("tr");
    newAttack.classList.add("attack");

    newAttack.innerHTML = "<td> <input type='text' name='attack_name' placeholder='Name'></td>"
            + "<td><input type='text' name='attack_range' placeholder='Range'></td>"
            + "<td><input type='text' name='attack_bonus' placeholder='Attack Bonus'</td>"
            + "<td><input type='text' name='attack_damage_roll' placeholder='Damage Roll'></td>"
            + "<td><input type='text' name='attack_damage_type' placeholder='Damage Type'></td>"
            + "<td><textarea name='attack_notes' placeholder='Notes'></textarea></td>"
            + "<td><button type='button' onclick = 'deleteAttack(this)'>Delete</button></td>"

    const statblock = document.getElementById("attack-block");
    statblock.appendChild(newAttack);
}

// Deletes attack row in HTML weapon table
function deleteAttack(loc) {
    grandparent = loc.parentNode.parentNode;
    grandparent.remove();
}

// Creates new spell row in HTML weapon table
function createNewSpell() {
    const newWeapon = document.createElement("tr");
    newWeapon.classList.add("spell");
    newWeapon.innerHTML = "<td><input type='number' class='level-input' name='spell_level' value='0' min='0'></td>"
            + "<td> <input type='text' name='spell_name' placeholder='Name'></td>"
            + "<td><textarea name='spell_description' placeholder='Description'></textarea></td>"
            + "<td><input type='text' name='spell_school' placeholder='School'></td>"
            + "<td><button type='button' onclick = 'deleteSpell(this)'>Delete</button></td>"

    const statblock = document.getElementById("spell-block");
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
    newWeapon.innerHTML = "<td><input name='item_equipped' type='checkbox'></td>"
            + "<td><input type='number' name='item_quantity' value='1'></td>"
            + "<td><input type='text' name='item_name' placeholder='Item Name'></td>"
            + "<td><textarea name='item_description' placeholder='Description'></textarea></td>"
            + "<td><input type='text' name='item_weight' value='0' placeholder='Weight'></td>"
            + "<td><button type='button' onclick = 'deleteItem(this)'>Delete</button></td>"

    const statblock = document.getElementById("inventory-block");
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

    const statblock = document.getElementById("proficiency-block");
    statblock.appendChild(newProficiency);
}

// Deletes feat row in HTML weapon table
function deleteProficiency(loc) {
    grandparent = loc.parentNode.parentNode;
    grandparent.remove();
}


// Creates new trait row in HTML weapon table
function createNewTrait() {
    const newTrait = document.createElement("tr");
    newTrait.classList.add("trait");
    newTrait.innerHTML = "<td><input type='text' name='trait_name' placeholder='Name'>"
            + "<textarea name='trait_description' placeholder='Description'></textarea></td>"
            + "<td><button type='button' onclick = 'deleteTrait(this)'>Delete</button></td>"

    const statblock = document.getElementById("trait-block");
    statblock.appendChild(newTrait);
}

// Deletes trait row in HTML weapon table
function deleteTrait(loc) {
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
    let profbonus = document.getElementById("proficiency-bonus").innerHTML;
    let newmod = parseInt(mod) + (profbonus * parseFloat(proficiency));
    // let newmod = parseInt(mod) + (proficiency_bonus * parseInt(proficiency));

    skill.innerHTML = plusMinus(newmod);
}



function updateAllAbilities() {
    let abilityList = document.getElementsByClassName("ability-score");
    for (const ability of abilityList) {
        updateAbilityMod(ability);
    }
    updateSpellcasting();
}

function updateSpellcasting() {
    let abilityName = document.getElementById("spellcasting-ability").value;
    let abilityMod = parseInt(document.getElementsByClassName("ability-score " + abilityName + "-score")[0].parentNode.nextSibling.nextSibling.innerText);

    let profbonus = parseInt(document.getElementById("proficiency-bonus").innerHTML);
    let level = parseInt(document.getElementById("character-level").value);


    let mod = document.getElementById("spell-mod");
    mod.innerHTML = plusMinus(abilityMod);
    let spelldc = document.getElementById("spell-save-dc");
    spelldc.innerHTML = (8 + profbonus + abilityMod);
    let spellattack = document.getElementById("spell-attack-bonus");
    spellattack.innerHTML = plusMinus(abilityMod + level);
}

function updateSavingThrows() {
    // Get Table
    let savingthrowtable = document.getElementById("extra-ability-block");
    savingthrowtable.innerHTML = "<tr><th class='medium-column'>Ability</th><th class='small-column'>Mod</th></tr>";
    let saved = document.getElementsByClassName("saving-check-box");
    let profbonus = document.getElementById("proficiency-bonus").innerHTML;

    let initiativebonus = document.getElementsByClassName("ability-score Dexterity-score")[0].parentNode.nextSibling.nextSibling.innerText;
    let newsave = document.createElement("tr");
    newsave.innerHTML = "<td> Initiative </td>"
    + "<td>" + (parseInt(initiativebonus)+parseInt(profbonus)) + "</td>"
    savingthrowtable.appendChild(newsave);
    
    for (const savingThrow of saved) {
        if (savingThrow.checked == true) {
            // Gets ability name
            let abilityname = savingThrow.parentNode.parentNode.firstChild.nextSibling.textContent;
            let abilityscore = savingThrow.parentNode.previousSibling.previousSibling.textContent;
            newsave = document.createElement("tr");
            
            newsave.innerHTML = "<td>" + abilityname + "</td>"
            + "<td>" + (parseInt(profbonus) + parseInt(abilityscore)) + "</td>"
            
            savingthrowtable.appendChild(newsave);
        }
    }
    
}

// Calculates mod from a given score
function calculateMod(score) {
    mod = Math.floor((score-10)/2);
    return plusMinus(mod);
}

function updateProficiencyBonus() {
    let level = document.getElementById("character-level").value;
    let bonus = Math.ceil(level/4)+1;

    let profbonus = document.getElementById("proficiency-bonus");
    profbonus.innerHTML = plusMinus(bonus);
    updateAllAbilities();
    updateSavingThrows();
}

function plusMinus(num) {
    if (num >= 0) {
        numdisplay = "+" + num;
    } else {
        numdisplay = num;
    }
    return numdisplay;
}

function populate() {
    updateProficiencyBonus();
    // updateAllAbilities();
    // updateSavingThrows();
}
window.addEventListener("load", populate);
