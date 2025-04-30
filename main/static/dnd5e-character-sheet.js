
// Creates new weapon row in HTML weapon table
function createNewAttack() {
    const newAttack = document.createElement("tr");
    newAttack.classList.add("attack");

    newAttack.innerHTML = "<td> <input type='text' name='name_attack' placeholder='Name'></input></td>"
            + "<td><input type='text' name='range_attack' placeholder='Range'></input></td>"
            + "<td><input type='text' name='damage_roll_attack' placeholder='Damage Roll'></input></td>"
            + "<td><input type='text' name='bonus_attack' placeholder='Bonus'</td>"
            + "<td><input type='text' name='damage_type_attack' placeholder='Damage Type'></input></td>"
            + "<td><input type='text' name='notes_attack' placeholder='Notes'></input></td>"
            + "<td><button type='button' onclick = 'deleteAttack(this)'>Delete</button></td>"

    console.log("Weapon created");
    const statblock = document.getElementById("attackblock");
    statblock.appendChild(newAttack);
}

// Deletes weapon row in HTML weapon table
function deleteAttack(loc) {
    console.log("Weapon Deleted");
    grandparent = loc.parentNode.parentNode;
    console.log("Deleted " + grandparent);
    grandparent.remove();
}

// Creates new spell row in HTML weapon table
function createNewSpell() {
    const newWeapon = document.createElement("tr");
    newWeapon.classList.add("spell");
    newWeapon.innerHTML = "<td><input type='number' class='level-input' value='0'></input></td>"
            + "<td> <input type='text' placeholder='Spell Name'></input></td>"
            + "<td><input type='text' placeholder='Description'></input></td>"
            + "<td><input type='text' placeholder='Attack'></input></td>"
            + "<td><input type='text' placeholder='Save'></input></td>"
            + "<td><input type='text' placeholder='School'></input></td>"
            + "<td><button type='button' onclick = 'deleteSpell(this)'>Delete</button></td>"

    console.log("spell created");
    const statblock = document.getElementById("spellblock");
    statblock.appendChild(newWeapon);
}

// Deletes spell row in HTML weapon table
function deleteSpell(loc) {
    console.log("Spell Deleted");
    grandparent = loc.parentNode.parentNode;
    console.log("Deleted " + grandparent);
    grandparent.remove();
}

// Creates new spell row in HTML weapon table
function createNewItem() {
    const newWeapon = document.createElement("tr");
    newWeapon.classList.add("item");
    newWeapon.innerHTML = "<td><input type='number' name='item_quantity' value='1'></input></td>"
            + "<td><input type='text' name='item_name' placeholder='Item Name'></input></td>"
            + "<td><input type='text' name='item_description' placeholder='Description'></input></td>"
            + "<td><input type='number' name='item_weight' placeholder='Weight'></input></td>"
            + "<td><button type='button' onclick = 'deleteItem(this)'>delete</button></td>"

    console.log("item created");
    const statblock = document.getElementById("inventoryblock");
    statblock.appendChild(newWeapon);
}

// Deletes spell row in HTML weapon table
function deleteItem(loc) {
    console.log("Item Deleted");
    grandparent = loc.parentNode.parentNode;
    console.log("Deleted " + grandparent);
    grandparent.remove();
}

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

    // console.log(loc + currtar);
    // console.log(currtar.innerHTML)
    currtar.innerHTML = mod;
    updateSavingThrows();
}


// UpdatSkillMod
// skill is skill display element, mod is parent mod (int)
function updateSkillMod(skill, mod) {
    let proficiency = skill.parentNode.firstChild.nextSibling.firstChild.value;
    // newmod = skill.parentNode.firstChild.nextSibling.classList;
    let newmod = parseInt(mod) + parseInt(proficiency);
    // console.log(mod);
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
    // console.log("a");
    let abilityList = document.getElementsByClassName("ability-score");
    for (const ability of abilityList) {
        updateAbilityMod(ability);
    }
}

function updateSavingThrows() {
    console.log("saved!");
    // Get Table
    let savingthrowtable = document.getElementById("extra_ability_block");
    savingthrowtable.innerHTML = "<tr><th>Ability</th><th>Mod</th></tr>";
    let saved = document.getElementsByClassName("saving-check-box");

    for (const savingThrow of saved) {
        if (savingThrow.checked == true) {
            console.log(savingThrow.value);
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
