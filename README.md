# Zero Code Academy - Build Real Websites with AI 🚀

**Live Website**: [https://zerocodeacademy.vercel.app/](https://zerocodeacademy.vercel.app/)

Zero Code Academy is a cutting-edge EdTech platform designed to teach users how to build professional websites without writing a single line of code, leveraging the power of AI. The platform features a robust Student Dashboard, a comprehensive Admin Panel, and a fully functional PWA with System-level Push Notifications.

---

## 🌟 Key Features

### 📱 **Progressive Web App (PWA) & Push Notifications**
- **Installable App**: Can be installed on Android, iOS, and Desktop as a native-like app.
- **Offline Capabilities**: Works offline with cached assets using Service Workers.
- **System Push Notifications**: Users receive notifications in their device's notification bar (even when the app is closed) for:
    - New Modules 📚
    - Routine Updates 🗓️
    - Admin Announcements 🔔
- **Smart Subscription**: Custom `PushSubscriptionWrapper` automatically handles permission requests.

### 🎓 **Student Dashboard**
- **Personalized Learning Path**: Dynamic timeline showing module start/end dates based on enrollment.
- **Progress Tracking**: Visual progress bars, completed modules count, and points system.
- **Interactive Modules**: Detailed module pages with video players, resource links, and topic breakdowns.
- **Live Class Routine**: Sidebar widget showing upcoming classes with direct Zoom/Meet links.
- **Profile Management**: Profile image upload, password management, and session control.

### 🛠️ **Admin Panel**
- **Content Management System (CMS)**:
    - **Modules Manager**: Create/Edit/Delete course modules.
    - **Routine Manager**: Manage live class schedules (Date, Time, Platform).
    - **Demo Manager**: Upload and manage demo videos for the landing page.
    - **Pricing & Coupons**: Manage pricing packages and create dynamic discount coupons.
    - **Features Manager**: Update "What you will learn" section dynamically.
- **User Management**: View enrolled students (more features coming soon).
- **Notification Center**: Send manual push notifications to all users instantly.
- **Security**: Mock Authentication (can be replaced with Supabase/Firebase).

### 🎨 **Frontend & UX**
- **Premium UI/UX**: Built with **shadcn/ui**, **Tailwind CSS**, and **Framer Motion** for smooth animations.
- **Responsive Design**: Fully optimized for Mobile, Tablet, and Desktop.
- **Modern Landing Page**:
    - Hero Section with premium avatars (Dicebear).
    - Dynamic Pricing Section.
    - Interactive "How It Works" & Features grid.
    - SEO Optimized (Meta tags, JSON-LD, Sitemap).

### ⚙️ **Backend & Architecture**
- **MERN Stack**:
    - **Frontend**: React (Vite), TypeScript.
    - **Backend**: Node.js, Express.js.
    - **Database**: MongoDB Atlas (Cloud).
- **Deployment**:
    - **Frontend**: Vercel.
    - **Backend**: Render.com.
- **Security**: Environment variables for sensitive keys (VAPID, MongoURI).

---

## 🛠️ Technologies Used

- **Core**: [React 18](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/)
- **State Management**: [TanStack Query (React Query)](https://tanstack.com/query/latest)
- **Backend API**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **PWA & Notifications**: `vite-plugin-pwa`, `web-push`, Service Workers
- **Icons**: Lucide React
- **Forms**: React Hook Form, Zod
- **SEO**: React Helmet Async

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas URI
- VAPID Keys (for Push Notifications)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/royestheking-a11y/Zero-Code-Academy-Build-Real-Websites-with-AI-.git
   cd Zero-Code-Academy-Build-Real-Websites-with-AI-
   ```

2. **Install Dependencies**
   ```bash
   # Install Root/Frontend dependencies
   npm install

   # Install Server dependencies
   cd server
   npm install
   cd ..
   ```

3. **Configure Environment Variables**
   
   Create a `.env` file in the **root** directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   VITE_VAPID_PUBLIC_KEY=your_public_key_here
   ```

   Create a `.env` file in the **server** directory:
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   VAPID_PUBLIC_KEY=your_public_key_here
   VAPID_PRIVATE_KEY=your_private_key_here
   ```

4. **Run the Project**
   
   **Start Backend**:
   ```bash
   cd server
   node index.js
   ```

   **Start Frontend** (in a new terminal):
   ```bash
   npm run dev
   ```

5. **Open in Browser**
   Visit `http://localhost:5173` to see the app.

---

## 🤝 Contribution

Feel free to fork this repository and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

---

**Built with ❤️ for the Zero Code Community in Bangladesh.**
