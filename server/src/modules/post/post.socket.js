import axios from 'axios';

const postSocket = (socket, io) => {
    socket.on('createPost', async (postData) => {
        try {
            await axios.post(`${process.env.APP_BASE_URL}/posts`, postData);
            io.emit('postCreated');
        } catch (err) {
            console.error('Error creating post:', err.response?.data || err.message);
            socket.emit('error', { message: 'Failed to create post' });
        }
    });

    socket.on('deletePost', async (postId) => {
        try {
            await axios.delete(`${process.env.APP_BASE_URL}/posts/${postId}`);
            io.emit('postDeleted');
        } catch (err) {
            console.error('Error deleting post:', err.response?.data || err.message);
            socket.emit('error', { message: 'Failed to delete post' });
        }
    });

    socket.on('filterPosts', async (search) => {
        try {
            const response = await axios.get(`${process.env.APP_BASE_URL}/posts?search=${search}`);
            io.emit('postsFiltered', response.data);
        } catch (err) {
            console.error('Error searching posts:', err.response?.data || err.message);
            socket.emit('error', { message: 'Failed to search posts' });
        }
    });
};

export default postSocket;
