# Shaked Aharon Assignment - Stock Tracker Application

## Overview
This is a full-stack application that allows users to explore and track stock information. Users can browse a list of stocks, save their favorite stocks for easy access, and view detailed information about each stock. The application is built using React for the frontend and NestJS for the backend, integrated with a database to manage stock data and user preferences.

## Features
- **Browse Stock List**: Users can view a list of available stocks.
- **Save to Favorites**: Users can save their favorite stocks to a favorites list for quick access.
- **View Stock Details**: Users can view detailed information about each stock, including price, market cap, sector, and more.

## Technologies Used
- **Frontend**: React with Ant Design for UI components and MobX for state management.
- **Backend**: NestJS for building the API with MongoDB for data storage.
- **Styling**: Tailwind CSS and Ant Design for consistent and responsive UI.

## Getting Started

### Prerequisites
Make sure you have the following installed:
- **MongoDB**
- **Node.js**: Version 14 or later
- **npm**: Version 6 or later

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/stock-tracker-app.git
   cd stock-tracker-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

### Running the Application

You will need to run both the frontend and backend separately:

1. **Run the frontend**:
   ```bash
   npm run start:client
    ```

2. **Run the backend**:
   ```bash
   npm run start:server
    ```