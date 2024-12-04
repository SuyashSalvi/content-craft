"use client";

import { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from "@fortawesome/free-solid-svg-icons";

(async () => {
  try {
    await tf.setBackend("webgl");
    console.log("Backend set to WebGL");
  } catch (error) {
    console.warn("WebGL backend initialization failed. Falling back to CPU.");
    await tf.setBackend("cpu");
  }
  await tf.ready();
})();

const WritePage = () => {
  const [image, setImage] = useState<File | null>(null);
  const [result, setResult] = useState<string>("");
  const [labels, setLabels] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);

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
      return predictions.map((pred) => pred.className);
    } catch (error) {
      console.error("Error classifying the image:", error);
      return [];
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
      setLabels(labels);

      if (labels && labels.length > 0) {
        const prompt = `Describe an image with the following features: ${labels.join(", ")}.`;
        handleGenerate(prompt);
      }
    };
  };

  const handleGenerate = async (prompt: string) => {
    try {
      setLoading(true);
      setProgress(0);
      setResult("");

      const { available } = await (window as any).ai.languageModel.capabilities();

      if (available !== "no") {
        const session = await (window as any).ai.languageModel.create();
        const interval = setInterval(() => {
          setProgress((prev) => Math.min(prev + 10, 90));
        }, 300);

        const fullResult = await session.prompt(prompt);

        clearInterval(interval);
        setProgress(100);
        setResult(fullResult);
      } else {
        setResult("Language model is not available.");
      }
    } catch (error) {
      console.error("Error with AI generation:", error);
      setResult("An error occurred while generating the response.");
    } finally {
      setLoading(false);
      setTimeout(() => setProgress(0), 500);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    alert("Caption copied to clipboard!");
  };

  return (
    <div className="relative min-h-screen text-foreground p-8 flex flex-col">
      {/* Animated Background */}
      <div className="absolute inset-0 animated-background z-[-1]"></div>

      {/* Page Title and Subtitle */}
      <div className="text-center mb-8">
        <h1 className="text-5xl font-extrabold text-[hsl(var(--primary-foreground))]">
          AI-Powered Caption Creator
        </h1>
        <p className="mt-2 text-xl text-[hsl(var(--muted-foreground))]">
          Turn your images into engaging captions with AI-powered insights.
        </p>
      </div>

      {/* Main Content */}
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
            

            <button
    type="submit"
    className={`w-full bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:bg-primary/90 ${
      loading ? "opacity-50 cursor-not-allowed" : ""
    }`}
    disabled={loading}
  >
    {loading ? "Generating..." : "Extract Labels"}
  </button>
            
          </form>
        </div>

        {/* Right-hand Side */}
        <div className="lg:w-1/2 bg-card p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Generated Output</h2>
          <div className="bg-muted text-muted-foreground p-4 rounded-lg min-h-[200px] relative">
            {result ? (
              <pre className="whitespace-pre-wrap">{result}</pre>
            ) : (
              <p className="text-center text-sm text-[hsl(var(--muted-foreground-dark))]">
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
