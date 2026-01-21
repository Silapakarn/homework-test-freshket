const Order = require('../../domain/entities/Order');
const OrderItem = require('../../domain/value-objects/OrderItem');
const PricingService = require('../../domain/services/PricingService');

class CalculateOrderTotalUseCase {
    constructor(menuRepository) {
        this.menuRepository = menuRepository;
        this.pricingService = new PricingService();
    }

    async execute(request) {
        const { items, hasMemberCard = false } = request;

        const order = new Order();
        order.setMemberCard(hasMemberCard);

        for (const [itemName, quantity] of Object.entries(items)) {
            const menuItem = this.menuRepository.findByName(itemName);
            
            if (!menuItem) {
                throw new Error(`Invalid item: ${itemName}`);
            }

            if (!Number.isInteger(quantity) || quantity < 0) {
                throw new Error(`Invalid quantity for ${itemName}: ${quantity}`);
            }

            if (quantity > 0) {
                const orderItem = new OrderItem(menuItem, quantity);
                order.addItem(orderItem);
            }
        }

        this.pricingService.applyDiscounts(order);

        return {
            orderId: order.orderId,
            items: order.items.map(item => ({
                name: item.menuItem.name,
                price: item.menuItem.price,
                quantity: item.quantity,
                subtotal: item.getSubtotal()
            })),
            subtotal: order.getSubtotal(),
            discounts: order.discounts.map(discount => ({
                type: discount.type,
                amount: discount.amount,
                description: discount.description
            })),
            totalDiscount: order.getTotalDiscount(),
            total: order.getTotal(),
            hasMemberCard: order.hasMemberCard
        };
    }
}

module.exports = CalculateOrderTotalUseCase;
