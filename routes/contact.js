import express from "express";
import {
  newContact,
  getAllContact,
  getContactById,
  updateContactById,
  deleteContactById,
  getContactByUserId,
} from "../controllers/contact.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

/**
 * @swagger
 * /api/contact/new:
 *   post:
 *     summary: Create a new contact
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: ["name", "email", "phone", "type"]
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *                 description: "Contact's full name"
 *               email:
 *                 type: string
 *                 example: "john@gmail.com"
 *                 description: "Contact's email address"
 *               phone:
 *                 type: string
 *                 example: "1234567890"
 *                 description: "Contact's phone number"
 *               type:
 *                 type: string
 *                 enum: ["personal", "professional", "Personal", "Professional"]
 *                 example: "Personal"
 *                 description: "Contact type (accepts any case, stored as Personal/Professional)"
 *     responses:
 *       201:
 *         description: Contact created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Contact saved successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Contact'
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Bad request - validation error or duplicate contact
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid contact type. Must be one of: Personal, Professional"
 *                 success:
 *                   type: boolean
 *                   example: false
 *       401:
 *         description: Unauthorized - invalid or missing token
 */
router.post("/new", authenticateToken, newContact);

/**
 * @swagger
 * /api/contact:
 *   get:
 *     summary: Get all contacts with pagination, search, and filters
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number for pagination
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Number of contacts per page (max 100)
 *         example: 10
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term for filtering contacts
 *         example: "john"
 *       - in: query
 *         name: searchBy
 *         schema:
 *           type: string
 *           enum: [name, email]
 *           default: name
 *         description: Field to search by
 *         example: "name"
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [Personal, Professional, personal, professional]
 *         description: Filter contacts by type (case insensitive)
 *         example: "Personal"
 *       - in: query
 *         name: sortDir
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *         description: Sort direction (asc=ascending, desc=descending)
 *         example: "desc"
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [name, email, createdAt, updatedAt]
 *           default: createdAt
 *         description: Field to sort by
 *         example: "createdAt"
 *     responses:
 *       200:
 *         description: Contacts retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Contacts retrieved successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Contact'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                       example: 25
 *                       description: "Total number of contacts matching the query"
 *                     limit:
 *                       type: integer
 *                       example: 10
 *                       description: "Number of contacts per page"
 *                     page:
 *                       type: integer
 *                       example: 2
 *                       description: "Current page number"
 *                     totalPages:
 *                       type: integer
 *                       example: 3
 *                       description: "Total number of pages"
 *                 filters:
 *                   type: object
 *                   properties:
 *                     search:
 *                       type: string
 *                       nullable: true
 *                       example: "john"
 *                       description: "Applied search term"
 *                     searchBy:
 *                       type: string
 *                       example: "name"
 *                       description: "Field searched by"
 *                     type:
 *                       type: string
 *                       nullable: true
 *                       example: "Personal"
 *                       description: "Applied type filter"
 *                     sortDir:
 *                       type: string
 *                       example: "desc"
 *                       description: "Sort direction used"
 *                     sortBy:
 *                       type: string
 *                       example: "createdAt"
 *                       description: "Field sorted by"
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Bad request - invalid query parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid type filter. Must be one of: Personal, Professional"
 *                 success:
 *                   type: boolean
 *                   example: false
 *       401:
 *         description: Unauthorized - invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Access denied. No token provided."
 *                 success:
 *                   type: boolean
 *                   example: false
 */
// Get All Contact
router.get("/", authenticateToken, getAllContact);

/**
 * @swagger
 * /api/contact/{id}:
 *   get:
 *     summary: Get contact by ID
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Contact ID
 *         example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Contact retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Contact retrieved successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Contact'
 *                 success:
 *                   type: boolean
 *                   example: true
 *       404:
 *         description: Contact not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Contact not found"
 *                 success:
 *                   type: boolean
 *                   example: false
 *       401:
 *         description: Unauthorized - invalid or missing token
 */
// Get Contact by id
router.get("/:id", authenticateToken, getContactById);

/**
 * @swagger
 * /api/contact/{id}:
 *   put:
 *     summary: Update contact by ID
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Contact ID
 *         example: "507f1f77bcf86cd799439011"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: ["name", "email", "phone", "type"]
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe Updated"
 *                 description: "Contact's full name"
 *               email:
 *                 type: string
 *                 example: "john.updated@gmail.com"
 *                 description: "Contact's email address"
 *               phone:
 *                 type: string
 *                 example: "9876543210"
 *                 description: "Contact's phone number"
 *               type:
 *                 type: string
 *                 enum: ["personal", "professional", "Personal", "Professional"]
 *                 example: "Professional"
 *                 description: "Contact type (accepts any case, stored as Personal/Professional)"
 *     responses:
 *       200:
 *         description: Contact updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Contact updated successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Contact'
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Bad request - validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Please fill all fields"
 *                 success:
 *                   type: boolean
 *                   example: false
 *       404:
 *         description: Contact not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Contact not found"
 *                 success:
 *                   type: boolean
 *                   example: false
 *       401:
 *         description: Unauthorized - invalid or missing token
 */
// Update contact by od
router.put("/:id", authenticateToken, updateContactById);

/**
 * @swagger
 * /api/contact/{id}:
 *   delete:
 *     summary: Delete contact by ID
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Contact ID
 *         example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Contact deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Contact deleted successfully"
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Bad request - invalid contact ID format
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid contact ID format"
 *                 success:
 *                   type: boolean
 *                   example: false
 *       404:
 *         description: Contact not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Contact not found"
 *                 success:
 *                   type: boolean
 *                   example: false
 *       401:
 *         description: Unauthorized - invalid or missing token
 */
// Delete contact by id
router.delete("/:id", authenticateToken, deleteContactById);

/**
 * @swagger
 * /api/contact/user/{id}:
 *   get:
 *     summary: Get all contacts for a specific user
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID to get contacts for
 *         example: "690cce9b042932d2abb85bfa"
 *     responses:
 *       200:
 *         description: User contacts retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User contacts retrieved successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Contact'
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Bad request - invalid user ID format
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid user ID format"
 *                 success:
 *                   type: boolean
 *                   example: false
 *       401:
 *         description: Unauthorized - invalid or missing token
 */
// Get User Specific Contact
router.get("/user/:id", authenticateToken, getContactByUserId);
export default router;
