// Populates menu with thumbnails of all characters in the characterlist
function renderMenu() {
    this.renderThumbnails(value);
}

// Places character thumbnails
function renderThumbnails(value) {
    const characterdisplay = document.getElementById("characterlist");
    this.characterList.forEach(character => {
        const characterThumbnail = this.createThumbnail(character);
        characterdisplay.appendChild(characterThumbnail);
    });
}

// Creates character thumbnails
function createThumbnail(character) {
    let newThumbnail = document.createElement("div");
    newThumbnail.classList.add("character_thumbnail");
    newThumbnail.innerHTML = "<h2>"+ character.name + " </h2>"
            + "<p><i>(Level: "+ character.level+")</i></p>"
            + "<p><strong>Species:</strong> <i>" + character.species + "</i></p>"
            + "<p><strong>Class:</strong> <i>" + character.charClass + "</i></p>"
            + "<button>Open</button>" + "<button>Delete</button>";
    return newThumbnail;
}