# Carefinder

Carefinder is a web application that helps users find hospitals, view patient reviews, and explore hospital services. It offers a user-friendly interface with features like search, filters, pagination, and user authentication. Admin users can also create hospital entries using markdown.

## Table of Contents

- [Carefinder](#carefinder)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Usage](#usage)
    - [Running the Application](#running-the-application)
    - [Admin Features](#admin-features)
    - [User Features](#user-features)
  - [Project Structure](#project-structure)
  - [Configuration](#configuration)
  - [Deployment](#deployment)

## Features

- **Search and Filter Hospitals**: Users can search for hospitals by name and filter results by location and type.
- **User Authentication**: Secure authentication for users and admins using Firebase.
- **Hospital Entries**: Admins can add hospital entries with markdown support, allowing rich text formatting.
- **Pagination**: Efficient data display with pagination to handle large datasets.
- **Responsive Design**: Optimized for mobile, tablet, and desktop devices.
- **Sharing Options**: Users can share hospital lists via email, social media, or direct links.

## Getting Started

### Prerequisites

- **Node.js**: Make sure you have Node.js installed on your machine.
- **npm or Yarn**: The project uses npm for package management. Ensure npm or Yarn is installed.
- **Firebase**: Set up a Firebase project for authentication and Firestore.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/carefinder.git
   cd carefinder
2. **Install dependencies**:
   ```bash
   npm install
3. **Run the application
   ```bash
   npm run dev

## Usage

### Running the Application

- **Development**: Run `npm run dev` to start the application in development mode.
- **Production**: Run `npm run build` to build the application for production.

### Admin Features

- **Add Hospital**: Admins can add new hospital entries using a markdown editor.

### User Features

- **Search Hospitals**: Use the search bar to find hospitals by name.
- **Filter Hospitals**: Filter hospitals by location and type.
- **View Hospital Details**: View Hospital Details.

## Project Structure

- **/src**: Contains the source code for the application.
  - **/components**: Reusable components like Navbar, Footer, etc.
  - **/pages**: Different pages like Home, Login, SignUp, etc.
  - **/hooks**: Custom hooks like `useHospitalData`.
  - **/utils**: Utility functions and helpers.
  - **/assets**: Images, icons, and other static assets.

## Configuration

- **Firebase**: Configure Firebase in `src/firebaseConfig.ts` for authentication and Firestore.

## Deployment

- **Vercel/Netlify**: The project can be deployed to platforms like Vercel or Netlify. Ensure environment variables are configured in the deployment settings.