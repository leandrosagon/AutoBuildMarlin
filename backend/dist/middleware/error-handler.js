export function notFoundHandler(_req, res) {
    res.status(404).json({ success: false, message: 'Route not found' });
}
export function errorHandler(err, _req, res, _next) {
    const status = typeof err?.status === 'number' ? err.status : 500;
    const message = err?.message || 'Internal server error';
    res.status(status).json({ success: false, message, details: err?.details });
}
