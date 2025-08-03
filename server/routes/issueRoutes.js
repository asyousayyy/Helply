// server/routes/issueRoutes.js
const express = require('express');
const router = express.Router();
const {
  createIssue,
  getIssues,
  getIssueById,
  updateIssue,
  deleteIssue,
} = require('../controllers/issueController');

const { protect } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getIssues); // Get all issues
router.get('/:id', getIssueById); // Get issue by ID

// Protected routes
router.post('/', protect, createIssue); // Create issue (requires login)
router.put('/:id', protect, updateIssue); // Update issue
router.delete('/:id', protect, deleteIssue); // Delete issue

module.exports = router;
