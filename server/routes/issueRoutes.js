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

router.get('/', getIssues);
router.get('/:id', getIssueById);

router.post('/', protect, createIssue);
router.put('/:id', protect, updateIssue);
router.delete('/:id', protect, deleteIssue);

module.exports = router;

