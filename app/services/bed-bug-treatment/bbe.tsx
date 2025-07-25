'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Shield, Clock, Star, Phone, ArrowLeft, Thermometer, Zap } from "lucide-react"
import Link from "next/link"
import { useMemo, useState } from "react"

const pricing = {
    "One Time": {
        "Bed Bug Treatment": { RK: 1499, "1BHK": 1599, "2BHK": 1799, "3BHK": 1999, "4BHK": 2299 },
        "General Disinfectant": { RK: 799, "1BHK": 799, "2BHK": 999, "3BHK": 1199, "4BHK": 1399 },
        "Termite Treatment": { RK: 999, "1BHK": 1299, "2BHK": 1499, "3BHK": 1699, "4BHK": 1899 },
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

export default function BedBugControlPage() {

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
                        <span className="text-ikontext">Bed Bug Treatment</span>
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
                            <Badge className="bg-red-100 text-red-800 hover:bg-red-100 mb-4">Urgent Treatment Required</Badge>
                            <h1 className="text-4xl font-bold text-ikontext mb-4">Bed Bug Treatment</h1>
                            <p className="text-xl text-ikontext mb-6">
                                Complete bed bug elimination using advanced heat treatment and safe chemical methods. Get rid of bed
                                bugs permanently with our proven treatment protocols and follow-up services.
                            </p>
                            <div className="flex flex-col xl:flex-row gap-4">
                                <a href="tel:9892865620">
                                    <Button size="lg" className="bg-ikongold text-xl text-ikontext hover:bg-ikontext hover:text-ikongold">
                                        <Phone className="mr-2 h-5 w-5" />
                                        Emergency: 98928 65620
                                    </Button>
                                </a>
                                <a href="/contact">
                                    <Button size="lg" variant="outline" className="text-ikontext text-xl">
                                        Free Bed Bug Inspection
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

                                    <div className="flex flex-col gap-2">
                                        <Button
                                            type="submit"
                                            className="w-full bg-ikongold hover:bg-ikontext hover:text-ikongold text-ikontext"
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

            {/* Treatment Methods */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-ikontext mb-4">Our Bed Bug Treatment Methods</h2>
                        <p className="text-ikontext max-w-2xl mx-auto">
                            We use multiple treatment approaches to ensure complete bed bug elimination with long-lasting results
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        <Card className="p-8">
                            <CardHeader className="p-0 mb-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <Thermometer className="h-8 w-8 text-ikongold" />
                                    <CardTitle className="text-2xl">Heat Treatment</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                <p className="text-ikontext mb-6">
                                    Professional heat treatment that raises room temperature to 120-140°F, effectively killing bed bugs
                                    and their eggs in all life stages without chemicals.
                                </p>
                                <div className="space-y-3 mb-6">
                                    <h4 className="font-semibold text-ikontext">Advantages:</h4>
                                    {[
                                        "100% chemical-free treatment",
                                        "Kills all life stages instantly",
                                        "Penetrates deep into furniture",
                                        "No preparation required",
                                        "Same-day results",
                                    ].map((advantage, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-ikongold flex-shrink-0" />
                                            <span className="text-sm text-ikontext">{advantage}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="bg-red-50 p-4 rounded-lg">
                                    <p className="text-sm text-red-800">
                                        <strong>Most Effective:</strong> 99% success rate in single treatment. Ideal for severe
                                        infestations.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="p-8">
                            <CardHeader className="p-0 mb-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <Zap className="h-8 w-8 text-ikongold" />
                                    <CardTitle className="text-2xl">Chemical Treatment</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                <p className="text-ikontext mb-6">
                                    Targeted application of WHO-approved insecticides specifically designed for bed bug control. Safe for
                                    family use with residual protection.
                                </p>
                                <div className="space-y-3 mb-6">
                                    <h4 className="font-semibold text-ikontext">Features:</h4>
                                    {[
                                        "WHO-approved chemicals only",
                                        "Residual protection for weeks",
                                        "Safe for children & pets",
                                        "Odorless formulations",
                                        "Multiple follow-up treatments",
                                    ].map((feature, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-ikongold flex-shrink-0" />
                                            <span className="text-sm text-ikontext">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="bg-green-50 p-4 rounded-lg">
                                    <p className="text-sm text-green-800">
                                        <strong>Cost-Effective:</strong> Budget-friendly option with excellent results for light to moderate
                                        infestations.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Service Details */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Signs of Bed Bug Infestation */}
                            <Card className="p-8">
                                <CardHeader className="p-0 mb-6">
                                    <CardTitle className="text-2xl">Signs of Bed Bug Infestation</CardTitle>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <h3 className="font-semibold text-ikontext mb-3">Physical Evidence</h3>
                                            <ul className="space-y-2">
                                                {[
                                                    "Blood stains on sheets",
                                                    "Dark/rust spots on mattress",
                                                    "Sweet musty odor in bedroom",
                                                    "Red/brown fecal spots",
                                                    "Shed skins from molting",
                                                ].map((sign, index) => (
                                                    <li key={index} className="flex items-center gap-2 text-sm">
                                                        <CheckCircle className="h-4 w-4 text-ikongold flex-shrink-0" />
                                                        {sign}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-ikontext mb-3">Bite Symptoms</h3>
                                            <ul className="space-y-2">
                                                {[
                                                    "Red, itchy welts on skin",
                                                    "Bites in lines or clusters",
                                                    "Bites on exposed areas",
                                                    "Allergic reactions",
                                                    "Sleep disturbance",
                                                ].map((symptom, index) => (
                                                    <li key={index} className="flex items-center gap-2 text-sm">
                                                        <CheckCircle className="h-4 w-4 text-ikongold flex-shrink-0" />
                                                        {symptom}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                                        <p className="text-yellow-800 text-sm">
                                            <strong>Act Fast:</strong> Bed bugs multiply rapidly. Early treatment prevents widespread
                                            infestation and reduces treatment costs.
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
                                                title: "Thorough Inspection",
                                                description:
                                                    "Complete bedroom and furniture inspection to locate all bed bug hiding spots and assess infestation level.",
                                            },
                                            {
                                                step: "2",
                                                title: "Treatment Method Selection",
                                                description:
                                                    "Choose optimal treatment method (heat or chemical) based on infestation severity and customer preference.",
                                            },
                                            {
                                                step: "3",
                                                title: "Professional Treatment",
                                                description:
                                                    "Execute treatment protocol with proper safety measures and equipment for maximum effectiveness.",
                                            },
                                            {
                                                step: "4",
                                                title: "Follow-up & Monitoring",
                                                description:
                                                    "Schedule follow-up visits to ensure complete elimination and provide additional treatments if needed.",
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

                            {/* Preparation Guidelines */}
                            <Card className="p-8">
                                <CardHeader className="p-0 mb-6">
                                    <CardTitle className="text-2xl">Pre-Treatment Preparation</CardTitle>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <h3 className="font-semibold text-ikontext mb-3">For Heat Treatment</h3>
                                            <ul className="space-y-2">
                                                {[
                                                    "Remove heat-sensitive items",
                                                    "Clear access to all furniture",
                                                    "Remove pets from treatment area",
                                                    "Ensure electrical safety",
                                                    "No preparation of bedding required",
                                                ].map((prep, index) => (
                                                    <li key={index} className="flex items-center gap-2 text-sm">
                                                        <CheckCircle className="h-4 w-4 text-ikongold flex-shrink-0" />
                                                        {prep}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-ikontext mb-3">For Chemical Treatment</h3>
                                            <ul className="space-y-2">
                                                {[
                                                    "Wash and dry all bedding",
                                                    "Vacuum mattress and furniture",
                                                    "Clear clutter from bedroom",
                                                    "Remove food items",
                                                    "Arrange temporary accommodation",
                                                ].map((prep, index) => (
                                                    <li key={index} className="flex items-center gap-2 text-sm">
                                                        <CheckCircle className="h-4 w-4 text-ikongold flex-shrink-0" />
                                                        {prep}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">

                            {/* Treatment Pricing */}
                            <Card className="p-6">
                                <CardHeader className="p-0 mb-4">
                                    <CardTitle className="text-lg">Treatment Pricing</CardTitle>
                                </CardHeader>
                                <CardContent className="p-0 space-y-4">
                                    <div className="border-b pb-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium">Heat Treatment</span>
                                            <span className="text-sm text-ikongold">₹8,000-15,000</span>
                                        </div>
                                        <p className="text-xs text-ikontext">Single room treatment</p>
                                    </div>
                                    <div className="border-b pb-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium">Chemical Treatment</span>
                                            <span className="text-sm text-ikongold">₹3,000-6,000</span>
                                        </div>
                                        <p className="text-xs text-ikontext">Per room with follow-ups</p>
                                    </div>
                                    <div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium">Full House Treatment</span>
                                            <span className="text-sm text-ikongold">₹15,000+</span>
                                        </div>
                                        <p className="text-xs text-ikontext">Complete home treatment</p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Service Features */}
                            <Card className="p-6">
                                <CardHeader className="p-0 mb-4">
                                    <CardTitle className="text-lg">Service Highlights</CardTitle>
                                </CardHeader>
                                <CardContent className="p-0 space-y-3">
                                    <div className="flex items-center gap-3">
                                        <Shield className="h-5 w-5 text-ikongold" />
                                        <span className="text-sm">100% Safe Treatment</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Clock className="h-5 w-5 text-ikongold" />
                                        <span className="text-sm">Same Day Results</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Star className="h-5 w-5 text-ikongold" />
                                        <span className="text-sm">3 Months Warranty</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle className="h-5 w-5 text-ikongold" />
                                        <span className="text-sm">Follow-up Included</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold text-ikontext mb-8 text-center">Bed Bug Treatment FAQs</h2>
                        <div className="space-y-6">
                            {[
                                {
                                    question: "How long does bed bug treatment take?",
                                    answer:
                                        "Heat treatment takes 6-8 hours for complete elimination. Chemical treatment takes 2-3 hours with follow-up visits over 2-3 weeks.",
                                },
                                {
                                    question: "Is the treatment safe for my family?",
                                    answer:
                                        "Yes, both heat and chemical treatments are completely safe. Heat treatment uses no chemicals, and our chemical treatments use WHO-approved, family-safe products.",
                                },
                                {
                                    question: "How effective is the treatment?",
                                    answer:
                                        "Heat treatment has 99% success rate in single session. Chemical treatment has 95% success rate with proper follow-up treatments.",
                                },
                                {
                                    question: "Do I need to throw away my mattress?",
                                    answer:
                                        "No, our treatments can eliminate bed bugs from mattresses and furniture. Replacement is rarely necessary with professional treatment.",
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
