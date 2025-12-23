# Kronus CRM Backend - Production Deployment Checklist

## 🚀 Pre-Deployment Checklist

### Environment Configuration

- [ ] **Update .env for Production**
  ```bash
  NODE_ENV=production
  PORT=5000
  DATABASE_URL="your_production_mongodb_url"
  JWT_SECRET="generate_strong_random_secret_here"
  JWT_REFRESH_SECRET="generate_different_strong_secret_here"
  FRONTEND_URL="https://your-production-domain.com"
  ```

- [ ] **Generate Strong JWT Secrets**
  ```bash
  # Use this command to generate secure secrets
  node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
  ```

- [ ] **Configure Production Database**
  - Set up MongoDB Atlas or production MongoDB instance
  - Update DATABASE_URL
  - Enable database authentication
  - Configure IP whitelist
  - Set up database backups

- [ ] **Configure Email Service**
  - Set up production SMTP (SendGrid, AWS SES, etc.)
  - Update EMAIL_HOST, EMAIL_PORT
  - Set EMAIL_USER and EMAIL_PASSWORD
  - Update EMAIL_FROM with your domain

### Security Hardening

- [ ] **Change All Default Passwords**
  - Super Admin password
  - Manager password
  - All test user passwords

- [ ] **Review Rate Limits**
  - Adjust RATE_LIMIT_MAX_REQUESTS based on expected traffic
  - Consider different limits for different endpoints

- [ ] **CORS Configuration**
  - Update FRONTEND_URL to production domain
  - Review and restrict allowed origins
  - Enable credentials if needed

- [ ] **HTTPS/SSL**
  - Obtain SSL certificate (Let's Encrypt, Cloudflare, etc.)
  - Configure HTTPS
  - Force HTTPS redirect

- [ ] **Environment Variables**
  - Never commit .env to Git
  - Use secure environment variable management (AWS Secrets Manager, etc.)
  - Rotate secrets regularly

### Code Review

- [ ] **Remove Console Logs**
  - Review and remove unnecessary console.log statements
  - Keep only essential error logging

- [ ] **Error Handling**
  - Ensure all routes have error handling
  - No sensitive data in error messages
  - Proper HTTP status codes

- [ ] **Input Validation**
  - All endpoints have validation
  - Sanitization middleware applied
  - File upload limits (if added)

- [ ] **Database Optimization**
  - Add necessary indexes
  - Review query performance
  - Set up connection pooling

### Infrastructure Setup

- [ ] **Choose Hosting Platform**
  - AWS (EC2, ECS, Lambda)
  - Heroku
  - DigitalOcean
  - Railway
  - Render
  - Vercel (API routes)

- [ ] **Set Up CI/CD**
  - GitHub Actions
  - GitLab CI
  - Jenkins
  - CircleCI

- [ ] **Configure Reverse Proxy** (if using)
  - Nginx
  - Apache
  - Cloudflare

- [ ] **Set Up Monitoring**
  - Application monitoring (New Relic, DataDog)
  - Error tracking (Sentry)
  - Uptime monitoring
  - Performance monitoring

- [ ] **Configure Logging**
  - Set up centralized logging
  - Log rotation
  - Error alerting

### Testing

- [ ] **Run Tests**
  ```bash
  # If you have tests
  npm test
  ```

- [ ] **API Testing**
  - Test all endpoints
  - Verify authentication
  - Check authorization
  - Test error scenarios

- [ ] **Load Testing**
  - Use tools like Apache JMeter or k6
  - Test concurrent users
  - Identify bottlenecks

- [ ] **Security Testing**
  - Run security audit: `npm audit`
  - Check for vulnerabilities
  - Penetration testing

### Database Preparation

- [ ] **Backup Strategy**
  - Set up automated backups
  - Test restore procedure
  - Document backup schedule

- [ ] **Data Migration**
  - Plan migration strategy
  - Test migration on staging
  - Prepare rollback plan

- [ ] **Seed Production Data**
  - Create initial super admin
  - DO NOT use test passwords
  - Document admin credentials securely

### Performance Optimization

- [ ] **Enable Compression**
  ```bash
  npm install compression
  # Add to index.js: app.use(compression())
  ```

- [ ] **Implement Caching**
  - Redis for session storage
  - Cache frequently accessed data
  - CDN for static assets

- [ ] **Database Indexes**
  - Add indexes for frequently queried fields
  - Monitor slow queries

- [ ] **Connection Pooling**
  - Configure appropriate pool size
  - Set connection timeouts

### Deployment Steps

1. **Build & Test**
   ```bash
   npm install --production
   npx prisma generate
   ```

2. **Environment Setup**
   - Set all environment variables on hosting platform
   - Verify configuration

3. **Database Setup**
   ```bash
   # In production environment
   npx prisma db push
   npm run seed  # Only if seeding production data
   ```

4. **Deploy Application**
   - Push to hosting platform
   - Verify deployment
   - Check logs

5. **Health Check**
   ```bash
   curl https://your-api-domain.com/health
   ```

6. **Test Critical Endpoints**
   - User registration
   - Login
   - Create lead
   - Get data with authentication

### Post-Deployment

- [ ] **Monitor Logs**
  - Check for errors
  - Monitor performance
  - Watch for unusual activity

- [ ] **Set Up Alerts**
  - Error rate alerts
  - Performance degradation
  - Downtime alerts
  - Security alerts

- [ ] **Documentation**
  - Update API documentation with production URLs
  - Document deployment process
  - Create runbook for common issues

- [ ] **Backup Verification**
  - Verify backups are running
  - Test restore process

- [ ] **Load Balancing** (if needed)
  - Configure load balancer
  - Test failover

- [ ] **SSL Certificate Renewal**
  - Set up automatic renewal
  - Add calendar reminders

### Maintenance Plan

- [ ] **Regular Updates**
  - Schedule npm package updates
  - Security patches
  - Node.js version updates

- [ ] **Monitoring & Metrics**
  - Set up dashboards
  - Track key metrics (response time, error rate, etc.)
  - User activity analytics

- [ ] **Incident Response Plan**
  - Document escalation process
  - Create incident checklist
  - Set up communication channels

### Quick Deployment Commands

**For Heroku:**
```bash
# Login
heroku login

# Create app
heroku create kronus-crm-api

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set DATABASE_URL="your_mongodb_url"
heroku config:set JWT_SECRET="your_secret"

# Deploy
git push heroku main

# Run migrations
heroku run npx prisma db push

# View logs
heroku logs --tail
```

**For AWS EC2:**
```bash
# SSH into server
ssh -i your-key.pem ubuntu@your-server-ip

# Clone repository
git clone your-repo-url
cd kronus/backend

# Install dependencies
npm install --production

# Set up environment
cp .env.example .env
nano .env  # Edit with production values

# Install PM2 for process management
npm install -g pm2

# Start application
pm2 start src/index.js --name kronus-api

# Enable startup on boot
pm2 startup
pm2 save
```

**For Docker:**
```dockerfile
# Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
RUN npx prisma generate
EXPOSE 5000
CMD ["node", "src/index.js"]
```

```bash
# Build and run
docker build -t kronus-api .
docker run -p 5000:5000 --env-file .env kronus-api
```

### Security Incident Response

If security breach occurs:

1. **Immediate Actions**
   - [ ] Disable affected accounts
   - [ ] Rotate all secrets and tokens
   - [ ] Review access logs
   - [ ] Identify breach source

2. **Investigation**
   - [ ] Analyze logs
   - [ ] Identify affected data
   - [ ] Document findings

3. **Remediation**
   - [ ] Patch vulnerabilities
   - [ ] Update security measures
   - [ ] Notify affected users (if required)

4. **Prevention**
   - [ ] Update security procedures
   - [ ] Additional monitoring
   - [ ] Staff training

### Rollback Plan

If deployment fails:

1. **Database Rollback**
   ```bash
   # Restore from backup
   mongorestore --uri="mongodb://..." /path/to/backup
   ```

2. **Application Rollback**
   - Revert to previous deployment
   - Or deploy last stable version

3. **Verify Rollback**
   - Test critical endpoints
   - Check error logs
   - Verify database integrity

### Support Contacts

- **Database Issues**: DBA team
- **Infrastructure**: DevOps team
- **Security**: Security team
- **Application**: Development team

### Final Pre-Launch Checks

- [ ] All tests passing
- [ ] Documentation updated
- [ ] Team trained
- [ ] Monitoring configured
- [ ] Backups verified
- [ ] SSL certificate active
- [ ] Domain configured
- [ ] Load testing completed
- [ ] Security audit passed
- [ ] Rollback plan tested

---

## 🎉 Ready for Production!

Once all items are checked, your Kronus CRM backend is ready for production deployment!

**Remember:**
- Keep this checklist for future deployments
- Update based on lessons learned
- Review and improve security regularly
- Monitor continuously

**Good luck with your launch!** 🚀
