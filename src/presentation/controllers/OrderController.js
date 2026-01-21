
class OrderController {
    constructor(calculateOrderTotalUseCase) {
        this.calculateOrderTotalUseCase = calculateOrderTotalUseCase;
    }

    async calculateOrderTotal(req, res) {
        try {
            const { items, hasMemberCard } = req.body;

            const result = await this.calculateOrderTotalUseCase.execute({
                items,
                hasMemberCard: Boolean(hasMemberCard)
            });

            res.status(200).json({
                success: true,
                data: result
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                error: {
                    message: error.message,
                    code: 'CALCULATION_ERROR'
                }
            });
        }
    }
}

module.exports = OrderController;
