const OrderItem = require('../value-objects/OrderItem');
const Discount = require('../value-objects/Discount');


class Order {
    constructor(orderId = null) {
        this.orderId = orderId || this._generateOrderId();
        this.items = [];
        this.discounts = [];
        this.hasMemberCard = false;
        this.createdAt = new Date();
    }

    _generateOrderId() {
        return `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }

    addItem(orderItem) {
        if (!(orderItem instanceof OrderItem)) {
            throw new Error('Order item must be an instance of OrderItem');
        }
        this.items.push(orderItem);
        return this;
    }

    setMemberCard(hasMemberCard) {
        this.hasMemberCard = Boolean(hasMemberCard);
        return this;
    }

    addDiscount(discount) {
        if (!(discount instanceof Discount)) {
            throw new Error('Discount must be an instance of Discount');
        }
        this.discounts.push(discount);
        return this;
    }

    getSubtotal() {
        return this.items.reduce((sum, item) => sum + item.getSubtotal(), 0);
    }

    getTotalDiscount() {
        return this.discounts.reduce((sum, discount) => sum + discount.amount, 0);
    }

    getTotal() {
        const subtotal = this.getSubtotal();
        const totalDiscount = this.getTotalDiscount();
        return Math.max(0, Math.round((subtotal - totalDiscount) * 100) / 100);
    }

    isEmpty() {
        return this.items.length === 0;
    }
}

module.exports = Order;
