
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Bot, User, Send } from "lucide-react";
import { chatWithGemini } from "@/services/geminiService";
import { toast } from "sonner";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your AI fact-checking assistant. Share any news or claims with me, and I'll help you determine if they're likely true or false.",
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: "user",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    try {
      const response = await chatWithGemini(input);
      
      const botMessage: Message = {
        id: messages.length + 2,
        text: response,
        sender: "bot",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Error in chat:", error);
      toast.error("Failed to get a response. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          <span className="truth px-2 py-1">Truth</span>
          <span className="mx-1">/</span>
          <span className="chaos px-2 py-1">Chaos</span>
          <span className="ml-2">AI Chat</span>
        </h1>
        
        <Card className="bg-white mb-4">
          <CardContent className="p-0">
            <div className="h-[500px] overflow-y-auto p-4">
              {messages.map(message => (
                <div 
                  key={message.id}
                  className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`
                    max-w-[80%] p-3 rounded-lg
                    ${message.sender === 'user' 
                      ? 'bg-peace-blue text-black'
                      : 'bg-newsprint-light border border-newsprint-medium'}
                  `}>
                    <div className="flex items-center mb-1">
                      {message.sender === 'user' ? (
                        <User size={16} className="mr-2" />
                      ) : (
                        <Bot size={16} className="mr-2" />
                      )}
                      <span className="text-xs text-gray-500">
                        {message.sender === 'user' ? 'You' : 'AI Assistant'} • {message.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="whitespace-pre-wrap">{message.text}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start mb-4">
                  <div className="bg-newsprint-light border border-newsprint-medium max-w-[80%] p-3 rounded-lg">
                    <div className="flex items-center">
                      <Bot size={16} className="mr-2" />
                      <span className="text-xs text-gray-500">AI Assistant</span>
                    </div>
                    <div className="mt-2 flex space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "600ms" }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
        </Card>
        
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter a news headline, claim, or ask a question about misinformation..."
            className="flex-1 min-h-[60px]"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            <Send size={18} />
            <span className="ml-2">Send</span>
          </Button>
        </form>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">Suggested questions:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {[
              "Is this news about a COVID-19 cure legitimate?",
              "Did the government really announce this new policy?",
              "How can I verify if a news story is real?",
              "What are common signs of fake news?"
            ].map((question, index) => (
              <Button
                key={index}
                variant="outline"
                className="justify-start h-auto py-2 px-3 text-left"
                onClick={() => setInput(question)}
                disabled={isLoading}
              >
                {question}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
