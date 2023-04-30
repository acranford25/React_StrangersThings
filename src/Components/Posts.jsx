import React, { useEffect } from "react";
import { getPosts } from "../api";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Posts() {
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [searchWord, setSearchWord] = useState("");
  const [thesePosts, setThesePosts] = useState(posts);

  useEffect(() => {
    async function getGetPosts() {
      const result = await getPosts();
      console.log("All posts", result.data.posts);
      setPosts(result.data.posts);
      setThesePosts(result.data.posts);
    }
    getGetPosts();
  }, []);

  function handleSearch(event) {
    event.preventDefault();
    const searchPosts = posts.filter((post) => {
      return (
        post.title.includes(searchWord) || post.description.includes(searchWord)
      );
    });
    setThesePosts(searchPosts);
    setSearchWord("");
    console.log("search Posts", searchPosts);
  }

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          name="search"
          placeholder="search for post"
          value={searchWord}
          onChange={(event) => setSearchWord(event.target.value)}
        />
        <button>Search</button>
      </form>
      <div id="posts">
        {thesePosts.length ? (
          <section className="posts">
            {thesePosts.map(
              (post) => {
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
              },
              [thesePosts]
            )}
          </section>
        ) : (
          <div className="message">
            <h4>No posts matching Search. Try again! </h4>
          </div>
        )}
      </div>
    </div>
  );
}
