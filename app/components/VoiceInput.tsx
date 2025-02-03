"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Mic, MicOff } from "lucide-react";
import { Button } from "@/app/components/ui/button";

type VoiceInputProps = {
  onTranscript: (transcript: string) => void;
  isListening: boolean;
  setIsListening: (isListening: boolean) => void;
};

export function VoiceInput({
  onTranscript,
  isListening,
  setIsListening,
}: VoiceInputProps) {
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(
    null
  );

  useEffect(() => {
    if (
      (typeof window !== "undefined" && "SpeechRecognition" in window) ||
      "webkitSpeechRecognition" in window
    ) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = "en-US";

      recognitionInstance.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join("");

        onTranscript(transcript);
      };

      recognitionInstance.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }
  }, [onTranscript, setIsListening]);

  const toggleListening = useCallback(() => {
    if (recognition) {
      if (isListening) {
        recognition.stop();
      } else {
        recognition.start();
      }
      setIsListening(!isListening);
    }
  }, [isListening, recognition, setIsListening]);

  if (!recognition) {
    return null;
  }

  return (
    <Button
      onClick={toggleListening}
      variant="outline"
      size="icon"
      className={`transition-colors duration-200 ${
        isListening
          ? "bg-red-100 text-red-500 hover:bg-red-200"
          : "bg-[#F4F1DE] text-[#2C5F2D] hover:bg-[#E7E4D3]"
      }`}
      aria-label={isListening ? "Stop voice input" : "Start voice input"}
    >
      {isListening ? (
        <MicOff className="h-4 w-4" />
      ) : (
        <Mic className="h-4 w-4" />
      )}
    </Button>
  );
}
