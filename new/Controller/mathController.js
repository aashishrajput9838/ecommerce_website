// Controller/mathController.js

const MathService = require('../Services/mathService');

class MathController {
    // Handle addition request
    static async addNumbers(req, res) {
        try {
            const { a, b } = req.body;
            
            // Use the service to perform the calculation
            const result = MathService.add(a, b);
            
            // Return success response
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                success: true,
                sum: result,
                message: `Successfully calculated sum of ${a} and ${b}`
            }));
            
        } catch (error) {
            // Return error response
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                success: false,
                error: error.message,
                message: 'Failed to calculate sum'
            }));
        }
    }

    // Handle subtraction request
    static async subtractNumbers(req, res) {
        try {
            const { a, b } = req.body;
            const result = MathService.subtract(a, b);
            
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                success: true,
                difference: result,
                message: `Successfully calculated difference of ${a} and ${b}`
            }));
            
        } catch (error) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                success: false,
                error: error.message,
                message: 'Failed to calculate difference'
            }));
        }
    }

    // Handle multiplication request
    static async multiplyNumbers(req, res) {
        try {
            const { a, b } = req.body;
            const result = MathService.multiply(a, b);
            
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                success: true,
                product: result,
                message: `Successfully calculated product of ${a} and ${b}`
            }));
            
        } catch (error) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                success: false,
                error: error.message,
                message: 'Failed to calculate product'
            }));
        }
    }
}

module.exports = MathController; 