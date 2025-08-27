# CCS Forum Web Application

A modern forum web application for the College of Computing Studies (CCS) built with Vue.js, Firebase, and Tailwind CSS.

## 🛠️ Tech Stack

- **Framework**: Vue.js 3 (Composition API)
- **Language**: JavaScript (ES6+)
- **Styling**: Tailwind CSS
- **Animations**: Motion One for Vue
- **Authentication**: Firebase Authentication (Email/Password)
- **Database**: Firebase Firestore
- **Icons**: Heroicons
- **State Management**: Pinia
- **Routing**: Vue Router 4
- **Build Tool**: Vite
- **Deployment**: Vercel

## ✨ Features

### 🔐 Authentication & User Management
- **Email/Password Authentication**: Secure login and registration
- **Course Selection**: Users must select their course during registration (BSCS, BSIT, BSIS, MSIT)
- **Admin Approval System**: New registrations require admin approval before users can post
- **User Profiles**: Display user names and course information
- **Role-based Access**: Admin and user roles with different permissions

### 👨‍💼 Admin Dashboard
- **User Management**: View all users and their status
- **Approval System**: Approve or reject new user registrations
- **Role Management**: Change user roles (user/admin)
- **Admin Creation**: Create new admin accounts
- **Statistics**: View total users, pending approvals, and approved users

### 💬 Forum System
- **Post Creation**: Authenticated and approved users can create posts
- **Comments**: Users can comment on posts
- **Course Display**: Show user's course next to their name
- **Real-time Updates**: Posts and comments update in real-time
- **Approval Status**: Users see their approval status and can only post when approved

### 📱 Responsive Design
- **Mobile-first**: Fully responsive design that works on all devices
- **Modern UI**: Clean, professional interface with smooth animations
- **Accessibility**: Proper semantic HTML and keyboard navigation

### 📄 Static Pages
- **Home**: Welcome page with features overview
- **About**: Information about CCS mission, vision, and programs
- **Faculty**: List of faculty members with roles and contact info
- **Hall of Fame**: Outstanding students and alumni achievements
- **Events**: Upcoming and past CCS events

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Firebase project

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ccs-forum
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Create a Firebase project
   - Enable Authentication (Email/Password)
   - Enable Firestore Database
   - Update the Firebase configuration in `src/firebase/config.js`

4. **Set up Firestore Collections**
   The application uses the following collections:
   - `users`: User profiles with approval status
   - `posts`: Forum posts
   - `comments`: Post comments

5. **Create Initial Admin Account**
   ```bash
   node scripts/create-admin.js
   ```
   This creates an admin account with:
   - Email: `admin@ccs.edu.ph`
   - Password: `admin123456`

6. **Run the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   Navigate to `http://localhost:5173`

## 📊 Firebase Collections Structure

### Users Collection
```javascript
{
  uid: "user_id",
  email: "user@example.com",
  name: "Full Name",
  course: "BSCS", // BSCS, BSIT, BSIS, MSIT
  role: "user", // user or admin
  approved: false, // true/false
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### Posts Collection
```javascript
{
  title: "Post Title",
  content: "Post content...",
  authorId: "user_id",
  authorName: "Author Name",
  authorCourse: "BSCS",
  timestamp: timestamp
}
```

### Comments Collection
```javascript
{
  postId: "post_id",
  comment: "Comment text...",
  authorId: "user_id",
  authorName: "Author Name",
  authorCourse: "BSCS",
  timestamp: timestamp
}
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Firebase Security Rules
Set up Firestore security rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read their own profile
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Posts and comments are readable by all authenticated users
    match /posts/{postId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
    
    match /comments/{commentId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
  }
}
```

## 🚀 Deployment

### Vercel Deployment

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy to Vercel**
   ```bash
   vercel
   ```

3. **Set Environment Variables**
   - Go to your Vercel project dashboard
   - Add the Firebase environment variables
   - Redeploy the application

### Build for Production
```bash
npm run build
```

## 👥 User Roles

### Regular Users
- Can register with course selection
- Must wait for admin approval
- Can view posts and comments when approved
- Can create posts and comments when approved
- See their course displayed next to their name

### Admins
- Can access the admin dashboard
- Can approve/reject new user registrations
- Can change user roles
- Can create new admin accounts
- Can view all users and their status
- Have full access to all features

## 🔒 Security Features

- **Admin Approval**: New users must be approved before posting
- **Role-based Access**: Different permissions for users and admins
- **Firebase Security**: Secure authentication and database rules
- **Input Validation**: Form validation and sanitization
- **Protected Routes**: Admin routes require authentication

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the documentation
- Review Firebase console for errors
- Check browser console for client-side errors

## 🔄 Updates

### Recent Updates
- ✅ Added course selection during registration
- ✅ Implemented admin approval system
- ✅ Created comprehensive admin dashboard
- ✅ Added user role management
- ✅ Enhanced forum with course display
- ✅ Fixed post creation issues
- ✅ Added approval status indicators
