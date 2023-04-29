import { patchPosts } from "../api";
import useAuth from "../hooks/useAuth";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPost } from "../api";
import { useNavigate } from "react-router-dom";

export default function EditPost() {
  const { postId } = useParams();
  const { token, user, setUser } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(null);
  const [willDeliver, setWillDeliver] = useState(true);
  console.log("price", price);

  useEffect(() => {
    async function getGetPost() {
      const result = await getPost(postId);
      console.log("result in EditPost", result);
      setTitle(result.title);
      setDescription(result.description);
      setPrice(result.price);
      setWillDeliver(result.willDeliver);
      return result;
    }
    getGetPost();
  }, []);

  console.log("user", user);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const result = await patchPosts(
        token,
        postId,
        title,
        description,
        price,
        willDeliver
      );

      console.log("handle submit", result.data);
      navigate(`/profile`);
      return result.data;
    } catch (error) {
      console.log("trouble fetching makePosts", error);
    }
  }

  function handleChange(event) {
    setWillDeliver(event.target.value === "true");
    console.log("value", event.target.value === "true");
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder={title}
          required={true}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <input
          type="text"
          name="description"
          placeholder={description}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <input
          type="text"
          name="price"
          placeholder={price}
          value={price}
          required={true}
          onChange={(event) => setPrice(event.target.value)}
        />
        <div>
          {" "}
          Will Deliver?
          <label>
            : True
            <input
              type="radio"
              name="willDeliver"
              value={true}
              checked={willDeliver}
              onChange={handleChange}
            />
          </label>
          <label>
            False
            <input
              type="radio"
              name="willDeliver"
              value={false}
              checked={!willDeliver}
              onChange={handleChange}
            />
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
