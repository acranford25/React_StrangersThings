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
