const Document = require('../models/documentModel');
const User = require('../models/userModel');

exports.createDocument = async (req, res) => {
  try {
    const { title, content } = req.body;
    const document = new Document({
      title,
      content,
      owner: req.userId
    });

    await document.save();
    res.status(201).json(document);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.editDocument = async (req, res) => {
  try {
    const { content } = req.body;
    const document = await Document.findById(req.params.documentId);

    if (document.owner.toString() !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    document.content = content;
    document.versions.push({ content });
    await document.save();

    res.status(200).json(document);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.documentId);
    if (document.owner.toString() !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await document.remove();
    res.status(204).json({ message: 'Document deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
