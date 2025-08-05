# Todo List App

A modern todo list application built with React, TypeScript, Firebase, and Tailwind CSS. Features user authentication and real-time data synchronization.

## Features

- 🔐 User authentication (sign up, sign in, sign out)
- ✅ Create, read, update, and delete todos
- ✏️ In-line editing of todos
- 🔄 Real-time synchronization across devices
- 📱 Responsive design
- 🎨 Modern UI with Tailwind CSS
- 🔥 Firebase Firestore for data persistence
- 🚀 Deployed on Vercel

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **Deployment**: Vercel
- **Routing**: React Router DOM

## Getting Started

### Prerequisites

- Node.js 16 or higher
- npm or yarn
- Firebase project

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd todo-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Firebase:
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication with Email/Password provider
   - Create a Firestore database
   - Copy your Firebase configuration

4. Create environment file:
   ```bash
   cp .env.example .env.local
   ```

5. Update `.env.local` with your Firebase configuration:
   ```
   REACT_APP_FIREBASE_API_KEY=your_api_key_here
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789
   REACT_APP_FIREBASE_APP_ID=1:123456789:web:abcdef123456
   ```

6. Start the development server:
   ```bash
   npm start
   ```

The app will be available at `http://localhost:3000`.

## Firebase Setup

### Authentication
1. Go to Firebase Console > Authentication > Sign-in method
2. Enable "Email/Password" provider
3. Optionally configure authorized domains

### Firestore Database
1. Go to Firebase Console > Firestore Database
2. Create database in test mode (or production mode with proper security rules)
3. Collection structure:
   ```
   todos/
   ├── {todoId}/
   │   ├── text: string
   │   ├── completed: boolean
   │   ├── createdAt: timestamp
   │   ├── updatedAt: timestamp
   │   └── userId: string
   ```

### Security Rules (Optional)
Update Firestore security rules to ensure users can only access their own todos:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /todos/{todoId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
  }
}
```

## Deployment to Vercel

### Automatic Deployment
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment
1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel --prod
   ```

4. Add environment variables in Vercel dashboard or via CLI:
   ```bash
   vercel env add REACT_APP_FIREBASE_API_KEY
   ```

## Project Structure

```
src/
├── components/
│   ├── Login.tsx          # Login component
│   ├── Signup.tsx         # Signup component
│   ├── TodoList.tsx       # Main todo list component
│   ├── TodoItem.tsx       # Individual todo item
│   └── ProtectedRoute.tsx # Route protection
├── contexts/
│   └── AuthContext.tsx    # Authentication context
├── config/
│   └── firebase.ts        # Firebase configuration
├── types/
│   └── todo.ts            # TypeScript interfaces
├── App.tsx                # Main app component
└── index.tsx              # App entry point
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (irreversible)

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
