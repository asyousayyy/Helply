const Issue = require('../models/Issue');

// Create a new issue
exports.createIssue = async (req, res) => {
  try {
    const { title, description, category, location } = req.body;

    // Basic validation
    if (!title || !description || !category || !location) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newIssue = new Issue({
      title,
      description,
      category,
      location,
      user: req.user._id, // add the logged-in user's ID
    });

    const savedIssue = await newIssue.save();
    res.status(201).json(savedIssue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all issues
exports.getIssues = async (req, res) => {
  try {
    const issues = await Issue.find().sort({ createdAt: -1 }).populate('user', 'name email');
    res.json(issues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get issue by ID
exports.getIssueById = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id).populate('user', 'name email');
    if (!issue) return res.status(404).json({ message: 'Issue not found' });
    res.json(issue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update issue by ID
exports.updateIssue = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);
    if (!issue) return res.status(404).json({ message: 'Issue not found' });

    // Optional: Only allow user to update their own issues
    if (issue.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const updatedIssue = await Issue.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedIssue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete issue by ID
exports.deleteIssue = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);
    if (!issue) return res.status(404).json({ message: 'Issue not found' });

    // Optional: Only allow user to delete their own issues
    if (issue.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await issue.remove();
    res.json({ message: 'Issue deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
