import { patchPosts } from "../api";
import useAuth from "../hooks/useAuth";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPost } from "../api";

export default function EditPost() {
  const { postId } = useParams();
  console.log("useParams", postId);
  const { token } = useAuth();

  useEffect(() => {
    async function getGetPost() {
      const result = await getPost(postId);
      console.log("result in EditPost", result);
      return result.data;
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
