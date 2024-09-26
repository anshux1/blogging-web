# BlogVibe - Blogging Website

This application allows users to create, delete, and view blogs from other users. It is built with modern technologies to ensure a smooth user experience and efficient performance.

## Tech Stack

- **Frontend**: Next.js
- **Backend**: Prisma, NextAuth
- **Database**: PostgreSQL
- **UI Components**: shadcn

## Features
- **User Authentication**: Secure sign-in and sign-up with NextAuth.
- **Create Blogs**: Users can write their own blog posts.
- **Delete Blogs**: Users can remove their posts.
- **View Blogs**: Explore blogs from other users.

## Getting Started

Follow these instructions to get a copy of the project running on your local machine.

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:

   ```bash
   git clone git@github.com:anshux1/blogging-web.git
   
2. Navigate to the project directory:
    
   ```bash
   cd blogging-web
   
3. Set up your environment variables:
   
   Create a .env file in the root of the project with the following variables:
   ```bash
   DATABASE_URL=postgresql://user:password@localhost:5432
   NEXTAUTH_SECRET=your-secret-key

4. Install the dependencies:
    ```bash
    yarn install
    
5. Run database migrations:
    ```bash
    npx prisma migrate dev --name init

6. Running the App
   To start the app locally, run the following command:
    ```bash
    yarn dev

This will start the development server on http://localhost:3000.
