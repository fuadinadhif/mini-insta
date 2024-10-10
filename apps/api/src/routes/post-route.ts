import { Router } from 'express';
import { uploader } from '@/middlewares/uploader-middleware.js';

import {
  createPost,
  deletePost,
  getAllPosts,
} from '@/controllers/post-controller.js';

const router = Router();
const upload = uploader();

router.route('/').post(upload.single('image'), createPost).get(getAllPosts);
router.route('/:id').delete(deletePost);

export default router;
