import Image from "next/image";
import LinksDropdown from "./LinksDropdown";
import DarkMode from "./DarkMode";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-[hsl(var(--border))] bg-[hsl(var(--card))] shadow-md">
      <div className="container flex flex-col sm:flex-row sm:justify-between sm:items-center flex-wrap gap-4 py-4 px-6">
        {/* Logo Section */}
        <div className="flex items-center gap-4">
          <Image
            src="/contentcraft-logo.png"
            alt="ContentCraft Logo"
            width={48}
            height={48}
            className="rounded-full border-2 border-[hsl(var(--foreground))] shadow-lg hover:scale-110 transition-transform"
            priority
          />
          <h1 className="text-2xl font-bold text-[var(--primary-foreground)]">
            ContentCraft
          </h1>
        </div>

        {/* Right Section */}
        <div className="flex gap-4 items-center">
          {/* Dark Mode Toggle */}
          <DarkMode />

          {/* Links Dropdown */}
          <LinksDropdown />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;