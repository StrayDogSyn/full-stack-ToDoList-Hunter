export const errorHandler = (err, _req, res, _next) => {
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    console.error(`[Error] ${status}: ${message}`);
    console.error(err.stack);
    res.status(status).json({
        error: {
            message,
            status,
        },
    });
};
//# sourceMappingURL=errorHandler.js.map