import express from 'express';
import PostController from './post.controller.js';
import PostValidation from './post.validation.js';

const postRoutes = express.Router();

postRoutes.get('/', PostController.all);
postRoutes.get('/:id', PostValidation.exists, PostController.one);
postRoutes.post('/', PostValidation.create, PostController.create);
postRoutes.put('/:id', PostValidation.update, PostValidation.exists, PostController.update);
postRoutes.delete('/:id', PostValidation.exists, PostController.delete);

export default postRoutes;
