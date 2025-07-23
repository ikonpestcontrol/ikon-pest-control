'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Shield, Clock, Star } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation";


export default function ServicesPage() {
  const router = useRouter();
  const services = [
    {
      title: "General Disinfectant Treatment",
      description: "Effective disinfectant treatment targeting cockroaches, lizards, spiders, silverfish, and other pests.",
      features: [
        "Cockroach, lizard, and spider treatment",
        "Disinfectant for multiple pests",
        "Odorless and eco-friendly",
        "Indoor & outdoor coverage"
      ],
      image: "/general-pest-control.webp",
      href: "/services/general-pest-control",
      popular: true
    },
    {
      title: "Termite Treatment (White Ant)",
      description: "Comprehensive white ant treatment to prevent and eliminate termite infestations.",
      features: [
        "Effective elimination of white ants",
        "Prevention of structural damage",
        "Long-lasting protection",
        "Up to 5-year warranty"
      ],
      image: "/termite-treatment.webp",
      href: "/services/termite-treatment",
      popular: true
    },
    {
      title: "Bed Bugs Treatment",
      description: "Targeted heat and chemical treatments to eradicate bed bugs in your home or business.",
      features: [
        "Heat treatment (non-toxic)",
        "Targeted chemical application",
        "Mattress & furniture coverage",
        "Follow-up inspection & treatment"
      ],
      image: "/bed-bug-eradication.webp",
      href: "/services/bed-bug-treatment",
      popular: false
    },
    {
      title: "Wood Borer Treatment",
      description: "Specialized treatment for wood-boring insects to protect your furniture and structures.",
      features: [
        "Wood borer detection & elimination",
        "Safe and effective chemicals",
        "Prevention of wood damage",
        "Customized treatment plans"
      ],
      image: "/wood-borer-treatment.webp",
      href: "/services/wood-borer-treatment",
      popular: false
    },
    {
      title: "Rat Control – Trap, Poison, RotaBox, Gum Pad",
      description: "Comprehensive rat control methods including traps, poison, and other techniques for effective management.",
      features: [
        "Mechanical traps & bait stations",
        "Humane removal methods",
        "RotaBox and gum pad usage",
        "Ongoing monitoring & prevention"
      ],
      image: "/rodent-management.webp",
      href: "/services/rodent-management",
      popular: false
    },
    {
      title: "Ticks Treatment",
      description: "Effective treatment to eradicate ticks and prevent them from returning.",
      features: [
        "Tick treatment for pets & home",
        "Targeted pesticide application",
        "Preventative measures for future infestations",
        "Safe for pets & family"
      ],
      image: "/ticks-treatment.webp",
      href: "/services/ticks-treatment",
      popular: false
    },
    {
      title: "Honey Bee Removal",
      description: "Safe and humane removal of honey bee colonies from your property.",
      features: [
        "Bee colony removal",
        "Non-lethal methods",
        "Safe relocation of bees",
        "Expert beekeepers on hand"
      ],
      image: "/honey-bee-removal.webp",
      href: "/services/honey-bee-removal",
      popular: false
    },
    {
      title: "Pre-Construction Termite Treatment",
      description: "Preventive termite treatment applied before construction to ensure long-term protection.",
      features: [
        "Pre-construction soil treatment",
        "Effective barrier against termites",
        "Long-lasting protection",
        "No disruption to construction process"
      ],
      image: "/termite-treatment.webp",
      href: "/services/termite-treatment",
      popular: true
    },
    {
      title: "Post-Construction Termite Treatment",
      description: "Termite treatment applied after construction to eliminate and prevent termite infestations.",
      features: [
        "Post-construction drilling & injection",
        "Effective termite elimination",
        "Annual maintenance service",
        "Up to 5-year warranty"
      ],
      image: "/termite-treatment.webp",
      href: "/services/termite-treatment",
      popular: true
    },
    {
      title: "Mosquito Fogging – Commercial & Residential Areas",
      description: "Mosquito fogging services for both commercial and residential areas to reduce mosquito populations.",
      features: [
        "Outdoor mosquito fogging",
        "Larvicide treatment",
        "Monthly or one-time service",
        "Breeding site inspections"
      ],
      image: "/mosquito-control.webp",
      href: "/services/mosquito-control",
      popular: false
    }
  ];

  const alsoprovides = [
    {
      name: "Corporate office pest control",
      price: "On Inspection",
      description: "Pest control services for corporate offices"
    },
    {
      name: "Hotels & Resorts Pest Control",
      price: "On Inspection",
      description: "Pest control services for hotels and resorts"
    },
    {
      name: "Gdowns Pest Control",
      price: "On Inspection",
      description: "Pest control services for Gdowns"
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
            <h1 className="text-4xl font-bold text-ikontext mb-4">Our Pest Control Services</h1>
            <p className="text-xl text-ikontext mb-8">
              Tailored solutions for every infestation, delivered by licensed professionals with guaranteed results
            </p>
            <div className="flex justify-center flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 text-sm text-ikontext">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-ikongold" />
                Licensed & Insured
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-ikongold" />
                24/7 Emergency Service
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-ikongold" />
                100% Satisfaction Guarantee
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="relative flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
                {service.popular && (
                  <Badge className="absolute top-4 right-4 bg-ikongold text-white">Most Popular</Badge>
                )}
                <div className="relative h-48 md:h-64">
                  <Image src={service.image ?? "/placeholder.svg"} alt={service.title} fill className="object-cover" />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <p className="text-ikontext">{service.description}</p>
                </CardHeader>
                <CardContent className="flex flex-col flex-grow">
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-ikongold flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  {/* Spacer pushes the buttons down */}
                  <div className="flex-grow" />
                  <div className="flex gap-2 mt-4">
                    <Button className="flex-1 bg-ikongold text-ikontext hover:bg-ikontext hover:text-ikongold" onClick={() => router.push("/contact")}>
                      Book Now
                    </Button>
                    <Button variant="outline" className="flex-1 bg-transparent" onClick={() => router.push(service.href)}>
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Types */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <Card className="p-8">
              <CardHeader className="p-0 mb-6">
                <CardTitle className="text-2xl text-center">Residential Services</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="relative md:flex justify-center">
                  <Image
                    src="/residential.webp"
                    alt="IKON Pest Control technician at work"
                    width={600}
                    height={500}
                    className="rounded-lg shadow-2xl"
                  />
                </div>
                <a href="/contact">
                  <Button className="w-full mt-6 bg-ikongold text-ikontext hover:bg-ikontext hover:text-ikongold">Get Residential Quote</Button>
                </a>
              </CardContent>
            </Card>

            <Card className="p-8">
              <CardHeader className="p-0 mb-6">
                <CardTitle className="text-2xl text-center">Commercial Services</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="relative md:flex justify-center">
                  <Image
                    src="/commercial.webp"
                    alt="IKON Pest Control technician at work"
                    width={600}
                    height={500}
                    className="rounded-lg shadow-2xl"
                  />
                </div>
                <a href="/contact">
                  <Button className="w-full mt-6 text-ikontext bg-ikongold hover:bg-ikontext hover:text-ikongold">Get Commercial Quote</Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-ikontext mb-4">We also provide</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {alsoprovides.map((alsoprovides, index) => (
              <a href="/contact">
                <Card key={index} className="p-6 text-center">
                  <CardContent className="p-0">
                    <h3 className="font-semibold text-ikontext mb-2">{alsoprovides.name}</h3>
                    <p className="text-2xl font-bold text-ikongold mb-2">{alsoprovides.price}</p>
                    <p className="text-ikontext text-sm">{alsoprovides.description}</p>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </section>

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
