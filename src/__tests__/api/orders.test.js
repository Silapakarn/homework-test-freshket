const request = require('supertest');
const createApp = require('../../app');

describe('Orders API', () => {
    let app;

    beforeAll(() => {
        app = createApp();
    });

    describe('POST /api/orders/calculate', () => {
        test('should calculate basic order without discounts', async () => {
            const response = await request(app)
                .post('/api/orders/calculate')
                .send({
                    items: {
                        red: 1,
                        green: 1
                    },
                    hasMemberCard: false
                })
                .expect(200);

            expect(response.body.success).toBe(true);
            expect(response.body.data.subtotal).toBe(90);
            expect(response.body.data.total).toBe(90);
            expect(response.body.data.discounts).toHaveLength(0);
        });

        test('should apply member card discount (10%)', async () => {
            const response = await request(app)
                .post('/api/orders/calculate')
                .send({
                    items: {
                        red: 1,
                        green: 1
                    },
                    hasMemberCard: true
                })
                .expect(200);

            expect(response.body.success).toBe(true);
            expect(response.body.data.subtotal).toBe(90);
            expect(response.body.data.total).toBe(81);
            expect(response.body.data.discounts).toHaveLength(1);
            expect(response.body.data.discounts[0].type).toBe('MEMBER_CARD');
            expect(response.body.data.discounts[0].amount).toBe(9);
        });
    });


});
