const express = require('express');
const router = express.Router();


function createOrderRoutes(orderController) {
    router.post('/calculate', (req, res) => orderController.calculateOrderTotal(req, res));
    return router;
}

module.exports = createOrderRoutes;
