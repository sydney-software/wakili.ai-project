import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Book, Scale, FileText, ExternalLink } from "lucide-react";
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

export default function LegalCategory() {
  const params = useParams();
  const categoryType = params.type;

  const { data: documents, isLoading } = useQuery<LegalDocument[]>({
    queryKey: ['/api/legal-documents', categoryType],
    queryFn: async () => {
      const response = await fetch(`/api/legal-documents/search?type=${categoryType}&query=`);
      if (!response.ok) throw new Error('Failed to fetch documents');
      return response.json();
    },
  });

  const getCategoryInfo = (type: string) => {
    switch (type) {
      case 'constitution':
        return {
          title: 'Constitution of Kenya 2010',
          description: 'Articles and provisions from the Constitution of Kenya 2010',
          icon: Book,
          color: 'bg-primary-100 text-primary-800',
        };
      case 'penal_code':
        return {
          title: 'Penal Code',
          description: 'Criminal offences and penalties under Kenyan law',
          icon: Scale,
          color: 'bg-red-100 text-red-800',
        };
      case 'contract':
        return {
          title: 'Contract Law',
          description: 'Contract formation, enforcement, and commercial law provisions',
          icon: FileText,
          color: 'bg-green-100 text-green-800',
        };
      case 'property':
        return {
          title: 'Property Law',
          description: 'Land rights, property ownership, and real estate law',
          icon: FileText,
          color: 'bg-blue-100 text-blue-800',
        };
      case 'employment':
        return {
          title: 'Employment Law',
          description: 'Worker rights, employment contracts, and labor relations',
          icon: FileText,
          color: 'bg-purple-100 text-purple-800',
        };
      case 'family':
        return {
          title: 'Family Law',
          description: 'Marriage, divorce, custody, and family relationships',
          icon: FileText,
          color: 'bg-yellow-100 text-yellow-800',
        };
      default:
        return {
          title: 'Legal Documents',
          description: 'Legal provisions and sections',
          icon: FileText,
          color: 'bg-gray-100 text-gray-800',
        };
    }
  };

  const categoryInfo = getCategoryInfo(categoryType || '');
  const IconComponent = categoryInfo.icon;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-6">
            <Skeleton className="h-12 w-96" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-4 w-24" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-20 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          
          <div className="flex items-center mb-4">
            <div className="bg-white rounded-lg p-3 mr-4 shadow-sm">
              <IconComponent className="h-8 w-8 text-primary-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{categoryInfo.title}</h1>
              <p className="text-lg text-gray-600">{categoryInfo.description}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Badge className={categoryInfo.color}>
              {documents?.length || 0} {categoryType === 'constitution' ? 'Articles' : 'Sections'}
            </Badge>
            <Badge variant="outline">
              Updated 2024
            </Badge>
          </div>
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents?.map((doc) => (
            <Card key={doc.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                      {doc.article || doc.section}
                    </CardTitle>
                    <p className="text-sm text-gray-600 mt-1">{doc.title}</p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-primary-600 transition-colors" />
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-sm text-gray-700 line-clamp-3 mb-3">
                  {doc.content.substring(0, 150)}...
                </p>
                
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-xs">
                    {doc.citation}
                  </Badge>
                  <Link href={`/document/${doc.id}`}>
                    <Button variant="ghost" size="sm" className="text-primary-600 hover:text-primary-700">
                      Read More
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {documents && documents.length === 0 && (
          <div className="text-center py-12">
            <IconComponent className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No documents found</h3>
            <p className="text-gray-600">There are no documents available for this category.</p>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}