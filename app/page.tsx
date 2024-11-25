// import Image from "next/image";

// export default function Home() {
//   return (
//     <div>
//       <div className="relative h-screen bg-gradient-to-r from-[var(--background-start)] to-[var(--background-end)]">
//         <div className="absolute inset-0 flex items-center justify-center">
//           <div className="text-center">
//             <Image
//               src="/logo.png"
//               alt="UBA Logo"
//               width={100}
//               height={100}
//               className="rounded-full"
//             />
//             <h1 className="mt-4 text-6xl font-bold text-[var(--primary-foreground)]">
//               User Behavioural Analysis
//             </h1>
//             <p className="mt-4 text-2xl text-[var(--muted-foreground)]">
//               Get insights into your users behaviour and optimize your app or website for better user experience.
//             </p>
//             <button className="mt-12 px-8 py-4 text-2xl font-semibold text-[var(--primary-foreground)] bg-[var(--primary)] rounded-full hover:bg-[var(--secondary)]">
//               Get Started
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



import Image from "next/image";

export default function Home() {
  return (
    <div>
      <div className="relative h-screen bg-gradient-to-r from-[var(--background-start)] to-[var(--background-end)]">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center max-w-3xl mx-auto">
            <Image
              src="/contentcraft-logo.png"
              alt="ContentCraft Logo"
              width={120}
              height={120}
              className="rounded-full shadow-lg"
            />
            <h1 className="mt-6 text-5xl font-extrabold text-[var(--primary-foreground)]">
              ContentCraft
            </h1>
            <p className="mt-4 text-xl text-[var(--muted-foreground)]">
              Your ultimate companion for effortless content creation. Unlock the power of AI to generate unique scripts, outlines, captions, and more.
            </p>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-6 bg-[var(--card-background)] rounded-lg shadow-md hover:shadow-lg transition">
                <h3 className="text-2xl font-bold text-[var(--primary-foreground)]">
                  Prompt API
                </h3>
                <p className="mt-2 text-[var(--muted-foreground)]">
                  Generate unique video scripts or podcast outlines tailored to your needs.
                </p>
              </div>
              <div className="p-6 bg-[var(--card-background)] rounded-lg shadow-md hover:shadow-lg transition">
                <h3 className="text-2xl font-bold text-[var(--primary-foreground)]">
                  Write API
                </h3>
                <p className="mt-2 text-[var(--muted-foreground)]">
                  Create engaging captions for social media that resonate with your audience.
                </p>
              </div>
              <div className="p-6 bg-[var(--card-background)] rounded-lg shadow-md hover:shadow-lg transition">
                <h3 className="text-2xl font-bold text-[var(--primary-foreground)]">
                  Rewrite API
                </h3>
                <p className="mt-2 text-[var(--muted-foreground)]">
                  Transform your content into tailored versions for different platforms—formal for LinkedIn, fun for Instagram.
                </p>
              </div>
            </div>
            <button className="mt-12 px-8 py-4 text-xl font-semibold text-[var(--primary-foreground)] bg-[var(--primary)] rounded-full hover:bg-[var(--secondary)]">
              Start Creating Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
