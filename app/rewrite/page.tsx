"use client";

import { useState } from "react";
import { FiCopy } from "react-icons/fi"; // Import copy icon

const RewritePage = () => {
  const [content, setContent] = useState<string>(""); // Input content
  const [rewrittenContent, setRewrittenContent] = useState<string>(""); // Result content
  const [loading, setLoading] = useState<boolean>(false);
  const [copyIcon, setCopyIcon] = useState<JSX.Element | null>(<FiCopy />); // Copy icon, can dynamically update from backend

  const handleGenerate = async () => {
    if (!content.trim()) {
      alert("Please enter content to rewrite.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/rewrite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });

      const data = await response.json();

      if (response.ok) {
        setRewrittenContent(data.rewrittenContent || "No rewritten content available.");
        if (data.copyIcon) {
          setCopyIcon(data.copyIcon); // Dynamically update copy icon from backend if provided
        }
      } else {
        setRewrittenContent(data.error || "Error generating rewritten content.");
      }
    } catch (error) {
      console.error("Error rewriting content:", error);
      setRewrittenContent("Error processing your request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (rewrittenContent) {
      navigator.clipboard.writeText(rewrittenContent);
      alert("Rewritten content copied to clipboard!");
    } else {
      alert("Nothing to copy!");
    }
  };

  return (
    <div className="relative min-h-screen  text-foreground p-8 flex flex-col">
        <div className="animated-background"></div>
      {/* Fancy Heading */}
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-[var(--primary-foreground)] mb-4">AI Content Rewriter</h1>
        <p className="text-lg text-[var(--muted-foreground)]">
          Tailor your content for different platforms effortlessly. Transform a simple idea into a formal LinkedIn post or
          a fun Instagram caption with ease.
        </p>
      </header>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left-hand Side */}
        <div className="lg:w-1/2 bg-card p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Enter Your Content</h2>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter the content you want to rewrite here..."
            className="w-full h-40 border border-border rounded-lg px-4 py-2 bg-input text-sm resize-none"
          ></textarea>
          <button
            onClick={handleGenerate}
            disabled={loading}
            className={`mt-4 w-full px-6 py-2 rounded-lg font-medium ${
              loading ? "bg-primary/50 text-primary-foreground cursor-not-allowed" : "bg-primary text-primary-foreground hover:bg-primary/90"
            }`}
          >
            {loading ? "Generating..." : "Generate Rewrite"}
          </button>
        </div>

        {/* Right-hand Side */}
        <div className="lg:w-1/2 bg-card p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Rewritten Content</h2>
          <div className="relative">
            <div
              className={`bg-muted text-muted-foreground p-4 rounded-lg min-h-[200px] overflow-auto ${
                rewrittenContent ? "border border-border" : ""
              }`}
            >
              {rewrittenContent ? (
                <p>{rewrittenContent}</p>
              ) : (
                <p className="text-center text-sm ext-[hsl(var(--muted-foreground))] opacity-80">No rewritten content generated yet.</p>
              )}
            </div>
            {rewrittenContent && (
              <button
                onClick={handleCopy}
                className="absolute top-2 right-2 p-2 bg-primary text-primary-foreground rounded-md shadow hover:bg-primary/90 text-sm flex items-center justify-center"
                aria-label="Copy rewritten content"
              >
                {copyIcon}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewritePage;
