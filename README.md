# MERN STACK SOCIAL MEDIA

This project is a dashboard application built using the MERN stack (MongoDB, Express, React, Node.js). It includes user authentication and profile management, allowing users to sign up, log in, and manage their profiles. Users can participate in a community forum by creating posts and commenting on others' posts. A score tracker system rewards users with points for their activities, displayed on their profiles. Users can share their achievements on social media through integrated sharing buttons. The application features a responsive UI, ensuring accessibility and usability across various devices.

## Technologies used:
1. MERN stack is used for building the website.
2. 'cors' is used in the backend and 'axios' in the frontend to connect with  each other.
3. Bootstrap is used for designing the frontend.
4. Cloudinary is used to store the images in the cloud.

## Steps to run the project locally:
1. Fork the repository.
2. Clone it to the local environment.
3. Install dependencies for the backend by going to 'backend' directory and running: `npm install`.
4. Install dependencies for the frontend by going to 'frontend' directory and running: `npm install`.
5. Create a 'config' folder in the 'backend' directory and create a 'config.env' file in it.
6. There, write these variables and assign values to them: PORT=4000, MONGO_URI, DATABASE_NAME, FRONTEND_URL, JWT_SECRET_KEY, JWT_EXPIRES, COOKIE_EXPIRE, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_SECRET and CLOUDINARY_API_KEY.
7. Keep the variable names same, otherwise, you have to change the main code base.
8. Here, I have assumed that the frontend is running on default port, i.e., 5173 and backend is running on port  4000. If this is not the case for you, then change FRONTEND_URL in backend and the links in the frontend accordingly.
9. Go the the backend and frontend directories and run `npm run dev` to start them in respective ports.

## Feactures:
1. **User Authentication and Profile Management:**
   - Users are able to sign up, log in, and log out.
   - Each user have a profile page displaying their information and scores.

2. **Community Forum:**
   - Users are able to create posts and comment on others' posts.
   - Posts display the author, timestamp, and content.
   - Comments display the author, timestamp, and content.

3. **Score Tracker:**
   - Users have a score tracker on their profile.
   - Implemented a system for users to earn points through predefined actions (e.g., posting, commenting).

4. **Sharing Achievements:**
   - Users are able to share their scores and achievements on social media platforms.
   - Implemented social media sharing buttons on the user's profile page.

5. **Responsive UI:**
   - The application is responsive and works well on different screen sizes.

Give a good read to the project and try out on local environment. Hope you like it!! 
