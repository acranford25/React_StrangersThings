import React, { useEffect } from "react";
import { fetchMyData, deletePosts } from "../api";
import useAuth from "../hooks/useAuth";
import { useState } from "react";

export default function Profile() {
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState(null);
  const [mesages, setMessages] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    async function fetch() {
      const result = await fetchMyData(token);
      console.log("result from profile", result);
      setPosts(result.data.posts);
    }
    fetch();
  }, [token]);

  async function handleDelete(event) {
    event.preventDefault();

    try {
      const result = await deletePosts(token, postId);
      console.log("result from delete button", result);
      return result;
    } catch (error) {
      console.log("trouble fetching makePosts", error);
    }
  }

  return (
    <div id="myPosts">
      <section className="myPosts">
        {posts.map((post) => {
          return (
            <div key={post._id}>
              <div className="myPost">
                <span className="name">{post.username}</span>
                <span className="title">{post.title}</span>
                <span className="description">{post.description}</span>
                <span className="price">{post.price}</span>
              </div>
              <button onSubmit={handleDelete}>Delete</button>
            </div>
          );
        })}
      </section>
    </div>
  );
}
