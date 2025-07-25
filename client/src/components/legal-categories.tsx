import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export default function LegalCategories() {
  const categories = [
    {
      title: "Constitutional Law",
      description: "Fundamental rights, governance structures, and constitutional principles",
      count: "156 Articles",
      icon: "📖",
      bgColor: "bg-primary-100",
      iconColor: "text-primary-600"
    },
    {
      title: "Criminal Law",
      description: "Penal code offenses, criminal procedures, and penalties",
      count: "342 Offenses",
      icon: "⚖️",
      bgColor: "bg-red-100",
      iconColor: "text-red-600"
    },
    {
      title: "Contract Law",
      description: "Contract formation, enforcement, and commercial law",
      count: "89 Provisions",
      icon: "🤝",
      bgColor: "bg-green-100",
      iconColor: "text-green-600"
    },
    {
      title: "Property Law",
      description: "Land rights, property ownership, and real estate law",
      count: "124 Sections",
      icon: "🏠",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      title: "Employment Law",
      description: "Worker rights, employment contracts, and labor relations",
      count: "76 Articles",
      icon: "💼",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600"
    },
    {
      title: "Family Law",
      description: "Marriage, divorce, custody, and family relationships",
      count: "98 Provisions",
      icon: "👨‍👩‍👧‍👦",
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-600"
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
            <Card 
              key={index} 
              className="hover:shadow-md transition-shadow cursor-pointer group"
            >
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className={`${category.bgColor} rounded-lg p-3 mr-4`}>
                    <span className="text-xl">{category.icon}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{category.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-primary-600">{category.count}</span>
                  <ArrowRight className="h-4 w-4 text-primary-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
