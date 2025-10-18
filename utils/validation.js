/**
 * Validate and sanitize query parameters for contact endpoints
 * @param {Object} query - Express request query object
 * @returns {Object} Validated and sanitized parameters
 */
export const validateContactQuery = (query) => {
  const {
    page = 1,
    limit = 10,
    search,
    searchBy = "name",
    type,
    sortDir = "desc",
    sortBy = "createdAt",
  } = query;

  // Validate pagination
  const validatedPage = Math.max(1, parseInt(page) || 1);
  const validatedLimit = Math.max(1, Math.min(100, parseInt(limit) || 10));

  // Validate search parameters
  const validSearchFields = ["name", "email","phone"];
  const validatedSearchBy = validSearchFields.includes(searchBy)
    ? searchBy
    : "name";

  // Validate type filter
  const validTypes = ["personal", "professional"];
  let validatedType = null;
  if (type && validTypes.includes(type.toLowerCase())) {
    validatedType = type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
  } else if (type && !validTypes.includes(type.toLowerCase())) {
    throw new Error(
      `Invalid type filter. Must be one of: Personal, Professional`
    );
  }

  // Validate sort parameters
  const validSortDirections = ["asc", "desc"];
  const validSortFields = ["name", "email", "createdAt", "updatedAt"];

  const validatedSortDir = validSortDirections.includes(sortDir.toLowerCase())
    ? sortDir.toLowerCase()
    : "desc";

  const validatedSortBy = validSortFields.includes(sortBy)
    ? sortBy
    : "createdAt";

  return {
    page: validatedPage,
    limit: validatedLimit,
    search: search ? search.trim() : null,
    searchBy: validatedSearchBy,
    type: validatedType,
    sortDir: validatedSortDir,
    sortBy: validatedSortBy,
  };
};
