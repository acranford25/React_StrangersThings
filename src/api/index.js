const BASE_URL = `https://strangers-things.herokuapp.com/api/2301-FTB-ET-WEB-AM/`;

export async function getPosts() {
  try {
    const response = await fetch(`${BASE_URL}posts`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log("Trouble fetching posts", error);
  }
}

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
