"use client";

export default function HeroVideo() {
  return (
    <video
      className="absolute inset-0 w-full h-full object-cover [object-position:80%_center] md:[object-position:center]"
      style={{ transition: "opacity 1s ease" }}
      src="/videos/hero.mp4"
      autoPlay
      muted
      playsInline
      onEnded={(e) => {
        e.currentTarget.style.opacity = "0";
      }}
      style={{ transition: "opacity 1s ease" }}
    />
  );
}
