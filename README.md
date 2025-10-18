## 🌍Miles n Memories -  Travel Journal Frontend (React + Vite)

A responsive and modern **React + Vite** frontend for the **Travel Journal App** — an application where users can log their adventures, upload photos, and relive their favorite travel memories.  

---

## 🧰 Tech Stack

| Category | Technology |
|-----------|-------------|
| **Framework** | React (Vite) |
| **Routing** | React Router DOM |
| **State Management** | Context API |
| **useState/useEffect/useMemo** | React hooks for state and side effects       |
| **HTTP Client** | Axios |
| **Cookies Handling** | react-cookie |
| **Date Library** | Day.js |
| **Icons** | react-icons |
| **Styling** | CSS Modules / Custom CSS |

---

## ⚙️ Installation & Setup

### 1️⃣ Initialize a new Vite React app
```bash
npm create vite@latest .
```

Choose:

Framework: React

Variant: JavaScript

2️⃣ Install Dependencies
``` bash
npm install
npm i react-router-dom
npm i react-cookie axios 
npm install dayjs@latest
npm install react-icons
```

🚀 Run the Frontend

Start the development server:
``` bash
npm run dev
```
Open your browser at [http://localhost:5173](http://localhost:5173)

## 🗂️ Project Structure

![alt text](<Screenshot 2025-10-17 224159.png>)



---
## 📁 Features
### 📄 Pages Overview
| Page                | Description                                                 |
| ------------------- | ----------------------------------------------------------- |
| **Login.jsx**       | User login form with authentication                         |
| **Signup.jsx**      | Registration form for new users                             |
| **Dashboard.jsx**   | Displays all user stories in grid or list format            |
| **AddStory.jsx**    | Form for creating a new story (with image upload)           |
| **StoryDetail.jsx** | Shows detailed view of a single story                       |
| **EditStory.jsx**   | (Component & Page) Edits an existing story’s text and image |
| **Missing.jsx**     | Fallback “404” page for invalid routes                      |


### 🧩 Components Overview
| Component               | Description                                                          |
| ----------------------- | -------------------------------------------------------------------- |
| **Navbar.jsx**          | Displays navigation links (home, dashboard, add story, logout, etc.) |
| **EditStory.jsx**       | Form to edit an existing story and update image                      |
| **StoryCard.jsx**       | Reusable component displaying each user story on the dashboard       |
| **ProtectedRoutes.jsx** | Restricts access to certain routes until the user is logged in       |

### 🧠 Context Overview
| Context              | Description                                                                   |
| -------------------- | ----------------------------------------------------------------------------- |
| **AuthContext.jsx**  | Manages global authentication state — sets or removes JWT token in cookies    |
| **UserContext.jsx**  | Provides user information (`_id`, `name`, etc.) globally across components    |
| **StoryContext.jsx** | Manages current story data and provides methods to update or reset story info |

### 🧭 Routing Structure
| Path             | Component   | Access    |
| ---------------- | ----------- | --------- |
| `/`              | Login       | Public    |
| `/signup`        | Signup      | Public    |
| `/dashboard`     | Dashboard   | Protected |
| `/addStory`      | AddStory    | Protected |
| `/storydetail/:id`     | StoryDetail | Protected |
| `*`              | Missing     | Public    |

### 🔐 Authentication Flow

User logs in using credentials (email, password) → token is received from backend.
or
USer signs up for a new account using name, email, password→ token is received from backend.

Token is stored in cookies via react-cookie.

ProtectedRoutes checks for valid token before accessing secured pages.

Logout removes token from cookies and resets user state.

### 🧁 Features
| Feature                   | Description                                           |
| ------------------------- | ----------------------------------------------------- |
| 🔑 **JWT Authentication** | Secure login/logout using backend token               |
| 🧭 **Protected Routing**  | Certain routes accessible only when logged in         |
| 📖 **Story Management**   | Add, edit, view, and delete travel stories            |
| 🖼️ **Image Upload**      | Upload and display travel images (via backend Multer) |
| 📆 **Date Formatting**    | Cleanly display visit dates using Day.js              |
| 🧠 **Global Context**     | Manage user and story state globally                  |
| 💻 **Responsive UI**      | Works across all screen sizes                         |
| 🎨 **Custom Styling**     | Built with modular CSS and modern color palette       |


## 🧪 Testing the 404 Page

Visit a non-existent route like:

```
http://localhost:5173/some-random-page
```

You should see the custom "Page Not Found" screen.

---

### 🙌 Acknowledgements

🎨 Color Palette Inspiration: Coolors.co

🧭 API & Backend: Express + MongoDB
💡 Icons: React Icons

🔗 Run Both Servers Together


### Project requirements checklist

- ✅4 pages (react-router-dom)
- ✅Manage state using ReactHooks or other state MGMT tools (useState, useReducer, redux, useEffect)
- ✅Full C.R.U.D capabilities from your DB
- Documentation:
- ✅Well documented readme
- ✅Full Commit history, 25 commits- ish
- Presentation
- Extra Credit:
    - ✅using JIRA 1%    
    - ✅authentication 2%
