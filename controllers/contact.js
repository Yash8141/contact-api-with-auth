import { Contact } from "../models/Contact.js";
import { validateContactFields } from "../utils/contactValidation.js";
import { calculatePagination } from "../utils/pagination.js";
import {
  buildSearchQuery,
  buildTypeFilter,
  buildSortQuery,
} from "../utils/queryBuilder.js";
import { validateContactQuery } from "../utils/validation.js";
import mongoose from "mongoose";

// create new contact
export const newContact = async (req, res) => {
  const { name, email, phone, type } = req.body;

  // Check req body data
  const validation = validateContactFields(name,email,phone,type)

  if(!validation.success){
    return res.status(400).json({
      message: validation.message,
      success: false
    })
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

// get contact by id
export const getContactById = async (req,res) => {
  const {id} = req.params;
  const userContact =  await Contact.findById(id)
  
  if(!userContact) {
    return res.status(404).json({
      message: "Contact not found",
      success: false
    })
  }

  if(userContact) {
    return res.status(200).json({
      message: "Contact retrieved successfully",
      data: userContact,
      success: true
    })
  }
}

// update contact by id
export const updateContactById = async(req,res) => {
  const {id} = req.params;
  const {name,email,phone,type} = req.body;

  // Check req body data
  const validation = validateContactFields(name,email,phone,type)

  if(!validation.success){
    return res.status(400).json({
      message: validation.message,
      success: false
    })
  }
  const updatedContact = await Contact.findByIdAndUpdate(id,{
    name,
    email,
    phone,
    type: type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()
  }, { new: true }) // new: true returns the updated document instead of the old one

  if(!updatedContact){
    return res.status(404).json({
      message: "Contact not found",
      success: false
    })
  } 
  if(updatedContact) {
    return res.status(200).json({
      message: "Contact updated successfully",
      data: updatedContact,
      success: true
    })
  }
}

// delete contact by id
export const deleteContactById = async(req,res) => {
  const {id} = req.params;
  
  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Invalid contact ID format",
      success: false
    })
  }
  
  const deleteContact = await Contact.findByIdAndDelete(id)
  if(!deleteContact) {
    return res.status(404).json({
      message: "Contact not found",
      success: false
    })
  }
  return res.status(200).json({
    message: "Contact deleted successfully",
    success: true
  })
}