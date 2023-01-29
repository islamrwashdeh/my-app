import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";


const socket = io.connect("http://209.97.130.215/", {
  query: {
    token:
      "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOiJjbGJ3OTJyMmswMDAwdnF2bHgycWhjbXM0IiwiZW1haWwiOiJzdXBlckB0ZXN0LmNvbSIsInBob25lIjpudWxsLCJuYW1lIjoidGVzdCBpZiB1c2VyIGNhbiB1cGRhdGUgaXRzIG9uZSAgaW5mIiwicHJvZmlsZUltYWdlIjpudWxsLCJjb3ZlckltYWdlIjpudWxsLCJicmllZiI6bnVsbCwicm9sZSI6IlNVUEVSX0FETUlOIiwiaXNCbG9ja2VkIjpmYWxzZSwiaXNBY3RpdmUiOnRydWUsImNyZWF0ZWRBdCI6IjIwMjItMTItMjBUMTM6MTY6NTQuMjg1WiIsInVwZGF0ZWRBdCI6IjIwMjMtMDEtMTFUMDA6MDA6MDAuMDAwWiJ9LCJ0eXBlIjoiYWNjZXNzIiwiaWF0IjoxNjc0Mzg0MTMyLCJleHAiOjE2Nzc5ODQxMzJ9.fNah4bLopCWTEBxrpYeFten9ZtN6wiZlFZ0eVDVDeTvwbGXJB4ouSGupXqHoMocd6b5BaZNPytl-4fnI2LH_z0OVOwY4AF8dSL_8jxuwDfo__vbPznfLkerdEJ0LKtt1V9uLRKW3q9rLDx_YsWD5A2AFFICbueShZ3QM_R0ODWs",
    userId: "clcrbbq2m0000vqms0g9bxukc",
  },
  path: "/socket/",
});

const history = socket.on("history", (data) => {
  console.log(data);
});

//io.connect("http://localhost:3005");

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
