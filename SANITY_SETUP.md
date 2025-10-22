# Sanity CMS Setup Guide

## 🚀 Quick Setup

### 1. Create Sanity Project

1. Go to [sanity.io](https://sanity.io) and sign in
2. Click "Create new project"
3. Choose project name: `freelancer-portfolio` (or your preferred name)
4. Select dataset: `production`
5. Choose template: "Clean project with no predefined schemas"

### 2. Get Your Project Credentials

After creating the project, you'll get:
- **Project ID**: Found in your project dashboard
- **Dataset**: Usually `production`
- **API Token**: Go to API → Tokens → Create token

### 3. Update Environment Variables

Create `.env.local` file in your project root:

```bash
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token_here

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Deploy Schemas to Sanity

```bash
# Login to Sanity
npx sanity login

# Deploy your schemas
npx sanity deploy
```

### 5. Start the Studio

```bash
# Start Sanity Studio
npm run studio
```

Visit: http://localhost:3333

### 6. Start Development Server

```bash
# Start Next.js app
npm run dev
```

Visit: http://localhost:3000

## 📋 Content Types Available

### Personal Info
- Basic information, value proposition, client benefits
- Availability status, experience metrics
- Social links, bio content

### Services
- Service offerings with descriptions
- Features, ideal clients, tech stack
- Icons and ordering

### Projects (Client Success Stories)
- Project details with client focus
- Problem solved, solution delivered
- Results and metrics
- Client type and name

### Process Steps
- Your work methodology
- Step descriptions and duration
- Icons and ordering

### Testimonials
- Client quotes and reviews
- Client information and photos
- Project type and featured status

### FAQ
- Frequently asked questions
- Categorized answers
- Ordering system

### Skills
- Technology stack
- Categorized by type
- Icons and organization

### Experience
- Work history
- Company and role details
- Timeline and descriptions

## 🎯 Next Steps

1. **Add your content** in Sanity Studio
2. **Create components** to display the content
3. **Customize the design** with Tailwind CSS
4. **Deploy** to your hosting platform

## 🔧 Troubleshooting

### Studio won't start?
- Check your environment variables
- Make sure you're logged in: `npx sanity login`
- Try: `npx sanity dev --port 3334`

### Build errors?
- Verify all environment variables are set
- Check that your Sanity project exists
- Ensure schemas are deployed: `npx sanity deploy`

### Can't see content?
- Make sure you've added content in Sanity Studio
- Check your queries in `lib/sanity.queries.js`
- Verify your project ID and dataset are correct
