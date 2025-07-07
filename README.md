# 🚀 Modern Portfolio Website

A stunning, fully responsive portfolio website built with React, TypeScript, and Tailwind CSS, featuring advanced animations, seamless design transitions, and modern UI patterns.

[Portfolio-Live](https://siddhesh-chavan-portfolio.vercel.app/)

![React](https://img.shields.io/badge/React-19.1.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-blue)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.22.0-purple)
![Vite](https://img.shields.io/badge/Vite-7.0.0-646CFF)

## ✨ Features

### 🎨 Design & UI
- **Modern Minimalistic Design** - Clean, professional interface with seamless sections
- **Dark/Light Theme Toggle** - Instant theme switching with localStorage persistence
- **Fully Responsive** - Mobile-first design optimized for all screen sizes
- **Advanced Animations** - Smooth transitions, floating particles, and micro-interactions
- **Unified Effects** - Consistent hover animations and gradient overlays across all components
- **No Section Partitions** - Seamless, flowing layout without visual breaks

### 🏗️ Architecture
- **100% Static Frontend** - No backend dependencies, perfect for static hosting
- **TypeScript** - Full type safety with excellent IDE support
- **Component-Based** - Modular, reusable React components with clean interfaces
- **Local Data Management** - All portfolio data stored locally for instant loading
- **Performance Optimized** - Lazy loading, efficient rendering, and minimal bundle size

### 📧 Contact System
- **EmailJS Primary** - Direct email sending from contact form
- **Multi-Layer Fallback** - Mailgun API backup and FormSubmit/mailto as final fallback
- **Real-time Validation** - Client-side form validation with instant feedback
- **Debug Panel** - Built-in development tools showing email service status
- **Error Handling** - Comprehensive error handling with user-friendly messages

### 🎭 Interactive Elements
- **Project-Style Effects** - Consistent hover animations inspired by the Projects section
- **Floating Particles** - Subtle background animations for visual depth
- **Gradient Overlays** - Beautiful color transitions on interaction
- **Scale & Rotation** - Smooth scaling and rotation effects on hover
- **Loading States** - Elegant loading spinners and state management

## 🛠️ Tech Stack

### Frontend Framework
- **React 19.1.0** - Latest React with concurrent features and modern hooks
- **TypeScript 5.8.3** - Full type safety and enhanced developer experience
- **Vite 7.0.0** - Lightning-fast build tool and development server

### Styling & UI
- **Tailwind CSS 3.4.17** - Utility-first CSS with custom configurations
- **Framer Motion 12.22.0** - Production-ready motion library for animations
- **Lucide React 0.525.0** - Beautiful, customizable icons
- **Custom CSS** - Advanced keyframes, gradients, and visual effects

### Email Services
- **EmailJS Browser 4.4.1** - Client-side email sending
- **Mailgun API** - Professional email service backup
- **FormSubmit** - No-setup form handling fallback

### Development Tools
- **ESLint 9.29.0** - Code linting and quality assurance
- **PostCSS 8.5.6** - CSS processing and optimization
- **Autoprefixer 10.4.21** - Automatic vendor prefixing

## 📁 Project Structure

```
Portfolio/
├── frontend/
│   ├── public/
│   │   ├── images/
│   │   │   ├── profile.jpg
│   │   │   └── profile-about.jpg
│   │   └── assets/
│   │       └── Siddhesh2_Resume.pdf
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout/
│   │   │   │   ├── Header.tsx
│   │   │   │   └── Footer.tsx
│   │   │   ├── Sections/
│   │   │   │   ├── Hero.tsx
│   │   │   │   ├── About.tsx
│   │   │   │   ├── Projects.tsx
│   │   │   │   ├── Skills.tsx
│   │   │   │   ├── Experience.tsx
│   │   │   │   └── Contact.tsx
│   │   │   └── UI/
│   │   │       ├── ThemeToggle.tsx
│   │   │       └── LoadingSpinner.tsx
│   │   ├── data/
│   │   │   ├── profile.ts
│   │   │   ├── experience.ts
│   │   │   └── projects.json
│   │   ├── services/
│   │   │   ├── api.ts
│   │   │   ├── emailjs.ts
│   │   │   ├── mailgun.ts
│   │   │   ├── fallbackEmail.ts
│   │   │   └── directEmail.ts
│   │   └── types/
│   │       └── index.ts
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── tsconfig.json
├── README.md
└── .gitignore
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Pseudo-Sid26/Portfolio.git
   cd Portfolio
   ```

2. **Install dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Environment Setup (Optional for contact form)**
   ```bash
   cp .env.example .env
   ```
   Configure your email service credentials in `.env`:
   ```env
   # EmailJS Configuration (Primary)
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   
   # Mailgun Configuration (Fallback)
   VITE_MAILGUN_DOMAIN=your-domain.mailgun.org
   VITE_MAILGUN_API_KEY=your-mailgun-api-key
   VITE_MAILGUN_FROM_EMAIL=contact@your-domain.com
   VITE_MAILGUN_TO_EMAIL=your-email@example.com
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 📧 Email Setup (Optional)

The portfolio includes a multi-layer email system that works even without configuration:

### Layer 1: EmailJS (Recommended)
1. **Create EmailJS Account**
   - Visit [EmailJS](https://www.emailjs.com/)
   - Create a free account
   - Set up an email service (Gmail, Outlook, etc.)
   - Create an email template
   - Get your Service ID, Template ID, and Public Key

2. **Update Environment Variables**
   ```env
   VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
   VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
   VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxx
   ```

### Layer 2: Mailgun (Professional Backup)
1. **Create Mailgun Account**
   - Sign up at [Mailgun](https://www.mailgun.com/)
   - Verify your domain or use sandbox domain

2. **Configure Environment Variables**
   ```env
   VITE_MAILGUN_DOMAIN=your-domain.mailgun.org
   VITE_MAILGUN_API_KEY=your-mailgun-api-key
   VITE_MAILGUN_FROM_EMAIL=contact@your-domain.com
   VITE_MAILGUN_TO_EMAIL=your-email@example.com
   ```

### Layer 3: Direct Email (No Setup Required)
- **FormSubmit** - Works out of the box
- **mailto** - Opens user's default email client
- **Console Logging** - For development/testing

## 🎨 Customization

### Personal Information
Update your details in `src/data/profile.ts`:
```typescript
export const userProfile: UserProfile = {
  name: "Your Name",
  email: "your.email@example.com",
  bio: "Your bio description",
  location: "Your Location",
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourprofile",
  // ... other details
};
```

### Projects
Add your projects in `src/data/projects.json`:
```json
{
  "id": "unique-id",
  "title": "Project Name",
  "description": "Project description",
  "technologies": ["React", "TypeScript", "Tailwind"],
  "githubUrl": "https://github.com/username/project",
  "liveUrl": "https://project-demo.com",
  "imageUrl": "/images/project-screenshot.jpg",
  "category": "Web Development",
  "featured": true
}
```

### Experience
Update your work experience in `src/data/experience.ts`:
```typescript
export const experiences: Experience[] = [
  {
    title: "Job Title",
    company: "Company Name",
    location: "Location",
    startDate: new Date("2023-01-01"),
    endDate: new Date("2024-01-01"),
    current: false,
    description: "Job description and achievements",
    technologies: ["React", "Node.js", "PostgreSQL"]
  }
];
```

### Theme Colors
Customize colors in `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: '#your-primary-color',
      accent: '#your-accent-color',
    }
  }
}
```

## 🏗️ Build & Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deploy to Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables in Netlify dashboard

### Deploy to Vercel
1. Import project from GitHub in Vercel dashboard
2. Framework preset: Vite
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add environment variables in Vercel dashboard

### Deploy to GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add deploy script to package.json:
   ```json
   "scripts": {
     "deploy": "npm run build && gh-pages -d dist"
   }
   ```
3. Run: `npm run deploy`

## 🎯 Performance Features

- **Lazy Loading** - Components load only when needed
- **Optimized Images** - Compressed and properly sized images
- **Tree Shaking** - Unused code eliminated in production
- **CSS Purging** - Unused CSS automatically removed
- **Fast Refresh** - Lightning-fast development experience
- **Static Generation** - Pre-built for optimal loading speeds

## 🔧 Development Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

## 🎨 Animation System

The portfolio features a comprehensive animation system:

- **Framer Motion** - Page transitions and component animations
- **CSS Keyframes** - Background effects and floating elements
- **Hover Effects** - Interactive states for all components
- **Scroll Animations** - Elements animate into view
- **Theme Transitions** - Smooth dark/light mode switching
- **Floating Particles** - Subtle background animations
- **Gradient Overlays** - Dynamic color transitions

## 📱 Responsive Design

- **Mobile First** - Designed for mobile devices first
- **Breakpoint System** - Custom Tailwind breakpoints
- **Flexible Layouts** - CSS Grid and Flexbox
- **Touch Friendly** - Optimized for touch interactions
- **Progressive Enhancement** - Works on all devices

## 🔒 Security & Privacy

- **No Backend** - Static site with no server vulnerabilities
- **Client-Side Only** - All processing happens in the browser
- **No Sensitive Data** - No personal data stored or transmitted
- **HTTPS Ready** - Secure deployment by default
- **CSP Compatible** - Content Security Policy ready

## 🌟 Features in Detail

### Hero Section
- **Animated Typewriter Effect** - Rotates through different roles
- **Floating Orbital Particles** - Subtle animation around avatar
- **Minimalistic Glow Effects** - Clean hover interactions
- **Smooth Scroll Navigation** - Seamless section transitions
- **Resume Download** - Direct PDF download functionality

### About Section
- **Real Profile Image** - Professional photo integration
- **Animated Info Cards** - Hover effects with gradients
- **Background Animations** - Floating particles and effects
- **Contact Information** - Multiple ways to get in touch

### Projects Section
- **Dynamic Filtering** - Filter projects by category
- **Advanced Animations** - Rotation and scale effects on hover
- **GitHub Integration** - Live repository links
- **Responsive Grid** - Adapts to all screen sizes
- **Technology Tags** - Visual skill indicators

### Skills Section
- **Dynamic Generation** - Skills extracted from project data
- **Animated Chips** - Color-coded by skill type
- **Horizontal Scrolling** - Mobile-friendly skill showcase
- **Proficiency Levels** - Visual skill indicators

### Experience Section
- **Interactive Timeline** - Chronological work history
- **Company Information** - Detailed job descriptions
- **Technology Stack** - Skills used in each role
- **Responsive Design** - Works on all devices

### Contact Section
- **Working Contact Form** - Multi-layer email system
- **Real-time Validation** - Instant feedback on form inputs
- **Success/Error States** - Clear user feedback
- **Social Media Links** - Multiple contact methods
- **Debug Panel** - Development tools for email testing

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** - For the amazing React framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Framer Motion** - For smooth animations
- **EmailJS** - For client-side email functionality
- **Vite** - For the fast build tool
- **Lucide** - For beautiful icons

## 📞 Contact

**Siddhesh Chavan**
- Portfolio: [Live Demo](https://pseudo-sid26.github.io/Portfolio/)
- GitHub: [@Pseudo-Sid26](https://github.com/Pseudo-Sid26)
- Email: siddhesh26.chavan@gmail.com
- LinkedIn: [Siddhesh Chavan](https://www.linkedin.com/in/siddhesh-chavan-a196a5252/)

---

Made with ❤️ by [Siddhesh Chavan](https://github.com/Pseudo-Sid26)

⭐ Star this repository if you found it helpful!
