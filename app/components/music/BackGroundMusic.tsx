"use client";

import { useEffect, useRef, useState } from "react";

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playingRef = useRef(false); 
  const [, forceRender] = useState(false); 

  useEffect(() => {
    const audio = new Audio("/music.mpeg");
    audio.loop = true;
    audio.volume = 0.25;
    audio.preload = "auto";

    audioRef.current = audio;

    const handleKey = async (e: KeyboardEvent) => {
      if (!audioRef.current) return;

      // avoid triggering while typing
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      try {
        switch (e.key.toLowerCase()) {
          case "m":
            if (playingRef.current) {
              audioRef.current.pause();
              playingRef.current = false;
            } else {
              await audioRef.current.play();
              playingRef.current = true;
            }
            forceRender(p => !p); 
            break;

          case "arrowup":
            audioRef.current.volume = Math.min(
              audioRef.current.volume + 0.05,
              1
            );
            break;

          case "arrowdown":
            audioRef.current.volume = Math.max(
              audioRef.current.volume - 0.05,
              0
            );
            break;
        }
      } catch (err) {
        console.warn("Playback blocked:", err);
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
      audio.pause();
      audioRef.current = null;
    };
  }, []); 

  return null;
}
