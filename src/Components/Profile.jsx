import React, { useEffect } from "react";
import { fetchMyData, deletePosts } from "../api";
import useAuth from "../hooks/useAuth";
import { useState } from "react";

export default function Profile() {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState({});
  const [mesages, setMessages] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    async function fetch() {
      try {
        const result = await fetchMyData(token);
        console.log("result from profile", result);
        setPosts(result.data.posts);
      } catch (error) {
        alert("No users found, please log in.");
      }
    }
    if (token) {
      fetch();
    }
  }, [token]);

  return (
    <div id="myPosts">
      <section className="myPosts">
        <h2>Active Posts</h2>
        {posts.map((post) => {
          return (
            post.active && (
              <div key={post._id}>
                <div className="myPost">
                  <span className="name">{post.username}</span>
                  <span className="title">{post.title}</span>
                  <span className="description">{post.description}</span>
                  <span className="price">{post.price}</span>
                </div>
                <form
                  onClick={(event) => {
                    event.preventDefault();
                    console.log(post._id);
                    deletePosts(token, post._id);
                  }}
                >
                  <button type="onClick">Delete</button>
                </form>
              </div>
            )
          );
        })}
      </section>
      <section>
        <h2>Inactive Posts</h2>
        {posts.map((post) => {
          return (
            !post.active && (
              <div key={post._id}>
                <div className="myPost">
                  <span className="name">{post.username}</span>
                  <span className="title">{post.title}</span>
                  <span className="description">{post.description}</span>
                  <span className="price">{post.price}</span>
                </div>
              </div>
            )
          );
        })}
      </section>
    </div>
  );
}
