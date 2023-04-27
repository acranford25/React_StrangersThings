import { patchPosts } from "../api";
import useAuth from "../hooks/useAuth";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPost } from "../api";

export default function EditPost() {
  const { postId } = useParams();
  const { token } = useAuth();

  const [checked, setChecked] = useState(true);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [willDeliver, setWillDeliver] = useState();
  console.log(price);

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
      if (token) {
        console.log(result.data);
        return result;
      }
    } catch (error) {
      console.log("trouble fetching makePosts", error);
    }
  }

  function handleChange(event) {
    setWillDeliver(event.target.value);
    setChecked(event.target.value);
  }

  return (
    <div>
      <form onClick={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder={title}
          required={true}
          onChange={(event) => setTitle(event.target.value)}
        />
        <input
          type="text"
          name="description"
          placeholder={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <input
          type="text"
          name="price"
          placeholder={price}
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
              checked={checked}
              onChange={handleChange}
            />
          </label>
          <label>
            False
            <input
              type="radio"
              name="willDeliver"
              value={false}
              checked={checked}
              onChange={handleChange}
            />
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
