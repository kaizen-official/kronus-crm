const express = require('express');
const router = express.Router();
const { createExternalLead } = require('../controllers/leadController');
const { verifyApiKey } = require('../middleware/externalAuth');

/**
 * @route   POST /api/external/leads/99acres
 * @desc    Endpoint for 99 Acres to push new leads
 * @access  External (API Key)
 */
router.post('/leads/99acres', verifyApiKey, createExternalLead);

module.exports = router;
