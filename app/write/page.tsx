"use client";

import { useState } from "react";

const WritePage = () => {
  const [image, setImage] = useState<File | null>(null);
  const [format, setFormat] = useState<string>("markdown");
  const [length, setLength] = useState<string>("short");
  const [result, setResult] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) {
      alert("Please upload an image before submitting.");
      return;
    }
  
    const formData = new FormData();
    formData.append("image", image);
  
    try {
      // Directly send image to the summarize API
      const response = await fetch("/api/summarize", {
        method: "POST",
        body: formData,
      });
  
      const summaryData = await response.json();
      if (response.ok) {
        setResult(summaryData.summary || "No summary generated.");
      } else {
        setResult(summaryData.error || "Error processing the image.");
      }
    } catch (error) {
      console.error("Error processing image:", error);
      setResult("Error processing your request. Please try again.");
    }
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
                name="image"
                onChange={handleFileChange}
                className="block w-full border border-border rounded-lg px-4 py-2 bg-input text-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="format" className="block text-lg font-medium mb-2">
                Format
              </label>
              <select
                id="format"
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="block w-full border border-border rounded-lg px-4 py-2 bg-input text-sm"
              >
                <option value="markdown">Markdown</option>
                <option value="plaintext">Plain Text</option>
              </select>
            </div>

            <div>
              <label htmlFor="length" className="block text-lg font-medium mb-2">
                Length
              </label>
              <select
                id="length"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="block w-full border border-border rounded-lg px-4 py-2 bg-input text-sm"
              >
                <option value="short">Short</option>
                <option value="medium">Medium</option>
                <option value="long">Long</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:bg-primary/90"
            >
              Generate Caption
            </button>
          </form>
        </div>

        {/* Right-hand Side */}
        <div className="lg:w-1/2 bg-card p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Generated Caption</h2>
          <div className="bg-muted text-muted-foreground p-4 rounded-lg min-h-[200px]">
            {result ? (
              <p>{result}</p>
            ) : (
              <p className="text-center text-sm text-muted">No caption generated yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WritePage;
