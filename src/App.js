import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3005", {
  query: {
    token:
      "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOiJjbGJ3OTJyMmswMDAwdnF2bHgycWhjbXM0IiwiZW1haWwiOiJzdXBlckB0ZXN0LmNvbSIsInBob25lIjpudWxsLCJuYW1lIjoidGVzdCBpZiB1c2VyIGNhbiB1cGRhdGUgaXRzIG9uZSAgaW5mIiwicHJvZmlsZUltYWdlIjpudWxsLCJjb3ZlckltYWdlIjpudWxsLCJicmllZiI6bnVsbCwicm9sZSI6IlNVUEVSX0FETUlOIiwiaXNCbG9ja2VkIjpmYWxzZSwiaXNBY3RpdmUiOnRydWUsImNyZWF0ZWRBdCI6IjIwMjItMTItMjBUMTM6MTY6NTQuMjg1WiIsInVwZGF0ZWRBdCI6IjIwMjMtMDEtMTFUMDA6MDA6MDAuMDAwWiJ9LCJ0eXBlIjoiYWNjZXNzIiwiaWF0IjoxNjc2OTczNjE5LCJleHAiOjE2ODA1NzM2MTl9.F0FY5NdQdd0PKwETgmFub5JDbP8IOrmY3peMoWHK1oCeVO_gDqm1LmToswmuFno5BYoBgMFjpWOGgtq7oV_aPG6E6BeHXfYcPmmC0f99rhXKqaRIS9LOPnmUDaeg8UaaN2nmFNGYDNypD8vIgBNOiVPGgnDsLxR0LMaBsvINr2Q",
    userId: "cldw6hqo40000vq4a2jsuwhhw",
  },
  path: "/socket/",
});

const history = socket.on("history", (data) => {
  console.log(data);
});

//const socket =io.connect("http://localhost:3005");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="John..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
