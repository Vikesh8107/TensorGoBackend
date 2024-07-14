# TensorGo Backend

This is the backend for the TensorGo application. It handles API requests, database interactions, and other server-side logic. This project is built using Node.js, Express, Firebase Firestore, and integrates with Zapier for webhooks.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Running the Server](#running-the-server)
5. [Project Structure](#project-structure)
6. [API Endpoints](#api-endpoints)
7. [Development](#development)
8. [Deployment](#deployment)
9. [Contributing](#contributing)
10. [License](#license)

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 14.x or higher)
- [npm](https://www.npmjs.com/) (version 6.x or higher)
- [Firebase CLI](https://firebase.google.com/docs/cli) (for deploying to Firebase)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Vikesh8107/TensorGoBackend.git
    cd TensorGoBackend
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

## Configuration

1. **Firebase Service Account**: Place your Firebase service account key JSON file in the root of the project and name it `firebaseServiceAccountKey.json`.

2. **Environment Variables**: Create a `.env` file in the root of the project and add the following variables:
    ```env
    PORT=5000
    FIREBASE_PROJECT_ID=your-firebase-project-id
    FIREBASE_PRIVATE_KEY="your-firebase-private-key"
    FIREBASE_CLIENT_EMAIL=your-firebase-client-email
    ZAPIER_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/your-webhook-id/
    ```

## Running the Server

To start the server in development mode, run:
```bash
npm start
```

The server will start on the port specified in the `.env` file (default is 5000). You can access it at `http://localhost:5000`.

## Project Structure

```
tensorgo-backend/
├── controllers/
│   └── invoiceController.js  # Controller for handling invoice-related logic
├── routes/
│   └── invoiceRoutes.js      # Routes for invoice endpoints
├── .env                      # Environment variables
├── app.js                    # Main app configuration
├── index.js                 # Server entry point
├── firebaseServiceAccountKey.json  # Firebase service account key
├── package.json              # Project metadata and dependencies
└── README.md                 # Project documentation
```

## API Endpoints

### Get Invoices
- **URL**: `/api/invoices`
- **Method**: `GET`
- **Query Parameters**: `userId` (required)
- **Description**: Retrieves all invoices for a specified user and sends them to the Zapier webhook.

**Example Request**:
```bash
curl -X GET "http://localhost:5000/api/invoices?userId=user123"
```

**Example Response**:
```json
[
    {
        "id": "invoice1",
        "amount": 1000,
        "dueDate": "2024-07-01T00:00:00.000Z",
        "email": "example@example.com",
        "recipient": "Recipient Name",
        "recipientAccNo": "123456789",
        "recipientBankName": "Bank Name"
    }
]
```

## Development

For development, you can use Nodemon to automatically restart the server when code changes:
```bash
npm run dev
```

## Deployment

To deploy the backend to a cloud service (e.g., Firebase, Heroku), follow the specific deployment instructions for your chosen service.

### Firebase

1. Install Firebase CLI:
    ```bash
    npm install -g firebase-tools
    ```

2. Login to Firebase:
    ```bash
    firebase login
    ```

3. Initialize Firebase in your project directory:
    ```bash
    firebase init
    ```

4. Deploy the functions:
    ```bash
    firebase deploy --only functions
    ```

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
