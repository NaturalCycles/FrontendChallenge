# Countdown App

## Project Overview

The goal of this project was to develop a countdown app using the provided boilerplate and any additional tools as needed. The key requirements were to ensure the app works seamlessly in both portrait and landscape modes, and that the displayed text always fills the entire width of the screen.

The app allows users to specify the end date and name of an event. It then continuously displays the time remaining until the specified end date in the format of Days, Hours(h), Minutes(m), Seconds(s) (e.g., 3 days, 15 h, 20 m, 5 s). The app automatically adjusts the font size to ensure the text fits within a single line, filling the whole width of the screen. 

To enhance the user experience, the event name and end date persist across page reloads.

## Features

- **Responsive Design**: Works in both portrait and landscape modes.
- **Input Fields**: Allows users to input the event title and date.
- **Real-time Countdown**: Displays the time remaining until the specified event date.
- **Persistent Data**: Event title and date are stored in local storage to persist between page reloads.
- **Clear Button**: Clear the event title and date with a button click.
- **Animation**: Smooth label animations for input fields.
- **Error Handling**: Alerts users if a past date is entered or if the date is not available.
- **Unit Tests**: Implemented using Jasmine and Karma.
- **Docker Support**: Dockerfile included for containerization.

## Setup Instructions

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Angular CLI](https://angular.io/cli)
- TypeScript (included with Angular)
- Jasmine (for Testing)
- Karma (for Testing)
- [Docker](https://www.docker.com/) (optional, for containerization)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/NaturalCycles/FrontendChallenge.git

2. Switch to the branch:
    ```sh
    cd FrontendChallenge
    git checkout feature/countdown-app

3. Install dependencies:
    ```sh
    npm install

4. Start the application:
    ```sh
    ng serve

5. Open the browser and naviagte to http://localhost:4200

### Running Tests
    ng test
    

### Docker
Build Docker Image
    ```sh
    docker build -t countdown-app .
    docker run -p 80:80 countdown-app
    ```
### Deployment 
The application is deployed and can be accessed at https://erikkhan.github.io/FrontendChallenge/

### Suggestions for Improvment
- Cross-Browser Testing: Ensure compatibility across different browsers.
- CI/CD Integration: Set up Continuous Integration and Continuous Deployment using GitHub Actions or another CI/CD tool.
- Design Enhancements: Improve visual design and add animations.
- Additional Features: Add features like event reminders, multiple countdowns, notifications when the countdown ends.

