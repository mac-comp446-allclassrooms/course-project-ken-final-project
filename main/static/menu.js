// CURRENTLY UNUSED

// Populates menu with thumbnails of all characters in the characterlist
function renderMenu() {
    const characters = JSON.parse(document.getElementById('characters-data'));
    console.log(characters);
    console.log(json.dumps(characters));
    console.log("hi!");
    this.renderThumbnails(characters);
}

// Places character thumbnails
function renderThumbnails(characters) {
    const characterDisplay = document.getElementById("character-list");
    console.log("hi2!");
    for (const character of characters) {
        console.log(character);
        console.log("hi3!");
        const characterThumbnail = this.createThumbnail(character);
        characterDisplay.appendChild(characterThumbnail);
    }
}

// Creates character thumbnails
function createThumbnail(character) {
    let newThumbnail = document.createElement("div");
    newThumbnail.classList.add("character-thumbnail");
    newThumbnail.innerHTML = "<h2>"+ character.name + " </h2>"
            + "<p><i>(Level: "+ character.level+")</i></p>"
            + "<p><strong>Species:</strong> <i>" + character.species + "</i></p>"
            + "<p><strong>Class:</strong> <i>" + character.characterClass + "</i></p>"
            + "<button>Open</button>" + "<button>Delete</button>";
    return newThumbnail;
}

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
    newWeapon.innerHTML = "<td> <input type='text' placeholder='Spell Name'></input></td>"
            + "<td><input type='number' value='0'></input></td>"
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