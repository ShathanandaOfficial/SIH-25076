// Response formatter utility
const sendResponse = (res, statusCode, success, message, data = null) => {
    const response = {
        success,
        message,
        ...(data && { data })
    };

    return res.status(statusCode).json(response);
};

// Success responses
const sendSuccess = (res, message, data = null, statusCode = 200) => {
    return sendResponse(res, statusCode, true, message, data);
};

// Error responses
const sendError = (res, message, statusCode = 500, errors = null) => {
    const response = {
        success: false,
        message,
        ...(errors && { errors })
    };

    return res.status(statusCode).json(response);
};

// Pagination helper
const getPagination = (page, size) => {
    const limit = size ? +size : 10;
    const offset = page ? page * limit : 0;

    return { limit, offset };
};

// Pagination data formatter
const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return {
        totalItems,
        items: rows,
        totalPages,
        currentPage,
        hasNext: currentPage < totalPages - 1,
        hasPrev: currentPage > 0
    };
};

module.exports = {
    sendResponse,
    sendSuccess,
    sendError,
    getPagination,
    getPagingData
};