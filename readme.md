# TaskFlow API

> A production-inspired backend built with **Node.js**, **TypeScript**, **Express**, **Hexagonal Architecture**, **Domain-Driven Design (DDD)**, **PostgreSQL**, **Prisma**, **JWT Authentication**, **Refresh Token Rotation**, and **Dependency Injection**.

TaskFlow API is more than a CRUD application. It is a backend project designed to simulate the architecture and engineering practices used in modern software companies.

The goal of this project is to demonstrate backend engineering skills by focusing on:

* Clean and maintainable architecture
* Scalability
* Security
* Testability
* Separation of concerns
* Enterprise-level authentication
* Event-driven ready design

---

# Table of Contents

* [Project Vision](#project-vision)
* [Current Features](#current-features)
* [Technology Stack](#technology-stack)
* [Architecture](#architecture)
* [Project Structure](#project-structure)
* [Authentication Flow](#authentication-flow)
* [Why This Architecture?](#why-this-architecture)
* [Getting Started](#getting-started)
* [Environment Variables](#environment-variables)
* [Prisma Commands](#prisma-commands)
* [Development Roadmap](#development-roadmap)
* [Documentation](#documentation)

---

# Project Vision

Instead of building another simple REST API, this project focuses on demonstrating how real-world backend systems are designed.

Throughout the project we progressively introduced architectural improvements instead of implementing everything from the beginning.

Each improvement solves a real problem.

For example:

```text
Simple Login

↓

JWT Authentication

↓

Refresh Tokens

↓

Persistent Sessions

↓

Refresh Token Rotation

↓

Dependency Injection

↓

Role-Based Authorization

↓

(Event Driven Architecture)
```

This evolutionary approach keeps the architecture understandable while allowing the project to scale.

---

# Current Features

### Authentication

* User registration
* User login
* JWT Access Tokens
* Refresh Tokens
* Refresh Token Rotation
* Logout
* Logout All Sessions

---

### Authorization

* Role-Based Access Control (RBAC)
* User Roles
* Authorization middleware

---

### Backend

* Express 5
* TypeScript
* Modular Architecture
* Hexagonal Architecture
* Domain Driven Design
* Dependency Injection (TSyringe)

---

### Database

* PostgreSQL
* Prisma ORM
* Migrations
* Session persistence

---

### Security

* JWT
* Password hashing (bcrypt)
* Helmet
* CORS
* Zod Validation
* Error Handling
* Refresh Token Rotation

---

### Observability

* Pino Logger
* Morgan
* Request Logging
* Centralized Error Handler

---

# Technology Stack

| Category             | Technology |
| -------------------- | ---------- |
| Language             | TypeScript |
| Runtime              | Node.js    |
| Framework            | Express 5  |
| ORM                  | Prisma     |
| Database             | PostgreSQL |
| Authentication       | JWT        |
| Password Hashing     | bcrypt     |
| Validation           | Zod        |
| Dependency Injection | TSyringe   |
| Logging              | Pino       |
| API Docs             | Swagger    |
| Package Manager      | npm        |

---

# Architecture

The application follows a layered architecture inspired by **Hexagonal Architecture** and **Domain-Driven Design**.

```text
                HTTP Request
                     │
                     ▼
              Express Routes
                     │
                     ▼
               Controllers
                     │
                     ▼
                Use Cases
                     │
                     ▼
              Domain Interfaces
                     │
      ┌──────────────┴──────────────┐
      ▼                             ▼
 PostgreSQL                    External Services
   Prisma
```

Each layer has a single responsibility.

Business rules never depend on Express, Prisma, or any external framework.

---

# Project Structure

```text
src/

modules/
    auth/
    users/
    health/

shared/
    config/
    middleware/
    logger/
    responses/
    database/
    container/

prisma/

docs/
```

Every feature is isolated inside its own module.

Each module contains:

* Domain
* Application
* Infrastructure
* Interfaces

This keeps the project highly modular and easy to maintain.

---

# Authentication Flow

The authentication process follows modern best practices.

```text
User Login

↓

Validate Credentials

↓

Generate Access Token

↓

Generate Refresh Token

↓

Create Session

↓

Store Refresh Token in PostgreSQL

↓

Return Tokens
```

When the access token expires:

```text
Refresh Token

↓

Validate JWT

↓

Find Session

↓

Verify Session

↓

Revoke Previous Session

↓

Generate New Tokens

↓

Store New Session

↓

Return New Tokens
```

This process is known as **Refresh Token Rotation** and greatly improves security.

---

# Why This Architecture?

Every architectural decision solves a specific problem.

| Decision               | Problem Solved                           |
| ---------------------- | ---------------------------------------- |
| Hexagonal Architecture | Decouples business logic from frameworks |
| DDD                    | Keeps business rules organized           |
| Dependency Injection   | Improves testability                     |
| Prisma                 | Simplifies database access               |
| PostgreSQL             | Strong relational consistency            |
| JWT                    | Stateless authentication                 |
| Refresh Tokens         | Better user experience                   |
| Session Persistence    | Allows logout and session revocation     |
| Zod                    | Runtime validation                       |
| Pino                   | Structured logging                       |

---

# 🚀 Getting Started

Install dependencies

```bash
npm install
```

Generate Prisma Client

```bash
npx prisma generate
```

Run database migrations

```bash
npx prisma migrate dev
```

Start development server

```bash
npm run dev
```

Build

```bash
npm run build
```

Run production

```bash
npm start
```

---

# Environment Variables

Create a `.env` file.

```env
DATABASE_URL="postgresql://root:root@localhost:5432/taskflow"

JWT_SECRET=your_access_secret

JWT_REFRESH_SECRET=your_refresh_secret

PORT=3000
```

---

# Prisma Commands

Generate Prisma Client

```bash
npx prisma generate
```

Create a migration

```bash
npx prisma migrate dev --name migration_name
```

Deploy migrations

```bash
npx prisma migrate deploy
```

Open Prisma Studio

```bash
npx prisma studio
```

Reset the database

```bash
npx prisma migrate reset
```

---

# Documentation

Additional documentation is available inside the **docs** folder.

```
docs/

01-Architecture.md
02-Authentication.md
03-Database.md
04-DependencyInjection.md
05-Security.md
06-ProjectStructure.md
07-DevelopmentJourney.md
08-Roadmap.md
```

Each document explains one aspect of the project in depth.

---

# Development Roadmap

The current authentication system is complete enough for production-like environments.

The next milestones are:

* Workspace Module
* Projects
* Boards
* Tasks
* Comments
* Attachments
* Activity Logs (MongoDB)
* Kafka Integration
* Notifications
* Docker
* GitHub Actions
* Unit Testing
* Integration Testing
* Metrics
* Prometheus
* Grafana

---

# Main Strengths

* Enterprise-inspired architecture
* Modular design
* Secure authentication
* Refresh Token Rotation
* Persistent Sessions
* Dependency Injection
* Ready for Event-Driven Architecture
* Production-oriented code organization
* Strong separation of concerns
* Easy to test and extend

---

# License

