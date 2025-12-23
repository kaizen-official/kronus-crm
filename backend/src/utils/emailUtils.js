const nodemailer = require('nodemailer');

/**
 * Create email transporter
 */
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

/**
 * Send email
 * @param {object} options - Email options
 */
const sendEmail = async (options) => {
  const transporter = createTransporter();

  const message = {
    from: `${options.fromName || 'Kronus CRM'} <${process.env.EMAIL_FROM}>`,
    to: options.email,
    subject: options.subject,
    html: options.html,
    text: options.text,
  };

  try {
    const info = await transporter.sendMail(message);
    console.log('Email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Email error:', error);
    throw new Error('Email could not be sent');
  }
};

/**
 * Send password reset email
 */
const sendPasswordResetEmail = async (email, resetUrl, firstName) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #4CAF50; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .button { display: inline-block; padding: 12px 24px; background: #4CAF50; color: white; text-decoration: none; border-radius: 4px; margin: 20px 0; }
        .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Password Reset Request</h1>
        </div>
        <div class="content">
          <p>Hi ${firstName},</p>
          <p>You requested to reset your password. Click the button below to reset it:</p>
          <p style="text-align: center;">
            <a href="${resetUrl}" class="button">Reset Password</a>
          </p>
          <p>If you didn't request this, please ignore this email. This link will expire in 1 hour.</p>
          <p>For security, please don't share this link with anyone.</p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} Kronus CRM. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  await sendEmail({
    email,
    subject: 'Password Reset Request - Kronus CRM',
    html,
    text: `Hi ${firstName}, You requested to reset your password. Visit this link: ${resetUrl}`,
  });
};

/**
 * Send welcome email
 */
const sendWelcomeEmail = async (email, firstName, tempPassword) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #4CAF50; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .credentials { background: white; padding: 15px; border-left: 4px solid #4CAF50; margin: 20px 0; }
        .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Welcome to Kronus CRM</h1>
        </div>
        <div class="content">
          <p>Hi ${firstName},</p>
          <p>Welcome to Kronus CRM! Your account has been created successfully.</p>
          ${tempPassword ? `
          <div class="credentials">
            <p><strong>Your temporary password:</strong></p>
            <p style="font-size: 18px; font-family: monospace;">${tempPassword}</p>
            <p style="color: #e74c3c; font-size: 14px;">⚠️ Please change this password immediately after your first login.</p>
          </div>
          ` : ''}
          <p>You can now log in and start managing your leads and customers.</p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} Kronus CRM. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  await sendEmail({
    email,
    subject: 'Welcome to Kronus CRM',
    html,
    text: `Hi ${firstName}, Welcome to Kronus CRM! ${tempPassword ? `Your temporary password is: ${tempPassword}` : ''}`,
  });
};

module.exports = {
  sendEmail,
  sendPasswordResetEmail,
  sendWelcomeEmail,
};
