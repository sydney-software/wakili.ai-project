import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { LegalResponse } from "@shared/schema";

interface SearchInterfaceProps {
  onQueryStart: () => void;
  onQueryResponse: (response: LegalResponse) => void;
}

export default function SearchInterface({ onQueryStart, onQueryResponse }: SearchInterfaceProps) {
  const [question, setQuestion] = useState("");
  const { toast } = useToast();

  const queryMutation = useMutation({
    mutationFn: async (question: string) => {
      const response = await apiRequest("POST", "/api/legal-query", { question });
      return await response.json() as LegalResponse;
    },
    onMutate: () => {
      onQueryStart();
    },
    onSuccess: (data) => {
      onQueryResponse(data);
      setQuestion("");
      toast({
        title: "Query Processed",
        description: "Your legal question has been answered successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to process your query. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = () => {
    if (!question.trim()) {
      toast({
        title: "Question Required",
        description: "Please enter a legal question.",
        variant: "destructive",
      });
      return;
    }

    queryMutation.mutate(question.trim());
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <Card className="bg-white rounded-lg shadow-lg max-w-3xl mx-auto">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <Textarea
              placeholder="Ask any question about Kenyan law... e.g., 'What are the requirements for Kenyan citizenship?' or 'What is the penalty for theft under the Penal Code?'"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              rows={3}
              disabled={queryMutation.isPending}
            />
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              <Badge variant="secondary" className="bg-primary-100 text-primary-800">
                📖 Constitution
              </Badge>
              <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                ⚖️ Penal Code
              </Badge>
              <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                🏛️ Case Law
              </Badge>
            </div>
            
            <Button
              onClick={handleSubmit}
              disabled={queryMutation.isPending || !question.trim()}
              className="bg-primary-600 text-white hover:bg-primary-700"
            >
              {queryMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Ask Wakili
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
