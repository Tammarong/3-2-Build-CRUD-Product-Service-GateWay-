const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const {createProxyMiddleware} = require('http-proxy-middleware');

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

const PORT = process.env.PORT || 3000;

const USER_SERVICE = 'http://localhost:3001';
const PRODUCT_SERVICE = 'http://localhost:3002';

app.get('/health', (req, res) => 
    res.json({ status: 'API Gateway is running',
        service:'API Gateway',
        status: 'running',
        route: {"/api/users": USER_SERVICE, "/api/products": PRODUCT_SERVICE},
        timestamp: new Date(), toISOString: new Date().toISOString()
}));

app.use('/api/users', createProxyMiddleware({
    target: USER_SERVICE,
    changeOrigin: true,
    pathRewrite: {'^/api/users': ''}
}));

app.use('/api/products', createProxyMiddleware({
    target: PRODUCT_SERVICE,
    changeOrigin: true,
    pathRewrite: {'^/api/products': ''}
}));

app.use((req, res, next) => res.json({message: 'Route not found in API Gateway'}));

app.listen(PORT, "localhost", () => {
    console.log(`API Gateway running at http://localhost:${PORT}`);
});