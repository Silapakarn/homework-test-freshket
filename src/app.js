const express = require('express');
const cors = require('cors');

const InMemoryMenuRepository = require('./infrastructure/repositories/InMemoryMenuRepository');
const CalculateOrderTotalUseCase = require('./application/use-cases/CalculateOrderTotalUseCase');
const OrderController = require('./presentation/controllers/OrderController');
const createOrderRoutes = require('./presentation/routes/orderRoutes');
const errorHandler = require('./presentation/middleware/errorHandler');


function createApp() {
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    const menuRepository = new InMemoryMenuRepository();
    const calculateOrderTotalUseCase = new CalculateOrderTotalUseCase(menuRepository);
    const orderController = new OrderController(calculateOrderTotalUseCase);

    app.get('/health', (req, res) => {
        res.json({ status: 'ok', timestamp: new Date().toISOString() });
    });

    app.use('/api/orders', createOrderRoutes(orderController));
    app.use(errorHandler);

    return app;
}

module.exports = createApp;
