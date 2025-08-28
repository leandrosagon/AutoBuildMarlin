/** Standard success response wrapper */
export function ok(res, message, data, meta) {
    return res.status(200).json({ success: true, message, data, meta });
}
/** Standard created response wrapper */
export function created(res, message, data) {
    return res.status(201).json({ success: true, message, data });
}
/** Standard error response wrapper */
export function error(res, status, message, details) {
    return res.status(status).json({ success: false, message, details });
}
