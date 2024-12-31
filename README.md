# Full-Stack E-Commerce Application

This is a full-stack e-commerce application built with **Next.js**, **MongoDB** (using **Mongoose** as the ORM), and **Stripe** for payment processing. It features an admin dashboard, email verification, and password reset functionalities using **Mailtrap**. The project also integrates **AWS S3** for image storage and **Redux** for state management. Animations are handled using **Tailwind CSS** and **Framer Motion**.

## Features

- **User Authentication**: Email verification and password reset using Mailtrap.
- **Admin Dashboard**: Admin users can manage products and view order history.
- **Payment Integration**: Payment is handled via Stripe.
- **AWS S3 Integration**: Used for image storage.
- **State Management**: Redux for global state management.
- **Animations**: Tailwind CSS animations and Framer Motion for smooth transitions.
- **Responsive Design**: Built with Tailwind CSS for a mobile-first approach.
- **Middleware**: Admin redirection based on user role using middleware.

## Technologies Used

- **Frontend**:
  - Next.js (React framework)
  - Tailwind CSS
  - MUI Material UI
  - Framer Motion
  - Redux for state management

- **Backend**:
  - Node.js
  - MongoDB with Mongoose
  - JWT Authentication
  - Stripe API for payment processing
  - Mailtrap for email verification and password reset

- **Deployment**:
  - AWS EC2 for hosting

## Installation

### Prerequisites

Make sure you have the following installed:

- **Node.js**: [Download and install Node.js](https://nodejs.org/)
- **MongoDB**: [Set up MongoDB locally](https://www.mongodb.com/docs/manual/installation/) or use MongoDB Atlas for cloud hosting.
- **Stripe Account**: [Create a Stripe account](https://stripe.com/)
- **AWS Account**: [Create an AWS account](https://aws.amazon.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-project-name.git

