
class MenuItem {
    constructor(name, price) {
        if (!name || typeof name !== 'string') {
            throw new Error('MenuItem name must be a non-empty string');
        }
        if (typeof price !== 'number' || price < 0) {
            throw new Error('MenuItem price must be a non-negative number');
        }

        this.name = name.toLowerCase();
        this.price = price;
        Object.freeze(this);
    }

    equals(other) {
        return other instanceof MenuItem && this.name === other.name && this.price === other.price;
    }

    toString() {
        return `${this.name}: ${this.price} THB`;
    }
}

module.exports = MenuItem;
