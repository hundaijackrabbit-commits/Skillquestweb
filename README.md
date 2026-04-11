# SkillQuest Web

**The Professional Skills Repository and Career Intelligence Platform**

SkillQuest Web is a comprehensive, evidence-backed platform for professional skill development and career intelligence. Designed for ambitious professionals, career changers, and self-directed learners navigating today's evolving economy.

## 🚀 Key Features

### **500+ Professional Skills Repository**
- Deep, multi-dimensional skill profiles (not simple labels)
- Evidence-backed development paths and career connections
- AI-era relevance and automation risk analysis
- Practical guidance with actionable development steps

### **Career Intelligence Platform**
- Comprehensive career profiles with skill requirements
- Growth paths and market demand analysis
- Industry context and salary intelligence
- Alternative entry strategies and progression routes

### **Modern Architecture**
- Next.js 14 with App Router and TypeScript
- Fully static generation for optimal performance
- SEO-optimized with comprehensive metadata
- Responsive design with Tailwind CSS

### **Evidence-Based Content**
- Research-backed claims with source references
- Scholarly notes and market intelligence
- No generic motivational content or unfounded claims
- Continuous updates based on labor market data

## 🏗️ Architecture

### **Technology Stack**
- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **UI Components**: Custom component library with class-variance-authority
- **Icons**: Lucide React
- **Content**: Structured JSON with Zod validation
- **Search**: Fuse.js for client-side fuzzy search
- **Deployment**: Vercel (production-ready)

### **Content Architecture**
```
src/
├── app/                    # Next.js App Router pages
├── components/            
│   ├── ui/                # Reusable UI components
│   ├── features/          # Feature-specific components
│   └── layout/            # Layout components (Header, Footer)
├── lib/                   # Utilities and business logic
│   ├── types.ts           # Zod schemas and TypeScript types
│   ├── content.ts         # Content management functions
│   └── utils.ts           # Utility functions
└── data/                  # Content data files
    ├── skills.json        # 500+ professional skills
    ├── careers.json       # Career profiles
    └── industries.json    # Industry intelligence
```

## 🚀 Quick Start

### **Prerequisites**
- Node.js 18.17+ (recommended: 20+)
- npm or yarn

### **Installation**
```bash
# Clone the repository
git clone [repository-url]
cd Skillquestweb

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### **Build for Production**
```bash
# Create optimized production build
npm run build

# Start production server locally
npm start
```

## 📦 Deployment

### **Deploy to Vercel (Recommended)**

#### **Method 1: GitHub Integration**
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project" 
4. Import your GitHub repository
5. Configure settings:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`
6. Click "Deploy"

#### **Method 2: Vercel CLI**
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy (first time)
vercel

# Deploy to production
vercel --prod
```

### **Environment Variables**

#### **Optional Environment Variables**
Copy `.env.example` to `.env.local` and configure:

```env
# Production URL (for SEO)
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# Optional: Supabase (for user accounts/community)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key

# Optional: Analytics
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

#### **Vercel Environment Setup**
1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add your environment variables for Production, Preview, and Development

### **Custom Domain**
1. In Vercel dashboard, go to **Settings** → **Domains**
2. Add your custom domain
3. Configure DNS records as instructed
4. SSL certificates are automatically provisioned

## 🔧 Development

### **Project Structure**
```
SkillQuest Web/
├── public/                # Static assets
├── src/
│   ├── app/              # Pages (App Router)
│   │   ├── layout.tsx    # Root layout
│   │   ├── page.tsx      # Homepage
│   │   ├── skills/       # Skills repository
│   │   ├── careers/      # Career profiles  
│   │   └── about/        # About page
│   ├── components/       # React components
│   ├── lib/              # Utilities & content
│   └── data/             # Content files
├── tailwind.config.ts    # Tailwind configuration
├── next.config.ts        # Next.js configuration
├── vercel.json           # Vercel deployment config
└── README.md             # This file
```

### **Adding Content**

#### **Add New Skills**
Edit `src/data/skills.json`:
```json
{
  "id": "new-skill",
  "slug": "new-skill", 
  "name": "New Professional Skill",
  "category": "communication",
  "shortDefinition": "Brief definition...",
  "fullDefinition": "Comprehensive definition...",
  "whyItMatters": "Why this skill is important...",
  // ... other required fields
}
```

#### **Add New Careers**
Edit `src/data/careers.json` with comprehensive career profiles.

### **Content Guidelines**
- **Evidence-based**: Support claims with research or credible sources
- **Professional tone**: Intelligent, practical, ambitious but not overly academic
- **Modern relevance**: Focus on skills valuable in today's economy
- **Comprehensive**: Treat skills as complex knowledge objects, not simple labels

### **Development Commands**
```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server locally  
npm start

# Lint code
npm run lint

# Type checking
npm run type-check
```

## 🎯 Content Strategy

### **Skill Content Standards**
- **500+ skills** at launch, expandable to 5,000+
- **30+ flagship skills** with 2,000+ word comprehensive content
- **Evidence-backed claims** with research citations
- **Career connections** for every skill
- **AI-era analysis** and automation risk assessment

### **Quality Requirements**
- No generic motivational language
- Support all claims with evidence or qualify uncertainty
- Professional tone targeting ambitious professionals
- Modern relevance to today's economy
- Practical, actionable guidance

## 🚦 Performance & SEO

### **Built-in Optimizations**
- **Static Generation**: All pages pre-rendered at build time
- **Image Optimization**: Next.js automatic image optimization
- **Font Optimization**: Self-hosted fonts with automatic optimization
- **Bundle Optimization**: Automatic code splitting and tree shaking

### **SEO Features**
- **Comprehensive metadata** for all pages
- **Structured URLs** (`/skills/communication`, `/careers/product-manager`)
- **Open Graph** tags for social sharing
- **JSON-LD** structured data (ready to implement)
- **XML sitemap** generation (ready to implement)

### **Performance Targets**
- **Lighthouse Score**: 90+ across all metrics
- **Core Web Vitals**: Optimized LCP, FID, CLS
- **Bundle Size**: Optimized with dynamic imports
- **Loading Speed**: < 3 seconds on 3G networks

## 🔒 Security

### **Built-in Security**
- **Content Security Policy** headers via Vercel
- **XSS Protection** and security headers
- **Input validation** with Zod schemas
- **Type safety** with TypeScript
- **Environment variable** protection

## 🤝 Contributing

### **Content Contributions**
1. Review existing content standards
2. Research claims thoroughly
3. Follow evidence-based writing principles
4. Test content locally before submitting

### **Code Contributions**
1. Follow TypeScript best practices
2. Maintain component reusability
3. Add proper type definitions
4. Test builds before submitting

## 📄 License

[Add your license here]

## 🆘 Troubleshooting

### **Common Issues**

#### **Build Errors**
```bash
# Clear Next.js cache
rm -rf .next

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### **Type Errors**
```bash
# Run type checking
npm run type-check

# Common fix: restart TypeScript server in VS Code
# Command Palette -> "TypeScript: Restart TS Server"
```

#### **Deployment Issues**
- Verify `npm run build` succeeds locally
- Check environment variables in Vercel dashboard
- Review build logs in Vercel deployment panel

### **Performance Issues**
- Check bundle analyzer: `npm run analyze` (if configured)
- Verify images are optimized
- Review Core Web Vitals in production

## 📧 Support

For technical issues:
1. Check existing GitHub issues
2. Review troubleshooting section
3. Create detailed issue with reproduction steps

---

**SkillQuest Web** - Professional skills intelligence for the modern economy.
