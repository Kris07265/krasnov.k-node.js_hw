const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message || 'Server Error';

    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        statusCode = 400;
        message = `Invalid ID format: ${err.value}`;
    }

    if (err.name === 'ValidationError') {
        statusCode = 400;
        const invalidFields = Object.keys(err.errors);
        return res.status(statusCode).json({
            message: 'Validation Error',
            invalidFields,
            details: Object.values(err.errors).map(e => e.message)
        });
    }

    res.status(statusCode).json({ message });
};

const notFound = (req, res, next) => {
    res.status(404).json({ message: `Not Found - ${req.originalUrl}` });
};

module.exports = { errorHandler, notFound };