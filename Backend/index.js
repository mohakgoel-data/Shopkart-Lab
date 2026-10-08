import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from "./routes/customer.routes.js"
import productRoutes from "./routes/product.routes.js"
import cookieParser from 'cookie-parser'
import cors from 'cors'

dotenv.config();

const app = express();

mongoose.connect(process.env.dbURL).then(()=>{
    console.log('DB connected')
}).catch((err)=>{
    console.log(err);
})

const PORT = process.env.PORT || 8000;

app.use(cors({
    origin: function(origin, callback) {
        callback(null, true);
    },
    credentials: true
}));

app.use(express.json())
app.use(cookieParser())

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.use('/customers', userRoutes)
app.use('/products', productRoutes)

const server = app.listen(PORT, ()=> {
    console.log(`Server started on port ${PORT}`);
});

server.on('error', (err) => {
    console.error('Server failed to start:', err.message);
});

