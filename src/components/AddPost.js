import React, { useState } from "react";
import PostService from "../services/PostService";

const AddPost = () => {
    const initialPostState = {
        id: null,
        title: "",
        description: "",
        published: false
    };
    const [post, setPost] = useState(initialPostState);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setPost({ ...post, [name]: value });
    };

    const savePost = () => {
        let data = {
            title: post.title,
            description: post.description
        };

        PostService.create(data)
            .then(response => {
                setPost({
                    id: response.data.id,
                    title: response.data.title,
                    description: response.data.description,
                    published: response.data.published
                });
                setSubmitted(true);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const newPost = () => {
        setPost(initialPostState);
        setSubmitted(false);
    };

    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>Note created!</h4>
                    <button className="btn btn-success" onClick={newPost}>
                        Add another note
                    </button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            required
                            value={post.title}
                            onChange={handleInputChange}
                            name="title"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            className="form-control"
                            id="description"
                            required
                            value={post.description}
                            onChange={handleInputChange}
                            name="description"
                        />
                    </div>

                    <button onClick={savePost} className="btn btn-success">
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
};

export default AddPost;