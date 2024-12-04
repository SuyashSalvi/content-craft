// "use client";


// import { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faMicrophone, faClipboard, faArrowUp } from "@fortawesome/free-solid-svg-icons";

// const Prompt = () => {
//   const [prompt, setPrompt] = useState<string>(""); // Store the user input
//   const [response, setResponse] = useState<string>(""); // Store the AI response
//   const [loading, setLoading] = useState<boolean>(false);
//   const [isRecording, setIsRecording] = useState<boolean>(false);

//   const handleGenerate = async (prompt: string) => {
//     if (!prompt.trim()) {
//       alert("Please enter a valid prompt.");
//       return;
//     }

//     try {
//       setLoading(true);
//       setResponse(""); // Clear the previous response

//       const { available } = await (window as any).ai.languageModel.capabilities();

//       if (available !== "no") {
//         const session = await (window as any).ai.languageModel.create();
//         const stream = await session.promptStreaming(prompt);

//         for await (const chunk of stream) {
//           setResponse((prevResponse) => prevResponse + chunk); // Append each chunk to the response
//         }
//       } else {
//         setResponse("Language model is not available.");
//       }
//     } catch (error) {
//       console.error("Error with AI generation:", error);
//       setResponse("An error occurred while generating the response.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "flex-start",
//         minHeight: "100vh",
//         padding: "1rem 2rem",
//         backgroundColor: "#f9f9f9",
//       }}
//     >
//       <h1
//         style={{
//           fontSize: "2.5rem",
//           fontWeight: "700",
//           color: "#333",
//           marginBottom: "0.5rem",
//         }}
//       >
//         AI Prompt Generator
//       </h1>
//       <p
//         style={{
//           fontSize: "1rem",
//           textAlign: "center",
//           color: "#555",
//           marginBottom: "1rem",
//           maxWidth: "600px",
//           lineHeight: "1.5",
//         }}
//       >
//         Use this tool to generate engaging blog posts, social media content, or creative writing pieces. Simply input your prompt, and let our AI craft the perfect text for your needs.
//       </p>

//       {/* Input Section */}
//       <form
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           backgroundColor: "#ffffff",
//           padding: "1.5rem",
//           border: "1px solid #ddd",
//           borderRadius: "10px",
//           boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
//           width: "60vw",
//           //maxWidth: "600px",
//           marginBottom: "1rem",
//         }}
//       >
//         <textarea
//           value={prompt}
//           onChange={(e) => setPrompt(e.target.value)}
//           placeholder="Enter your prompt here..."
//           required
//           style={{
//             width: "100%",
//             height: "150px",
//             padding: "1rem",
//             marginBottom: "1rem",
//             fontSize: "1rem",
//             border: "1px solid #ddd",
//             borderRadius: "8px",
//             resize: "none",
//             backgroundColor: "#fdfdfd",
//             color: "black"
//           }}
//         />
//         <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
//           <div
//             style={{
//               width: "40px",
//               height: "40px",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               backgroundColor: "#e8f5e9",
//               borderRadius: "50%",
//             }}
//           >
//             <FontAwesomeIcon
//               icon={faMicrophone}
//               onClick={() => setIsRecording((prev) => !prev)}
//               style={{
//                 cursor: "pointer",
//                 fontSize: "1.5rem",
//                 color: isRecording ? "#ff0000" : "#4CAF50",
//               }}
//               title={isRecording ? "Stop Recording" : "Start Recording"}
//             />
//           </div>
//           <button
//             disabled={loading}
//             onClick={() => handleGenerate(prompt)}
//             style={{
//               padding: "0.75rem 1.5rem",
//               fontSize: "1rem",
//               fontWeight: "600",
//               color: "#fff",
//               backgroundColor: "#0070f3",
//               border: "none",
//               borderRadius: "8px",
//               cursor: "pointer",
//               transition: "background-color 0.3s",
//               boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//             }}
//           >
//             {loading ? "Generating..." : "Generate Response"}
//           </button>
//         </div>
//       </form>

//       {/* Output Section */}
// <div
//   style={{
//     display: "flex",
//     flexDirection: "column",
//     backgroundColor: "#ffffff",
//     padding: "1.5rem",
//     border: "1px solid #ddd",
//     borderRadius: "10px",
//     boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
//     width: "60vw", // Span the entire width of the viewport
//     position: "relative",
//     margin: "1rem 0", // Add spacing above and below the div
//   }}
// >
//   <h2 style={{ marginBottom: "0.5rem", color: "#333" }}>Generated Output:</h2>
//   <p style={{ margin: "0", whiteSpace: "pre-wrap", color: "#444" }}>{response}</p>

//   {/* Copy Icon Wrapper */}
//   <div
//     style={{
//       width: "40px",
//       height: "40px",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       position: "absolute",
//       top: "10px",
//       right: "10px",
//       backgroundColor: "#e3f2fd",
//       borderRadius: "50%",
//     }}
//   >
//     <FontAwesomeIcon
//       icon={faClipboard}
//       onClick={() => {
//         navigator.clipboard.writeText(response);
//         alert("Copied to clipboard!");
//       }}
//       style={{
//         cursor: "pointer",
//         fontSize: "1.2rem",
//         color: "#0070f3",
//       }}
//       title="Copy to Clipboard"
//     />
//   </div>
// </div>


//       {/* Go Back to Top Button */}
//       <div
//         style={{
//           position: "fixed",
//           bottom: "20px",
//           right: "20px",
//           width: "50px",
//           height: "50px",
//           backgroundColor: "#0070f3",
//           borderRadius: "50%",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
//           cursor: "pointer",
//           transition: "background-color 0.3s",
//         }}
//         onClick={scrollToTop}
//       >
//         <FontAwesomeIcon
//           icon={faArrowUp}
//           style={{ fontSize: "1.5rem", color: "#fff" }}
//           title="Go Back to Top"
//         />
//       </div>
//     </div>
//   );
// };

// export default Prompt;




"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faClipboard, faArrowUp } from "@fortawesome/free-solid-svg-icons";

const PromptPage = () => {
  const [prompt, setPrompt] = useState<string>(""); // Store the user input
  const [response, setResponse] = useState<string>(""); // Store the AI response
  const [loading, setLoading] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);

  const handleGenerate = async (prompt: string) => {
    if (!prompt.trim()) {
      alert("Please enter a valid prompt.");
      return;
    }

    try {
      setLoading(true);
      setResponse(""); // Clear the previous response

      const { available } = await (window as any).ai.languageModel.capabilities();

      if (available !== "no") {
        const session = await (window as any).ai.languageModel.create();
        const stream = await session.promptStreaming(prompt);

        for await (const chunk of stream) {
          setResponse((prevResponse) => prevResponse + chunk); // Append each chunk to the response
        }
      } else {
        setResponse("Language model is not available.");
      }
    } catch (error) {
      console.error("Error with AI generation:", error);
      setResponse("An error occurred while generating the response.");
    } finally {
      setLoading(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen overflow-hidden text-foreground p-8">
      {/* Animated Background */}
      <div className="animated-background"></div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Heading */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-[var(--primary-foreground)] mb-4">
            AI Prompt Generator
          </h1>
{/* <h1 className="text-5xl font-extrabold text-[var(--primary-foreground)] mb-4">AI Content Rewriter</h1> */}

          <p className="text-lg text-[hsl(var(--muted-foreground))]">
            Use this tool to generate engaging blog posts, social media content, or creative writing pieces. Simply input your prompt, and let our AI craft the perfect text for your needs.
          </p>
        </header>

        {/* Input Section */}
        <form
          className="bg-card p-6 rounded-lg shadow-md border border-[hsl(var(--border))] space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            handleGenerate(prompt);
          }}
        >
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt here..."
            required
            className="w-full h-36 p-4 border border-[hsl(var(--border))] rounded-md text-sm bg-input text-foreground resize-none"
          />
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 flex items-center justify-center bg-green-100 rounded-full">
              <FontAwesomeIcon
                icon={faMicrophone}
                onClick={() => setIsRecording((prev) => !prev)}
                className={`cursor-pointer text-2xl ${
                  isRecording ? "text-red-500" : "text-green-500"
                }`}
                title={isRecording ? "Stop Recording" : "Start Recording"}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 text-sm font-medium text-primary-foreground bg-primary rounded-md hover:bg-primary/90 transition-transform transform hover:scale-105 disabled:opacity-50"
            >
              {loading ? "Generating..." : "Generate Response"}
            </button>
          </div>
        </form>

        {/* Output Section */}
        <div className="bg-card p-6 rounded-lg shadow-md border border-[hsl(var(--border))] mt-8 relative">
          <h2 className="text-lg font-bold mb-4">Generated Output:</h2>
          <p className="text-sm text-muted-foreground whitespace-pre-wrap">
            {response || "No response generated yet."}
          </p>

          {/* Copy Icon */}
          {response && (
            <div className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-blue-100 rounded-full cursor-pointer">
              <FontAwesomeIcon
                icon={faClipboard}
                onClick={() => {
                  navigator.clipboard.writeText(response);
                  alert("Copied to clipboard!");
                }}
                className="text-blue-500"
                title="Copy to Clipboard"
              />
            </div>
          )}
        </div>

        {/* Scroll to Top Button */}
        <div
          className="fixed bottom-8 right-8 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-primary/90 transition-transform transform hover:scale-110"
          onClick={scrollToTop}
        >
          <FontAwesomeIcon icon={faArrowUp} className="text-xl" title="Go Back to Top" />
        </div>
      </div>
    </div>
  );
};

export default PromptPage;
