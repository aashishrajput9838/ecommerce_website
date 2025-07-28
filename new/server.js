// server.js
const http = require('http');
const fs = require('fs');
const path = require('path');
const MathRoutes = require('./Routes/mathRoutes'); // Importing the routes

const server = http.createServer((req, res) => {
    // Handle math operations
    if (req.method === 'POST' && (req.url === '/sum' || req.url === '/subtract' || req.url === '/multiply')) {
        MathRoutes.handleMathRequest(req, res);
        return;
    }

    // Serve image file if requested
    if (req.method === 'GET' && req.url === '/assets/images/img1.jpg') {
        const imgPath = path.join(__dirname, 'assets/images/img1.jpg');
        fs.readFile(imgPath, (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end('Image not found');
            } else {
                res.writeHead(200, { 'Content-Type': 'image/jpeg' });
                res.end(data);
            }
        });
        return;
    }

    // Serve main HTML
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>MY FIRST NODE PAGE</title>
    <style>
        body {
            font-family: 'Segoe UI', Arial, sans-serif;
            background: #f4f6fb;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 40px auto;
            background: #fff;
            box-shadow: 0 4px 16px rgba(0,0,0,0.08);
            border-radius: 12px;
            padding: 32px 24px;
        }
        h1 {
            color: #2d3e50;
            font-size: 2.2rem;
            margin-bottom: 12px;
        }
        img {
            max-width: 120px;
            display: block;
            margin-bottom: 18px;
        }
        h2 {
            color: #4a90e2;
            margin-top: 32px;
        }
        p {
            color: #444;
            font-size: 1.1rem;
        }
        .sum-box {
            background: #eaf6ff;
            border-radius: 8px;
            padding: 18px;
            margin-top: 18px;
            font-size: 1.2rem;
            color: #3178c6;
            text-align: center;
            box-shadow: 0 2px 8px rgba(74,144,226,0.08);
        }
        .input-row {
            display: flex;
            gap: 12px;
            margin-top: 24px;
            justify-content: center;
        }
        .button-row {
            display: flex;
            gap: 12px;
            margin-top: 16px;
            justify-content: center;
        }
        input[type="number"] {
            padding: 8px;
            border-radius: 6px;
            border: 1px solid #bcdffb;
            font-size: 1rem;
            width: 80px;
        }
        button {
            padding: 8px 18px;
            border-radius: 6px;
            border: none;
            background: #4a90e2;
            color: #fff;
            font-size: 1rem;
            cursor: pointer;
            transition: background 0.2s;
        }
        button:hover {
            background: #3178c6;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to My First Node.js Page</h1>
        <img src="/assets/images/img1.jpg" alt="aspirinxar_logo">
        <p>This is a simple Node.js server rendering HTML content.</p>
        <h2>Mathematical Operations</h2>
        <p>Enter two numbers and choose an operation using our organized folder structure:</p>
        <div class="input-row">
            <input type="number" id="num1" placeholder="First number" />
            <input type="number" id="num2" placeholder="Second number" />
        </div>
        <div class="button-row">
            <button onclick="calculateSum()">Add</button>
            <button onclick="calculateSubtract()">Subtract</button>
            <button onclick="calculateMultiply()">Multiply</button>
        </div>
        <div class="sum-box" id="result" style="display:none;"></div>
    </div>
    <script>
        function calculateSum() {
            performOperation('/sum', 'sum', 'sum of');
        }
        
        function calculateSubtract() {
            performOperation('/subtract', 'difference', 'difference of');
        }
        
        function calculateMultiply() {
            performOperation('/multiply', 'product', 'product of');
        }
        
        function performOperation(endpoint, resultKey, operationText) {
            const a = document.getElementById('num1').value;
            const b = document.getElementById('num2').value;
            
            fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ a, b })
            })
            .then(res => res.json())
            .then(data => {
                const resultBox = document.getElementById('result');
                if (data.success) {
                    resultBox.style.display = 'block';
                    resultBox.innerHTML = \`<span style="font-weight:bold;">The \${operationText} \${a} and \${b} is:</span> <span>\${data[resultKey]}</span>\`;
                } else {
                    resultBox.style.display = 'block';
                    resultBox.innerHTML = \`<span style='color:red;'>\${data.error}</span>\`;
                }
            })
            .catch(error => {
                const resultBox = document.getElementById('result');
                resultBox.style.display = 'block';
                resultBox.innerHTML = \`<span style='color:red;'>Error: \${error.message}</span>\`;
            });
        }
    </script>
</body>
</html>`);
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
}); 