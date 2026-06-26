import { Post } from "../models/post.model.js";

//create a post
const createPost = async (req, res) => {
  try {
    console.log("request reached createPost");
    console.log(req.body);

    const { name, description, age } = req.body;

    if (!name || !description || !age) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const post = await Post.create({ name, description, age });

    res.status(201).json({
      message: "Post created successfully",
      post
    });
  } catch (error) {
    console.log("createPost error:", error);
    res.status(500).json({
      message: "Internal server error",
      error
    });
  }
};

const getPosts = async (req,res) => {
    try{
        const posts = await Post.find();
        res.status(200).json(posts)

    } catch(error){
         res.status(500).json({
      message: "Internal server error",error
    });
}
}

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json({
      message: 'Post updated successfully',
      post: updatedPost
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal server error',
      error: error.message
    });
  } 
};

const deletePost = async (req, res) => {
  try {
    const deleted = await Post.findByIdAndDelete(req.params.id);
    if(!deleted) return res.status(404).json({
      message:"Post not found"
    });

    res.status(200).json({
      message:"Post deleted successfully"
    })
  }catch(error){
    console.error(error);
    res.status(500).json({
      message: 'Internal server error',
      error: error.message
    });
  }
}
export{
    createPost,
    getPosts,
    updatePost,
    deletePost
};

