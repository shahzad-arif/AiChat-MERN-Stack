# Ai_chat-React-Node-

This is a simple chat bot application built with React and Node.js, utilizing Google Generative AI to generate content based on user prompts. The frontend is styled using Tailwind CSS and the code highlighting is done using `react-syntax-highlighter`.

## Features

- **User Prompts**: Enter prompts to generate AI-written content.
- **Syntax Highlighting**: Displays code snippets with syntax highlighting.
- **Formatted Text**: Properly formats and highlights text based on asterisks.

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- Google Generative AI API Key

### Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/react-node-chat-bot.git
    cd react-node-chat-bot
    ```

2. **Install dependencies**:
    ```bash
    # For backend
    cd backend
    npm install

    # For frontend
    cd ../frontend
    npm install
    ```

3. **Set up environment variables**:
    - Create a `.env` file in the `backend` directory and add your Google Generative AI API Key:
      ```env
      PORT=4000
      GOOGLE_API=your_google_api_key
      ```

### Running the Application

1. **Start the backend server**:
    ```bash
    cd backend
    npm start
    ```

2. **Start the frontend development server**:
    ```bash
    cd frontend
    npm start
    ```

3. **Access the application**:
    Open your browser and go to `http://localhost:3000`.

## Usage

1. Enter your prompt in the input field and click "Generate".
2. The generated content will be displayed below, with proper formatting and syntax highlighting for code snippets.

## Technologies Used

- **Frontend**: React, Tailwind CSS, react-syntax-highlighter, react-query, axios
- **Backend**: Node.js, Express, Google Generative AI
- **Styling**: Tailwind CSS

## Project Structure

```markdown
react-node-chat-bot/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.js
│   ├── package.json
│   ├── tailwind.config.js
├── backend/
│   ├── index.js
│   ├── package.json
│   ├── .env
├── README.md
