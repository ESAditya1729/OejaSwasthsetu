import { useState, useEffect } from "react";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";
import socket from "./Socket"; // make sure filename case matches
import axios from "axios";

export default function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const senderId = 1; // get from context/session
  const receiverId = 2; // set dynamically

  useEffect(() => {
    // Fetch chat history from backend
    axios.get(`http://localhost:5000/api/chat/history/${senderId}/${receiverId}`)
      .then(res => setMessages(res.data))
      .catch(err => console.error("Failed to load chat history:", err));

    // Listen for incoming messages from socket
    socket.on("receive_message", (msg) => {
      // Only add messages relevant to current conversation
      if (
        (msg.senderId === receiverId && msg.receiverId === senderId) ||
        (msg.senderId === senderId && msg.receiverId === receiverId)
      ) {
        setMessages(prev => [...prev, msg]);
      }
    });

    // Cleanup socket listener on unmount
    return () => {
      socket.off("receive_message");
    };
  }, [senderId, receiverId]);

  const sendMessage = async (msgText) => {
    if (!msgText.trim()) return; // ignore empty messages

    const msg = { senderId, receiverId, message: msgText };

    try {
      await axios.post("http://localhost:5000/api/chat/send", msg);
      socket.emit("send_message", msg);
      setMessages(prev => [...prev, { ...msg, Timestamp: new Date() }]);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <MessageList messages={messages} />
      <MessageInput onSend={sendMessage} />
    </div>
  );
}
