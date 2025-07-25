import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Bot, Book, FileText } from "lucide-react";
import type { LegalResponse } from "@shared/schema";

interface AiResponseProps {
  response: LegalResponse | null;
  isLoading: boolean;
}

export default function AiResponse({ response, isLoading }: AiResponseProps) {
  if (isLoading) {
    return (
      <Card className="bg-gray-50 border border-gray-200">
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            <div className="bg-primary-600 rounded-full p-2 mr-3">
              <Bot className="text-white h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Wakili AI Response</h3>
          </div>
          
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-20 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!response) {
    return (
      <Card className="bg-gray-50 border border-gray-200">
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            <div className="bg-primary-600 rounded-full p-2 mr-3">
              <Bot className="text-white h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Wakili AI Response</h3>
          </div>
          
          <div className="text-center py-8">
            <p className="text-gray-500">Ask a question about Kenyan law to get started.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case 'high':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="bg-gray-50 border border-gray-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="bg-primary-600 rounded-full p-2 mr-3">
              <Bot className="text-white h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Wakili AI Response</h3>
          </div>
          <div className="flex space-x-2">
            <Badge variant="secondary" className="capitalize">
              {response.category}
            </Badge>
            <Badge className={getConfidenceColor(response.confidence)}>
              {response.confidence} confidence
            </Badge>
          </div>
        </div>
        
        {/* Main Response */}
        <div className="prose max-w-none mb-6">
          <div className="text-gray-700 whitespace-pre-wrap">
            {response.response}
          </div>
        </div>

        {/* Key Points */}
        {response.keyPoints && response.keyPoints.length > 0 && (
          <div className="bg-white p-4 rounded border-l-4 border-green-500 mb-4">
            <h4 className="font-semibold text-gray-900 mb-2">Key Points</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {response.keyPoints.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Legal Sources */}
        {response.sources && response.sources.length > 0 && (
          <div className="border-t pt-4">
            <h4 className="font-semibold text-gray-900 mb-3">Legal Sources</h4>
            <div className="space-y-3">
              {response.sources.map((source, index) => (
                <div key={index} className="bg-white p-3 rounded border">
                  <div className="flex items-start">
                    <div className="mr-3 mt-1">
                      {source.type === 'constitution' ? (
                        <Book className="text-primary-600 h-4 w-4" />
                      ) : (
                        <FileText className="text-primary-600 h-4 w-4" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{source.title}</p>
                      <p className="text-sm text-gray-600">{source.citation}</p>
                      {source.excerpt && (
                        <p className="text-sm text-gray-700 mt-1 italic">
                          "{source.excerpt}"
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
