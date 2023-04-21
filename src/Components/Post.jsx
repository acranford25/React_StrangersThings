import { makePosts } from "../api";
import useAuth from "../hooks/useAuth";
import { useState } from "react";

export default function Post() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(null);
  const [willDeliver, setWillDeliver] = useState(true);

  const { token } = useAuth();

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
        console.log(result);
        return result;
      }
    } catch (error) {
      console.log("trouble fetching makePosts", error);
    }
  }

  return (
    <div>
      <form onClick={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="title"
          required="true"
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
          required="true"
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
              checked={true}
              onChange={(event) => setWillDeliver(event.target.value)}
            />
          </label>
          <label>
            False
            <input
              type="radio"
              name="willDeliver"
              value={false}
              onChange={(event) => setWillDeliver(event.target.value)}
            />
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
