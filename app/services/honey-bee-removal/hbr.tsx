'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Shield, Phone, ArrowLeft, Home } from "lucide-react"
import { Icon } from 'lucide-react';
import { bee } from '@lucide/lab';
import Link from "next/link"
import { useMemo, useState } from "react"

const pricing = {
    "One Time": {
        "Honey Bee Removal": { RK: 1999, "1BHK": 1999, "2BHK": 2399, "3BHK": 2799, "4BHK": 3299 },
        "Wasp Removal": { RK: 1799, "1BHK": 1799, "2BHK": 2199, "3BHK": 2599, "4BHK": 3099 },
        "Hornet Nest Removal": { RK: 2499, "1BHK": 2499, "2BHK": 2899, "3BHK": 3299, "4BHK": 3799 },
        "Beehive Relocation": { RK: 2999, "1BHK": 2999, "2BHK": 3499, "3BHK": 3999, "4BHK": 4499 }
    }
} as const;

type Freq = keyof typeof pricing;
type ProductType = keyof typeof pricing["One Time"];
type FlatType = keyof typeof pricing["One Time"]["Honey Bee Removal"];

export default function HoneyBeeRemovalPage() {
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
            alert("Please enter a valid 10-digit phone number.");
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
                setMessage("Quote request sent successfully!");
                setPhone("");
                setComments("");
            } else {
                setMessage("Failed to send. Please try again.");
            }
        } catch {
            setMessage("Network error. Please try again later.");
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
                        <span className="text-ikontext">Honey Bee Removal</span>
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
                            <h1 className="text-4xl font-bold text-ikontext mb-4">Honey Bee Removal</h1>
                            <p className="text-xl text-ikontext mb-6">
                                Professional and humane bee removal services that prioritize both your safety and bee
                                conservation. We relocate beehives to safe environments rather than exterminating
                                these vital pollinators.
                            </p>
                            <div className="flex flex-col xl:flex-row gap-4">
                                <a href="tel:9892865620">
                                    <Button size="lg" className="bg-ikongold text-ikontext text-xl hover:bg-ikontext hover:text-ikongold">
                                        <Phone className="mr-2 h-5 w-5" />
                                        Call 98928 65620
                                    </Button>
                                </a>
                                <a href="/contact">
                                    <Button size="lg" variant="outline" className="text-ikontext text-xl">
                                        Free Inspection
                                    </Button>
                                </a>
                            </div>
                        </div>
                        <Card className="p-6 bg-amber-50 border-ikongold">
                            <CardContent className="p-0 space-y-6">
                                <h3 className="font-semibold text-ikontext text-lg mb-2">Get Instant Quote</h3>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-ikontext mb-1">Service Type</label>
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
                                        <p className="text-sm text-ikontext">{frequency} cost</p>
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

                                    {message && (
                                        <p className={`text-sm mt-2 ${message.includes("success") ? "text-green-600" : "text-red-600"}`}>
                                            {message}
                                        </p>
                                    )}

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

            {/* Service Types */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-ikontext mb-4">Our Bee & Wasp Services</h2>
                        <p className="text-ikontext max-w-2xl mx-auto">
                            We offer comprehensive solutions for dealing with stinging insects while prioritizing
                            ecological balance and human safety.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        <Card className="p-8">
                            <CardHeader className="p-0 mb-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <Icon iconNode={bee} className="h-8 w-8 text-ikongold" />
                                    <CardTitle className="text-2xl">Honey Bee Removal</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                <p className="text-ikontext mb-6">
                                    Humane relocation of honey bee colonies to apiaries or protected environments,
                                    preserving these important pollinators while removing them from your property.
                                </p>
                                <div className="space-y-3 mb-6">
                                    <h4 className="font-semibold text-ikontext">Our Approach:</h4>
                                    {[
                                        "Smoke-free bee removal techniques",
                                        "Queen bee extraction",
                                        "Complete hive removal",
                                        "Wax and honey cleanup",
                                        "Structural repairs if needed",
                                        "Relocation to approved apiaries"
                                    ].map((area, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-ikongold flex-shrink-0" />
                                            <span className="text-sm text-ikontext">{area}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="bg-red-50 p-4 rounded-lg">
                                    <p className="text-sm text-ikontext">
                                        <strong>Eco-Friendly:</strong> 100% of rescued bees are relocated to safe environments.</p>
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
                                        className="border-ikongold text-xl text-ikontext hover:bg-gray-100 hover:text-ikongold bg-transparent"
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
                                    <Shield className="h-8 w-8 text-ikongold" />
                                    <CardTitle className="text-2xl">Wasp & Hornet Control</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                <p className="text-ikontext mb-6">
                                    Safe removal of aggressive wasp and hornet nests with eco-sensitive methods that
                                    minimize environmental impact while ensuring your family's safety.
                                </p>
                                <div className="space-y-3 mb-6">
                                    <h4 className="font-semibold text-ikontext">Treatment Methods:</h4>
                                    {[
                                        "Low-toxicity aerosol applications",
                                        "Ground nest treatments",
                                        "Eaves and structure nest removal",
                                        "Preventive barrier treatments",
                                        "Natural repellent options",
                                        "Night-time removal for safety"
                                    ].map((method, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-ikongold flex-shrink-0" />
                                            <span className="text-sm text-ikontext">{method}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="bg-red-50 p-4 rounded-lg">
                                    <p className="text-sm text-ikontext">
                                        <strong>24/7 Emergency Service:</strong> Available for immediate response to
                                        dangerous nest locations.
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
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Signs of Bee Infestation */}
                            <Card className="p-8">
                                <CardHeader className="p-0 mb-6">
                                    <CardTitle className="text-ikontext text-2xl">Signs You Need Bee/Wasp Removal</CardTitle>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <h3 className="font-semibold text-ikontext mb-3">Visible Signs</h3>
                                            <ul className="space-y-2">
                                                {[
                                                    "Increased bee/wasp activity",
                                                    "Visible nest or hive structure",
                                                    "Bees entering/exiting wall voids",
                                                    "Swarms on tree branches",
                                                    "Holes in the ground with flying insects"
                                                ].map((sign, index) => (
                                                    <li key={index} className="flex items-center text-ikontext gap-2 text-sm">
                                                        <CheckCircle className="h-4 w-4 text-ikongold flex-shrink-0" />
                                                        {sign}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-ikontext mb-3">Risk Indicators</h3>
                                            <ul className="space-y-2">
                                                {[
                                                    "Allergic family members",
                                                    "Nest near entryways",
                                                    "Aggressive insect behavior",
                                                    "Children/pets play nearby",
                                                    "Structural damage from hive"
                                                ].map((indicator, index) => (
                                                    <li key={index} className="flex items-center text-ikontext gap-2 text-sm">
                                                        <CheckCircle className="h-4 w-4 text-ikongold flex-shrink-0" />
                                                        {indicator}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                                        <p className="text-red-800 text-sm">
                                            <strong>Safety First:</strong> Never attempt to remove a beehive or wasp nest yourself.
                                            Professional equipment and techniques are required for safe removal.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Treatment Process */}
                            <Card className="p-8">
                                <CardHeader className="p-0 mb-6">
                                    <CardTitle className="text-ikontext text-2xl">Our Bee Removal Process</CardTitle>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="space-y-6">
                                        {[
                                            {
                                                step: "1",
                                                title: "Inspection & Assessment",
                                                description:
                                                    "Detailed property examination to locate all hives/nests and identify species to determine appropriate removal method.",
                                            },
                                            {
                                                step: "2",
                                                title: "Safety Preparation",
                                                description:
                                                    "Securing area, using protective gear, and setting up containment to ensure safety during removal.",
                                            },
                                            {
                                                step: "3",
                                                title: "Humane Extraction",
                                                description:
                                                    "Careful removal of bees using specialized equipment to preserve the colony's health for relocation.",
                                            },
                                            {
                                                step: "4",
                                                title: "Nest Removal & Cleanup",
                                                description:
                                                    "Thorough removal of honeycombs, wax, and residue to prevent future infestations and secondary pests.",
                                            },
                                            {
                                                step: "5",
                                                title: "Prevention & Follow-up",
                                                description:
                                                    "Sealing entry points and providing recommendations to reduce future bee/wasp attraction to your property.",
                                            }
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

                            {/* Benefits */}
                            <Card className="p-8">
                                <CardHeader className="p-0 mb-6">
                                    <CardTitle className="text-ikontext text-2xl">Why Choose Our Bee Removal</CardTitle>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {[
                                            "Certified beekeepers on staff",
                                            "Pet-safe treatment options",
                                            "Licensed & insured professionals",
                                            "No harmful pesticides",
                                            "100% bee relocation guarantee",
                                            "5-star emergency response",
                                            "Structural repair services",
                                            "Prevention maintenance plans"
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
                                    <CardTitle className="text-lg">Service Pricing</CardTitle>
                                </CardHeader>
                                <CardContent className="p-0 space-y-4">
                                    <div className="border-b pb-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium">Bee Removal (Standard)</span>
                                            <span className="text-sm text-ikongold">₹2,000-5,000</span>
                                        </div>
                                        <p className="text-xs text-ikontext">Depending on hive size/location</p>
                                    </div>
                                    <div className="border-b pb-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium">Wasp/Hornet Nest</span>
                                            <span className="text-sm text-ikongold">₹1,800-4,500</span>
                                        </div>
                                        <p className="text-xs text-ikontext">Based on nest size and accessibility</p>
                                    </div>
                                    <div className="border-b pb-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium">Beehive Relocation</span>
                                            <span className="text-sm text-ikongold">₹3,000-7,500</span>
                                        </div>
                                        <p className="text-xs text-ikontext">With complete colony transfer</p>
                                    </div>
                                    <div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium">Emergency Service</span>
                                            <span className="text-sm text-ikongold">+₹1,000</span>
                                        </div>
                                        <p className="text-xs text-ikontext">Same-day or after-hours service</p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Warranty Info */}
                            <Card className="p-6 bg-blue-50 border-blue-200">
                                <CardContent className="p-0">
                                    <h3 className="font-semibold text-ikontext mb-2">Service Guarantee</h3>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span>Bee Removal:</span>
                                            <span className="font-semibold">90 days warranty</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Wasp Removal:</span>
                                            <span className="font-semibold">30 days warranty</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Relocation:</span>
                                            <span className="font-semibold">Colony survival guarantee</span>
                                        </div>
                                    </div>
                                    <p className="text-xs text-blue-600 mt-3">
                                        Free return service if problem persists during warranty period
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Emergency Card */}
                            <Card className="p-6 bg-amber-50 border-ikongold">
                                <CardContent className="p-0 space-y-3">
                                    <h3 className="font-semibold text-ikontext mb-1">Emergency Bee/Wasp Removal</h3>
                                    <p className="text-sm text-ikontext">
                                        Available 24/7 for dangerous situations and allergic reactions.
                                    </p>
                                    <Button asChild className="w-full bg-ikongold text-xl hover:bg-ikontext hover:text-ikongold text-ikontext mt-2">
                                        <a href="tel:9892865620">
                                            <Phone className="mr-2 h-4 w-4" />
                                            Call Now: 98928 65620
                                        </a>
                                    </Button>
                                    <div className="bg-white p-2 mt-2 rounded text-xs text-ikontext border border-ikongold">
                                        <p><strong>For bee stings:</strong> Remove stinger, clean area, apply cold compress, monitor for allergic reaction.</p>
                                    </div>
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
