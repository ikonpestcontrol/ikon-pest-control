"use client";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone } from "lucide-react";

const pricing = {
    "One Time": {
        "General Disinfectant": { RK: 799, "1BHK": 799, "2BHK": 999, "3BHK": 1199, "4BHK": 1399 },
        "Termite Treatment": { RK: 999, "1BHK": 1299, "2BHK": 1499, "3BHK": 1699, "4BHK": 1899 },
        "Bed Bug Treatment": { RK: 1499, "1BHK": 1599, "2BHK": 1799, "3BHK": 1999, "4BHK": 2299 },
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

export default function QuoteCard() {
    const productTypes = Object.keys(pricing["One Time"]) as ProductType[];
    const frequencies = Object.keys(pricing) as Freq[];
    const flatTypes = ["RK", "1BHK", "2BHK", "3BHK", "4BHK"] as FlatType[];

    const [productType, setProductType] = useState<ProductType>(productTypes[0]);
    const [frequency, setFrequency] = useState<Freq>("One Time");
    const [flatType, setFlatType] = useState<FlatType>("RK");
    const [comments, setComments] = useState("");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);

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
                            className="w-full bg-ikongold hover:bg-ikontext hover:text-ikongold text-white"
                            disabled={loading}
                        >
                            {loading ? "Sending..." : "Get Quote"}
                        </Button>
                        <Button variant="outline" asChild className="w-full bg-transparent">
                            <a href="tel:9892865620">
                                <Phone className="mr-2 h-4 w-4" />
                                Call Now: 98928 65620
                            </a>
                        </Button>
                    </div>

                    <p className="text-xs text-ikontext mt-2">
                        18% GST will be applicable on total service charges. <br />
                        <span className="underline cursor-pointer"><a href="/terms">*Terms & Conditions apply</a></span>
                    </p>
                </form>
            </CardContent>
        </Card>
    );
}
