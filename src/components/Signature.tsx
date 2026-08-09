"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

export default function Signature() {
  const t = useTranslations("signature");
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=120%",
          scrub: 1,
          pin: true,
        },
      });

      tl.fromTo(
        imageRef.current,
        { filter: "grayscale(1) brightness(0.35) contrast(0.9)" },
        { filter: "grayscale(0) brightness(1) contrast(1)", ease: "none" },
        0
      )
        .fromTo(
          overlayRef.current,
          { opacity: 0.75 },
          { opacity: 0.25, ease: "none" },
          0
        )
        .fromTo(
          textRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, ease: "none" },
          0.15
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
    >
      <div ref={imageRef} className="absolute inset-0">
        <img
          src="/images/signature.jpg"
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-background"
      />
      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <p
          ref={textRef}
          className="max-w-3xl text-center font-display text-3xl italic text-foreground md:text-5xl"
        >
          {t("line")}
        </p>
      </div>
    </section>
  );
}