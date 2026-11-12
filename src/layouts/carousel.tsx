import { useState } from "react";
import { AlarmClock, MoveLeft, MoveRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

const categories = ["All", "Design", "Frontend", "AI"] as const;

export default function Carousel() {
    const [selected, setSelected] = useState<(typeof categories)[number]>(categories[0]);

    const handleSelect = (category: (typeof categories)[number]) => setSelected(category);

    return (
        <div className="mt-8 flex flex-col gap-4 px-6 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col space-y-2">
                <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-neutral-400" aria-hidden="true" />
                    <span className="text-xs font-serif uppercase tracking-widest text-neutral-400">
                        The tech report archive.
                    </span>
                </div>
                <h1 className="text-3xl font-serif tracking-tight text-neutral-900">
                    Recent Blogs
                </h1>
            </div>
            <div className="flex items-center gap-3">
                <div
                    role="tablist"
                    aria-label="Blog categories"
                    className="inline-flex items-center rounded-xl border border-gray-100 bg-gray-50 p-1.5 shadow-sm"
                >
                    {categories.map((category) => {
                        const isActive = selected === category;

                        return (
                            <button
                                key={category}
                                type="button"
                                role="tab"
                                aria-selected={isActive}
                                onClick={() => handleSelect(category)}
                                className={buttonVariants({
                                    variant: isActive ? "default" : "ghost",
                                    size: "sm",
                                    className: `rounded-lg px-4 ${isActive ? "bg-blue-500 text-white hover:bg-blue-600" : "text-gray-600 hover:text-gray-900"
                                        }`,
                                })}
                            >
                                {category}
                            </button>
                        );
                    })}
                </div>
                <button
                    type="button"
                    aria-label="Previous slide"
                    className="h-8 w-8 bg-white shadow-sm rounded border-neutral-300 text-neutral-800 hover:bg-neutral-100 flex items-center justify-center"
                >
                    <MoveLeft className="h-4 w-4" />
                </button>
                <button
                    type="button"
                    aria-label="Next slide"
                    className="h-8 w-8 bg-white shadow-sm rounded border-neutral-300 text-neutral-800 hover:bg-neutral-100 flex items-center justify-center"
                >
                    <MoveRight className="h-4 w-4"/>
                </button>
            </div>
        </div>
    );
}
