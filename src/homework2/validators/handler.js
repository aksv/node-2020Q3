export default function validationErrorHandler(err, req, res, next) {
    if (err && err.error && err.error.isJoi) {
        res.status(400).json({
            type: err.type,
            message: err.error.toString()
        });
    } else {
        return next(err);
    }
}
