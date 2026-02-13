import React, { useEffect, useRef } from "react";
import CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/theme/dracula.css";
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/edit/closetag";
import ACTIONS from "../Actions/Actions";

const Editor = ({ socket, roomId, onChange, currentCode }) => {
  const editorRef = useRef(null);
  const textAreaRef = useRef(null);

  // Initialize CodeMirror
  useEffect(() => {
    if (!textAreaRef.current) return;

    editorRef.current = CodeMirror.fromTextArea(textAreaRef.current, {
      mode: { name: "javascript", json: true },
      theme: "dracula",
      lineNumbers: true,
      autoCloseTags: true,
      autoCloseBrackets: true,
    });

    // Set initial code
    if (currentCode) {
      editorRef.current.setValue(currentCode);
    }

    // Local changes -> send to server
    editorRef.current.on("change", (instance, changes) => {
      const { origin } = changes;
      const code = instance.getValue();
      onChange(code);

      if (origin !== "setValue" && socket) {
        socket.emit(ACTIONS.CODE_CHANGE, { roomId, code });
      }
    });
  }, [socket, roomId, onChange, currentCode]);

  // Remote changes
  useEffect(() => {
    if (!socket) return;

    const handleRemoteChange = ({ code }) => {
      if (editorRef.current && code !== editorRef.current.getValue()) {
        editorRef.current.setValue(code);
      }
    };

    socket.on(ACTIONS.CODE_CHANGE, handleRemoteChange);

    return () => {
      socket.off(ACTIONS.CODE_CHANGE, handleRemoteChange);
    };
  }, [socket]);

  return <textarea ref={textAreaRef} />;
};

export default Editor;
