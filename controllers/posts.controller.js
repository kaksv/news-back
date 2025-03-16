const PostModel = require('../models/posts.model');
const cloudinary = require('../config/cloudinary');
const fs = require('fs');

const postsController = {
    async createPost(req, res) {
        try {
            const { cover } = req.files;
            console.log(cover);
            const {title, content, summary} = req.body;
            if (!title || !content || !summary) {
                return res.status(400).json({message: 'Title, content and Summary are required'});
            }

            let coverUrl = '';
            if (cover) {
                const {tempFilePath} = req.files.cover;
                const {secure_url} = await cloudinary.uploader.upload(tempFilePath, {folder: 'mern_blog'});
                coverUrl = secure_url;
                console.log(coverUrl);
                fs.unlinkSync(tempFilePath);
            }

            const post = await PostModel.create({ title, content, summary, cover: coverUrl });
            res.status(200).json(post);

        }catch(error) {
            res.status(500).json({message: error.message });
        }
    },
    async getPosts(req, res) {
        try {
            const posts = await PostModel.find().sort({createdAt: -1});
            res.status(200).json(posts);
        }catch(error) {
            console.log(error);
            res.status(500).json({message: error.message });
            
        }
    }, 
    async getPost(req, res) {
        try {
            const post = await PostModel.findById(req.params.id);
            res.status(200).json(post);
        }catch(error) {
            res.status(500).json({message: error.message });
        }
    },
    async updatePost(req, res) {
        try {
            const post = await PostModel.findByIdAndUpdate(req.params.id, req.body, {new: true});
            res.status(200).json(post);
        }catch(error) {
            res.status(500).json({message: error.message });
        }
    },
    async deletePost(req, res) {
        try {
            await PostModel.findByIdAndDelete(req.params.id);
            res.status(200).send('Deleted');
        }catch(error) {
            res.status(500).json({message: error.message });
        }
    }
};

module.exports = postsController;