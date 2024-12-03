"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faClipboard } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef } from "react";

type SpeechRecognition =
  | (typeof window)["SpeechRecognition"]
  | (typeof window)["webkitSpeechRecognition"];

const Prompt =  () => {
  const [prompt, setPrompt] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [isRecording, setIsRecording] = useState(false); // State to track recording status
  const recognitionRef = useRef<SpeechRecognition | null>(null); // Keep the recognition object stable
  const [loading, setLoading] = useState<boolean>(false);

  const handleGenerate = async (prompt: String) => {
    try {
      setLoading(true);

      // Fetch AI model capabilities
      const { available, defaultTemperature, defaultTopK, maxTopK } =
        await (window as any).ai.languageModel.capabilities();

      if (available !== "no") {
        // Create a session and prompt the model
        const session = await (window as any).ai.languageModel.create();
        const result = await session.prompt(prompt);
        console.log(result)
        setResponse(result); // Update the response with the generated result
      } else {
        console.log("Language model is not available.")
        setResponse("Language model is not available.");
      }
    } catch (error) {
      console.error("Error with AI generation:", error);
      setResponse("An error occurred while generating the response.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Ensure the speech recognition is only initialized on the client
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      recognitionRef.current = new (window as any).webkitSpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = "en-US"; // Set language for recognition
    } else {
      console.warn("Speech recognition is not supported in this browser.");
    }
  }, []); // Only run once after the component is mounted

  const handleMicClick = () => {
    const recognition = recognitionRef.current;
    if (!recognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    if (isRecording) {
      // Stop recording
      recognition.stop();
      setIsRecording(false);
    } else {
      // Start recording
      recognition.start();
      setIsRecording(true);

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        setPrompt((prev) => prev + " " + transcript); // Append the recognized text to the prompt
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        alert("An error occurred during speech recognition.");
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false); // Ensure the icon resets when recognition ends
      };
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    //handleGenerate();
    // try {
    //   const res = await fetch("/api/generate", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ prompt }),
    //   });
    //   const data = await res.json();
    //   setResponse(data.result);
    // } catch (error) {
    //   console.error("Error generating response:", error);
    //   setResponse("An error occurred. Please try again.");
    // }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "2rem",
        backgroundColor: "#f5f5f5",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>AI Prompt Generator</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: "2rem",
          width: "100%",
          maxWidth: "1000px",
        }}
      >
        {/* Prompt Input Section */}
        <form
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#ffffff",
            padding: "1rem",
            border: "1px solid #ddd",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt here..."
            required
            style={{
              width: "100%",
              height: "150px",
              padding: "1rem",
              marginBottom: "1rem",
              fontSize: "1rem",
              border: "1px solid #ddd",
              borderRadius: "8px",
              resize: "none",
            }}
          />
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
            <div style={{width: "20px", height: "20px"}}>
            <FontAwesomeIcon
              icon={faMicrophone}
              onClick={handleMicClick}
              style={{
                cursor: "pointer",
                fontSize: "1.5rem",
                color: isRecording ? "#ff0000" : "#4CAF50", // Red when recording, green otherwise
              }}
              title={isRecording ? "Stop Recording" : "Start Recording"}
            />
            </div>
            
            <button
              disabled={loading}
              onClick={() => handleGenerate(prompt)} 
              style={{
                padding: "0.75rem 1.5rem",
                fontSize: "1rem",
                color: "#fff",
                backgroundColor: "#0070f3",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "background-color 0.3s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#005bb5")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#0070f3")
              }
            >
            {loading ? "Generating..." : "Generate Response"} 
            </button>
          </div>
        </form>

        {/* Result Display Section */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#ffffff",
            padding: "1rem",
            border: "1px solid #ddd",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            minHeight: "200px",
          }}
        >
          <h2 style={{ marginBottom: "0.5rem" }}>Generated Output:</h2>
          <p style={{ margin: "0", whiteSpace: "pre-wrap" }}>{response}</p>
          <div style={{width: "20px", height: "20px"}}>
          <FontAwesomeIcon
            icon={faClipboard}
            onClick={() => {
              navigator.clipboard.writeText(response);
              alert("Copied to clipboard!");
            }}
            style={{
              cursor: "pointer",
              fontSize: "1.2rem",
              color: "#0070f3",
            }}
            title="Copy to Clipboard"
          />

          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Prompt;
