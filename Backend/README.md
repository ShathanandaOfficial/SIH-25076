# Farming Advisory System - Backend

A Node.js Express backend API for the Farming Advisory System that provides agricultural consultancy services to farmers.

## 🏗️ Project Structure

```
backend/
├── src/
│   ├── routes/              # Route definitions and Express routers
│   │   ├── chat.js          # Advisory query routes
│   │   ├── escalation.js    # Officer escalation routes
│   │   ├── images.js        # Multimodal/image upload routes
│   │   ├── users.js         # Auth and farmer profile routes
│   │   └── index.js         # Main router for mounting route modules
│   ├── models/              # Database models (Mongoose schemas)
│   │   ├── user.js          # User model (farmers, officers, admins)
│   │   ├── query.js         # Query/consultation model
│   │   ├── image.js         # Image upload model
│   │   ├── feedback.js      # Feedback and rating model
│   │   └── ...
│   ├── middlewares/         # Authentication, error handling, validation middleware
│   │   ├── auth.js          # JWT authentication middleware
│   │   ├── validation.js    # Request validation middleware
│   │   └── errorHandler.js  # Global error handling
│   ├── utils/               # Helper functions and utilities
│   │   ├── auth.js          # JWT token utilities
│   │   ├── response.js      # API response formatters
│   │   └── logger.js        # Logging utility
│   ├── config/              # Database and environment configurations
│   │   ├── database.js      # MongoDB connection setup
│   │   └── index.js         # Environment configuration
│   ├── services/            # Business logic and service layer
│   │   ├── authService.js   # Authentication services
│   │   └── queryService.js  # Query management services
│   ├── jobs/                # Scheduled/background jobs
│   │   ├── queryCleanup.js  # Cleanup old resolved queries
│   │   └── notifications.js # Query notification system
│   ├── main.js              # Main application setup and configuration
│   └── server.js            # Server bootstrap and startup
├── uploads/                 # File upload directory (created automatically)
├── logs/                    # Application logs (created automatically)
├── .env                     # Environment variables
├── .gitignore              # Git ignore file
├── package.json            # NPM dependencies and scripts
└── README.md               # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

### Installation

1. **Clone the repository and navigate to backend folder**
   ```bash
   cd Backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your configuration:
   ```env
   MONGODB_URI=mongodb://localhost:27017/farming-advisory
   JWT_SECRET=your-super-secret-jwt-key
   PORT=5000
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system.

5. **Run the application**
   ```bash
   # Development mode (with nodemon)
   npm run dev
   
   # Production mode
   npm start
   ```

## 📡 API Endpoints

### Authentication Routes (`/api/users`)
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `POST /api/users/logout` - User logout

### Query/Chat Routes (`/api/chat`)
- `GET /api/chat/history` - Get chat history
- `POST /api/chat/message` - Send new message/query

### Image Routes (`/api/images`)
- `POST /api/images/upload` - Upload image
- `GET /api/images/:id` - Get image
- `POST /api/images/analyze` - Analyze image with AI

### Escalation Routes (`/api/escalation`)
- `POST /api/escalation` - Create escalation
- `GET /api/escalation/list` - Get escalations
- `PUT /api/escalation/:id` - Update escalation status

### Health Check
- `GET /health` - Server health status

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `HOST` | Server host | localhost |
| `NODE_ENV` | Environment | development |
| `MONGODB_URI` | MongoDB connection string | mongodb://localhost:27017/farming-advisory |
| `JWT_SECRET` | JWT secret key | (required) |
| `JWT_EXPIRES_IN` | JWT expiration time | 7d |
| `CORS_ORIGIN` | CORS allowed origin | http://localhost:3000 |
| `MAX_FILE_SIZE` | Maximum upload file size | 5242880 (5MB) |

## 🛡️ Security Features

- **Helmet.js** - Security headers
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - API rate limiting
- **JWT Authentication** - Secure token-based auth
- **Password Hashing** - bcrypt password hashing
- **Input Validation** - express-validator middleware

## 📊 Database Models

### User Model
- Authentication and profile management
- Role-based access (farmer, officer, admin)
- Farm details and contact information

### Query Model
- Advisory queries from farmers
- Status tracking and priority management
- Response and escalation handling

### Image Model
- File upload metadata
- AI analysis results
- Query association

### Feedback Model
- User feedback and ratings
- Service quality metrics

## 🔄 Background Jobs

- **Query Cleanup** - Removes old resolved queries (daily at 2 AM)
- **Notifications** - Checks for overdue and high-priority queries (hourly)

## 📝 Scripts

```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm test           # Run tests
npm run test:watch # Run tests in watch mode
npm run lint       # Lint code
npm run lint:fix   # Fix linting issues
```

## 🐛 Error Handling

The application includes comprehensive error handling:
- Global error middleware
- Validation error formatting
- MongoDB error handling
- JWT error handling
- 404 error handling

## 📈 Logging

- Development: Console logging with colors
- Production: File-based logging with rotation
- Structured logging with metadata

## 🚀 Deployment

1. Set `NODE_ENV=production`
2. Update environment variables for production
3. Ensure MongoDB is accessible
4. Run `npm start`

## 🤝 Contributing

1. Follow the existing code structure
2. Add proper error handling
3. Include input validation
4. Write tests for new features
5. Update documentation

## 📄 License

This project is licensed under the MIT License.