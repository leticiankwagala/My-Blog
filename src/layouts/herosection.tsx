import { useState } from "react";
import { Check, Copy, ExternalLink, Mail, Phone } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const emailAddress = "leticiakwagala9@gmail.com";

export default function HeroSection() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="w-full max-w-none bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
        <div className="flex flex-col space-y-4 lg:col-span-5">
          <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100 shadow-xl">
            <img
              src="/leticia.png"
              alt="Leticia Kwagala Nabbosa"
              className="h-[480px] w-full object-cover object-center"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>

          <div className="px-1">
            <h3 className="text-lg font-semibold text-neutral-900">
              Leticia Kwagala Nabbosa
            </h3>
            <p className="mt-0.5 text-sm leading-relaxed text-neutral-500">
              Software Engineer, CEO of Launch.com
            </p>
          </div>
        </div>

        <div className="flex flex-col space-y-6 pt-2 lg:col-span-7">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">
              authorial focus
            </span>
          </div>
          <h1 className="text-4xl font-normal leading-[1.15] tracking-tight text-neutral-900 sm:text-5xl">
            Writing at the intersection of frontend engineering,{" "}
            <span className="italic">user experience </span>and clean digital
            architecture.
          </h1>
          <div className="space-y-4 pt-2 text-base leading-relaxed text-neutral-600 sm:text-lg">
            <p>
              Over the past few years, I have spent my time building type safe
              UI components, designing web applications and managing
              administrative data pipelines. My work bridges the gap between
              clean code and thoughtful designs focusing on functional
              simplicity and building applications that provide real world wide
              value.
            </p>
            <p className="text-sm text-neutral-500 sm:text-base">
              Every project published here reflects on continous learning,
              revision and visual precision. Built with a commitment to clarity,
              modern design standards and user centered solutions. No
              unnecessary complexity, no fluff, just practical engineering and
              design.
            </p>
          </div>

          <div className="space-y-4 border-t border-neutral-100 pt-8">
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">
              Direct Inquiries &amp; Collaboration
            </span>
            <div className="flex flex-wrap gap-3">
              <div
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "inline-flex items-center gap-2 rounded-full border-neutral-200 pr-1.5 text-neutral-700 hover:bg-neutral-50",
                )}
              >
                <a
                  href={`mailto:${emailAddress}`}
                  className="inline-flex items-center hover:underline focus:outline-none"
                >
                  <Mail className="mr-2 h-4 w-4 text-neutral-500" />
                  <span>{emailAddress}</span>
                </a>

                <span className="h-4 w-[1px] bg-neutral-200" aria-hidden="true" />

                <button
                  type="button"
                  onClick={handleCopy}
                  aria-label="Copy email address"
                  className="cursor-pointer rounded-full p-1.5 text-neutral-500 transition-colors hover:bg-neutral-200/60 hover:text-neutral-900"
                >
                  {copied ? (
                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </button>
              </div>

              <a
                href="tel:+256787774915"
                className={buttonVariants({
                  variant: "outline",
                  size: "sm",
                  className: "rounded-full border-neutral-200 text-neutral-700",
                })}
              >
                <Phone className="mr-2 h-4 w-4 text-neutral-500" />
                +256 787 774 915
              </a>
              <a
                href="https://github.com/leticiankwagala"
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({
                  variant: "outline",
                  size: "sm",
                  className: "rounded-full border-neutral-200 text-neutral-700",
                })}
              >
                <ExternalLink className="mr-2 h-4 w-4 text-neutral-500" />
                Github
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({
                  variant: "outline",
                  size: "sm",
                  className: "rounded-full border-neutral-200 text-neutral-700",
                })}
              >
                <ExternalLink className="mr-2 h-4 w-4 text-neutral-500" />
                LinkedIn
              </a>
              <a
                href="https://x.com/ley_tsha"
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({
                  variant: "outline",
                  size: "sm",
                  className: "rounded-full border-neutral-200 text-neutral-700",
                })}
              >
                <ExternalLink className="mr-2 h-4 w-4 text-neutral-500" />
                X @ley_tsha
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
