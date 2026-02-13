import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, Navigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import Client from "../components/Client";
import Editor from "../components/editor";
import { initSocket } from "../socket";
import ACTIONS from "../Actions/Actions";

const EditorPage = () => {
  const socketRef = useRef(null);
  const codeRef = useRef(""); // current code state
  const location = useLocation();
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [clients, setClients] = useState([]);
  const [socketReady, setSocketReady] = useState(false);
  const hasJoined = useRef(false);

  // Initialize socket and join room
  useEffect(() => {
    if (hasJoined.current) return;
    hasJoined.current = true;

    const init = async () => {
      socketRef.current = await initSocket();
      const socket = socketRef.current;
      setSocketReady(true);

      // Connection errors
      socket.on("disconnect", () => console.log("❌ Disconnected"));
      socket.on("connect_error", (err) => {
        console.log("Socket error", err);
        toast.error("Socket connection failed");
        navigate("/");
      });

      // Join the room
      socket.emit(ACTIONS.JOIN, {
        roomId,
        username: location.state?.username,
      });

      // When someone joins (including this user)
      socket.on(ACTIONS.JOINED, ({ clients, username, socketId, code }) => {
        setClients(clients);

        // If we are the new user, sync latest code
        if (socketId !== socket.id && code) {
          codeRef.current = code;
        }

        if (username !== location.state?.username) {
          toast.success(`${username} joined the room`);
        }

        // Send latest code to the newly joined user
        if (socketId !== socket.id && codeRef.current) {
          socket.emit(ACTIONS.SYNC_CODE, {
            socketId,
            code: codeRef.current,
          });
        }
      });

      // When someone leaves
      socket.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
        toast.success(`${username} left the room`);
        setClients((prev) => prev.filter((c) => c.socketId !== socketId));
      });
    };

    init();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current.off();
      }
    };
  }, [roomId, location.state?.username, navigate]);

  if (!location.state?.username) return <Navigate to="/" />;

  // Copy Room ID
  const handleCopyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success("Room ID copied to clipboard");
    } catch {
      toast.error("Failed to copy Room ID");
    }
  };

  // Leave room
  const handleLeave = () => navigate("/");

  return (
    <div className="mainWrap">
      <div className="aside">
        <div className="asideInner">
          <div className="logo">
            <img className="logoImage" src="/code-sync.png" alt="code-sync-logo" />
          </div>
          <h3>Connected</h3>
          <div className="clientsList">
            {clients.map((client) => (
              <Client key={client.socketId} username={client.username} />
            ))}
          </div>
        </div>
        <button className="btn copyBtn" onClick={handleCopyRoomId}>
          Copy ROOM ID
        </button>
        <button className="btn leaveBtn" onClick={handleLeave}>
          Leave
        </button>
      </div>

      <div className="editorWrap">
        {socketReady && (
          <Editor
            socket={socketRef.current} // pass socket object directly
            roomId={roomId}
            onChange={(code) => (codeRef.current = code)}
            currentCode={codeRef.current} // send initial code
          />
        )}
      </div>
    </div>
  );
};

export default EditorPage;
