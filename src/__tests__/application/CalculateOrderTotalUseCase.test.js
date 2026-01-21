const CalculateOrderTotalUseCase = require('../../application/use-cases/CalculateOrderTotalUseCase');
const InMemoryMenuRepository = require('../../infrastructure/repositories/InMemoryMenuRepository');

describe('CalculateOrderTotalUseCase', () => {
    let useCase;
    let menuRepository;

    beforeEach(() => {
        menuRepository = new InMemoryMenuRepository();
        useCase = new CalculateOrderTotalUseCase(menuRepository);
    });

    test('should calculate basic order', async () => {
        const result = await useCase.execute({
            items: { red: 1, green: 1 },
            hasMemberCard: false
        });

        expect(result.subtotal).toBe(90);
        expect(result.total).toBe(90);
        expect(result.discounts).toHaveLength(0);
    });

    test('should apply member card discount', async () => {
        const result = await useCase.execute({
            items: { red: 1, green: 1 },
            hasMemberCard: true
        });

        expect(result.subtotal).toBe(90);
        expect(result.total).toBe(81);
        expect(result.hasMemberCard).toBe(true);
    });


});
