export default function MessageList({ messages }) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-2">
      {messages.map((msg, idx) => (
        <div key={idx} className={`p-2 rounded-lg w-fit ${msg.senderId === 1 ? "bg-blue-200 ml-auto" : "bg-gray-200"}`}>
          {msg.message}
        </div>
      ))}
    </div>
  );
}
