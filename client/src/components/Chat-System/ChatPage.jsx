import ChatWindow from "./ChatWindow";

export default function ChatPage() {
  return (
    <div className="h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4 text-xl">Let's Chat</header>
      <ChatWindow />
    </div>
  );
}
