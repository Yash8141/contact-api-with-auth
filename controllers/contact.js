import { Contact } from "../models/Contact.js";
import { calculatePagination } from "../utils/pagination.js";
import {
  buildSearchQuery,
  buildTypeFilter,
  buildSortQuery,
} from "../utils/queryBuilder.js";
import { validateContactQuery } from "../utils/validation.js";

// create new contact
export const newContact = async (req, res) => {
  const { name, email, phone, type } = req.body;

  if (!name || !email || !phone || !type) {
    return res.status(400).json({
      message: "Please fill all fields",
      success: false,
    });
  }

  // Validate contact type
  const validTypes = ["personal", "professional"];
  if (!validTypes.includes(type.toLowerCase())) {
    return res.status(400).json({
      message: `Invalid contact type. Must be one of: Personal, Professional`,
      success: false,
    });
  }

  // Check if contact email already exists
  const existingEmail = await Contact.findOne({ email });
  if (existingEmail) {
    return res.status(400).json({
      message: "Contact with this email already exists",
      success: false,
    });
  }

  // Check if contact name already exists
  const existingContactName = await Contact.findOne({ name });
  if (existingContactName) {
    return res.status(400).json({
      message: "Contact with this name already exists",
      success: false,
    });
  }

  // new contact creation (convert type to capital case for consistency)
  const contact = new Contact({
    name,
    email,
    phone,
    type: type.charAt(0).toUpperCase() + type.slice(1).toLowerCase(),
  });
  await contact.save();

  if (contact) {
    res.status(201).json({
      message: "Contact saved successfully",
      data: contact,
      success: true,
    });
  }
};

// get all contact with pagination, search, and filters
export const getAllContact = async (req, res) => {
  try {
    // Validate and sanitize query parameters
    const validatedParams = validateContactQuery(req.query);
    const { page, limit, search, searchBy, type, sortDir, sortBy } =
      validatedParams;

    // Build query object
    let query = {};

    // Add search filter
    if (search) {
      const searchQuery = buildSearchQuery(search, searchBy);
      query = { ...query, ...searchQuery };
    }

    // Add type filter
    if (type) {
      const typeFilter = buildTypeFilter(type);
      query = { ...query, ...typeFilter };
    }

    // Build sort object (show latest data first by default)
    const sortQuery = buildSortQuery(sortDir, sortBy);

    // Get total count for pagination
    const total = await Contact.countDocuments(query);

    // Calculate pagination
    const pagination = calculatePagination(total, page, limit);

    // Fetch contacts with pagination, search, and sorting
    const contacts = await Contact.find(query)
      .sort(sortQuery)
      .skip(pagination.skip)
      .limit(pagination.limit)
      .lean(); // Use lean() for better performance

    // Return success response
    return res.status(200).json({
      success: true,
      message: "Contacts retrieved successfully",
      data: contacts,
      pagination: {
        total: pagination.total,
        limit: pagination.limit,
        page: pagination.page,
        totalPages: pagination.totalPages,
      },
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};
