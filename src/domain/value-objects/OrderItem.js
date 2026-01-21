const MenuItem = require('./MenuItem');


class OrderItem {
    constructor(menuItem, quantity) {
        if (!(menuItem instanceof MenuItem)) {
            throw new Error('OrderItem requires a valid MenuItem');
        }
        if (!Number.isInteger(quantity) || quantity < 0) {
            throw new Error('OrderItem quantity must be a non-negative integer');
        }

        this.menuItem = menuItem;
        this.quantity = quantity;
        Object.freeze(this);
    }

    getSubtotal() {
        return this.menuItem.price * this.quantity;
    }

    equals(other) {
        return (
            other instanceof OrderItem &&
            this.menuItem.equals(other.menuItem) &&
            this.quantity === other.quantity
        );
    }
}

module.exports = OrderItem;
