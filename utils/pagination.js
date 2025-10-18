/**
 * Calculate pagination metadata
 * @param {number} total - Total number of documents
 * @param {number} page - Current page number
 * @param {number} limit - Number of documents per page
 * @returns {Object} Pagination object with total, limit, page, totalPages
 */
export const calculatePagination = (total, page = 1, limit = 10) => {
  const currentPage = Math.max(1, parseInt(page));
  const currentLimit = Math.max(1, Math.min(100, parseInt(limit))); // Max 100 items per page
  const totalPages = Math.ceil(total / currentLimit);
  const skip = (currentPage - 1) * currentLimit;

  return {
    total,
    limit: currentLimit,
    page: currentPage,
    totalPages,
    skip,
  };
};
