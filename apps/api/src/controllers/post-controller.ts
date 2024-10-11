import { Request, Response } from 'express';

import prisma from '@/lib/prisma.js';
import { uploadFile, getFileUrl, deleteFile } from '@/lib/aws-s3.js';
import { generateFileName } from '@/utils/generate-file-name.js';

export async function createPost(req: Request, res: Response) {
  try {
    const file = req.file;
    const caption = req.body.caption;
    const imageName = generateFileName();

    await uploadFile(file?.buffer, imageName, file?.mimetype);
    await prisma.post.create({
      data: {
        imageName,
        caption,
      },
    });

    return res.status(201).json({ response: { ok: true } });
  } catch (error) {
    console.error(error);
  }
}

export async function getAllPosts(req: Request, res: Response) {
  try {
    const posts = await prisma.post.findMany({});
    const postsWithImageUrl = await Promise.all(
      posts.map(async (post) => {
        const imageUrl = await getFileUrl(post.imageName);
        return { ...post, imageUrl };
      }),
    );

    return res
      .status(200)
      .json({ response: { ok: true }, data: postsWithImageUrl });
  } catch (error) {
    console.error(error);
  }
}

export async function deletePost(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const post = await prisma.post.findUnique({ where: { id } });

    await deleteFile(post?.imageName);
    await prisma.post.delete({ where: { id } });

    return res.status(200).json({ response: { ok: true } });
  } catch (error) {
    console.error(error);
  }
}
