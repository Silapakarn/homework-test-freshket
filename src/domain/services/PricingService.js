const Discount = require('../value-objects/Discount');


class PricingService {
    constructor() {
        this.bundleEligibleItems = ['orange', 'pink', 'green'];        
        this.memberCardDiscountRate = 0.1;
        this.bundleDiscountRate = 0.05;
    }

    calculateBundleDiscounts(items) {
        const discounts = [];

        items.forEach(item => {
            const itemName = item.menuItem.name;
            
            if (this.bundleEligibleItems.includes(itemName) && item.quantity >= 2) {
                const pairs = Math.floor(item.quantity / 2);
                const discountedItems = pairs * 2;
                const discountAmount = (item.menuItem.price * discountedItems) * this.bundleDiscountRate;
                
                if (discountAmount > 0) {
                    discounts.push(
                        new Discount(
                            Discount.TYPES.BUNDLE,
                            discountAmount,
                            `${itemName} bundle discount (${pairs} pair(s))`
                        )
                    );
                }
            }
        });

        return discounts;
    }

    calculateMemberCardDiscount(subtotal, hasMemberCard) {
        if (!hasMemberCard || subtotal <= 0) {
            return null;
        }

        const discountAmount = subtotal * this.memberCardDiscountRate;
        
        return new Discount(
            Discount.TYPES.MEMBER_CARD,
            discountAmount,
            'Member card discount (10%)'
        );
    }

    applyDiscounts(order) {
        order.discounts = [];

        const bundleDiscounts = this.calculateBundleDiscounts(order.items);
        bundleDiscounts.forEach(discount => order.addDiscount(discount));

        const subtotalAfterBundle = order.getSubtotal() - order.getTotalDiscount();

        const memberCardDiscount = this.calculateMemberCardDiscount(
            subtotalAfterBundle,
            order.hasMemberCard
        );

        if (memberCardDiscount) {
            order.addDiscount(memberCardDiscount);
        }

        return order;
    }
}

module.exports = PricingService;
