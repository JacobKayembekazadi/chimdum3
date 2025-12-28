import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import wellnessHandler from './api/wellness'; // TSX will resolve .ts

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/', (req, res) => {
    res.json({
        status: 'ok',
        message: 'Chimdum Wellness API is running',
        timestamp: new Date().toISOString()
    });
});

// Wellness API route
app.all('/api/wellness', async (req, res) => {
    try {
        // Convert Express request to Web API Request
        const url = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
        const headers = new Headers();
        Object.entries(req.headers).forEach(([key, value]) => {
            if (value) headers.set(key, Array.isArray(value) ? value.join(', ') : value);
        });

        const webRequest = new Request(url, {
            method: req.method,
            headers,
            body: req.method !== 'GET' && req.method !== 'HEAD' ? JSON.stringify(req.body) : undefined,
        });

        // Call the wellness handler
        const response = await wellnessHandler(webRequest);

        // Convert Web API Response to Express response
        const responseBody = await response.text();
        res.status(response.status);
        response.headers.forEach((value, key) => {
            res.setHeader(key, value);
        });
        res.send(responseBody);
    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`
╔═══════════════════════════════════════════════════════════════════╗
║              🚀 Chimdum Wellness API Server                       ║
╠═══════════════════════════════════════════════════════════════════╣
║  Server running on port: ${PORT}                                    ║
║  Health check:          http://localhost:${PORT}/                   ║
║  API endpoint:          http://localhost:${PORT}/api/wellness       ║
║                                                                   ║
║  Environment:                                                     ║
║    DEEPSEEK_API_KEY:    ${process.env.DEEPSEEK_API_KEY ? '✅ Set' : '❌ Not set'}                     ║
║    GEMINI_API_KEY:      ${process.env.GEMINI_API_KEY ? '✅ Set' : '❌ Not set'}                     ║
║                                                                   ║
║  Press Ctrl+C to stop                                             ║
╚═══════════════════════════════════════════════════════════════════╝
  `);
});
