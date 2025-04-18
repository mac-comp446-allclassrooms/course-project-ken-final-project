// Populates menu with thumbnails of all characters in the characterlist
function renderMenu() {
    const characters = JSON.parse(document.getElementById('characters-data').textContent);
    this.renderThumbnails(characters);
}

// Places character thumbnails
function renderThumbnails(characters) {
    const characterDisplay = document.getElementById("character-list");
    for (const character of characters) {
        console.log(character);
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