# DCS Express.js Demo

A simple Express.js demonstration project showcasing basic web server functionality with routing and middleware.

## Description

This is a Node.js Express.js demo application that demonstrates:
- Basic Express.js server setup
- Route handling (GET requests)
- Middleware implementation
- JSON and URL-encoded body parsing
- API routing structure

## Prerequisites

Before you begin, ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (version 12.0 or higher)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/amitparmar-msn/dcs-express-js-demo.git
   ```

2. Navigate to the project directory:
   ```bash
   cd dcs-express-js-demo
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

## Usage

### Starting the Server

To start the development server, run:

```bash
node index.js
```

The server will start on port 5000. You should see the server running and ready to handle requests.

### Available Routes

- **GET /** - Returns "Hello World! From DCS!"
- **GET /home** - Returns "Welcome to Home page!"
- **API Routes** - Available under `/api` prefix with custom middleware

### Testing the Application

You can test the application using:

1. **Browser**: Open your browser and navigate to:
   - `http://localhost:5000/` - Home route
   - `http://localhost:5000/home` - Home page route

2. **cURL**: Use command line to test:
   ```bash
   curl http://localhost:5000/
   curl http://localhost:5000/home
   ```

3. **Postman**: Import the endpoints and test various HTTP methods

## Project Structure

```
dcs-express-js-demo/
├── index.js           # Main application file
├── package.json       # Project dependencies and scripts
├── routers/          # Router modules
│   ├── index.js      # Main router
│   └── student.js    # Student-related routes
├── .gitignore        # Git ignore rules
└── README.md         # Project documentation
```

## Features

- **Express.js Framework**: Fast, unopinionated web framework for Node.js
- **Middleware Support**: Custom logging and response middleware
- **Body Parsing**: Support for JSON and URL-encoded data
- **Modular Routing**: Organized route structure
- **Request Logging**: Automatic logging of incoming requests

## Scripts

- `npm test` - Run tests (currently placeholder)

## Development

To modify the application:

1. Edit `index.js` for main server configuration
2. Add new routes in the `routers/` directory
3. Restart the server to see changes

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test your changes
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Author

Created for DCS (Demo/Educational purposes)

## Support

For questions or issues, please open an issue in the GitHub repository.