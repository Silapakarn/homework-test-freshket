
function errorHandler(err, req, res, next) {
    let statusCode = 500;
    let message = 'Internal server error';
    let code = 'INTERNAL_ERROR';

    if (err.message && err.message.includes('Invalid')) {
        statusCode = 400;
        message = err.message;
        code = 'VALIDATION_ERROR';
    }

    res.status(statusCode).json({
        success: false,
        error: {
            message,
            code
        }
    });
}

module.exports = errorHandler;
