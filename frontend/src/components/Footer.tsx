import { SiX, SiFacebook, SiLinkedin, SiInstagram } from "react-icons/si";

export function Footer() {
  return (
    <footer className="w-full border-t bg-gradient-to-r bg text-white">
      <div className="mx-auto max-w-6xl px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Brand / App Info */}
        <div>
          <h2 className="text-xl font-bold">FinEase</h2>
          <p className="mt-2 text-sm opacity-80">
            Track your expenses, set budgets, and stay on top of your finances.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/dashboard" className="hover:underline">
                Dashboard
              </a>
            </li>
            <li>
              <a href="/budgets" className="hover:underline">
                Budgets
              </a>
            </li>
            <li>
              <a href="/reports" className="hover:underline">
                Reports
              </a>
            </li>
            <li>
              <a href="/settings" className="hover:underline">
                Settings
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Connect</h3>
          <div className="flex space-x-4 text-2xl">
            <a href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-gray-300">
              <SiX />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-gray-300">
              <SiFacebook />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-gray-300">
              <SiLinkedin />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-gray-300">
              <SiInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20 text-center py-4 text-sm opacity-70">
        © {new Date().getFullYear()} FinEase. All rights reserved.
      </div>
    </footer>
  );
}
