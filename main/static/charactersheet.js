
// Creates new weapon row in HTML weapon table
function createNewWeapon() {
    const newWeapon = document.createElement("tr");
    newWeapon.classList.add("weapon");

    newWeapon.innerHTML = "<td> <input type='text' placeholder='Weapon Name'></input></td>"
            + "<td><input type='text' placeholder='Type'></input></td>"
            + "<td>" + "<select name='mod'>"
                    + "<option value='Dexterity'>Dex</option>"
                    + "<option value='Strength'>Str</option>"
            +" </select>" + "</td>"
            + "<td><input type='text' placeholder='Range'></input></td>"
            + "<td><input type='text' placeholder='Damage Roll'></input></td>"
            + "<td><input type='text' placeholder='Damage Type'></input></td>"
            + "<td><button type='button' onclick = 'deleteWeapon(this)'>delete</button></td>"

    console.log("Weapon created");
    const statblock = document.getElementById("weaponblock");
    statblock.appendChild(newWeapon);
}

// Deletes weapon row in HTML weapon table
function deleteWeapon(loc) {
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
            + "<td><button type='button' onclick = 'deleteSpell(this)'>delete</button></td>"

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
    newWeapon.innerHTML = "<td> <input type='number' value='1'></input></td>"
            + "<td> <input type='text' placeholder='Item Name'></input></td>"
            + "<td><input type='text' placeholder='Description'></input></td>"
            + "<td><input type='text' placeholder='Weight'></input></td>"
            + "<td><button type='button' onclick = 'deleteItem(this)'>delete</button></td>"

    console.log("spell created");
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
function updateAbilityMod(loc, score) {
    let mod = calculateMod(score); 
    console.log("Changed ABILITY " + score + mod);     
    let currtar = loc.parentNode.nextSibling.nextSibling;
    console.log(loc + currtar);
    console.log(currtar.innerHTML)
    currtar.innerHTML = mod;
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