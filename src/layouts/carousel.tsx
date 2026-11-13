"use client";

import { useState } from "react";
import { MoveLeft, MoveRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

interface BlogPost {
    id: string;
    category: string;
    badgeType?: "paid" | "free";
    badgeText?: string;
    date: string;
    readTime: string;
    title: string;
    excerpt: string;
    image: string;
}

const BLOG_POSTS: BlogPost[] = [
    {
        id: "1",
        category: "Architecture",
        badgeType: "paid",
        badgeText: "Paid - UGX 10,000",
        date: "Oct 24, 2026",
        readTime: "8 min read",
        title: "From code camps to building real websites that ship.",
        excerpt: "Honest lessons from learning software development, pushing projects to Vercel and figuring out what it takes to build a solid portfolio.",
        image: "public/codesamp.jpg",
    },
    {
        id: "2",
        category: "Technology",
        badgeType: "free",
        badgeText: "Free",
        date: "Nov 02, 2026",
        readTime: "5 min read",
        title: "What working at a health centre taught me about real-world data.",
        excerpt: "Moving past basic coding tutorials and looking at how keeping digital records and patient info organized actually helps day-to-day operations.",
        image: "public/health.jpg",
    },
    {
        id: "3",
        category: "Architecture",
        badgeType: "paid",
        badgeText: "Paid - UGX 5,000",
        date: "Nov 14, 2026",
        readTime: "12 min read",
        title: "Automating my workflow: How I use Zapier and Google tools to save time.",
        excerpt: "Simple ways to connect your apps, handle emails automatically and stop doing repetitive manual tasks.",
        image: "public/zapier.jpg",
    },
];

export function CarouselSection() {
    const [activeCategory, setActiveCategory] = useState("All");

    return (
        <section className="max-w-7xl mx-auto px-6 py-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                <div className="flex flex-col space-y-2">
                    <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" aria-hidden="true" />
                        <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">
                            The tech report archive.
                        </span>
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-neutral-900">
                        Recent Blogs
                    </h2>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-1.5 bg-neutral-100 p-1 rounded-full text-xs font-medium text-neutral-600">
                        {["All", "Web Dev & Design", "Operations & Data", "Career & Learning"].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-3.5 py-1.5 rounded-full transition-colors ${activeCategory === cat
                                        ? "bg-white text-neutral-900 shadow-sm"
                                        : "hover:text-neutral-900"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="text-xs font-mono font-medium text-neutral-500">
                            01 / 04
                        </span>

                        <div className="flex items-center gap-1">
                            <button
                                type="button"
                                aria-label="Previous slide"
                                className={buttonVariants({
                                    variant: "outline",
                                    size: "icon-sm",
                                    className: "rounded-none border-neutral-300 text-neutral-800 hover:bg-neutral-100 flex items-center justify-center w-8 h-8",
                                })}
                            >
                                <MoveLeft className="h-4 w-4" />
                            </button>
                            <button
                                type="button"
                                aria-label="Next slide"
                                className={buttonVariants({
                                    variant: "outline",
                                    size: "icon-sm",
                                    className: "rounded-none border-neutral-300 text-neutral-800 hover:bg-neutral-100 flex items-center justify-center w-8 h-8",
                                })}
                            >
                                <MoveRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {BLOG_POSTS.map((post) => (
                    <article
                        key={post.id}
                        className="group bg-white border border-neutral-200 rounded-2xl overflow-hidden flex flex-col transition-all hover:border-neutral-300"
                    >
                        <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
                            <img
                                src={post.image}
                                alt={post.title}
                                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                            <div className="flex items-center justify-between text-xs text-neutral-500 mb-3">
                                <span className="font-medium text-neutral-800">{post.category}</span>
                                {post.badgeText && (
                                    <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-neutral-100 text-neutral-600 border border-neutral-200">
                                        {post.badgeText}
                                    </span>
                                )}
                            </div>

                            <div className="text-xs text-neutral-400 mb-3 font-medium">
                                {post.date} · {post.readTime}
                            </div>
                            <h3 className="text-lg font-bold text-neutral-900 group-hover:text-neutral-600 transition-colors mb-2 leading-snug">
                                {post.title}
                            </h3>
                            <p className="text-sm text-neutral-600 mb-6 line-clamp-2">
                                {post.excerpt}
                            </p>
                            <div className="mt-auto pt-4 border-t border-neutral-100">
                                <a
                                    href="#"
                                    className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-neutral-900 hover:underline"
                                >
                                    Read →
                                </a>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}