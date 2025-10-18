/**
 * Build search query for contacts
 * @param {string} search - Search term
 * @param {string} searchBy - Field to search by (default: name)
 * @returns {Object} MongoDB query object
 */
export const buildSearchQuery = (search, searchBy = "name") => {
  if (!search) return {};

  const validSearchFields = ["name", "email","phone"];
  const searchField = validSearchFields.includes(searchBy) ? searchBy : "name";

  return {
    [searchField]: { $regex: search, $options: "i" }, // Case-insensitive search
  };
};

/**
 * Build filter query for contact type
 * @param {string} type - Contact type filter
 * @returns {Object} MongoDB query object
 */
export const buildTypeFilter = (type) => {
  if (!type) return {};

  const validTypes = ["personal", "professional"];
  if (!validTypes.includes(type.toLowerCase())) {
    throw new Error(`Invalid type. Must be one of: Personal, Professional`);
  }

  // Convert to capital case for filtering
  const capitalType =
    type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
  return { type: capitalType };
};

/**
 * Build sort object for MongoDB query
 * @param {string} sortDir - Sort direction (asc, desc)
 * @param {string} sortBy - Field to sort by (default: createdAt)
 * @returns {Object} MongoDB sort object
 */
export const buildSortQuery = (sortDir = "desc", sortBy = "createdAt") => {
  const validSortDirections = ["asc", "desc"];
  const validSortFields = ["name", "email", "createdAt", "updatedAt"];

  const direction = validSortDirections.includes(sortDir.toLowerCase())
    ? sortDir.toLowerCase()
    : "desc";

  const field = validSortFields.includes(sortBy) ? sortBy : "createdAt";

  return { [field]: direction === "asc" ? 1 : -1 };
};
