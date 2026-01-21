const PricingService = require('../../domain/services/PricingService');
const Order = require('../../domain/entities/Order');
const OrderItem = require('../../domain/value-objects/OrderItem');
const MenuItem = require('../../domain/value-objects/MenuItem');
const Discount = require('../../domain/value-objects/Discount');

describe('PricingService', () => {
    let pricingService;

    beforeEach(() => {
        pricingService = new PricingService();
    });

    describe('calculateBundleDiscounts', () => {
        test('should calculate bundle discount for green sets', () => {
            const menuItem = new MenuItem('green', 40);
            const orderItem = new OrderItem(menuItem, 2);
            const discounts = pricingService.calculateBundleDiscounts([orderItem]);

            expect(discounts).toHaveLength(1);
            expect(discounts[0].type).toBe(Discount.TYPES.BUNDLE);
            expect(discounts[0].amount).toBe(4); 
        });

        test('should calculate bundle discount for multiple pairs', () => {
            const menuItem = new MenuItem('green', 40);
            const orderItem = new OrderItem(menuItem, 4);
            const discounts = pricingService.calculateBundleDiscounts([orderItem]);

            expect(discounts).toHaveLength(1);
            expect(discounts[0].amount).toBe(8);
        });

    });

    describe('calculateMemberCardDiscount', () => {
        test('should calculate 10% member card discount', () => {
            const discount = pricingService.calculateMemberCardDiscount(100, true);

            expect(discount).not.toBeNull();
            expect(discount.type).toBe(Discount.TYPES.MEMBER_CARD);
            expect(discount.amount).toBe(10);
        });

    });

    describe('applyDiscounts', () => {
        test('should apply bundle discounts to order', () => {
            const order = new Order();
            const menuItem = new MenuItem('green', 40);
            const orderItem = new OrderItem(menuItem, 2);
            order.addItem(orderItem);

            pricingService.applyDiscounts(order);

            expect(order.discounts.length).toBe(1);
            expect(order.discounts[0].type).toBe(Discount.TYPES.BUNDLE);
        });
    });
});
