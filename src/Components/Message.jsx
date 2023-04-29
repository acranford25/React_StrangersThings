import { postMessage, getPost, fetchMyData, getPostMessages } from "../api";
import useAuth from "../hooks/useAuth";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Message() {
  const { token, user } = useAuth();
  const { postId } = useParams();
  const navigate = useNavigate();

  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(null);
  const [willDeliver, setWillDeliver] = useState(true);
  const [post, setPost] = useState({});
  const [messages, setMessages] = useState([]);

  console.log("postId", postId);

  useEffect(() => {
    async function getGetPostMessages() {
      const result = await getPostMessages(token, postId);
      console.log("result in get PostMessages", result);

      setMessages(result);
    }
    getGetPostMessages();
  }, []);

  useEffect(() => {
    async function getGetPost() {
      const result = await getPost(postId);
      setTitle(result.title);
      setDescription(result.description);
      setPrice(result.price);
      setWillDeliver(result.willDeliver);
      setPost(result);
      console.log("post author", result.author.username);
      console.log("user username", user.username);
      console.log("get Post in Message", result);
      return result;
    }
    getGetPost();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const result = await postMessage(token, postId, content);
      console.log("message result", result);
      navigate(`/posts`);
      return result.data;
    } catch (error) {
      console.log("error posting message", error);
    }
  }

  function handleChange(event) {
    setContent(event.target.value);
  }

  return (
    <div>
      <div className="post" key={post._id}>
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
      </div>
      <div>
        <h3>Messages</h3>
        <div>
          {messages.map((message) => {
            return (
              <div key={message._id}>
                {message.fromUser.username} : {message.content}
              </div>
            );
          })}
        </div>
      </div>

      {post && post.author && user.username === post.author.username ? (
        <form>
          <button
            onClick={() => {
              navigate(`/profile`);
            }}
          >
            Back
          </button>
        </form>
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            {" "}
            Message:
            <input
              type="text"
              name="message"
              placeholder="send a message about this item here"
              onChange={handleChange}
            />
            <button type="submit">Send</button>
          </form>
        </>
      )}
    </div>
  );
}
