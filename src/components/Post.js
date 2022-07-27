import React from "react";
import Like from "./Like";
import { useSelector, useDispatch } from "react-redux";
import { isEmpty } from "./Utils";
import { useState } from "react";
import { deletePost, editPost } from "../actions/post.action";

const Post = ({ post }) => {
  const [editToggle, setEditToggle] = useState(false);
  const [editContent, setEditContent] = useState(post.content);
  const user = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const handleEdit = (e) => {
    e.preventDefault();

    const postData = {
      title: post.title,
      author: user[0].pseudo,
      content: editContent,
      likes: post.likes,
      id: post.id
    };
    dispatch(editPost(postData));
    setEditToggle(false);
  }

  return (
    <div className="post">
      {!isEmpty(user[0]) && user[0].pseudo === post.author && (
        <div className="edit-delete">
          <img onClick={() => setEditToggle(!editToggle)} src="./icons/edit.svg" alt="edit" />
          <img src="./icons/delete.svg" alt="delete" onClick={() => dispatch(deletePost(post.id))} />
        </div>
      )}
      <h2>{post.title}</h2>

      <img
        src="https://picsum.photos/1500/400"
        className="post-img"
        alt="img-post"
      />

      {editToggle ? (
        <form onSubmit={(e) => handleEdit(e)}>
          <textarea defaultValue={post.content} onChange={(e) => setEditContent(e.target.value)}></textarea>
          <input type="submit" value="Modifier le message" />
        </form>
      ) : (
        <p>{post.content}</p>)
      }

      <div className="author">
        <h5>{post.author}</h5>
        <Like post={post} />
      </div>
    </div>
  );
};

export default Post;
