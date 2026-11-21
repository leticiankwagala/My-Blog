"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { MoveLeft, MoveRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Button } from "@base-ui/react/button";
import { useNavigate } from "../navigation/RouterContext";
import { PATHS } from "../navigation/paths";
import { api } from "../../convex/_generated/api";

export function CarouselSection() {
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState("All");
    const blogs = useQuery(api.blog.listPublishedBlogs);
    const visibleBlogs = (blogs ?? []).filter(
        (blog) => activeCategory === "All" || blog.category === activeCategory,
    );

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
                {blogs === undefined ? (
                    <p className="col-span-full py-10 text-center text-sm text-neutral-500" role="status">
                        Loading recent blogs...
                    </p>
                ) : visibleBlogs.length === 0 ? (
                    <p className="col-span-full py-10 text-center text-sm text-neutral-500">
                        {activeCategory === "All"
                            ? "No published blogs yet."
                            : "No published blogs in this category yet."}
                    </p>
                ) : visibleBlogs.map((post) => (
                    <article
                        key={post._id}
                        onClick={() => navigate(PATHS.BLOG_DETAILS, { search: `?id=${post._id}` })}
                        className="group bg-white border border-neutral-200 rounded-2xl overflow-hidden flex flex-col transition-all hover:border-neutral-300"
                    >
                        <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
                            {post.coverImageUrl ? (
                                <img
                                    src={post.coverImageUrl}
                                    alt={post.coverImageData.alt}
                                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center text-sm text-neutral-400">
                                    No cover image
                                </div>
                            )}
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                            <div className="flex items-center justify-between text-xs text-neutral-500 mb-3">
                                <span className="font-medium text-neutral-800">{post.category}</span>
                                <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-neutral-100 text-neutral-600 border border-neutral-200">
                                    {post.badgeLabel ??
                                        (post.subscriptionMode === "paid"
                                            ? `Paid · ${post.price.currency} ${post.price.amount.toLocaleString()}`
                                            : "Free")}
                                </span>
                            </div>

                            <div className="text-xs text-neutral-400 mb-3 font-medium">
                                {new Intl.DateTimeFormat("en", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                }).format(new Date(post._creationTime))}{" "}
                                · {post.readTime}
                            </div>
                            <h3 className="text-lg font-bold text-neutral-900 group-hover:text-neutral-600 transition-colors mb-2 leading-snug">
                                {post.title}
                            </h3>
                            <p className="text-sm text-neutral-600 mb-6 line-clamp-2">
                                {post.excerpt || post.subtitle}
                            </p>
                            <div className="mt-auto pt-4 border-t border-neutral-100">
                                <Button
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        navigate(PATHS.BLOG_DETAILS, { search: `?id=${post._id}` });
                                    }}
                                    className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-neutral-900 hover:underline"
                                >
                                    Read <MoveRight className="ml-1 h-3 w-3" />
                                </Button>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}