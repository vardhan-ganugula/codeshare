# TextShare ~ Codeshare

TextShare is a collaborative text sharing platform that enables users to create, share, and collaboratively edit text pages in real time. The platform is designed for seamless collaboration, allowing multiple users to work together on the same page, and also supports organizing pages into groups for better management.

## Features

- **Create and Share Pages:** Users can create text pages and generate a unique code for each page. Share the code with others to grant access.
- **Real-Time Collaboration:** Built with Socket.io, TextShare allows multiple users to edit the same page simultaneously, with changes reflected in real time for all participants.
- **Update and Edit:** Anyone with the page code can view and update the content, promoting open collaboration.
- **Group Management:** Users can create groups, add multiple pages to a group, and manage them collectively for organized collaboration.
- **Modern UI:** Clean and intuitive interface for easy navigation and editing.

## Getting Started

### Prerequisites
- Node.js (v16 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/vardhan-ganugula/codeshare.git
   cd codeshare
   ```
2. **Install dependencies:**
   ```sh
   npm install
   cd backend && npm install
   ```
3. **Start the backend server:**
   ```sh
   node index.js
   ```
4. **Start the frontend (in a new terminal):**
   ```sh
   npm run dev
   ```

## Project Structure

- `src/` - Frontend React application
- `backend/` - Node.js/Express backend with Socket.io
- `public/` - Static assets


## Technologies Used
- React
- Node.js & Express
- Socket.io (for real-time collaboration)
- MongoDB (for data storage)
- Tailwind CSS (for styling)
- Vite (for frontend build)

## Usage
- Create a new text page and share the generated code with collaborators.
- Edit the page in real time with others.
- Organize pages into groups for better management.

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](LICENSE)

