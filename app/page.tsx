import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      {/* <div className="relative h-screen bg-gradient-to-r from-[var(--background-start)] to-[var(--background-end)]"> */}
      <div className="relative h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="animated-background"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center max-w-3xl mx-auto">
            <Image
              src="/contentcraft-logo.png"
              alt="ContentCraft Logo"
              width={120}
              height={120}
              className="rounded-full shadow-lg border-4"
              style={{
                borderColor: "hsl(var(--foreground))",
              }}
              priority
            />
            <h1 className="mt-6 text-5xl font-extrabold text-[var(--primary-foreground)]">
              ContentCraft
            </h1>
            <p className="mt-4 text-xl text-[var(--muted-foreground)]">
              Your ultimate companion for effortless content creation. Unlock the power of AI to generate unique scripts, outlines, captions, and more.
            </p>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
              
              {/* Prompt API Box */}
              <Link href="/prompt">
              <div className="p-6 bg-[var(--card)] border border-[hsl(var(--border))] rounded-lg shadow-md hover:shadow-lg hover:border-[hsl(var(--primary))] transition-transform transform hover:scale-105 cursor-pointer">
                <div className="mb-4 flex justify-center">
                  <img
                    src="/icon-prompt-api.png"
                    alt="Prompt API Icon"
                    className="w-12 h-12"
                  />
                </div>
                <h3 className="text-2xl font-bold text-[var(--primary-foreground)]">
                  Prompt API
                </h3>
                <p className="mt-2 text-[var(--muted-foreground)]">
                  Generate unique video scripts or podcast outlines tailored to your needs.
                </p>
              </div>
              </Link>

              {/* Write API Box */}
              <Link href="/write">
              <div className="p-6 bg-[var(--card)] border border-[hsl(var(--border))] rounded-lg shadow-md hover:shadow-lg hover:border-[hsl(var(--primary))] transition-transform transform hover:scale-105 cursor-pointer">
                <div className="mb-4 flex justify-center">
                  <img
                    src="/icon-prompt-api.png"
                    alt="Write API Icon"
                    className="w-12 h-12"
                  />
                </div>
                <h3 className="text-2xl font-bold text-[var(--primary-foreground)]">
                  Write API
                </h3>
                <p className="mt-2 text-[var(--muted-foreground)]">
                  Create engaging captions for social media that resonate with your audience.
                </p>
              </div>
              </Link>

              {/* Rewrite API Box */}
              <Link href="/rewrite">
              <div className="p-6 bg-[var(--card)] border border-[hsl(var(--border))] rounded-lg shadow-md hover:shadow-lg hover:border-[hsl(var(--primary))] transition-transform transform hover:scale-105 cursor-pointer">
                <div className="mb-4 flex justify-center">
                  <img
                    src="/icon-prompt-api.png"
                    alt="Rewrite API Icon"
                    className="w-12 h-12"
                  />
                </div>
                <h3 className="text-2xl font-bold text-[var(--primary-foreground)]">
                  Rewrite API
                </h3>
                <p className="mt-2 text-[var(--muted-foreground)]">
                  Tailored versions for different platforms—formal for LinkedIn, fun for Instagram.
                </p>
              </div>
              </Link>

            </div>
            
            {/* <button className="mt-12 px-8 py-4 text-xl font-semibold text-[var(--primary-foreground)] bg-[var(--primary)] rounded-full hover:bg-[var(--secondary)] transition-transform transform hover:scale-105">
              Start Creating Now
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
