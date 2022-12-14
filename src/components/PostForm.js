import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addPosts, getPosts } from "../actions/post.action";

const PostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const user = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title && content) {
      const data = {
        title,
        content,
        author: user[0].pseudo,
        likes: 0,
      };

      await dispatch(addPosts(data));
      setTitle("");
      setContent("");
      // Pour obtenir l'id du post
      dispatch(getPosts());
    }
  }
  return (
    <div className="form-container">
      <form onSubmit={e => handleSubmit(e)}>
        <input type="text" placeholder="Titre du poste" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea
          placeholder="Postez vos pensées..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <input type="submit" value="Envoyer" />
      </form>
    </div>
  );
};

export default PostForm;
