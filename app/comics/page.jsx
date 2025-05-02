"use client";
import SplitText from "@/components/ui/SplitText/SplitText";
import Hero from "./components/Hero";
import ComicIssues from "./components/ComicIssues";
import Publishers from "./components/Publishers";
export default function page() {
  return (
    <div className="mt-10">
      <div className="flex items-center justify-center">
        <SplitText
          text="Dive Into the panels"
          className="font-codystar text-center uppercase text-5xl color-white"
          delay={150}
          animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
          animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
          easing="easeOutCubic"
          threshold={0.2}
          rootMargin="-50px"
        />
      </div>
      <Hero />
      <ComicIssues />
      <Publishers />
    </div>
  );
}
