import { useState } from "react";

export default function MessageInput({ onSend }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (text.trim()) {
      onSend(text);
      setText("");
    }
  };

  return (
    <div className="p-4 flex">
      <input
        type="text"
        className="flex-1 p-2 border rounded-l"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
      />
      <button onClick={handleSend} className="bg-blue-500 text-white px-4 rounded-r">
        Send
      </button>
    </div>
  );
}
