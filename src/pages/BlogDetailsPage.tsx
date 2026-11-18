import { useState } from "react";
import { Clock, Sparkles } from "lucide-react";
import { getPostById } from "@/lib/posts";
import PaywallCard from "@/components/PaywallCard";
import { Link, useLocation } from "@/navigation/RouterContext";

export function BlogDetailsPage() {
  const { search } = useLocation();
  const id = new URLSearchParams(search).get("id") ?? "";
  const post = getPostById(id);
  const [isUnlocked, setIsUnlocked] = useState(false);

  if (!post) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h1 className="font-serif text-2xl font-bold text-slate-900">
          Article not found
        </h1>
        <p className="mt-3 text-sm text-slate-500">
          The requested article may have been moved or is no longer available.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block text-sm font-semibold text-blue-600 hover:underline"
        >
          Return to the home page
        </Link>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-slate-800 selection:bg-blue-100 selection:text-blue-900">
      <main className="mx-auto max-w-2xl px-6 pt-10 pb-24">
        {/* Badges & Meta */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-[11px]">
          <div className="flex items-center gap-2">
            {post.isPaid && (
              <span className="inline-flex items-center gap-1 rounded bg-amber-50 px-2.5 py-1 font-semibold tracking-wider text-amber-700 uppercase">
                <Sparkles className="h-3 w-3" />
                Subscriber Exclusive
              </span>
            )}
            <span className="rounded bg-blue-50 px-2.5 py-1 font-semibold tracking-wider text-blue-600 uppercase">
              {post.category}
            </span>
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {post.readTime}
            </span>
            <span>·</span>
            <span>{post.date}</span>
          </div>
        </div>
        <h1 className="mt-5 font-serif text-3xl leading-[1.15] font-bold tracking-tight text-slate-900 sm:text-[42px]">
          {post.title}
        </h1>

        <p className="mt-4 text-base leading-relaxed text-slate-500 sm:text-lg">
          {post.subtitle}
        </p>
        <figure className="mt-7">
          <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="aspect-[16/9] w-full object-cover"
            />
          </div>
          <figcaption className="mt-2.5 flex items-center justify-center gap-1.5 text-center text-[11px] text-slate-400">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            <span>{post.imageCaption}</span>
          </figcaption>
        </figure>
        <div className="mt-7 flex items-center gap-3.5 rounded-xl border border-slate-200/70 bg-white/80 p-3.5">
          {post.author.avatarUrl ? (
            <img
              src={post.author.avatarUrl}
              alt={post.author.name}
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <div
              aria-hidden="true"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700"
            >
              {post.author.name.charAt(0)}
            </div>
          )}
          <div>
            <p className="text-xs font-bold text-slate-900">
              {post.author.name}
            </p>
            <p className="text-[11px] text-slate-500">{post.author.role}</p>
          </div>
        </div>
        <article className="mt-9 space-y-6 font-serif text-[17px] leading-[1.8] text-slate-700">
          {(post.freeContent ?? [post.excerpt]).map((paragraph, idx) => (
            <p
              key={idx}
              className={
                idx === 0
                  ? "first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-5xl first-letter:leading-none first-letter:font-bold first-letter:text-blue-600"
                  : ""
              }
            >
              {paragraph}
            </p>
          ))}
          {post.pullQuote && (
            <blockquote className="my-8 rounded-r-xl border-l-4 border-blue-600 bg-slate-100/80 px-6 py-5">
              <p className="font-serif text-lg leading-relaxed text-blue-600 italic">
                {post.pullQuote.quote}
              </p>
              <footer className="mt-2 font-sans text-[10px] font-semibold tracking-widest text-slate-400 uppercase">
                — {post.pullQuote.attribution}
              </footer>
            </blockquote>
          )}
          {post.isPaid && !isUnlocked ? (
            <div className="relative">
              <div className="space-y-6 select-none">
                {post.lockedPreviewContent?.map((paragraph, idx) => (
                  <p key={idx} className="text-slate-600">
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#FAF9F6]/75 to-[#FAF9F6]" />
            </div>
          ) : (
            <div className="space-y-6">
              {post.lockedPreviewContent?.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          )}
        </article>
        {post.isPaid && !isUnlocked && (
          <PaywallCard
            priceUGX={Number(post.priceAmount.replace(/[^\d]/g, ""))}
            onUnlock={() => setIsUnlocked(true)}
          />
        )}
      </main>
    </div>
  );
}