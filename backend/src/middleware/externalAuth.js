const { HTTP_STATUS } = require('../config/constants');

/**
 * Middleware to verify external API Key
 */
const verifyApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  const validApiKey = process.env.EXTERNAL_API_KEY;

  if (!apiKey || apiKey !== validApiKey) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      message: 'Invalid or missing API Key',
    });
  }

  next();
};

module.exports = { verifyApiKey };
