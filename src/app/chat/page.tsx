import type { Metadata } from "next";
import { ChatView } from "@/components/ChatView";

export const metadata: Metadata = {
  title: "AI Teacher Assistant Chat",
  description: "Collaborate and brainstorm with Al Manhal AI in real-time for lesson planning, teaching strategies, and classroom activities.",
};

export default function ChatPage() {
    return (
        <div className="min-h-screen bg-transparent pt-4">
            <ChatView />
        </div>
    );
}
