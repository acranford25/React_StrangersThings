import { makePosts } from "../api";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Post() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(null);
  const [willDeliver, setWillDeliver] = useState(true);

  const { token } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const result = await makePosts(
        token,
        title,
        description,
        price,
        willDeliver
      );
      if (token) {
        console.log("post handleSubmit", result);
        navigate(-1);
        return result;
      }
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
          placeholder="title"
          required={true}
          onChange={(event) => setTitle(event.target.value)}
        />
        <input
          type="text"
          name="description"
          placeholder="description"
          onChange={(event) => setDescription(event.target.value)}
        />
        <input
          type="text"
          name="price"
          placeholder="price 0.00"
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
              value={!willDeliver}
              onChange={handleChange}
            />
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
