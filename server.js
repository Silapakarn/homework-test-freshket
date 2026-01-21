const app = require('./src/app');

const PORT = process.env.PORT || 3000;
const server = app();

server.listen(PORT, () => {
    console.log(`Food Store Calculator API is running on port ${PORT}`);
    console.log(`Calculate: POST http://localhost:${PORT}/api/orders/calculate`);
});

process.on('SIGTERM', () => {
    server.close(() => {
        console.log('HTTP server closed');
    });
});

module.exports = server;
