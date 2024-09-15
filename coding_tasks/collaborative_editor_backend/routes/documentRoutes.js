const express = require('express');
const { createDocument, editDocument, deleteDocument } = require('../controllers/documentConroller.js');
const authMiddleware = require('../middleware/authMiddleware.js');
const router = express.Router();

router.post('/documents', authMiddleware, createDocument);
router.put('/documents/:documentId', authMiddleware, editDocument);
router.delete('/documents/:documentId', authMiddleware, deleteDocument);

module.exports = router;
