// Routes/mathRoutes.js

const MathController = require('../Controller/mathController');

class MathRoutes {
    // Handle all math requests
    static handleMathRequest(req, res) {
        let body = '';
        
        req.on('data', chunk => {
            body += chunk;
        });
        
        req.on('end', async () => {
            try {
                // Parse JSON body
                const parsedBody = JSON.parse(body);
                
                // Create a mock request object with body
                const mockReq = { body: parsedBody };
                
                // Route to appropriate controller method based on URL
                if (req.url === '/sum') {
                    await MathController.addNumbers(mockReq, res);
                } else if (req.url === '/subtract') {
                    await MathController.subtractNumbers(mockReq, res);
                } else if (req.url === '/multiply') {
                    await MathController.multiplyNumbers(mockReq, res);
                } else {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({
                        success: false,
                        error: 'Route not found'
                    }));
                }
                
            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    success: false,
                    error: 'Invalid JSON format',
                    message: 'Request body must be valid JSON'
                }));
            }
        });
    }
}

module.exports = MathRoutes; 