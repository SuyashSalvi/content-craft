import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTwitter, faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-[hsl(var(--card))] border-t border-[hsl(var(--border))] py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-[hsl(var(--muted-foreground))] text-sm">
        {/* About Section */}
        <div>
          <h3 className="text-lg font-bold text-[var(--primary-foreground)] mb-4">About Us</h3>
          <p>
            ContentCraft is your ultimate companion for effortless content creation. We use AI to generate unique scripts, outlines, captions, and more, tailored to your needs.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold text-[var(--primary-foreground)] mb-4">Quick Links</h3>
          
          <ul className="space-y-2">
            <li>
              <a
                href="/about"
                className="hover:text-[hsl(var(--primary))] transition-colors"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="hover:text-[hsl(var(--primary))] transition-colors"
              >
                Contact Us
              </a>
            </li>
            <li>
              <a
                href="/privacy"
                className="hover:text-[hsl(var(--primary))] transition-colors"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="/terms"
                className="hover:text-[hsl(var(--primary))] transition-colors"
              >
                Terms of Service
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-lg font-bold text-[var(--primary-foreground)] mb-4">Contact</h3>
          <p>Email: <a href="mailto:support@contentcraft.com" className="hover:text-[hsl(var(--primary))]">support@contentcraft.com</a></p>
          <p>Phone: <a href="tel:+123456789" className="hover:text-[hsl(var(--primary))]">+1 234 567 89</a></p>
          <p>Address: 123 AI Street, Tech City, World</p>
        </div>
      </div>

      {/* Social Media Section
      <div className="mt-8 text-center">
        <h3 className="text-lg font-bold text-[hsl(var(--primary-foreground))] mb-4">Follow Us</h3>
        <div className="flex justify-center space-x-6">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors"
            title="Twitter"
          >
            <FontAwesomeIcon icon={faTwitter} className="text-2xl" />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors"
            title="GitHub"
          >
            <FontAwesomeIcon icon={faGithub} className="text-2xl" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors"
            title="LinkedIn"
          >
            <FontAwesomeIcon icon={faLinkedin} className="text-2xl" />
          </a>
        </div>
      </div> */}

      {/* Bottom Section */}
      <div className="mt-8 text-center text-xs text-[hsl(var(--muted-foreground))] border-t border-[hsl(var(--border))] pt-4">
        <p>
          &copy; {new Date().getFullYear()}{" "}
          <span className="font-semibold text-[var(--primary-foreground)]">
            ContentCraft
          </span>
          . All rights reserved.
        </p>
        <p>
          Built with ❤️ by{" "}
          <a
            href="https://github.com/ruchikamuddinagiri"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[hsl(var(--primary))] hover:underline"
          >
            Ruchika Muddinagiri
          </a>
          ,{" "}
          <a
            href="https://github.com/SuyashSalvi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[hsl(var(--primary))] hover:underline"
          >
            Suyash Salvi
          </a>
          .
        </p>
      </div>
    </footer>
  );
};

export default Footer;
