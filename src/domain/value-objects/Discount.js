
class Discount {
    static TYPES = {
        BUNDLE: 'BUNDLE',
        MEMBER_CARD: 'MEMBER_CARD'
    };

    constructor(type, amount, description = '') {
        if (!Object.values(Discount.TYPES).includes(type)) {
            throw new Error(`Invalid discount type: ${type}`);
        }
        if (typeof amount !== 'number' || amount < 0) {
            throw new Error('Discount amount must be a non-negative number');
        }

        this.type = type;
        this.amount = amount;
        this.description = description;
        Object.freeze(this);
    }

    equals(other) {
        return (
            other instanceof Discount &&
            this.type === other.type &&
            this.amount === other.amount
        );
    }
}

module.exports = Discount;
