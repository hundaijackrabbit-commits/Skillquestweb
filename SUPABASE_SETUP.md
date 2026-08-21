# Modern Skill Lab - Supabase Setup Guide

## 📋 Overview

Modern Skill Lab uses Supabase for user authentication, user profiles, and data persistence. This guide walks through the complete setup process.

## 🎯 Features Enabled by Supabase

- ✅ **User Authentication**: Sign up, sign in, sign out with email/password
- ✅ **User Profiles**: Extended user data with preferences and saved items  
- ✅ **Skill/Career Saving**: Users can save skills and careers for later
- ✅ **Dashboard**: Personalized dashboard with recommendations and progress
- ✅ **Activity Tracking**: Track user interactions for personalization
- ✅ **Skill Progress**: Track learning progress and skill development
- ✅ **Learning Paths**: Curated skill paths for structured learning

## 🚀 Setup Instructions

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click **"New Project"**
3. Choose your organization
4. Enter project details:
   - **Name**: `Modern Skill Lab`
   - **Database Password**: Generate a strong password (save it!)
   - **Region**: Choose closest to your users
   - **Pricing Plan**: Start with Free tier
5. Click **"Create new project"**
6. Wait 2-3 minutes for project initialization

### 2. Run Database Migrations

1. In your Supabase dashboard, go to **SQL Editor**
2. Copy and paste the contents of `supabase/migrations/001_initial_schema.sql`
3. Click **"Run"** to create all tables and policies
4. Copy and paste the contents of `supabase/migrations/002_seed_skill_paths.sql` 
5. Click **"Run"** to seed initial skill paths data

**Alternatively**, use the Supabase CLI:

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link your project (get project ID from dashboard)
supabase link --project-ref YOUR_PROJECT_ID

# Run migrations
supabase db push
```

### 3. Configure Environment Variables

1. In Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL**: `https://yourprojectid.supabase.co`
   - **Anon Key**: `eyJ...` (public, safe to expose)
   - **Service Role Key**: `eyJ...` (secret, server-side only)

3. Create `.env.local` in your project root:

```bash
# Required: Supabase for user accounts and community features
NEXT_PUBLIC_SUPABASE_URL=https://yourprojectid.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# Optional: For server-side operations (admin functions)  
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Production URL (for SEO and metadata)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Configure Authentication Settings

In Supabase dashboard, go to **Authentication** → **Settings**:

#### Email Settings
- **Enable email confirmations**: ✅ Enabled
- **Enable email change confirmations**: ✅ Enabled  
- **Enable secure email change**: ✅ Enabled

#### URL Configuration
Add your application URLs:
- **Site URL**: `http://localhost:3000` (development)
- **Redirect URLs**: 
  - `http://localhost:3000/auth/callback`
  - `https://yourdomain.com/auth/callback` (production)

#### Email Templates (Optional)
Customize the email templates in **Authentication** → **Email Templates**

### 5. Set Up Row Level Security (RLS)

The migrations automatically enable RLS, but verify in **Authentication** → **Policies**:

**Profiles Table**:
- ✅ `Users can view own profile`
- ✅ `Users can update own profile`
- ✅ `Users can insert own profile`

**Other Tables**: Similar user-scoped policies are applied automatically.

### 6. Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:3000`

3. Click **"Get Started"** or **"Sign In"**

4. Test user registration:
   - Create account with email/password
   - Check email for verification link
   - Sign in after verification

5. Test dashboard features:
   - Go to `/dashboard` after signing in
   - Try saving skills from `/skills` pages
   - Verify data persistence

## 🔧 Database Schema

### Tables Created

**`profiles`**: Extended user information
- `id` (UUID, references auth.users)
- `email`, `name`  
- `saved_skills[]`, `saved_careers[]`
- `career_interests[]`, `selected_industries[]`
- `preferences` (JSONB)

**`skill_progress`**: Skill learning progress
- `user_id`, `skill_id`
- `status` (saved, learning, in-progress, completed)
- `progress_percentage`, `notes`

**`user_activities`**: Activity tracking
- `user_id`, `activity_type`
- `item_id`, `item_type`  
- `created_at`

**`skill_paths`**: Curated learning paths
- `name`, `description`, `category`
- `skills[]`, `related_careers[]`
- `difficulty`, `estimated_time`

**`user_paths`**: User enrollment in paths
- `user_id`, `path_id`
- `status`, `progress_percentage`

## 🛠️ Development Tips

### Local Development
```bash
# Run with environment variables
npm run dev

# Check Supabase connection
curl http://localhost:3000/api/health
```

### Debugging Auth Issues
1. Check browser console for Supabase errors
2. Verify environment variables are loaded
3. Confirm RLS policies allow operations
4. Test with Supabase CLI:
   ```bash
   supabase auth users list
   ```

### Reset Database (if needed)
```bash
# Reset all data (careful!)
supabase db reset

# Re-run migrations
supabase db push
```

## 🚀 Production Deployment

### Vercel Deployment
1. Connect your GitHub repo to Vercel
2. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SITE_URL` (your production domain)

3. Update Supabase auth settings:
   - Add production domain to **Site URL**
   - Add production callback URL to **Redirect URLs**

### Domain Configuration
Update your production URLs in:
- Supabase **Authentication** → **URL Configuration**
- Environment variable `NEXT_PUBLIC_SITE_URL`
- Any hardcoded URLs in the codebase

## 🔒 Security Considerations

### Row Level Security
- ✅ All user data is protected by RLS policies
- ✅ Users can only access their own data
- ✅ Public data (skills, careers) is accessible to all

### API Keys
- ✅ **Anon Key**: Safe to expose client-side
- ❌ **Service Role Key**: Keep secret, server-side only
- ❌ **JWT Secret**: Never expose, used internally by Supabase

### Best Practices
- Use `SUPABASE_SERVICE_ROLE_KEY` only for admin operations
- Validate user permissions on sensitive operations
- Keep Supabase project dashboard access restricted
- Monitor auth logs for suspicious activity

## 📊 Monitoring and Analytics

### Supabase Dashboard
- **Auth**: Monitor sign-ups, sign-ins, user count
- **Database**: Query performance, table sizes
- **Logs**: API requests, errors, slow queries
- **Realtime**: Connection counts, message volume

### Application Metrics
- User registration/retention rates
- Feature adoption (dashboard, saved skills)
- Performance monitoring (query times)

## 🆘 Troubleshooting

### Common Issues

**"Invalid JWT" errors**
- Check environment variables are correct
- Verify Supabase project is active
- Confirm anon key hasn't expired

**RLS Policy errors**
- Check policies are enabled for tables
- Verify user is authenticated for operations
- Test policies in Supabase SQL editor

**Build failures with Supabase**
- Ensure placeholder URLs are replaced
- Confirm all environment variables are set
- Check for TypeScript errors with Supabase types

**Email not working**
- Verify SMTP settings in Supabase
- Check spam folder for auth emails
- Test with different email providers

## 📚 Additional Resources

## Career guide delivery tracking

After the existing schema and Growth Console migrations, run:

```text
supabase/migrations/004_career_guide_delivery.sql
```

This creates `career_guide_deliveries`, the public request function used by the guide form, admin-only row-level security, and the delivery status fields shown in `/admin`. The public request function accepts a guide request but does not expose the delivery table. The server uses `SUPABASE_SERVICE_ROLE_KEY` only to mark a request as sent or failed after the email provider responds.

Guide delivery and newsletter consent are deliberately separate. Only a checked optional marketing box calls `subscribe_newsletter`.

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js + Supabase Guide](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase Auth Helpers](https://github.com/supabase/auth-helpers)

---

**Need Help?** 
- Check the [Supabase Community](https://github.com/supabase/supabase/discussions)
- Review application logs in development
- Use browser dev tools to debug client-side issues
