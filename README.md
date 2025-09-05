# CS2 Technologies Website

A modern, elegant company website for CS2 Technologies built with Next.js, shadcn/ui, and Tailwind CSS. Deployable to AWS using S3 and CloudFront CDN.

## 🚀 Features

- **Modern Tech Stack**: Next.js 15, TypeScript, Tailwind CSS
- **Responsive Design**: Mobile-first approach with elegant UI
- **Performance Optimized**: Static export for fast loading
- **SEO Ready**: Meta tags and structured data
- **AWS Deployment**: S3 + CloudFront CDN configuration
- **Animations**: Smooth micro-interactions with Framer Motion

## 📋 Prerequisites

- Node.js 18+ and Yarn
- AWS CLI configured with appropriate credentials
- Domain name (cs2technologies.ca)
- SSL certificate in AWS Certificate Manager (for HTTPS)

## 🛠️ Installation

1. Install dependencies:
```bash
yarn install
```

2. Run development server:
```bash
yarn dev
```

3. Open [http://localhost:3000](http://localhost:3000) to view the website

## 🏗️ Build

Build the production-ready static site:
```bash
yarn build
```

This creates an `out` directory with static files ready for deployment.

## 🚀 Deployment to AWS

### 1. Configure AWS Settings

Edit `aws-config.json` with your AWS details:
- S3 bucket name
- AWS region
- Domain name
- ACM certificate ARN (for HTTPS)

### 2. Deploy to S3

Run the deployment script:
```bash
./scripts/deploy-to-s3.sh
```

This will:
- Build the Next.js application
- Create S3 bucket if needed
- Enable static website hosting
- Upload files with appropriate cache headers

### 3. Setup CloudFront CDN

Run the CloudFront setup script:
```bash
./scripts/setup-cloudfront.sh
```

This will:
- Create CloudFront distribution
- Configure custom domain (if certificate provided)
- Set up error pages and caching

### 4. Invalidate Cache (After Updates)

After deploying updates:
```bash
./scripts/invalidate-cache.sh
```

## 📁 Project Structure

```
cs2-website/
├── app/              # Next.js app directory
│   ├── layout.tsx    # Root layout
│   ├── page.tsx      # Home page
│   └── globals.css   # Global styles
├── components/       # React components
│   ├── navigation.tsx
│   ├── hero.tsx
│   ├── about.tsx
│   ├── services.tsx
│   ├── products.tsx
│   ├── expertise.tsx
│   ├── contact.tsx
│   └── footer.tsx
├── lib/              # Utility functions
├── public/           # Static assets
├── scripts/          # Deployment scripts
└── aws-config.json   # AWS configuration
```

## 🎨 Customization

### Colors
Primary color is defined in `tailwind.config.ts`:
- Primary: `#ff2900` (CS2 brand color)

### Content
All content is in the component files in the `components/` directory.

## 📝 Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn start` - Start production server (local)
- `yarn lint` - Run ESLint

## 🔧 Environment Variables

No environment variables required for static export. For dynamic features, create a `.env.local` file.

## 📧 Contact Form

The contact form is currently a frontend-only implementation. To make it functional:
1. Set up an API endpoint (AWS Lambda, SendGrid, etc.)
2. Update the form submission handler in `components/contact.tsx`

## 🌐 DNS Configuration

After CloudFront setup, update your domain's DNS:
1. Create CNAME record: `cs2technologies.ca` → CloudFront distribution domain
2. Create CNAME record: `www.cs2technologies.ca` → CloudFront distribution domain

## 📄 License

Copyright © 2024 CS2 Technologies. All rights reserved.

## 🤝 Support

For support, email info@cs2technologies.ca