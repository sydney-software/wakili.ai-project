import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Book, Scale, FileText, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/header";
import Footer from "@/components/footer";

interface LegalDocument {
  id: string;
  title: string;
  type: string;
  section: string | null;
  article: string | null;
  content: string;
  citation: string | null;
  metadata: any;
  createdAt: Date;
}

export default function DocumentDetail() {
  const params = useParams();
  const documentId = params.id;
  const { toast } = useToast();

  const { data: document, isLoading } = useQuery<LegalDocument>({
    queryKey: ['/api/legal-documents', documentId],
    queryFn: async () => {
      const response = await fetch(`/api/legal-documents/${documentId}`);
      if (!response.ok) throw new Error('Failed to fetch document');
      return response.json();
    },
  });

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'constitution':
        return Book;
      case 'penal_code':
        return Scale;
      default:
        return FileText;
    }
  };

  const getDocumentColor = (type: string) => {
    switch (type) {
      case 'constitution':
        return 'bg-primary-100 text-primary-800';
      case 'penal_code':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied to clipboard",
        description: "Document citation copied successfully.",
      });
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Skeleton className="h-8 w-24 mb-6" />
          <Card>
            <CardHeader>
              <Skeleton className="h-8 w-96" />
              <Skeleton className="h-4 w-64" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-32 w-full" />
              </div>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  if (!document) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Document not found</h3>
            <p className="text-gray-600 mb-4">The requested legal document could not be found.</p>
            <Link href="/">
              <Button>Return to Home</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const IconComponent = getDocumentIcon(document.type);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation */}
        <Link href={`/category/${document.type}`}>
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to {document.type === 'constitution' ? 'Constitution' : 'Penal Code'}
          </Button>
        </Link>

        {/* Document Card */}
        <Card className="shadow-lg">
          <CardHeader className="border-b">
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <div className="bg-white rounded-lg p-3 mr-4 shadow-sm border">
                  <IconComponent className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    {document.article || document.section}
                  </CardTitle>
                  <p className="text-lg text-gray-700 mt-1">{document.title}</p>
                </div>
              </div>
              <Badge className={getDocumentColor(document.type)}>
                {document.type === 'constitution' ? 'Constitution' : 'Penal Code'}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            {/* Content */}
            <div className="prose max-w-none mb-6">
              <div className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                {document.content}
              </div>
            </div>

            {/* Metadata */}
            {document.metadata && (
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Additional Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {document.type === 'constitution' && document.metadata.chapter && (
                    <div>
                      <span className="font-medium text-gray-700">Chapter:</span>
                      <p className="text-gray-600">{document.metadata.chapter}</p>
                    </div>
                  )}
                  {document.type === 'penal_code' && (
                    <>
                      {document.metadata.category && (
                        <div>
                          <span className="font-medium text-gray-700">Category:</span>
                          <p className="text-gray-600">{document.metadata.category}</p>
                        </div>
                      )}
                      {document.metadata.penalty && (
                        <div>
                          <span className="font-medium text-gray-700">Penalty:</span>
                          <p className="text-gray-600">{document.metadata.penalty}</p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Citation */}
            <div className="border-t pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Legal Citation</h4>
                  <p className="text-gray-600">{document.citation}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(document.citation || '')}
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Citation
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Related Documents (Future Enhancement) */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Legal Topics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/category/constitution">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <Book className="h-5 w-5 text-primary-600 mr-3" />
                    <span className="font-medium text-gray-900">Browse Constitution</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link href="/category/penal_code">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <Scale className="h-5 w-5 text-red-600 mr-3" />
                    <span className="font-medium text-gray-900">Browse Penal Code</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}