import ChatInput from "./ChatInput";
import MessageList from "./MessageList";

export default function Home() {
  return (
    <main className="p-2">
      {/* MessageList */}
      <MessageList />
      {/* ChatInput */}
      <ChatInput />
    </main>
  )
}
 