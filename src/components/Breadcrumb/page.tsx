/**
 * Breadcrumb Navigation Component
 * 
 * Purpose: SEO-friendly breadcrumb navigation with schema.org markup
 * 
 * Features:
 * - Automatic breadcrumb trail generation
 * - Schema.org BreadcrumbList structured data
 * - Responsive design
 * - Hover effects
 */

"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
    label: string;
    href: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

/**
 * Breadcrumb Component
 * 
 * @param items - Array of breadcrumb items
 * @returns SEO-friendly breadcrumb navigation
 */
export default function Breadcrumb({ items }: BreadcrumbProps) {
    // Generate JSON-LD for breadcrumbs
    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.waysprivate.com.np"
            },
            ...items.map((item, index) => ({
                "@type": "ListItem",
                "position": index + 2,
                "name": item.label,
                "item": `https://www.waysprivate.com.np${item.href}`
            }))
        ]
    };

    return (
        <>
            {/* JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />

            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="py-4">
                <ol className="flex items-center gap-2 text-sm">
                    {/* Home Link */}
                    <li>
                        <Link
                            href="/"
                            className="flex items-center gap-1 text-slate-400 hover:text-blue-400 transition-colors"
                        >
                            <Home className="w-4 h-4" />
                            <span>Home</span>
                        </Link>
                    </li>

                    {/* Breadcrumb Items */}
                    {items.map((item, index) => {
                        const isLast = index === items.length - 1;

                        return (
                            <li key={item.href} className="flex items-center gap-2">
                                <ChevronRight className="w-4 h-4 text-slate-600" />
                                {isLast ? (
                                    <span className="text-white font-medium" aria-current="page">
                                        {item.label}
                                    </span>
                                ) : (
                                    <Link
                                        href={item.href}
                                        className="text-slate-400 hover:text-blue-400 transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                )}
                            </li>
                        );
                    })}
                </ol>
            </nav>
        </>
    );
}
