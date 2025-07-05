# Portfolio Website

A modern, static portfolio website built with React and TypeScript. Features local data management, client-side email integration, and is fully deployable as a static site.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Portfolio
   ```

2. **Install dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Environment Configuration**
   
   Create or update `frontend/.env` with your Mailgun configuration:
   ```env
   # Mailgun configuration for email service
   VITE_MAILGUN_DOMAIN=your-domain.mailgun.org
   VITE_MAILGUN_API_KEY=your-mailgun-api-key
   VITE_MAILGUN_FROM_EMAIL=contact@your-domain.com
   VITE_MAILGUN_TO_EMAIL=your-email@example.com
   ```

4. **Customize Your Data**
   
   Edit these files to customize your portfolio:
   - `frontend/src/data/projects.json` - Your projects
   - `frontend/src/data/profile.ts` - Your profile information
   - `frontend/src/data/experience.ts` - Your work experience
   
5. **Start Development Server**
   
   **Option A: Use the batch file (Windows)**
   ```bash
   start-dev.bat
   ```
   
   **Option B: Manual start**
   ```bash
   cd frontend
   npm run dev
   ```

6. **Access the Application**
   - Frontend: http://localhost:5173

## 📧 Email Configuration (Mailgun)

This portfolio uses Mailgun for client-side email sending. To set up:

1. **Create a Mailgun Account**
   - Sign up at [mailgun.com](https://www.mailgun.com/)
   - Verify your domain or use the sandbox domain for testing

2. **Get API Credentials**
   - Find your API key in the Mailgun dashboard
   - Note your domain (either your custom domain or sandbox domain)

3. **Update Environment Variables**
   ```env
   VITE_MAILGUN_DOMAIN=your-domain.mailgun.org
   VITE_MAILGUN_API_KEY=your-mailgun-api-key
   VITE_MAILGUN_FROM_EMAIL=contact@your-domain.com
   VITE_MAILGUN_TO_EMAIL=your-email@example.com
   ```

4. **Test the Contact Form**
   - Fill out the contact form on your portfolio
   - Check your email for messages

## 🔧 Architecture Features

- **Static Data**: All data stored locally in JSON/TypeScript files
- **Client-Side Email**: Mailgun integration for contact form submissions
- **Dynamic Skills**: Skills automatically generated from project technologies
- **Smart Categorization**: Projects organized by development type and domains
- **Modern Design**: Clean, responsive design with smooth animations
- **TypeScript**: Type-safe development experience
- **Static Deployment**: Can be deployed to any static hosting service

## 🛠️ Tech Stack

- **React 19** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Lucide React** for icons
- **Mailgun** for email services

## 📁 Project Structure

```
Portfolio/
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── Layout/     # Header, Footer
│   │   │   ├── Sections/   # Main page sections
│   │   │   └── UI/         # UI components
│   │   ├── data/          # Static data files
│   │   │   ├── projects.json    # Your projects
│   │   │   ├── profile.ts       # Your profile
│   │   │   └── experience.ts    # Your experience
│   │   ├── services/       # Services (data, email)
│   │   ├── utils/          # Utility functions
│   │   └── types/         # TypeScript types
│   ├── public/            # Static assets
│   ├── .env              # Environment variables
│   └── package.json       # Dependencies
├── start-dev.bat          # Windows development starter
└── README.md              # This file
```

## 📝 Customizing Your Portfolio

### 1. Projects (`frontend/src/data/projects.json`)
Add your projects with the following structure:
```json
{
  "id": "unique-id",
  "title": "Project Title",
  "description": "Project description",
  "technologies": ["React", "TypeScript", "Node.js"],
  "githubUrl": "https://github.com/username/repo",
  "liveUrl": "https://your-project.com",
  "imageUrl": "/images/project-screenshot.jpg",
  "category": "Web Development",
  "featured": true
}
```

### 2. Profile (`frontend/src/data/profile.ts`)
Update your personal information:
```typescript
export const profile = {
  name: "Your Name",
  title: "Your Professional Title",
  email: "your.email@example.com",
  phone: "+1 (555) 123-4567",
  location: "Your Location",
  bio: "Your professional bio...",
  // ... other fields
};
```

### 3. Experience (`frontend/src/data/experience.ts`)
Add your work experience:
```typescript
export const experience = [
  {
    title: "Job Title",
    company: "Company Name",
    location: "Location",
    startDate: "2023",
    endDate: "Present",
    responsibilities: ["Responsibility 1", "Responsibility 2"]
  }
];
```

## 🚀 Deployment

This is a static React application that can be deployed to any static hosting service:

### Build for Production
```bash
cd frontend
npm run build
```

### Deployment Options
- **Vercel**: `vercel --prod`
- **Netlify**: Drag and drop the `dist` folder
- **GitHub Pages**: Use GitHub Actions
- **Firebase Hosting**: `firebase deploy`
- **AWS S3**: Upload the `dist` folder contents

### Environment Variables for Production
Make sure to set your Mailgun environment variables in your hosting platform:
- `VITE_MAILGUN_DOMAIN`
- `VITE_MAILGUN_API_KEY`
- `VITE_MAILGUN_FROM_EMAIL`
- `VITE_MAILGUN_TO_EMAIL`

## 🛠️ Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Adding New Sections
1. Create a new component in `src/components/Sections/`
2. Import and add it to `App.tsx`
3. Update navigation in `Header.tsx` if needed

### Styling
- Uses Tailwind CSS for styling
- Custom CSS classes defined in `src/index.css`
- Responsive design principles applied

## 📱 Features

- ✅ Responsive design (mobile-first)
- ✅ Smooth scrolling navigation
- ✅ Animated section transitions
- ✅ Contact form with email integration
- ✅ Project showcase with filtering
- ✅ Skills auto-generation from projects
- ✅ GitHub and LinkedIn integration
- ✅ SEO-friendly structure
- ✅ Fast loading times
- ✅ Static deployment ready

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Support

If you have any questions or need help setting up your portfolio:
- Create an issue in this repository
- Check the documentation above
- Ensure all environment variables are properly configured

---

**Happy coding!** 🚀
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the backend directory:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   ```

4. **Start Development Servers**
   ```bash
   # From the root directory
   npm run dev
   ```
   Or use VS Code's task: "Start Development Server"

   This will start:
   - Backend server on http://localhost:5000
   - Frontend server on http://localhost:5173

## 🔧 Project Data Management

The portfolio uses a JSON file to manage project data instead of GitHub API integration.

### Adding Projects
1. Edit `backend/data/projects.json` to add your projects
2. Each project should include:
   - title, description, technologies
   - githubUrl, liveUrl (optional)
   - category, featured status
   - stars, forks, language information

### Project Structure
```json
{
  "id": 1,
  "title": "Project Name",
  "description": "Project description",
  "technologies": ["React", "Node.js"],
  "githubUrl": "https://github.com/username/repo",
  "liveUrl": "https://project-demo.com",
  "category": "Web Development",
  "featured": true,
  "stars": 15,
  "forks": 3,
  "language": "JavaScript"
}
```

## 🎨 Customization

### Profile Information
Update the fallback data in `backend/index.js` to customize your profile information:
- Personal details
- Skills and expertise levels
- Social media links

### Project Categories
The application supports these categories:
- Web Development
- Backend Development  
- Data Science
- Other

### Styling
The frontend uses Tailwind CSS. Customize the design by:
- Modifying component styles
- Updating the Tailwind configuration
- Adding custom CSS classes

### Components
Add new sections by creating components in `frontend/src/components/Sections/`

## 📱 Available Scripts

### Backend
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🚀 Deployment

### Backend Deployment
1. Set production environment variables
2. Deploy to your preferred hosting service (Heroku, Railway, DigitalOcean, etc.)
3. Update CORS settings for your domain

### Frontend Deployment
1. Build the frontend: `npm run build`
2. Deploy the `dist` folder to your static hosting service (Netlify, Vercel, etc.)
3. Update API URL in environment variables

## 📊 API Endpoints

### Core Endpoints
- `GET /api/health` - Health check
- `GET /api/profile` - User profile data
- `GET /api/projects` - Project portfolio
- `GET /api/skills` - Skills and expertise
- `POST /api/contact` - Contact form submission

### Resume
- `GET /api/resume` - View resume (PDF)
- `GET /api/resume/download` - Download resume

## 🔒 Security Features

- CORS configuration
- Environment variable protection
- Input validation
- Error handling
- Rate limiting ready

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Siddhesh Chavan**
- GitHub: [@Pseudo-Sid26](https://github.com/Pseudo-Sid26)
- LinkedIn: [Siddhesh Chavan](https://www.linkedin.com/in/siddhesh-chavan-a196a5252/)

---

Made with ❤️ using React, TypeScript, and Express.js
