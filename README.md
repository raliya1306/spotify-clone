# Spotify clone

As a frequent user of the spotify web player I decided to give myself a challenge and replicate the core functionalities of the website/app.This clone has been implemented using Express.js and Node.js to build RESTFUL API endpoints to manage audio, artist and user data. The API utilizes cloudinary for audio and image storage and a MongoDB database to store artist, album, song and user data. The frontend user interface has been built using React.js, Tailwind CSS and TypeScript and integrated seamlessly with the backend. 

## Features
- Secure user authentication using clerk
- Secure admin verification to access admin dashboard 
- Verified admin can upload new songs and albums
- Verified admin can delete songs and albums
- Users can play, pause, skip and adjust the volume of the tracks

## Technologies used
The following technologies have been used to develop this spotify clone:
- Node.js
- React.js
- Express.js
- MongoDB
- Tailwind CSS
- Typescript
- Cloudinary
- Clerk
- Zustand
- Shadcn

## Installation
- Clone this repository to your local machine
```sh
git clone https://github.com/raliya1306/spotify-clone.git
```

- Navigate to the project directory
```sh
cd spotify-clone
```

- Install client-side dependencies
```sh
cd frontend
npm install
```

- Install server-side dependencies
```sh
cd backend
npm install
```

- Set up environment variables.

Create a .env file in the backend folder and add the following:
```sh
PORT=your_port
FRONTEND_URI=your_frontend_uri
MONGODB_URI=your_mongodb_uri
ADMIN_EMAIL=your_admin_email
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLOUDINARY_API_KEY=your-cloudinary_api_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
NODE_ENV=development
CLERK_PUBLISHABLE_KEY=your_clerk_plublishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```
Create a .env.local file in the frontend folder and add the following:
```sh
VITE_CLERK_PUBLISHABLE_KEY=your_vite_clerk_publishable_key
VITE_SERVER_APP_URI=your_server_uri
```

- Run the backend
```sh
cd backend
npm run dev
```

- Open another terminal and run the frontend
```sh
cd frontend
npm run dev
```

The application should be running at your frontend uri