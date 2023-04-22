const BASE_URL = `https://strangers-things.herokuapp.com/api/2301-FTB-ET-WEB-AM/`;

export async function registerUser(username, password) {
  try {
    const response = await fetch(`${BASE_URL}users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username,
          password,
        },
      }),
    });
    const result = await response.json();
    console.log("Result from post user: ", result);
    return result;
  } catch (error) {
    console.error("trouble posting user", error);
  }
}

export async function loginUser(username, password) {
  try {
    const response = await fetch(`${BASE_URL}users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username,
          password,
        },
      }),
    });
    const result = await response.json();
    console.log("loginUser result", result);
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchMyData(token) {
  try {
    const response = await fetch(`${BASE_URL}users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    console.log("Result from fetchMyData", result);
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function getPosts() {
  try {
    const response = await fetch(`${BASE_URL}posts`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log("Trouble fetching posts", error);
  }
}

export async function makePosts(token, title, description, price, willDeliver) {
  try {
    const response = await fetch(`${BASE_URL}posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        post: {
          title,
          description,
          price,
          willDeliver,
        },
      }),
    });
    const result = await response.json();
    console.log("result from makePosts", result);
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function deletePosts(token, postId) {
  try {
    const response = await fetch(`${BASE_URL}posts/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    console.log("result from deletePosts", result);
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function patchPosts(token, postId) {
  try {
    const response = await fetch(`${BASE_URL}posts/${postId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        post: {
          title,
          description,
          price,
          willDeliver,
        },
      }),
    });
    const result = await response.json();
    console.log("result from patch", result);
    return result;
  } catch (error) {
    console.log(error);
  }
}
