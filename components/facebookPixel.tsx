"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

declare global {
    interface Window {
        fbq: any;
    }
}

const FacebookPixel = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        const url = `${pathname}${searchParams?.toString() ? `?${searchParams.toString()}` : ""}`;
        if (typeof window.fbq === "function") {
            try {
                window.fbq("track", "PageView");
            } catch (e) {
                console.error("Facebook Pixel tracking failed:", e);
            }
        }

    }, [pathname, searchParams]);

    return null;
};

export default FacebookPixel;
