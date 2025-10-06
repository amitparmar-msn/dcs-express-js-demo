const express = require('express');
const app = express();
const port = 5000;

/* Middleware */
// Add body parsing middleware
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use((req, res, next)=>{
    console.log(`${req.method} request for '${req.url}' - ${JSON.stringify(req.body)}`);
    next();
})

/* Requests */
app.get('/', (req, res) => {
    res.send('Hello World! From DCS!');
});
app.get('/home', (req, res) => {
    res.send('Welcome to Home page!');
});

app.use("/api", (req, res, next) => {
  // This middleware executes after the route handler 
  console.log('Response middleware executing...'); 
  next(); 
}); 
/* Common Response Middleware for all API routes */
app.use('/api', (req, res, next) => {
    // Store original response methods
    const originalJson = res.json;
    const originalSend = res.send;
    const originalEnd = res.end;
    
    // Add custom response methods
    res.apiSuccess = function(data, message = 'Success', statusCode = 200) {
        const response = {
            success: true,
            message,
            data,
            meta: {
                timestamp: new Date().toISOString(),
                path: req.originalUrl,
                method: req.method,
                statusCode,
                requestId: Math.random().toString(36).substr(2, 9)
            }
        };
        
        console.log('✅ API Success Response:', {
            path: req.originalUrl,
            method: req.method,
            statusCode,
            message
        });
        
        return res.status(statusCode).json(response);
    };
    
    res.apiError = function(message = 'Internal Server Error', statusCode = 500, errorDetails = null) {
        const response = {
            success: false,
            message,
            error: errorDetails,
            meta: {
                timestamp: new Date().toISOString(),
                path: req.originalUrl,
                method: req.method,
                statusCode,
                requestId: Math.random().toString(36).substr(2, 9)
            }
        };
        
        console.log('❌ API Error Response:', {
            path: req.originalUrl,
            method: req.method,
            statusCode,
            message
        });
        
        return res.status(statusCode).json(response);
    };
    
    // Override json method to add logging and metadata
    res.json = function(data) {
        // Add metadata if it's an object and doesn't already have meta
        if (data && typeof data === 'object' && !data.meta) {
            data.meta = {
                timestamp: new Date().toISOString(),
                path: req.originalUrl,
                method: req.method,
                statusCode: res.statusCode || 200,
                requestId: Math.random().toString(36).substr(2, 9)
            };
        }
        
        console.log('📤 API Response:', {
            path: req.originalUrl,
            method: req.method,
            statusCode: res.statusCode || 200,
            hasData: !!data
        });
        
        return originalJson.call(this, data);
    };
    
    // Override send method
    res.send = function(data) {
        console.log('📤 API Response (send):', {
            path: req.originalUrl,
            method: req.method,
            statusCode: res.statusCode || 200,
            dataType: typeof data
        });
        
        return originalSend.call(this, data);
    };
    
    // Override end method
    res.end = function(data) {
        if (data) {
            console.log('📤 API Response (end):', {
                path: req.originalUrl,
                method: req.method,
                statusCode: res.statusCode || 200,
                hasData: !!data
            });
        }
        
        return originalEnd.call(this, data);
    };
    
    next();
});

/* Import and Use Router */
const router = require('./routers');
app.use('/api', router);

/* Server */
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});