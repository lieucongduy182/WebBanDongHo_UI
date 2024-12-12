import { useEffect, useRef, useState } from "react";

const useSpeechToText = (options: any) => {
  const [isListening, setIsListening] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>("");
  const recgonitionRef = useRef<any>(null);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      console.error("Web speech api is not supported.");
      return;
    }

    recgonitionRef.current = new (window as any).webkitSpeechRecognition();
    const recognition = recgonitionRef.current;
    recognition.interimResults = options.interimResults || true;
    recognition.lang = options.lang || "vi-VN";
    recognition.continuous = options.continuous || false;

    if ("webkitSpeechGrammarList" in window) {
      const grammar =
        "#JSGF V1.0; grammar punctuation; public <punc> = . | , | ? | ! | ; | : ;";
      const speechRecognitionList = new (
        window as any
      ).webkitSpeechGrammarList();
      speechRecognitionList.addFromString(grammar, 1);

      recognition.grammars = speechRecognitionList;
    }

    recognition.onresult = (event: any) => {
      let text = "";
      for (let i = 0; i < event.results.length; i++) {
        text += event.results[i][0].transcript;
      }

      setTranscript(text);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
    };

    recognition.onend = () => {
      setIsListening(false);
      setTranscript("");
    };

    return () => {
      recognition.stop();
    };
  }, []);

  const startListening = () => {
    if (recgonitionRef.current && !isListening) {
      recgonitionRef.current.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recgonitionRef.current && isListening) {
      recgonitionRef.current.stop();
      setIsListening(false);
    }
  };

  return {
    isListening,
    transcript,
    startListening,
    stopListening,
  };
};

export default useSpeechToText;
