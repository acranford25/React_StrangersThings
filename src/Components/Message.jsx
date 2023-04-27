import { postMessage } from "../api";

export default function Message() {
  return (
    <div>
      <form>
        {" "}
        Message:
        <input
          type="text"
          name="message"
          placeholder="send a message about this item here"
        />
      </form>
    </div>
  );
}
