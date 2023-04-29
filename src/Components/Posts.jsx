import React, { useEffect } from "react";
import { getPosts } from "../api";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [posters, setPosters] = useState([]);
  const { user, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function getGetPosts() {
      const result = await getPosts();
      console.log("All posts", result.data.posts);
      setPosts(result.data.posts);
    }
    getGetPosts();
  }, []);

  let usernames = [];

  for (let post of posts) {
    usernames.push(post.author.username);
  }
  console.log("usernames", usernames);

  return (
    <div id="posts">
      <section className="posts">
        {posts.map((post) => {
          return (
            <div className="post" key={post._id}>
              <span className="name">Seller: {post.author.username}</span>
              <span className="title">Item: {post.title}</span>
              <span className="description">
                Item Description: {post.description}
              </span>
              <span className="price">Price: {post.price}</span>
              <span className="willDeliver">
                {" "}
                Delivery:
                {post.willDeliver ? " Will Deliver" : " Pick Up Only"}
              </span>
              {token && user.username !== post.author.username ? (
                <form>
                  <button
                    onClick={() => {
                      navigate(`/${post._id}/messages`);
                    }}
                  >
                    Message
                  </button>
                </form>
              ) : (
                <></>
              )}
            </div>
          );
        })}
      </section>
    </div>
  );
}
