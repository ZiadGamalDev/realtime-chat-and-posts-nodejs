import Post from '../../db/models/post.model.js';

class PostValidation {
    async create(req, res, next) {
        const { title, body } = req.body;

        if (!title || !body) {
            return res.status(400).json({ message: 'Please fill in all fields' });
        }

        next();
    }

    async update(req, res, next) {
        const { title, body } = req.body;

        if (!title && !body) {
            return res.status(400).json({ message: 'Please fill in at least one field' });
        }

        next();
    }

    async exists(req, res, next) {
        try {
            const { id } = req.params;

            const post = await Post.findById(id);

            if (!post) {
                return res.status(404).json({ message: 'Post not found' });
            }

            next();
        } catch (err) {
            return false;
        }
    }
}

export default new PostValidation();
