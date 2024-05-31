# CityCare

CityCare is a comprehensive platform designed to empower citizens by providing them with a voice and an effective mechanism to contribute to their community's well-being. It encourages civic participation and ensures urban issues are reported and addressed in a timely manner. CityCare leverages technology to foster a collaborative approach to improve the quality of urban life and governance.

## Table of Contents

1. [Motivation](#motivation)
2. [Features](#features)
3. [Screenshots](#screenshots)
4. [Technologies Used](#technologies-used)
5. [Installation](#installation)
6. [Usage](#usage)
7. [Contributing](#contributing)
8. [License](#license)
9. [Contact](#contact)

## Motivation

CityCare stems from the pressing need to empower citizens with a voice and an effective mechanism to contribute to their community's well-being. By providing a user-friendly, accessible platform, CityCare aims to encourage civic participation, ensuring that urban issues are not only reported but also addressed in a timely manner. The project is driven by the belief that a collaborative approach, leveraging technology, can significantly improve the quality of urban life and governance.

## Features

1. **Comprehensive Issue Reporting and Tracking**: Users can report new complaints, complete with type, description, location, and multimedia evidence. Each complaint can be tracked through its lifecycle from submission to resolution.
2. **Community Engagement**: The platform enables citizens to view, upvote, downvote, or mark their issues as similar to existing complaints, fostering a community-driven approach to issue prioritization.
3. **Alerts and Notifications**: Through in-app notifications and Firebase Cloud Messaging, users receive updates on complaint status, new issues in their locality, government actions, and more.
4. **Interactive Map Visualization**: A dynamic map displays issues within the user's locality, enhanced with symbols for immediate recognition of problem types, alongside analytical reports.
5. **Customizable Alert Preferences**: Users can tailor alert preferences to receive notifications that match their interests and concerns.
6. **Complaint Monitoring Website**: A web application for government officials to see all complaints of their respective categories, with locality-based filtering of complaints and an alert management system.

## App Screenshots


<p align="center">
  <img src="https://github.com/Ajitkumar-25/CityCare/assets/98700726/1e031eec-bc74-4207-8c16-8e3a9b649e1b" width="30%" height="500px" />
  <img src="https://github.com/Ajitkumar-25/CityCare/assets/98700726/5b4c4c1a-14a9-4963-bd51-62355b44fb38" width="30%" height="500px" />
  <img src="https://github.com/Ajitkumar-25/CityCare/assets/98700726/662725d5-11e9-461d-ba21-e62355d48293" width="30%" height="500px" />
</p>
<p align="center">
  <img src="https://github.com/Ajitkumar-25/CityCare/assets/98700726/d9f8140e-7749-40d6-81b8-46bf5a5e99cb" width="30%" height="500px" />
  <img src="https://github.com/Ajitkumar-25/CityCare/assets/98700726/cc2d165f-9248-4a92-8368-9178bb1e8841" width="30%" height="500px" />
  <img src="https://github.com/Ajitkumar-25/CityCare/assets/98700726/5e5d3736-179f-4754-a8fc-eba48af3d240" width="30%" height="500px" />
</p>

## Website Screenshots

<p align="center">
  <img src="https://github.com/Ajitkumar-25/CityCare/assets/98700726/9deb0bc5-ae45-42f3-a7d5-293a5796f700" width="45%" height="200px" />
  <img src="https://github.com/Ajitkumar-25/CityCare/assets/98700726/5af8043c-6d44-4cad-bcdb-5f30e5a0c520" width="45%" height="200px" />
</p>
<p align="center">
  <img src="https://github.com/Ajitkumar-25/CityCare/assets/98700726/c57d2074-b221-4f9d-a649-91fa7c46d081" width="45%" height="200px" />
  <img src="https://github.com/Ajitkumar-25/CityCare/assets/98700726/ca162f32-eedb-4771-86e2-855c9de55e21" width="45%" height="200px" />
</p>
<p align="center">
  <img src="https://github.com/Ajitkumar-25/CityCare/assets/98700726/5d797448-de91-4f47-baa0-cf22df81b627" width="45%" height="200px" />
  <img src="https://github.com/Ajitkumar-25/CityCare/assets/98700726/580663b2-6ddd-4024-85d0-433bd8ab4c5f" width="45%" height="200px" />
</p>
<p align="center">
  <img src="https://github.com/Ajitkumar-25/CityCare/assets/98700726/fed1e4e7-15a9-4924-8603-190e4d142e78" width="45%" height="200px" />
  <img src="https://github.com/Ajitkumar-25/CityCare/assets/98700726/6e7ca61e-3eef-4396-bd6e-6da115c30f02" width="45%" height="200px" />
</p>

## Technologies Used

- **Backend**: Node.js, Express, Firebase for alerts and security.
- **Frontend**: 
  - Mobile Applications: React-Native
  - Web Interface: React, supplemented with HTML, CSS, and JavaScript, TailwindCSS for responsive UI.
- **Databases**: MongoDB
- **Additional Technologies**: 
  - Multer for media uploads
  - Google APIs for map integration

## Installation

To set up the CityCare project locally, follow these steps:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/CityCare.git
    cd CityCare
    ```

2. **Install backend dependencies**:
    ```bash
    cd backend
    npm install
    ```

3. **Install frontend dependencies**:
    - **For mobile applications**:
        ```bash
        cd app
        npm install
        ```
    - **For web interface**:
        ```bash
        cd dashboard
        npm install
        ```

4. **Set up environment variables**:
    - Create a `.env` file in the `backend` directory and add your environment variables (e.g., database URL, Firebase configuration).

5. **Run the backend server**:
    ```bash
    cd backend
    nodemon app
    ```

6. **Run the mobile application**:
    ```bash
    cd app
    npm run android
    ```

7. **Run the web application**:
    ```bash
    cd dashboard
    npm start
    ```

## Usage

### Reporting Issues

- Users can report new complaints using the mobile or web application, providing details such as type, description, location, and multimedia evidence.
- Track the status of your complaints through the application's dashboard.

### Community Engagement

- View and interact with other users' complaints by upvoting, downvoting, or marking issues as similar.
- Participate in community-driven issue prioritization.

### Alerts and Notifications

- Receive updates on complaint status, new issues in your locality, and government actions through in-app notifications and Firebase Cloud Messaging.

### Interactive Map Visualization

- Use the dynamic map to view reported issues within your locality, with symbols for immediate recognition of problem types.
- Access analytical reports for a comprehensive overview of urban issues.


## Contributing

We welcome contributions to CityCare! To contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit them (`git commit -m 'Add your feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Create a pull request.


## Contact

For any questions or suggestions, feel free to contact us at [kajit0408@gmail.com](mailto:kajit0408@gmail.com).

---

Thank you for using CityCare! Together, we can improve the quality of urban life and governance.
