import { postMessage } from "../api";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Message() {
  const { token } = useAuth();
  const { postId } = useParams();
  const navigate = useNavigate();

  const [content, setContent] = useState("");

  console.log("postId", postId);

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
    </div>
  );
}
