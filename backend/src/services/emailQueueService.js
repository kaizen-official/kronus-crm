/**
 * Simple in-memory queue for asynchronous email processing
 */
class EmailQueueService {
  constructor() {
    this.queue = [];
    this.isProcessing = false;
    this.sendFunction = null;
  }

  /**
   * Register the function that actually sends the email
   * @param {Function} fn - Async function that takes mailOptions and sends email
   */
  registerSendFunction(fn) {
    this.sendFunction = fn;
  }

  /**
   * Add an email job to the queue
   * @param {Object} mailOptions - Email options (to, subject, html, etc.)
   */
  async add(mailOptions) {
    this.queue.push(mailOptions);
    console.log(`[EmailQueue] Job added. Queue size: ${this.queue.length}`);
    
    // Trigger processing without awaiting it (fire and forget)
    this.processQueue();
  }

  /**
   * Process the queue sequentially
   */
  async processQueue() {
    if (this.isProcessing) return;
    if (!this.sendFunction) {
      console.error('[EmailQueue] No send function registered!');
      return;
    }

    this.isProcessing = true;

    try {
      while (this.queue.length > 0) {
        const job = this.queue[0]; // Peek
        try {
          await this.sendFunction(job);
          console.log(`[EmailQueue] Email sent successfully to ${job.to}`);
          this.queue.shift(); // Remove on success
        } catch (error) {
          console.error(`[EmailQueue] Failed to send email to ${job.to}:`, error.message);
          // For now, we remove failed jobs to prevent blocking the queue. 
          // In a production system, we might want a retry mechanism or Dead Letter Queue.
          this.queue.shift(); 
        }
        
        // Small delay between emails to be nice to the mail server
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    } catch (err) {
        console.error('[EmailQueue] Critical error in queue processor:', err);
    } finally {
      this.isProcessing = false;
    }
  }
}

module.exports = new EmailQueueService();
