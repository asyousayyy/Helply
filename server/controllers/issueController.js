// server/controllers/issueController.js
const Issue = require('../models/issueModel');

// @desc    Create new issue
// @route   POST /api/issues
// @access  Private
const createIssue = async (req, res) => {
  try {
    const { title, description, location } = req.body;

    if (!title || !description || !location) {
      return res.status(400).json({ message: 'Please fill all required fields' });
    }

    const issue = await Issue.create({
      title,
      description,
      location,
      user: req.user._id,
    });

    res.status(201).json(issue);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while creating issue' });
  }
};

// @desc    Get all issues
// @route   GET /api/issues
// @access  Private (change to Public if needed)
const getIssues = async (req, res) => {
  try {
    const issues = await Issue.find().populate('user', 'name').sort({ createdAt: -1 });
    res.json(issues);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching issues' });
  }
};

// @desc    Get single issue by ID
// @route   GET /api/issues/:id
// @access  Public
const getIssueById = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id).populate('user', 'name');
    if (!issue) return res.status(404).json({ message: 'Issue not found' });
    res.json(issue);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving issue' });
  }
};

// @desc    Update an issue
// @route   PUT /api/issues/:id
// @access  Private
const updateIssue = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);
    if (!issue) return res.status(404).json({ message: 'Issue not found' });

    if (issue.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this issue' });
    }

    const { title, description, location, status } = req.body;
    if (title) issue.title = title;
    if (description) issue.description = description;
    if (location) issue.location = location;
    if (status) issue.status = status;

    const updated = await issue.save();
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating issue' });
  }
};

// @desc    Delete an issue
// @route   DELETE /api/issues/:id
// @access  Private
const deleteIssue = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);
    if (!issue) return res.status(404).json({ message: 'Issue not found' });

    if (issue.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this issue' });
    }

    await issue.deleteOne();
    res.json({ message: 'Issue deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting issue' });
  }
};

module.exports = {
  createIssue,
  getIssues,
  getIssueById,
  updateIssue,
  deleteIssue,
};
