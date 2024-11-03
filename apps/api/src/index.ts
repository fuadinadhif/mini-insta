import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { getAvailablePort } from '@/utils/get-available-port.js';
// import postRoutes from '@/routes/post-route.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.get('/api/v1', (req, res) => {
  return res
    .status(200)
    .json({ message: 'Ready! Welcome to Mini Insta API v1!' });
});

// app.use('/api/v1/posts', postRoutes);

const PORT = process.env.PORT || 8000;
const availablePort = await getAvailablePort(PORT as number);
app.listen(availablePort, () => {
  console.log(`Server is listening on port: ${availablePort}`);
});
