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
    <div className="relative min-h-screen overflow-hidden p-8">
      {/* Dynamic Animated Background */}
      <div className="animated-background"></div>

      {/* Content */}
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-[var(--primary-foreground)] mb-4">
            Write API
          </h1>
          {/* <h1 className="text-5xl font-extrabold text-[var(--primary-foreground)] mb-4">AI Content Rewriter</h1> */}
          <p className="text-lg text-[hsl(var(--muted-foreground))]">
            Upload an image and let our AI generate engaging captions for your social media or other creative projects.
          </p>
        </header>

        {/* Main Section */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Section */}
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
                className="w-full bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition-transform transform hover:scale-105"
              >
                Generate Caption
              </button>
            </form>
          </div>

          {/* Right Section */}
          <div className="lg:w-1/2 bg-card p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Generated Caption</h2>
            <div className="bg-muted text-muted-foreground p-4 rounded-lg min-h-[200px] border border-border">
              {result ? (
                <p>{result}</p>
              ) : (
                <p className="text-center text-sm text-[hsl(var(--muted-foreground))] opacity-80">
                  No caption generated yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WritePage;
