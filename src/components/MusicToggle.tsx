import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

/* Background Music — plays audio file on loop with mute control */
export const MusicToggle = () => {
  const [isMuted, setIsMuted] = useState(true); // Start muted for office-friendly UX
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio('/parallel-paths-portfolio/background-music.mp3');
    audio.loop = true;
    audio.volume = 0.3; // Set to 30% volume for subtle background music
    audioRef.current = audio;

    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggle = () => {
    if (!audioRef.current) return;

    if (isMuted) {
      // Unmute and play
      audioRef.current.play().catch(err => {
        console.log('Audio playback failed:', err);
      });
      setIsMuted(false);
    } else {
      // Mute and pause
      audioRef.current.pause();
      setIsMuted(true);
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label={isMuted ? "Unmute background music" : "Mute background music"}
      aria-pressed={isMuted ? "false" : "true"}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full glass-strong flex items-center justify-center hover:glow-border transition-all duration-300 group"
      title={isMuted ? "Click to play background music" : "Click to mute background music"}
    >
      {!isMuted ? (
        <Volume2 className="w-5 h-5 text-universe-glow animate-pulse" />
      ) : (
        <VolumeX className="w-5 h-5 text-muted-foreground group-hover:text-universe-glow transition-colors" />
      )}
      <span className="sr-only">{isMuted ? "Unmute" : "Mute"} background music</span>
    </button>
  );
};
