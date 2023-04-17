import React, { useEffect } from "react";
import { getPosts } from "../api";
import { useState } from "react";

export default function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getGetPosts() {
      const result = await getPosts();
      setPosts(result.data.posts);
    }
    getGetPosts();
  }, []);

  return (
    <div id="posts">
      <section className="posts">
        {posts.map((post) => {
          return (
            <div className="post" key={post._id}>
              <span className="name">{post.username}</span>
              <span className="title">{post.title}</span>
              <span className="description">{post.description}</span>
              <span className="price">{post.price}</span>
            </div>
          );
        })}
      </section>
    </div>
  );
}
