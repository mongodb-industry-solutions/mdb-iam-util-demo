# MongoDB IAM Utilities Demo Application

## 📌 Overview
This demo application showcases the integration and practical use of the `@mongodb-solution-assurance/iam-util` package. It aims to enhance the developer experience by providing streamlined utilities for Identity and Access Management (IAM) processes in MongoDB integrations. The primary focus of this demo is **IAM Rectification**, a critical security measure ensuring proper role-based access control.

By using this reference implementation, development teams can adopt best practices to enhance the security and quality of their MongoDB-based solutions. The demo serves as a **guiding example** to encourage developers to evolve their products with a focus on **security, maintainability, and performance**.

## 🎯 Objectives
- Demonstrate how to use MongoDB IAM utility libraries for **rectification processes**.
- Highlight the importance of **IAM security** in MongoDB integrations.
- Serve as a **reference for development teams** to improve their implementations.
- Promote the adoption of `@mongodb-solution-assurance/iam-util` across multiple platforms.

## 🏗️ Project Structure
The demo consists of a backend service and a frontend application:

```
MDB-IAM-UTIL-DEMO/
├── backend-node/  # REST API using @mongodb-solution-assurance/iam-util
│   ├── src/controllers/iam.ts
│   ├── src/models/rectification.ts
│   ├── src/routes/iam.ts
│   ├── src/services/iam.ts  # IAM rectification logic
│   ├── src/index.ts
│   ├── package.json
│
├── frontend/  # Web app with Vite, React, and Fetch API
│   ├── index.html
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   ├── src/App.tsx
│   ├── src/components/
│   ├── src/services/iam.service.ts  # API interactions
│   ├── src/types/
```

🚀 **Future Expansion:** Support for Python, Java, .NET, Go, and more.

## 🔍 Application Features
The application provides a **permission validation tool** for MongoDB profiles. Users input:
1. **Connection String** – A text field where the user provides a MongoDB connection string, e.g.:
   ```
   mongodb+srv://tony:passwordone@solutionsassurance.n0kts.mongodb.net/?retryWrites=true&w=majority&appName=MyLocalApp
   ```
2. **Profile Permission List** – A list of expected permissions for a MongoDB custom profile, e.g.:
   ```json
   ["search", "read", "find", "update", "remove", "collMod"]
   ```
3. **Action Button** – Initiates the validation process.

### 🔄 Process Flow
- The system evaluates the specified **Connection String** and **Profile Permission List**, then categorizes results into three columns:
  1. ✅ **Valid Permissions** – Found in the connection string and match the required ones.
  2. ❌ **Missing Permissions** – Required permissions that are absent.
  3. ⚠️ **Extra Permissions** – Permissions that exist but should not be present.

### 🛑 Match Status Screens
- 🔴 **No Match** – None of the required permissions are found.
    ![](./frontend/rsc/screenshot-error.jpg)
- 🟠 **Partial Match** – Some permissions are missing or extra ones exist.
    ![](./frontend/rsc/screenshot-warning.jpg)
- 🟢 **Full Match** – All required permissions are present, and no additional permissions exist.

### 🔐 Security Best Practices
- **Principle of Least Privilege** – Users should only have the exact permissions needed for their role.
- **Risk of Over-Privileged Accounts** – Extra permissions can lead to unauthorized access or data breaches.
- **Risk of Under-Privileged Accounts** – Missing permissions can disrupt operations and integrations.

Ensuring a **Full Match** is crucial for **secure and stable** MongoDB integrations. Overprivileged accounts introduce security risks, while underprivileged accounts may cause operational failures. IAM Rectification helps developers maintain **correct and secure** user roles.

### 🚀 API Service Request Example
The application calls an API service with:
  ```json
  {
    "connection_string": "sdsdsdsdsd/read-all",
    "profile_actions": ["read", "write", "all"]
  }
  ```
The API responds with:
  ```json
  {
    "missing": ["write"],
    "extra": ["all"],
    "valid": ["read"],
    "status": "partial"
  }
  ```
This allows users to assess and correct IAM configurations efficiently.

## 🛠️ Tech Stack
### **Backend (Node.js)**
- **MongoDB IAM Utility** for role validation
- Express.js for API handling
- TypeScript for maintainability

### **Frontend (React + Vite)**
- **Tailwind CSS** for UI styling
- **Fetch API** for backend communication
- **Component-based architecture** for modularity

## 📖 Documentation & Best Practices
All components are **fully documented using JSDoc**, ensuring easy comprehension and reusability. The focus is on:
- **Performance optimization**
- **Code modularity**
- **Scalability**
- **Security best practices**

## 🏆 Conclusion
This demo is a stepping stone for teams integrating MongoDB with **strong IAM practices**. By following this reference, teams can enhance their security posture, optimize their implementations, and ensure compliance with best security practices.

🚀 **Next Steps:** Expand this demo to support **Python, Java, .NET, and Go**, making IAM utilities more accessible across platforms.


## Plugins  
- [MongoDB IAM Utilities for Node.Js](https://github.com/mongodb-industry-solutions/mdb-iam-util-node)
    - [NPM Link](https://www.npmjs.com/package/@mongodb-solution-assurance/iam-util)
- [MongoDB IAM Utilities for Python](https://github.com/mongodb-industry-solutions/mdb-iam-util-python)