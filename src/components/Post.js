import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import PostService from "../services/PostService";

const Post = props => {
    const { id }= useParams();
    let navigate = useNavigate();

    const initialPostState = {
        id: null,
        title: "",
        description: ""
    };
    const [currentPost, setCurrentPost] = useState(initialPostState);

    const getPost = id => {
        PostService.get(id)
            .then(response => {
                setCurrentPost(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        if (id)
            getPost(id);
    }, [id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentPost({ ...currentPost, [name]: value });
    };

    const updatePublished = status => {
        let data = {
            id: currentPost.id,
            title: currentPost.title,
            description: currentPost.description,
        };

        PostService.update(currentPost.id, data)
            .then(response => {
                setCurrentPost({ ...currentPost});
                navigate("/notes");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const updatePost = () => {
        PostService.update(currentPost.id, currentPost)
            .then(response => {

            })
            .catch(e => {
                console.log(e);
            });
    };

    const deletePost = () => {
        PostService.remove(currentPost.id)
            .then(response => {
                navigate("/notes");
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div>
            {currentPost ? (
                <div className="edit-form">
                    <h4>Post</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                name="title"
                                value={currentPost.title}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                name="description"
                                value={currentPost.description}
                                onChange={handleInputChange}
                            />
                        </div>
                    </form>

                    <button
                        className="btn btn-success"
                        onClick={() => updatePublished(true)}
                    >
                        Update
                    </button>

                    <button className="btn btn-danger" onClick={deletePost}>
                        Delete
                    </button>

                    <button
                        type="submit"
                        className="badge badge-success"
                        onClick={updatePost}
                    >
                        Update
                    </button>
                </div>
            ) : (
                <div>
                    <br />
                    <p>Please click on a Post...</p>
                </div>
            )}
        </div>
    );
};

export default Post;