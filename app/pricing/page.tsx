import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, X, Phone, MessageCircle, Link } from "lucide-react"
import QuoteCard from "@/components/quote-card";

export const metadata = {
  title: 'Pricing - IKON',
  description: 'Pricing for IKON Pest Control Services. Get a quote for your pest control needs.',
};

export default function PricingPage() {

  const oneTimeServices = [
    {
      service: "General Disinfectant",
      price: "Starting at ₹2000",
      description: "Targets cockroaches, lizards, spiders, silverfish, and other common pests"
    },
    {
      service: "Termite Treatment",
      price: "On Inspection",
      description: "Effective treatment for white ants (termites)"
    },
    {
      service: "Bed Bugs Treatment",
      price: "Starting at ₹2000",
      description: "Specialized chemical treatment for bed bug infestations"
    },
    {
      service: "Wood Borer Treatment",
      price: "On Inspection",
      description: "Prevents and eliminates wood-boring insects from wooden structures"
    },
    {
      service: "Rat Control",
      price: "Starting at ₹2000",
      description: "Trap, poison baiting, RotaBox units, and gum pad solutions for rodent control"
    },
    {
      service: "Ticks Treatment",
      price: "Starting at ₹2000",
      description: "Targeted spray treatment to eliminate ticks in residential and pet areas"
    },
    {
      service: "Honey Bee Removal",
      price: "On Inspection",
      description: "Safe and humane removal of honey bee hives from residential and commercial spaces"
    },
    {
      service: "Pre-Construction Termite Treatment",
      price: "On Inspection",
      description: "Anti-termite chemical soil treatment during early construction phase"
    },
    {
      service: "Post-Construction Termite Treatment",
      price: "On Inspection",
      description: "Termite control for existing buildings using drilling and chemical injection methods"
    },
    {
      service: "Mosquito Fogging",
      price: "Starting at ₹2000",
      description: "Fogging services for mosquito control in residential and commercial areas"
    }
  ];

  const addOns = [
    {
      name: "Pigeon Netting and Bird Spikes Installation",
      price: "Starting at ₹200",
      description: "Prevents bird nesting and roosting on buildings and structures"
    },
    {
      name: "Balcony and Duct Netting for Homes/Societies",
      price: "Quote",
      description: "Custom bird netting solutions for balconies and ducts"
    },
    {
      name: "Annual Maintenance Contracts (AMC)",
      price: "Custom Plan",
      description: "Year-round pest management for homes, societies, and offices"
    },
    {
      name: "Industrial & Commercial Pest Management",
      price: "On Inspection",
      description: "Large-scale pest control solutions tailored for commercial properties"
    },
    {
      name: "Bird Netting",
      price: "Quote",
      description: "Protects open areas from birds with high-quality netting solutions"
    },
    {
      name: "Rat Zali Installation",
      price: "Starting at ₹500",
      description: "Stainless steel mesh barriers to prevent rodent entry through openings"
    },
    {
      name: "Rat Guard",
      price: "Starting at ₹300",
      description: "Protects pipes and wiring from rats using metal sleeves or barriers"
    },
    {
      name: "Home Cleaning",
      price: "Custom Plan",
      description: "Professional deep cleaning services for residential spaces"
    },
    {
      name: "Sanitization Services",
      price: "Starting at ₹999",
      description: "Disinfection treatment for germs, viruses, and bacteria in homes/offices"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white lg:py-16 py-5">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-ikontext mb-4">Transparent Pricing</h1>
            <p className="text-xl text-ikontext mb-8">
              No hidden fees, no surprises. Choose the plan that works best for your home and budget.
            </p>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-800">
              <strong>Important:</strong> Final pricing may vary based on property size and infestation severity. Free
              inspection included with every service.
            </div>
          </div>
        </div>
      </section>

      {/* One-Time Services */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div id="quote">
              <QuoteCard />
            </div>
            {/* Left: Service cards grid */}
            <div>
              <div className="grid md:grid-cols-2 gap-6">
                {oneTimeServices.map((service, index) => (
                  <Card key={index} className="p-6 flex flex-col h-full">
                    <CardContent className="p-0 flex flex-col flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-ikontext">{service.service}</h3>
                        <span className="text-ikongold font-bold">{service.price}</span>
                      </div>
                      <p className="text-ikontext text-sm mb-4">{service.description}</p>
                      <div className="flex-grow" />
                      <a href="/contact">
                        <Button variant="outline" size="sm" className="w-full bg-transparent">
                          Get Quote
                        </Button>
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            {/* Right: Quote form */}

          </div>
        </div>
      </section>


      {/* Add-ons */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-ikontext mb-4">Add-On Services</h2>
            <p className="text-ikontext max-w-2xl mx-auto">
              Enhance your pest control service with these additional options
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {addOns.map((addon, index) => (
              <Card key={index} className="p-6 text-center">
                <CardContent className="p-0">
                  <h3 className="font-semibold text-ikontext mb-2">{addon.name}</h3>
                  <p className="text-2xl font-bold text-ikongold mb-2">{addon.price}</p>
                  <p className="text-ikontext text-sm">{addon.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-ikontext mb-4">Pricing FAQs</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "Are there any hidden charges?",
                answer:
                  "No, we believe in transparent pricing. All costs are discussed upfront during your free inspection.",
              },
              {
                question: "Do I need to leave the house during treatment?",
                answer:
                  "For most treatments, you can stay home. We'll inform you of any specific requirements during scheduling.",
              },
              {
                question: "What if the pests come back?",
                answer:
                  "All our services come with a warranty. If pests return within the warranty period, we'll re-treat at no extra cost.",
              },
              {
                question: "How do you determine the final price?",
                answer:
                  "Pricing depends on property size, type of pest, severity of infestation, and treatment method required.",
              },
            ].map((faq, index) => (
              <Card key={index} className="p-6">
                <CardContent className="p-0">
                  <h3 className="font-semibold text-ikontext mb-2">{faq.question}</h3>
                  <p className="text-ikontext">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-ikontext mb-4">Not Sure What You Need?</h2>
          <p className="text-ikontext mb-8 max-w-2xl mx-auto">
            Schedule a free inspection and our experts will identify your pest problems and recommend the best treatment
            plan
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-ikongold text-ikontext text-xl hover:bg-ikontext hover:text-ikongold">
              <a href="/contact">
                Schedule Free Inspection
              </a>
            </Button>
            <Button
              size="lg"
              asChild
              variant="outline"
              className=" text-xl"
            >
              <a href="tel:9892865620">
                Call 98928 65620
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
