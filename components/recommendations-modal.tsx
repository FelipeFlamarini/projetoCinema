import { useState, useRef } from "react";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessages } from "@/lib/interfaces";
import { useRecommendedMovies } from "@/hooks/use-recommended-movies";

function chatMessage({ message }: { message: ChatMessages }) {
  if (message.sender) {
    return (
      <div className="flex flex-col w-full items-end">
        <div className="bg-blue-500 text-white p-2 m-1 rounded-lg max-w-xs">
          {message.message}
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
  const [messages, setMessages] = useState<ChatMessages>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const recommendedMovies = useRecommendedMovies();

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

  function handleReceiveMessage(message: string | Array<any>) {
    setMessages((prev) => [...prev, { sender: false, message }]);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="flex items-center hover:space-x-2 absolute bottom-10 right-10 border p-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white transition-all transform group">
        <Sparkle />
        <span className="font-bold overflow-hidden whitespace-nowrap transition-all duration-300 max-w-0 group-hover:max-w-xs">
          Recomenções
        </span>
      </DialogTrigger>
      <DialogContent className="flex flex-col justify-between min-w-[60%] min-h-[60%] max-h-[60%]">
        <DialogHeader className="">
          <DialogTitle>Peça recomendações de filmes</DialogTitle>
          <DialogDescription>
            Nossa inteligência artificial te dará 3 ótimas sugestões.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-grow h-1">
          {messages.map((message, index) => (
            <div key={index}>{chatMessage({ message })}</div>
          ))}
        </ScrollArea>
        <DialogFooter className="flex flex-col gap-2">
          <Input
            placeholder="Que tipo de filme você quer descobrir?"
            className=""
            ref={inputRef}
          />
          <Button
            onClick={() => handleSendMessage(inputRef.current?.value || "")}
            disabled={recommendedMovies.isPending}
          >
            {recommendedMovies.isPending ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              <Send />
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
