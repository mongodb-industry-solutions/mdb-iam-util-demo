# MongoDB IAM Utilities Demo Application

## 📌 Overview

This demo application showcases the integration and practical use of the `@mongodb-solution-assurance/iam-util` package. It aims to enhance the developer experience by providing streamlined utilities for Identity and Access Management (IAM) processes in MongoDB integrations. The primary focus of this demo is **IAM Rectification**, a critical security measure ensuring proper role-based access control.

[![Ask DeepWiki for further understanding.](https://deepwiki.com/badge.svg)](https://deepwiki.com/mongodb-industry-solutions/mdb-iam-util-demo)

## 🎯 Objectives

- Demonstrate how to use MongoDB IAM utility libraries for **rectification processes**.
- Highlight the importance of **IAM security** in MongoDB integrations.
- Serve as a **reference for development teams** to improve their implementations.
- Promote the adoption of `@mongodb-solution-assurance/iam-util` across multiple platforms.

### 🔑 Importance of IAM Rectification & SCRAM Authentication

IAM Rectification plays a vital role in ensuring that user accounts and permissions remain properly configured, reducing security risks such as unauthorized access or privilege escalation. This demo primarily applies to MongoDB integrations utilizing **SCRAM (Salted Challenge Response Authentication Mechanism)** authentication, which is a widely used and secure authentication method in MongoDB.

However, SCRAM authentication alone is not sufficient to guarantee optimal security. It is recommended to consider alternative, more robust authentication mechanisms such as:

- **LDAP (Lightweight Directory Access Protocol)** – Centralized authentication for enterprise environments.
- **X.509 Certificates** – Public-key-based authentication for enhanced security.
- **Kerberos Authentication** – Secure network authentication for large-scale environments.

For teams using SCRAM authentication, implementing **IAM Rectification** as demonstrated in this demo ensures that users have the correct permissions and do not pose a security risk. While this demo presents a user interface for illustrative purposes, in real-world integrations, this process can be executed in the background. The system can then **alert users** when a connection string lacks a Full Match or, in critical cases, prevent further configuration to enforce security policies.

By using this reference implementation, development teams can adopt best practices to enhance the security and quality of their MongoDB-based solutions. The demo serves as a **guiding example** to encourage developers to evolve their products with a focus on **security, maintainability, and performance**.

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
   mongodb+srv://tony:*********@solutionsassurance.n0kts.mongodb.net/?retryWrites=true&w=majority&appName=MyLocalApp
   ```
2. **Profile Permission List** – A list of expected permissions for a MongoDB custom profile, e.g.:
   ```json
   ["search", "read", "find", "update", "remove", "collMod"]
   ```
3. **Action Button** – Initiates the validation process.

### 🔄 Process Flow

🔹 **Role Creation & Permission Best Practices**

For each integration, **custom roles must be created** to ensure minimal required permissions. Each role should:

- Specify **only** the required actions for the integration.
- Define **specific databases** where these permissions apply.
- **Include** the special permission `read@admin` to allow permission verification.

Without `read@admin`, the IAM Rectification process will fail, and the system will not return data. It is critical to be meticulous when defining roles to avoid excessive privileges or missing essential ones. Below is an example of a custom role with a specific set of permissions for the database called `security`

![](./frontend/rsc/screenshot-roles.jpg)


🔹 Once the specific permissions for an integration have been defined, including the additional permissions for the role rectification process, the system proceeds to evaluate the specified **Connection String** and **Profile Permission List**, then categorizes results into three columns:
  1. ✅ **Valid Permissions** – Found in the connection string and match the required ones.
  2. ❌ **Missing Permissions** – Required permissions that are absent.
  3. ⚠️ **Extra Permissions** – Permissions that exist but should not be present.

### 🛑 Match Status Screens

- 🔴 **No Match** – None of the required permissions are found.
    ![](./frontend/rsc/screenshot-error.jpg)
- 🟠 **Partial Match** – Some permissions are missing or extra ones exist.
    ![](./frontend/rsc/screenshot-warning.jpg)
- 🟢 **Full Match** – All required permissions are present, and no additional permissions exist.
    ![](./frontend/rsc/screenshot-success.jpg)

### 🔐 Security Best Practices

- **Principle of Least Privilege** – Users should only have the exact permissions needed for their role.
- **Risk of Over-Privileged Accounts** – Extra permissions can lead to unauthorized access or data breaches.
- **Risk of Under-Privileged Accounts** – Missing permissions can disrupt operations and integrations.

Ensuring a **Full Match** is crucial for **secure and stable** MongoDB integrations. Overprivileged accounts introduce security risks, while underprivileged accounts may cause operational failures. IAM Rectification helps developers maintain **correct and secure** user roles.

### 🚀 API Service Request Example

The application calls an API service with:

```json
{
    "connection":"mongodb+srv://tony:*********@solutionsassurance.n0kts.mongodb.net/?retryWrites=true&w=majority&appName=MyLocalApp",
    "permissions": ["search", "read", "find", "update", "remove", "collMod"]
}
```

The API responds with:

```json
{
    "extra": [],
    "missing": [
        "search",
        "read",
        "find",
        "update",
        "remove",
        "collMod"
    ],
    "present": []
}
```

This allows users to assess and correct IAM configurations efficiently.

## 🔗 Available Plugins
- [MongoDB IAM Utilities for Node.Js](https://github.com/mongodb-industry-solutions/mdb-iam-util-node), get more details also at [NPM package link](https://www.npmjs.com/package/@mongodb-solution-assurance/iam-util)
- [MongoDB IAM Utilities for Python](https://github.com/mongodb-industry-solutions/mdb-iam-util-python), get more details also at [PYPI package link](https://pypi.org/project/mongodb-solution-assurance-iam-util)
- Additional plugins for Java, .NET, and Go (Coming Soon)

## ⚙️ Installation & Local Setup
Using Docker and Docker Compose:
```sh
docker-compose up
```

Using Local environment with NPM and Node.js:
1. **Backend Setup**
    ```sh
    cd backend-node
    npm install
    npm run dev
    ```

2. **Frontend Setup**
    ```sh
    cd frontend
    npm install
    npm run dev
    ```
3. Open `http://localhost:5174/`

## 🏆 Conclusion

This demo is a stepping stone for teams integrating MongoDB with **strong IAM practices**. By following this reference, teams can enhance their security posture, optimize their implementations, and ensure compliance with best security practices.

🚀 **Next Steps:** Expand this demo to support **Java, .NET, and Go**, making IAM utilities more accessible across platforms.
