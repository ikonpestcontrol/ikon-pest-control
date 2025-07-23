'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Shield, Phone, ArrowLeft, Home, Building } from "lucide-react"
import Link from "next/link"
import { useMemo, useState } from "react"

const pricing = {
    "One Time": {
        "Termite Treatment": { RK: 999, "1BHK": 1299, "2BHK": 1499, "3BHK": 1699, "4BHK": 1899 },
        "Bed Bug Treatment": { RK: 1499, "1BHK": 1599, "2BHK": 1799, "3BHK": 1999, "4BHK": 2299 },
        "General Disinfectant": { RK: 799, "1BHK": 799, "2BHK": 999, "3BHK": 1199, "4BHK": 1399 },
        "Wood Borer Treatment": { RK: 1799, "1BHK": 1799, "2BHK": 2199, "3BHK": 2599, "4BHK": 3099 },
        "Rat Control": { RK: 1199, "1BHK": 1399, "2BHK": 1599, "3BHK": 1899, "4BHK": 2199 },
        "Ticks Treatment": { RK: 1899, "1BHK": 1899, "2BHK": 2299, "3BHK": 2699, "4BHK": 3199 },
        "Mosquito Fogging": { RK: 799, "1BHK": 899, "2BHK": 1099, "3BHK": 1199, "4BHK": 1599 }
    },
    "1 Year AMC (12 months - 3 times)": {
        "General Disinfectant": { RK: 1999, "1BHK": 2199, "2BHK": 2399, "3BHK": 2599, "4BHK": 2899 },
        "Termite Treatment": { RK: 2899, "1BHK": 3099, "2BHK": 4299, "3BHK": 4899, "4BHK": 5599 },
        "Bed Bug Treatment": { RK: 4874, "1BHK": 4874, "2BHK": 3599, "3BHK": 3999, "4BHK": 4499 },
        "Wood Borer Treatment": { RK: 4449, "1BHK": 4449, "2BHK": 5449, "3BHK": 6449, "4BHK": 7749 },
        "Rat Control": { RK: 3099, "1BHK": 3499, "2BHK": 3899, "3BHK": 4499, "4BHK": 5199 },
        "Ticks Treatment": { RK: 4699, "1BHK": 4699, "2BHK": 5699, "3BHK": 6699, "4BHK": 8099 },
        "Mosquito Fogging": { RK: 1999, "1BHK": 2299, "2BHK": 2899, "3BHK": 3199, "4BHK": 3799 }
    },
    "2 Year AMC (24 months - 6 times)": {
        "General Disinfectant": { RK: 3799, "1BHK": 4199, "2BHK": 4599, "3BHK": 4999, "4BHK": 5599 },
        "Termite Treatment": { RK: 4899, "1BHK": 6099, "2BHK": 7199, "3BHK": 8199, "4BHK": 9399 },
        "Bed Bug Treatment": { RK: 7299, "1BHK": 8699, "2BHK": 9799, "3BHK": 10899, "4BHK": 12499 },
        "Wood Borer Treatment": { RK: 7199, "1BHK": 7199, "2BHK": 8799, "3BHK": 10399, "4BHK": 12699 },
        "Rat Control": { RK: 5999, "1BHK": 6499, "2BHK": 7499, "3BHK": 8499, "4BHK": 9499 },
        "Ticks Treatment": { RK: 7599, "1BHK": 7599, "2BHK": 9199, "3BHK": 10799, "4BHK": 12999 },
        "Mosquito Fogging": { RK: 4399, "1BHK": 4999, "2BHK": 5999, "3BHK": 6499, "4BHK": 7999 }
    }
} as const;


type Freq = keyof typeof pricing;
type ProductType = keyof typeof pricing["One Time"];
type FlatType = keyof typeof pricing["One Time"]["General Disinfectant"];

export default function TermiteTreatmentPage() {

    const productTypes = Object.keys(pricing["One Time"]) as ProductType[];
    const frequencies = Object.keys(pricing) as Freq[];
    const flatTypes = ["RK", "1BHK", "2BHK", "3BHK", "4BHK"] as FlatType[];

    const [productType, setProductType] = useState<ProductType>(productTypes[0]);
    const [frequency, setFrequency] = useState<Freq>("One Time");
    const [flatType, setFlatType] = useState<FlatType>("RK");
    const [comments, setComments] = useState("");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const cost = useMemo(() => pricing[frequency][productType][flatType], [frequency, productType, flatType]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!/^\d{10}$/.test(phone)) {
            alert("❌ Please enter a valid 10-digit phone number.");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("/api/send-quote", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    productType,
                    flatType,
                    frequency,
                    comments,
                    phone,
                    cost,
                }),
            });

            const result = await res.json();

            if (result.success) {
                alert("✅ Quote request sent!");
            } else {
                alert("❌ Failed to send. Please try again.");
            }
        } catch {
            alert("❌ Network error. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Breadcrumb */}
            <section className="bg-white py-4 border-b">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-2 text-sm text-ikontext">
                        <Link href="/" className="hover:text-ikongold">
                            Home
                        </Link>
                        <span>/</span>
                        <Link href="/services" className="hover:text-ikongold">
                            Services
                        </Link>
                        <span>/</span>
                        <span className="text-ikontext">Termite Treatment</span>
                    </div>
                </div>
            </section>

            {/* Header */}
            <section className="bg-white lg:py-16 py-5">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12">
                        <div>
                            <Link
                                href="/services"
                                className="inline-flex items-center gap-2 text-ikongold hover:text-ikongold mb-4"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Back to Services
                            </Link>
                            <Badge className="bg-red-100 text-red-800 hover:bg-red-100 mb-4">Critical Protection</Badge>
                            <h1 className="text-4xl font-bold text-ikontext mb-4">Termite Treatment</h1>
                            <p className="text-xl text-ikontext mb-6">
                                Comprehensive termite control solutions for both pre-construction and post-construction properties.
                                Protect your valuable investment from destructive termite damage with our proven treatment methods.
                            </p>
                            <div className="flex flex-col xl:flex-row gap-4">
                                <a href="tel:9892865620">
                                    <Button size="lg" className="bg-ikongold text-xl text-ikontext hover:bg-ikontext hover:text-ikongold">
                                        <Phone className="mr-2 h-5 w-5" />
                                        Call 98928 65620
                                    </Button>
                                </a>
                                <a href="/contact">
                                    <Button size="lg" variant="outline" className="text-xl text-ikontext hover:bg-gray-50">
                                        Free Termite Inspection
                                    </Button>
                                </a>
                            </div>
                        </div>
                        <Card className="p-6 bg-amber-50 border-ikongold">
                            <CardContent className="p-0 space-y-6">
                                <h3 className="font-semibold text-ikontext text-lg mb-2">Get Instant Quote</h3>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-ikontext mb-1">Product Type</label>
                                        <select
                                            className="w-full p-2 rounded border text-black"
                                            value={productType}
                                            onChange={(e) => setProductType(e.target.value as ProductType)}
                                        >
                                            {productTypes.map((pt) => (
                                                <option key={pt}>{pt}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-ikontext mb-1">Flat Type</label>
                                        <select
                                            className="w-full p-2 rounded border text-black"
                                            value={flatType}
                                            onChange={(e) => setFlatType(e.target.value as FlatType)}
                                        >
                                            {flatTypes.map((ft) => (
                                                <option key={ft}>{ft}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-ikontext mb-1">Service Frequency</label>
                                        <select
                                            className="w-full p-2 rounded border text-black"
                                            value={frequency}
                                            onChange={(e) => setFrequency(e.target.value as Freq)}
                                        >
                                            {frequencies.map((fr) => (
                                                <option key={fr}>{fr}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-ikontext mb-1">Phone Number</label>
                                        <input
                                            type="tel"
                                            placeholder="Phone Number"
                                            className="w-full p-2 rounded border text-black"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-ikongold">₹{cost.toLocaleString()}</p>
                                        <p className="text-sm text-ikontext">{frequency} cost for {flatType}</p>
                                    </div>

                                    <textarea
                                        className="w-full p-2 rounded border text-black"
                                        rows={3}
                                        placeholder="Additional Comments"
                                        value={comments}
                                        onChange={(e) => setComments(e.target.value)}
                                    />

                                    <div className="flex flex-col gap-2 text-ikontext">
                                        <Button
                                            type="submit"
                                            className="w-full text-ikontext bg-ikongold hover:bg-ikontext hover:text-ikongold "
                                            disabled={loading}
                                        >
                                            {loading ? "Sending..." : "Get Quote"}
                                        </Button>
                                        <Button variant="outline" asChild className="w-full text-xl bg-transparent">
                                            <a href="tel:9892865620">
                                                <Phone className="mr-2 h-4 w-4" />
                                                Call Now: 98928 65620
                                            </a>
                                        </Button>
                                    </div>

                                    <p className="text-xs text-ikontext mt-2">
                                        18% GST will be applicable on total service charges. <br />
                                        <span className="underline cursor-pointer">*Terms & Conditions apply</span>
                                    </p>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Treatment Types */}
            <section className="pt-8">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-ikontext mb-4">Our Termite Treatment Services</h2>
                        <p className="text-ikontext max-w-2xl mx-auto">
                            We offer both preventive and curative termite treatments using advanced methods and WHO-approved chemicals
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        <Card className="p-8">
                            <CardHeader className="p-0 mb-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <Building className="h-8 w-8 text-ikongold" />
                                    <CardTitle className="text-2xl">Pre-Construction Treatment</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                <p className="text-ikontext mb-6">
                                    Preventive termite treatment applied during construction phase to create a chemical barrier that
                                    prevents termite infestation for years to come.
                                </p>
                                <div className="space-y-3 mb-6">
                                    <h4 className="font-semibold text-ikontext">Treatment Areas:</h4>
                                    {[
                                        "Foundation soil treatment",
                                        "Plinth level treatment",
                                        "Backfill soil treatment",
                                        "Masonry treatment",
                                        "Wooden framework treatment",
                                    ].map((area, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-ikongold flex-shrink-0" />
                                            <span className="text-sm text-ikontext">{area}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="bg-red-50 p-4 rounded-lg">
                                    <p className="text-sm text-ikontext">
                                        <strong>Best Value:</strong> Most cost-effective when done during construction. Provides 5-10 years
                                        of protection.
                                    </p>
                                </div>
                                <div className="flex flex-col md:flex-col lg:flex-row gap-4 justify-center mt-4">
                                    <Button size="lg" asChild className="bg-ikongold text-ikontext text-xl hover:bg-ikontext hover:text-ikongold">
                                        <a href="tel:9892865620">
                                            <Phone className="mr-2 h-5 w-5" />
                                            Call 98928 65620
                                        </a>
                                    </Button>
                                    <Button
                                        size="lg"
                                        asChild
                                        variant="outline"
                                        className="border-ikongold text-ikontext hover:bg-gray-100 text-xl hover:text-ikongold bg-transparent"
                                    >
                                        <a href="/contact">
                                            Get Free Quote
                                        </a>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="p-8">
                            <CardHeader className="p-0 mb-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <Home className="h-8 w-8 text-ikongold" />
                                    <CardTitle className="text-2xl">Post-Construction Treatment</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                <p className="text-ikontext mb-6">
                                    Curative treatment for buildings showing signs of termite infestation. We eliminate current
                                    termites and create protective barriers.
                                </p>
                                <div className="space-y-3 mb-6">
                                    <h4 className="font-semibold text-ikontext">Treatment Methods:</h4>
                                    {[
                                        "Drilling & chemical injection",
                                        "Soil treatment around foundation",
                                        "Wood treatment for affected areas",
                                        "Localized spot treatment",
                                        "Monitoring & baiting systems",
                                    ].map((method, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-ikongold flex-shrink-0" />
                                            <span className="text-sm text-ikontext">{method}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="bg-red-50 p-4 rounded-lg">
                                    <p className="text-sm text-ikontext">
                                        <strong>Immediate Action:</strong> Quick response to active infestations. Includes damage assessment
                                        and repair.
                                    </p>
                                </div>
                                <div className="flex flex-col md:flex-col lg:flex-row gap-4 justify-center mt-4">
                                    <Button size="lg" asChild className="bg-ikongold text-xl text-ikontext hover:bg-ikontext hover:text-ikongold">
                                        <a href="tel:9892865620">
                                            <Phone className="mr-2 h-5 w-5" />
                                            Call 98928 65620
                                        </a>
                                    </Button>
                                    <Button
                                        size="lg"
                                        asChild
                                        variant="outline"
                                        className="border-ikongold text-ikontext text-xl hover:bg-gray-100 hover:text-ikongold bg-transparent"
                                    >
                                        <a href="/contact">
                                            Get Free Quote
                                        </a>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Service Details */}
            <section className="py-8 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Signs of Termite Infestation */}
                            <Card className="p-8">
                                <CardHeader className="p-0 mb-6">
                                    <CardTitle className="text-2xl">Signs You Need Termite Treatment</CardTitle>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <h3 className="font-semibold text-ikontext mb-3">Visible Signs</h3>
                                            <ul className="space-y-2">
                                                {[
                                                    "Mud tubes on walls/foundation",
                                                    "Hollow-sounding wood",
                                                    "Discarded wings near windows",
                                                    "Small holes in wood",
                                                    "Sagging floors or ceilings",
                                                ].map((sign, index) => (
                                                    <li key={index} className="flex items-center gap-2 text-sm">
                                                        <CheckCircle className="h-4 w-4 text-ikongold flex-shrink-0" />
                                                        {sign}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-ikontext mb-3">Other Indicators</h3>
                                            <ul className="space-y-2">
                                                {[
                                                    "Clicking sounds in walls",
                                                    "Tight-fitting doors/windows",
                                                    "Cracked paint on wood surfaces",
                                                    "Frass (termite droppings)",
                                                    "Swarms of flying insects",
                                                ].map((indicator, index) => (
                                                    <li key={index} className="flex items-center gap-2 text-sm">
                                                        <CheckCircle className="h-4 w-4 text-ikongold flex-shrink-0" />
                                                        {indicator}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                                        <p className="text-red-800 text-sm">
                                            <strong>Early Detection is Key:</strong> The sooner termite infestation is detected and treated,
                                            the less damage and lower the treatment cost.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Treatment Process */}
                            <Card className="p-8">
                                <CardHeader className="p-0 mb-6">
                                    <CardTitle className="text-2xl">Our Treatment Process</CardTitle>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="space-y-6">
                                        {[
                                            {
                                                step: "1",
                                                title: "Detailed Inspection",
                                                description:
                                                    "Comprehensive property assessment to identify termite species, infestation extent, and damage evaluation.",
                                            },
                                            {
                                                step: "2",
                                                title: "Treatment Plan",
                                                description:
                                                    "Customized treatment strategy based on property type, infestation level, and construction details.",
                                            },
                                            {
                                                step: "3",
                                                title: "Chemical Application",
                                                description:
                                                    "Professional application of WHO-approved termiticides using drilling, injection, and barrier methods.",
                                            },
                                            {
                                                step: "4",
                                                title: "Monitoring & Follow-up",
                                                description:
                                                    "Regular monitoring visits and additional treatments if required during warranty period.",
                                            },
                                        ].map((process, index) => (
                                            <div key={index} className="flex gap-4">
                                                <div className="bg-ikongold text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                                                    {process.step}
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-ikontext mb-2">{process.title}</h3>
                                                    <p className="text-ikontext text-sm">{process.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Chemicals Used */}
                            <Card className="p-8">
                                <CardHeader className="p-0 mb-6">
                                    <CardTitle className="text-2xl">Safe & Effective Chemicals</CardTitle>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {[
                                            "WHO approved termiticides",
                                            "Long-lasting protection (5-10 years)",
                                            "Safe for humans and pets",
                                            "Environmentally responsible",
                                            "Odorless formulations",
                                            "Government certified products",
                                            "Non-staining chemicals",
                                            "Proven effectiveness against all termite species",
                                        ].map((feature, index) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <Shield className="h-5 w-5 text-ikongold flex-shrink-0" />
                                                <span className="text-ikontext">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">

                            {/* Pricing Guide */}
                            <Card className="p-6">
                                <CardHeader className="p-0 mb-4">
                                    <CardTitle className="text-lg">Treatment Pricing</CardTitle>
                                </CardHeader>
                                <CardContent className="p-0 space-y-4">
                                    <div className="border-b pb-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium">Pre-Construction</span>
                                            <span className="text-sm text-ikongold">₹8-12/sq ft</span>
                                        </div>
                                        <p className="text-xs text-ikontext">During construction phase</p>
                                    </div>
                                    <div className="border-b pb-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium">Post-Construction</span>
                                            <span className="text-sm text-ikongold">₹15-25/sq ft</span>
                                        </div>
                                        <p className="text-xs text-ikontext">Existing buildings</p>
                                    </div>
                                    <div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium">Spot Treatment</span>
                                            <span className="text-sm text-ikongold">₹5,000+</span>
                                        </div>
                                        <p className="text-xs text-ikontext">Localized treatment</p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Warranty Info */}
                            <Card className="p-6 bg-blue-50 border-blue-200">
                                <CardContent className="p-0">
                                    <h3 className="font-semibold text-ikontext mb-2">Warranty Coverage</h3>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span>Pre-Construction:</span>
                                            <span className="font-semibold">5-10 years</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Post-Construction:</span>
                                            <span className="font-semibold">3-5 years</span>
                                        </div>
                                    </div>
                                    <p className="text-xs text-blue-600 mt-3">
                                        Free re-treatment if termites return during warranty period
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
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
