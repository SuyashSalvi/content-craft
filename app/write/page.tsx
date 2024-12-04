// "use client";

// import { useState } from "react";

// const WritePage = () => {
//   const [image, setImage] = useState<File | null>(null);
//   const [format, setFormat] = useState<string>("markdown");
//   const [length, setLength] = useState<string>("short");
//   const [result, setResult] = useState<string>("");

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setImage(e.target.files[0]);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!image) {
//       alert("Please upload an image before submitting.");
//       return;
//     }
  
//     const formData = new FormData();
//     formData.append("image", image);
  
//     try {
//       // Directly send image to the summarize API
//       const response = await fetch("/api/summarize", {
//         method: "POST",
//         body: formData,
//       });
  
//       const summaryData = await response.json();
//       if (response.ok) {
//         setResult(summaryData.summary || "No summary generated.");
//       } else {
//         setResult(summaryData.error || "Error processing the image.");
//       }
//     } catch (error) {
//       console.error("Error processing image:", error);
//       setResult("Error processing your request. Please try again.");
//     }
//   };
  
  
  

//   return (
//     <div className="min-h-screen bg-background text-foreground p-8 flex flex-col">
//       <h1 className="text-4xl font-bold mb-8 text-center">Write API</h1>
//       <div className="flex flex-col lg:flex-row gap-8">
//         {/* Left-hand Side */}
//         <div className="lg:w-1/2 bg-card p-6 rounded-lg shadow-md">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label htmlFor="image-upload" className="block text-lg font-medium mb-2">
//                 Upload an Image
//               </label>
//               <input
//                 type="file"
//                 id="image-upload"
//                 accept="image/*"
//                 name="image"
//                 onChange={handleFileChange}
//                 className="block w-full border border-border rounded-lg px-4 py-2 bg-input text-sm"
//                 required
//               />
//             </div>

//             <div>
//               <label htmlFor="format" className="block text-lg font-medium mb-2">
//                 Format
//               </label>
//               <select
//                 id="format"
//                 value={format}
//                 onChange={(e) => setFormat(e.target.value)}
//                 className="block w-full border border-border rounded-lg px-4 py-2 bg-input text-sm"
//               >
//                 <option value="markdown">Markdown</option>
//                 <option value="plaintext">Plain Text</option>
//               </select>
//             </div>

//             <div>
//               <label htmlFor="length" className="block text-lg font-medium mb-2">
//                 Length
//               </label>
//               <select
//                 id="length"
//                 value={length}
//                 onChange={(e) => setLength(e.target.value)}
//                 className="block w-full border border-border rounded-lg px-4 py-2 bg-input text-sm"
//               >
//                 <option value="short">Short</option>
//                 <option value="medium">Medium</option>
//                 <option value="long">Long</option>
//               </select>
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:bg-primary/90"
//             >
//               Generate Caption
//             </button>
//           </form>
//         </div>

//         {/* Right-hand Side */}
//         <div className="lg:w-1/2 bg-card p-6 rounded-lg shadow-md">
//           <h2 className="text-xl font-bold mb-4">Generated Caption</h2>
//           <div className="bg-muted text-muted-foreground p-4 rounded-lg min-h-[200px]">
//             {result ? (
//               <p>{result}</p>
//             ) : (
//               <p className="text-center text-sm text-muted">No caption generated yet.</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WritePage;

"use client";

import { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faClipboard, faArrowUp } from "@fortawesome/free-solid-svg-icons";

(async () => {
  // Initialize WebGL backend, fall back to CPU if not supported
  try {
    await tf.setBackend("webgl");
    console.log("Backend set to WebGL");
  } catch (error) {
    console.warn("WebGL backend initialization failed. Falling back to CPU.");
    await tf.setBackend("cpu");
  }
  await tf.ready(); // Ensure the backend is ready before continuing
})();

const WritePage = () => {
  const [image, setImage] = useState<File | null>(null);
  const [result, setResult] = useState<string>("");
  const [labels, setLabels] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false); // For output generation
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0); // Progress state
  

  // Load the MobileNet model on component mount
  const [model, setModel] = useState<mobilenet.MobileNet | null>(null);
  useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await mobilenet.load();
      setModel(loadedModel);
    };
    loadModel();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const classifyImage = async (imgElement: HTMLImageElement): Promise<string[]> => {
    if (!model) {
      alert("Model is not loaded yet. Please try again.");
      return [];
    }
  
    try {
      setIsProcessing(true);
      const predictions = await model.classify(imgElement);
      return predictions.map((pred) => pred.className); // Always returns an array of strings
    } catch (error) {
      console.error("Error classifying the image:", error);
      return []; // Return an empty array on error
    } finally {
      setIsProcessing(false);
    }
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) {
      alert("Please upload an image before submitting.");
      return;
    }

    const imgElement = document.createElement("img");
    imgElement.src = URL.createObjectURL(image);
    imgElement.onload = async () => {
      const labels = await classifyImage(imgElement);

      if (labels && labels.length > 0) {
        const prompt = `Describe an image with the following features: ${labels.join(", ")}.`;
        handleGenerate(prompt); // Automatically generate output using the labels
      }
    };
  };

  const handleGenerate = async (prompt: string) => {
    if (!prompt.trim()) {
      alert("Please enter a valid prompt.");
      return;
    }
  
    try {
      setLoading(true);
      setProgress(0); // Reset progress
      setResult(""); // Clear the previous result
  
      const { available } = await (window as any).ai.languageModel.capabilities();
  
      if (available !== "no") {
        const session = await (window as any).ai.languageModel.create();
        const interval = setInterval(() => {
          setProgress((prev) => Math.min(prev + 10, 90)); // Simulate progress
        }, 300);
  
        const fullResult = await session.prompt(prompt);
  
        clearInterval(interval); // Clear progress simulation
        setProgress(100); // Complete progress
        setResult(fullResult); // Display result
      } else {
        setResult("Language model is not available.");
      }
    } catch (error) {
      console.error("Error with AI generation:", error);
      setResult("An error occurred while generating the response.");
    } finally {
      setLoading(false);
      setTimeout(() => setProgress(0), 500); // Reset progress after a short delay
    }
  };
  

  // const handleGenerate = async (prompt: string) => {
  //   if (!prompt.trim()) {
  //     alert("Please enter a valid prompt.");
  //     return;
  //   }
  
  //   try {
  //     setLoading(true);
  //     setProgress(0); // Reset progress to simulate loading
  //     setResult(""); // Clear the previous response
  
  //     const { available } = await (window as any).ai.languageModel.capabilities();
  
  //     if (available !== "no") {
  //       const session = await (window as any).ai.languageModel.create();
  
  //       // Simulate progress for loading
  //       const interval = setInterval(() => {
  //         setProgress((prevProgress) => Math.min(prevProgress + 10, 90));
  //       }, 300); // Increment every 300ms
  
  //       // Fetch the full result
  //       const fullResult = await session.prompt(prompt);
  //       clearInterval(interval); // Clear progress simulation
  
  //       setResult(fullResult); // Display the final result
  //       setProgress(100); // Set progress to complete
  //     } else {
  //       setResult("Language model is not available.");
  //     }
  //   } catch (error) {
  //     console.error("Error with AI generation:", error);
  //     setResult("An error occurred while generating the response.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  

  // const handleGenerate = async (prompt: string) => {
  //   if (!prompt.trim()) {
  //     alert("Please enter a valid prompt.");
  //     return;
  //   }

  //   try {
  //     setLoading(true);
  //     setProgress(0); // Reset progress
  //     setResult(""); // Clear the previous response

  //     const { available } = await (window as any).ai.languageModel.capabilities();

  //     if (available !== "no") {
  //       const session = await (window as any).ai.languageModel.create();
  //       const stream = await session.promptStreaming(prompt);

  //       let chunkCount = 0;
  //       const maxChunks = 20; // Estimate the total number of chunks (adjust as needed)

  //       for await (const chunk of stream) {
  //         chunkCount++;
  //         setResult((prevResponse) => prevResponse + chunk); // Append chunk to result

  //         // Update progress percentage
  //         const calculatedProgress = Math.min(
  //           Math.round((chunkCount / maxChunks) * 100),
  //           100
  //         );
  //         setProgress(calculatedProgress);
  //       }
  //     } else {
  //       setResult("Language model is not available.");
  //     }
  //   } catch (error) {
  //     console.error("Error with AI generation:", error);
  //     setResult("An error occurred while generating the response.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const handleGenerate = async (prompt: string) => {
  //   if (!prompt.trim()) {
  //     alert("Please enter a valid prompt.");
  //     return;
  //   }

  //   try {
  //     setLoading(true);
  //     setResult(""); // Clear the previous response

  //     const { available } = await (window as any).ai.languageModel.capabilities();

  //     if (available !== "no") {
  //       const session = await (window as any).ai.languageModel.create(
  //         {systemPrompt:"I create short captions for social media from labels provided to me"});
  //       const stream = await session.prompt(prompt);
  //       const formatOutput = (text: string): string => {
  //         return text.replace(/(\*\*.*?\*\*)/g, "\n$1\n"); // Add a newline before and after each **...**
  //       };
        
  //       setResult(formatOutput(stream));

  //       // for await (const chunk of stream) {
  //       //   setResult((prevResponse) => prevResponse + chunk); // Append each chunk to the response
  //       // }
  //     } else {
  //       setResult("Language model is not available.");
  //     }
  //   } catch (error) {
  //     console.error("Error with AI generation:", error);
  //     setResult("An error occurred while generating the response.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const generateFromLabels = async () => {
    if (labels.length === 0) {
      alert("No labels extracted yet. Please upload an image first.");
      return;
    }

    const prompt = `Describe an image with the following features: ${labels.join(", ")}.`;
    await handleGenerate(prompt);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    alert("Caption copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-8 flex flex-col">
      <h1 className="text-4xl font-bold mb-8 text-center">Write API</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left-hand Side */}
        <div className="lg:w-1/2 bg-card p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="image-upload" className="block text-lg font-medium mb-2">
                Upload an Image
              </label>
              <input
                type="file"
                id="image-upload"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full border border-border rounded-lg px-4 py-2 bg-input text-sm"
                required
              />
            </div>
            {imagePreview && (
              <div className="mt-4 flex justify-center">
                <img
                  src={imagePreview}
                  alt="Uploaded preview"
                  className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 shadow-md"
                />
              </div>
            )}

            {/* Button with Progress Bar */}
            {/* Button with Progress Bar */}
{/* Button with Progress Bar */}
<div className="relative w-full">
  <button
    type="submit"
    className={`w-full bg-gray-800 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-700 ${
      isProcessing ? "opacity-50 cursor-not-allowed" : ""
    }`}
    disabled={isProcessing}
  >
    {isProcessing ? "Processing..." : "Extract Labels"}
  </button>
  {isProcessing && (
    <div
      className="absolute top-0 left-0 h-1 bg-red-500 rounded-lg transition-all duration-300"
      style={{
        width: `${progress}%`, // Dynamically updated width
        top: "100%", // Position just below the button for visibility
        zIndex: 10, // Ensure it's on top
      }}
    ></div>
  )}
</div>



          </form>
        </div>

        {/* Right-hand Side */}
        <div className="lg:w-1/2 bg-card p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Generated Output</h2>
          <div className="bg-muted text-muted-foreground p-4 rounded-lg min-h-[200px] relative">
            {result ? (
              <pre className="whitespace-pre-wrap">{result}</pre>
            ) : (
              <p className="text-center text-sm text-muted">
                No output generated yet.
              </p>
            )}
            {result && (
              <FontAwesomeIcon
                icon={faClipboard}
                onClick={copyToClipboard}
                className="absolute top-2 right-2 text-primary cursor-pointer hover:text-primary/90"
                title="Copy to Clipboard"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WritePage;