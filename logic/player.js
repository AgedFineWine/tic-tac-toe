class Player {
    constructor(name) {
        this.name = name;
        this.id = new Set();
    }

    // the list of all the cells the player has occupied
    get idSet() {
        return this.id;
    }

    addId(id) {
        this.id.add(id);
    }

    /* iterates through an iterable to add to this.id */
    addAllId(iterable) {
        for (const idString of iterable) {
            this.id.add(idString);
        }
    }
}

export default Player;
