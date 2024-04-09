# React Native User Management Application

This React Native application was developed for managing users. It is currently configured to run exclusively on iOS devices. The application utilizes the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/) to fetch and manage user data.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- [Node.js](https://nodejs.org/en/download/) is installed on your system
- You have a macOS machine with [Xcode](https://developer.apple.com/xcode/) installed for iOS development
- You have followed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions up to the "Creating a new application" step

## Installing the Application

Follow these steps to install the application:

1. Clone the repository
2. Navigate to the project directory
3. Install the dependencies:

\`\`\`bash
npm install
cd ios
pod install
\`\`\`

## Running the Application

To run the application on iOS, follow these steps:

1. Start the Metro Server:

\`\`\`bash
npm start
\`\`\`

2. In a new terminal, start your iOS app:

\`\`\`bash
npm run ios
\`\`\`

If everything is set up correctly, you should see your new app running in the iOS Simulator shortly.

## Application Features

The application provides the following features:

- View a list of users
- View detailed information about a user
- Update selected user
- Delete selected user
- Add a new user

## API Usage

This application uses the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/) to fetch and manage user data. The API is a free-to-use fake REST API for testing and prototyping. Please note that as the JSONPlaceholder API does not contain some of the fields and properties listed as requirements in the test assignment (e.g., user role), substitutions have been made with fields and properties included in the JSONPlaceholder API response.

## Contributing to the Application

To contribute to the application, follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b <branch_name>`
3. Make your changes and commit them: `git commit -m '<commit_message>'`
4. Push to the original branch: `git push origin <project_name>/<location>`
5. Create the pull request

## Contact

If you want to contact me, you can reach me at `<your_email@domain.com>`.

## Notice

Please note that this application is currently not configured for Android devices.
