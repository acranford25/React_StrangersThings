import React, { useEffect } from "react";
import { fetchMyData, deletePosts, patchPosts } from "../api";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Profile() {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState({});
  const [mesages, setMessages] = useState([]);
  const { token } = useAuth();
  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetch() {
      try {
        const result = await fetchMyData(token);
        console.log("result from profile", result);
        setPosts(result.data.posts);
      } catch (error) {
        alert("No users found, please log in to view profile.");
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
                <form>
                  <button
                    type="onClick"
                    onClick={() => {
                      console.log("onclick", post._id);
                      navigate(`/${post._id}`);
                    }}
                  >
                    Edit
                  </button>
                </form>
                <form>
                  <button
                    type="onClick"
                    onClick={(event) => {
                      event.preventDefault();
                      console.log(post._id);
                      deletePosts(token, post._id);
                    }}
                  >
                    Delete
                  </button>
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
