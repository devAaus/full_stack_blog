import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
   res.send('Comment route');
});

export default router