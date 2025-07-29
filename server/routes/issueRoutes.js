const express = require('express');
const router = express.Router();

const {
  createIssue,
  getIssues,
  getIssueById,
  updateIssue,
  deleteIssue,
} = require('../controllers/issueController');

// Create new issue
router.post('/', createIssue);

// Get all issues
router.get('/', getIssues);

// Get issue by ID
router.get('/:id', getIssueById);

// Update issue by ID
router.put('/:id', updateIssue);

// Delete issue by ID
router.delete('/:id', deleteIssue);

module.exports = router;





