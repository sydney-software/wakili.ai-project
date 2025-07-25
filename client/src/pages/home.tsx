import { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import SearchInterface from "@/components/search-interface";
import AiResponse from "@/components/ai-response";
import LegalCategories from "@/components/legal-categories";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Brain, RefreshCw, Search, Smartphone } from "lucide-react";
import type { LegalResponse } from "@shared/schema";

export default function Home() {
  const [currentResponse, setCurrentResponse] = useState<LegalResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleQueryResponse = (response: LegalResponse) => {
    setCurrentResponse(response);
    setIsLoading(false);
  };

  const handleQueryStart = () => {
    setIsLoading(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-500 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ask Questions About Kenyan Law</h2>
          <p className="text-xl text-primary-100 mb-8">
            Get accurate answers based on the 2010 Constitution, Penal Code, and current legislation
          </p>
          
          <SearchInterface 
            onQueryStart={handleQueryStart}
            onQueryResponse={handleQueryResponse}
          />
        </div>
      </section>

      {/* AI Response Section */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* AI Response Area */}
            <div className="lg:col-span-2">
              <AiResponse response={currentResponse} isLoading={isLoading} />
            </div>
            
            {/* Legal Resources Sidebar */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Access</h3>
                  
                  {/* Popular Topics */}
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-3">Popular Legal Topics</h4>
                    <div className="space-y-2">
                      {[
                        { icon: "⚖️", title: "Criminal Law & Penalties" },
                        { icon: "🏠", title: "Property & Land Rights" },
                        { icon: "💼", title: "Employment Law" },
                      ].map((topic, index) => (
                        <button 
                          key={index}
                          className="w-full text-left p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center">
                            <span className="mr-2">{topic.icon}</span>
                            <span className="text-sm text-gray-700">{topic.title}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Recent Updates */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Recent Legal Updates</h4>
                    <div className="space-y-3">
                      {[
                        { title: "Finance Act 2024", desc: "Updated tax provisions", time: "2 days ago" },
                        { title: "Criminal Procedure Amendment", desc: "New bail provisions", time: "1 week ago" },
                      ].map((update, index) => (
                        <div key={index} className="border-l-2 border-primary-200 pl-3">
                          <p className="text-sm font-medium text-gray-900">{update.title}</p>
                          <p className="text-xs text-gray-600">{update.desc}</p>
                          <p className="text-xs text-gray-500">{update.time}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Legal Categories */}
      <LegalCategories />

      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Wakili.ai?</h2>
            <p className="text-lg text-gray-600">
              Advanced AI-powered legal research for accurate and up-to-date information
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Brain,
                title: "AI-Powered Analysis",
                description: "Advanced natural language processing for accurate legal interpretations",
                bgColor: "bg-primary-100",
                iconColor: "text-primary-600"
              },
              {
                icon: RefreshCw,
                title: "Always Updated",
                description: "Real-time updates from Parliament and legal proceedings",
                bgColor: "bg-green-100",
                iconColor: "text-green-600"
              },
              {
                icon: Search,
                title: "Comprehensive Search",
                description: "Search across Constitution, Penal Code, and case law",
                bgColor: "bg-blue-100",
                iconColor: "text-blue-600"
              },
              {
                icon: Smartphone,
                title: "Mobile Accessible",
                description: "Access legal information anywhere, anytime on any device",
                bgColor: "bg-purple-100",
                iconColor: "text-purple-600"
              }
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className={`${feature.bgColor} rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4`}>
                  <feature.icon className={`${feature.iconColor} h-8 w-8`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Legal Disclaimer */}
      <section className="py-8 bg-yellow-50 border-t border-yellow-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Alert className="border-yellow-300 bg-yellow-100">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="text-yellow-800">
              <h3 className="text-lg font-semibold text-yellow-900 mb-2">Important Legal Disclaimer</h3>
              <p className="mb-2">
                Wakili.ai provides legal information based on Kenyan law for educational and informational purposes only. 
                This service does not constitute legal advice and should not be used as a substitute for consultation with a qualified attorney.
              </p>
              <p>
                For specific legal matters, please consult with a licensed legal practitioner. 
                While we strive for accuracy, laws may change and interpretations may vary.
              </p>
            </AlertDescription>
          </Alert>
        </div>
      </section>

      <Footer />
    </div>
  );
}
