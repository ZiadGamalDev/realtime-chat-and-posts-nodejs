import Post from '../../db/models/post.model.js';

class PostController {
    async all(req, res) {
        try {
            const { search } = req.query;

            const query = search
                ? { $or: [{ title: { $regex: search, $options: 'i' } }, { body: { $regex: search, $options: 'i' } }] }
                : {};

            const posts = await Post.find(query);

            res.json(posts);
        } catch (err) {
            res.status(500).json({ message: 'Error fetching posts', error: err.message });
        }
    }

    async one(req, res) {
        try {
            const { id } = req.params;

            const post = await Post.findById(id);

            res.json(post);
        } catch (err) {
            res.status(500).json({ message: 'Error fetching post', error: err.message });
        }
    }

    async create(req, res) {
        try {
            const { title, body } = req.body;

            const newPost = await Post.create({ title, body });

            res.status(201).json(newPost);
        } catch (err) {
            res.status(500).json({ message: 'Error creating post', error: err.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { title, body } = req.body;

            const updatedPost = await Post.findByIdAndUpdate(id, { title, body }, { new: true });

            res.json(updatedPost);
        } catch (err) {
            res.status(500).json({ message: 'Error updating post', error: err.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;

            await Post.findByIdAndDelete(id);

            res.json({ message: 'Post deleted successfully' });
        } catch (err) {
            res.status(500).json({ message: 'Error deleting post', error: err.message });
        }
    }
}

export default new PostController();
