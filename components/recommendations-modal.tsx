import { useState, useRef, useEffect } from "react";
import { Sparkle, Send, LoaderCircle } from "lucide-react";

import { MovieCard } from "./movie-card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChatMessages } from "@/lib/interfaces";
import { useRecommendedMovies } from "@/hooks/use-recommended-movies";
import type { Movie } from "@/lib/interfaces";

interface ChatMessageProps {
  message: ChatMessages;
}

function ChatMessage({ message }: ChatMessageProps) {
  if (message.sender) {
    return (
      <div className="flex flex-col w-full items-end">
        <div className="bg-blue-500 text-white p-2 m-1 rounded-lg max-w-xs">
          {message.message as string}
        </div>
      </div>
    );
  }
  if (Array.isArray(message.message)) {
    return (
      <div className="flex w-full items-start overflow-x-auto">
        <div className="flex gap-10 bg-gray-300 p-2 py-4 rounded-xl">
          {message.message?.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              className="min-w-64 max-w-64 h-full bg-black"
            />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col w-full items-start">
      <div className="bg-gray-300 text-black p-2 m-1 rounded-lg max-w-xs">
        {message.message}
      </div>
    </div>
  );
}

export default function RecommendationsModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessages[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recommendedMovies = useRecommendedMovies();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleSendMessage(message: string) {
    if (!message) return;

    inputRef.current!.value = "";
    setMessages((prev) => [...prev, { sender: true, message }]);
    recommendedMovies.mutate(message, {
      onSuccess: (data) => {
        handleReceiveMessage(data);
      },
      onError: (error) => {
        console.error(error);
        setMessages((prev) => [
          ...prev,
          {
            sender: false,
            message: "Houve um erro desconhecido, tente novamente.",
          },
        ]);
      },
    });
  }

  function handleReceiveMessage(message: string | Movie[]) {
    setMessages((prev) => [...prev, { sender: false, message }]);
  }

  function handleDialog() {
    setIsOpen((prev) => !prev);
    // if (isOpen) {
    //   inputRef.current?.focus();
    // }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleDialog}>
      <DialogTrigger className="fixed bottom-10 right-10 flex items-center hover:space-x-2 border p-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white transition-all transform group">
        <Sparkle />
        <span className="font-bold overflow-hidden whitespace-nowrap transition-all duration-300 max-w-0 group-hover:max-w-xs">
          Recomenções
        </span>
      </DialogTrigger>
      <DialogContent className="flex flex-col justify-between h-[80vh] max-w-5xl">
        <DialogHeader className="">
          <DialogTitle>Peça recomendações de filmes</DialogTitle>
          <DialogDescription>
            Nossa inteligência artificial te dará 3 ótimas sugestões.
          </DialogDescription>
        </DialogHeader>
        <div className="flex-grow overflow-y-auto scroll-smooth">
          {messages.map((message, index) => (
            <div key={index} className="flex-shrink-0 mb-4">
              <ChatMessage message={message} />
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <DialogFooter>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputRef.current?.value || "");
            }}
            className="w-full flex gap-2 space-x-2 p-4 border-t"
          >
            <Input
              placeholder="Que tipo de filme você quer descobrir?"
              className=""
              ref={inputRef}
            />
            <Button type="submit" disabled={recommendedMovies.isPending}>
              {recommendedMovies.isPending ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                <Send />
              )}
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
