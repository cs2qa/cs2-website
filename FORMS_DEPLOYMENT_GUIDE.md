# 📧 Contact Forms Deployment Guide

## ✅ **All Three Forms Updated & Ready**

I've successfully enabled and connected all three contact forms to the AWS email system:

### 🌐 **Forms Updated:**
1. **`/contact`** - General contact form
2. **`/demo`** - Demo scheduling form  
3. **`/get-started`** - Quote request form

---

## 🚀 **Deployment Steps**

### **Step 1: Deploy Email Infrastructure**
```bash
cd terraform
./deploy-contact-form.sh
```

### **Step 2: Verify Email in AWS SES**
1. Go to AWS Console > SES > Verified identities
2. Check your email (info@cs2technologies.ca)
3. Click verification link in email

### **Step 3: Get API URL and Update Environment**
```bash
# Get the API URL from terraform output
cd terraform
terraform output contact_form_api_url

# Copy the URL and create .env.local file in root
cd ..
echo "NEXT_PUBLIC_CONTACT_API_URL=YOUR_ACTUAL_API_URL_HERE" > .env.local
```

### **Step 4: Test the API**
```bash
cd terraform
./test-contact-api.sh
```

### **Step 5: Deploy Website**
```bash
npm run build
./terraform/deploy.sh
```

---

## 📝 **What Each Form Does**

### 1. **Contact Form** (`/contact`)
- **Purpose:** General inquiries
- **Email Subject:** Based on user selection
- **Auto-reply:** Yes
- **Data Collected:** Name, email, company, phone, subject, message

### 2. **Demo Form** (`/demo`)  
- **Purpose:** Schedule product demos
- **Email Subject:** `Demo Request - [Product Name]`
- **Auto-reply:** Yes
- **Data Collected:** Full name, email, phone, company, job title, demo type, preferred time, additional info
- **Special:** Includes detailed demo information and features

### 3. **Get Started Form** (`/get-started`)
- **Purpose:** Request custom quotes
- **Email Subject:** `Quote Request - [Solution Name]`
- **Auto-reply:** Yes
- **Data Collected:** Full name, email, phone, company, company size, challenges, timeline, budget
- **Special:** Includes selected solution details, pricing, and implementation timeline

---

## 📧 **Email Format**

**You will receive:**
- Professional HTML formatted emails
- All form data clearly organized
- User gets automatic confirmation reply
- Emails sent to: `info@cs2technologies.ca`

**Users receive:**
- Thank you email with CS2 branding
- Confirmation that request was received
- Next steps information

---

## 🧪 **Testing Checklist**

After deployment, test each form:

- [ ] **Contact Form** (/contact)
  - [ ] Fill out form completely
  - [ ] Submit and check for success message
  - [ ] Check your email for the inquiry
  - [ ] Check if user gets auto-reply

- [ ] **Demo Form** (/demo)
  - [ ] Select a demo type
  - [ ] Fill out personal info
  - [ ] Choose time slot
  - [ ] Submit and verify email received

- [ ] **Get Started Form** (/get-started)
  - [ ] Select a solution
  - [ ] Fill out business info
  - [ ] Submit and verify quote request email

---

## 💰 **Cost Information**

**AWS SES Pricing:**
- First 62,000 emails/month: **FREE**
- After that: $0.10 per 1,000 emails
- Extremely cost-effective for contact forms

**Lambda + API Gateway:**
- Lambda: First 1M requests free/month
- API Gateway: First 1M calls free/month
- Essentially free for typical website usage

---

## 🔧 **Troubleshooting**

**If forms don't work:**
1. Check `.env.local` file has correct API URL
2. Verify email is confirmed in AWS SES
3. Check browser console for errors
4. Test API directly with `./test-contact-api.sh`

**Common Issues:**
- Email not verified → Check SES console
- CORS errors → API should handle this automatically  
- Form submission fails → Check API URL in environment

---

## ✨ **Ready to Deploy!**

All forms are now properly connected and will send real emails once you deploy the infrastructure. The system is production-ready and professional-grade.

**Next:** Run `./deploy-contact-form.sh` to get started!