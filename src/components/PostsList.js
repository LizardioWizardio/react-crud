import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PostService from "../services/PostService";

const PostsList = () => {
    const [posts, setPosts] = useState([])
    const [currentPost, setCurrentPost] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);

    useEffect(() => {
        retrievePosts();
    }, []);

    const retrievePosts = () => {
        PostService.getAll()
            .then(response => {
                setPosts(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const refreshList = () => {
        retrievePosts();
        setCurrentPost(null);
        setCurrentIndex(-1);
    };

    const setActivePost = (post, index) => {
        setCurrentPost(post);
        setCurrentIndex(index);
    };

    return (
        <div className="list row">
            <div className="col-md-6">
                <h4>Notes List</h4>
                <button type="button" onClick={refreshList} className="m-1 btn btn-success">Update notes</button>
                <ul className="list-group">
                    {posts &&
                        posts.map((post, index) => (
                            <li
                                className={
                                    "list-group-item " + (index === currentIndex ? "active" : "")
                                }
                                onClick={() => setActivePost(post, index)}
                                key={index}
                            >
                                {post.title}
                            </li>
                        ))}
                </ul>
            </div>
            <div className="col-md-6">
                {currentPost ? (
                    <div>
                        <h4>Note</h4>
                        <div>
                            <label>
                                <strong>Title:</strong>
                            </label>{" "}
                            {currentPost.title}
                        </div>
                        <div>
                            <label>
                                <strong>Description:</strong>
                            </label>{" "}
                            {currentPost.description}
                        </div>
                        <Link
                            to={"/notes/" + currentPost.id}
                        >
                            <button
                                className="m-3 btn btn-sm btn-danger"
                            >
                                Edit
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div>
                        {posts.length !== 0 ? <p>Please click on a note...</p> : <p>Please add a note...</p>}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PostsList;