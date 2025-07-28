import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";

export default function LegalCategories() {
  // Fetch document counts from the API
  const { data: constitutionDocs } = useQuery({
    queryKey: ['/api/legal-documents', 'constitution'],
    queryFn: async () => {
      const response = await fetch('/api/legal-documents/search?type=constitution&query=');
      return response.json();
    },
  });

  const { data: penalCodeDocs } = useQuery({
    queryKey: ['/api/legal-documents', 'penal_code'],
    queryFn: async () => {
      const response = await fetch('/api/legal-documents/search?type=penal_code&query=');
      return response.json();
    },
  });

  const { data: contractDocs } = useQuery({
    queryKey: ['/api/legal-documents', 'contract'],
    queryFn: async () => {
      const response = await fetch('/api/legal-documents/search?type=contract&query=');
      return response.json();
    },
  });

  const { data: propertyDocs } = useQuery({
    queryKey: ['/api/legal-documents', 'property'],
    queryFn: async () => {
      const response = await fetch('/api/legal-documents/search?type=property&query=');
      return response.json();
    },
  });

  const { data: employmentDocs } = useQuery({
    queryKey: ['/api/legal-documents', 'employment'],
    queryFn: async () => {
      const response = await fetch('/api/legal-documents/search?type=employment&query=');
      return response.json();
    },
  });

  const { data: familyDocs } = useQuery({
    queryKey: ['/api/legal-documents', 'family'],
    queryFn: async () => {
      const response = await fetch('/api/legal-documents/search?type=family&query=');
      return response.json();
    },
  });

  const categories = [
    {
      title: "Constitutional Law",
      description: "Fundamental rights, governance structures, and constitutional principles",
      count: `${constitutionDocs?.length || 0} Articles`,
      icon: "📖",
      bgColor: "bg-primary-100",
      iconColor: "text-primary-600",
      type: "constitution",
      available: true
    },
    {
      title: "Criminal Law",
      description: "Penal code offenses, criminal procedures, and penalties",
      count: `${penalCodeDocs?.length || 0} Offenses`,
      icon: "⚖️",
      bgColor: "bg-red-100",
      iconColor: "text-red-600",
      type: "penal_code",
      available: true
    },
    {
      title: "Contract Law",
      description: "Contract formation, enforcement, and commercial law",
      count: `${contractDocs?.length || 0} Provisions`,
      icon: "🤝",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
      type: "contract",
      available: true
    },
    {
      title: "Property Law",
      description: "Land rights, property ownership, and real estate law",
      count: `${propertyDocs?.length || 0} Provisions`,
      icon: "🏠",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
      type: "property",
      available: true
    },
    {
      title: "Employment Law",
      description: "Worker rights, employment contracts, and labor relations",
      count: `${employmentDocs?.length || 0} Provisions`,
      icon: "💼",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
      type: "employment",
      available: true
    },
    {
      title: "Family Law",
      description: "Marriage, divorce, custody, and family relationships",
      count: `${familyDocs?.length || 0} Provisions`,
      icon: "👨‍👩‍👧‍👦",
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-600",
      type: "family",
      available: true
    }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse Legal Categories</h2>
          <p className="text-lg text-gray-600">Explore different areas of Kenyan law</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            category.available ? (
              <Link key={index} href={`/category/${category.type}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className={`${category.bgColor} rounded-lg p-3 mr-4`}>
                        <span className="text-xl">{category.icon}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                        {category.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 mb-4">{category.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-primary-600 font-medium">{category.count}</span>
                      <ArrowRight className="h-4 w-4 text-primary-600 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ) : (
              <Card key={index} className="opacity-60 cursor-not-allowed">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className={`${category.bgColor} rounded-lg p-3 mr-4`}>
                      <span className="text-xl">{category.icon}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{category.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{category.count}</span>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">Coming Soon</span>
                  </div>
                </CardContent>
              </Card>
            )
          ))}
        </div>
      </div>
    </section>
  );
}
