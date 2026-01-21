const MenuRepository = require('../../domain/repositories/MenuRepository');
const MenuItem = require('../../domain/value-objects/MenuItem');


class InMemoryMenuRepository extends MenuRepository {
    constructor() {
        super();
        this.menuItems = this._initializeMenu();
    }

    _initializeMenu() {
        return [
            new MenuItem('red', 50),
            new MenuItem('green', 40),
            new MenuItem('blue', 30),
            new MenuItem('yellow', 50),
            new MenuItem('pink', 80),
            new MenuItem('purple', 90),
            new MenuItem('orange', 120)
        ];
    }

    findAll() {
        return [...this.menuItems];
    }

    findByName(name) {
        const normalizedName = name.toLowerCase();
        return this.menuItems.find(item => item.name === normalizedName) || null;
    }
}

module.exports = InMemoryMenuRepository;
