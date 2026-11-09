import { Mail, Phone, MessageSquare, ExternalLink } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Image side */}
        <div className="lg:col-span-5 flex flex-col space-y-4">
          <div className="relative rounded-2xl overflow-hidden shadow-xl border border-neutral-200 bg-neutral-100">
            <img
              src="/leticia.png"
              alt="Leticia Kwagala Nabbosa"
              className="w-full h-[480px]object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via transparent to transparent pointer-events-none" />
          </div>

          <div className="px-1">
            <h3 className="font-semibold text-neutral-900 text-lg">
              Leticia Kwagala Nabbosa
            </h3>
            <p className="text-sm text-neutral-500 leading-relaxed mt-0.5">
              Software Engineer, CEO of Launch.com
            </p>
          </div>
        </div>
        {/* Text side */}
        <div className="lg:col-span-7 flex flex-col space-y-6 pt-2">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold tracking-widest text-neutral-400 uppercase">
              authorial focus
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-normal text-neutral-900 tracking-tight leading-[1.15]">
            Writing at the intersection of frontend engineering,{" "}
            <span className="italic">user experience </span>and clean digital
            architecture.
          </h1>
          <div className="space-y-4 text-neutral-600 text-base sm:text-lg leading-relaxed font-sans pt-2">
            <p>
              Over the past few years, I have spent my time building type safe
              UI components, designing web applications and managing
              administrative data pipelines. My work bridges the gap between
              clean code and thoughtful designs focusing on functional
              simplicity and building applications that provide real world wide
              value.
            </p>
            <p className="text-neutral-500 text-sm sm:text-base">
              Every project published here reflects on continous learning,
              revision and visual precision. Built with a commitment to clarity,
              modern design standards and user centered solutions. No
              unnecessary complexity, no fluff, just practical engineering and
              design.
            </p>
          </div>
          {/* Contacts */}
          <div className="pt-8 border-t border-neutral-100 space-y-4">
            <span className="text-xs font-bold tracking-widest text-neutral-400 uppercase-block">
              Direct Inquiries & Collaboration
            </span>
            <div className="flex flex-wrap gap-3">
              <a
                href="mailto:leticiakwagala9@gmail.com"
                className={buttonVariants({
                  variant: "outline",
                  size: "sm",
                  className: "rounded-full text-neutral-700 border-neutral-200",
                })}
              >
                <Mail className="w-4 h-4 mr-2 text-neutral-500" />
                leticiakwagala9@gmail.com
              </a>
              <a
                href="tel:+256787774915"
                className={buttonVariants({
                  variant: "outline",
                  size: "sm",
                  className: "rounded-full text-neutral-700 border-neutral-200",
                })}
              >
                <Phone className="w-4 h-4 mr-2 text-neutral-500" />
                +256 787 774 915
              </a>
              <a href="https://github.com/leticiankwagala"
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({
                variant: "outline",
                size: "sm",
                className: "rounded-full text-neutral-700 border-neutral-200",
              })}>
                <ExternalLink className="w-4 h-4 mr-2 text-neutral-500" />
                Github
              </a>
              <a href="https://github.com/leticiankwagala"
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({
                variant: "outline",
                size: "sm",
                className: "rounded-full text-neutral-700 border-neutral-200",
              })}>
                <ExternalLink className="w-4 h-4 mr-2 text-neutral-500" />
                LinkedIn
              </a>
              <a href="https://github.com/leticiankwagala"
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({
                variant: "outline",
                size: "sm",
                className: "rounded-full text-neutral-700 border-neutral-200",
              })}>
                <ExternalLink className="w-4 h-4 mr-2 text-neutral-500" />
                X @ley_tsha
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
