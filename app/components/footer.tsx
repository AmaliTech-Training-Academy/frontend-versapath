import Link from "next/link";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import Image from "next/image";

function FooterLink({
  href,
  children,
  className = "",
}: Readonly<{ href: string; children: React.ReactNode; className?: string }>) {
  return (
    <li>
      <Link href={href} className={`transition-colors ${className}`}>
        {children}
      </Link>
    </li>
  );
}

export function Footer() {
  return (
    <footer className="text-white py-12 px-16">
      <div className="container mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image
                src="/Logo.svg"
                alt="Logo"
                width={52}
                height={52}
              />
              <span className="font-bold text-xl">VersaPath</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              VersaPath.ai is an intelligent, modular, and scalable platform
              built to accelerate skill development, career growth, and
              workforce readiness for software engineers.{" "}
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Link</h3>
            <ul className="space-y-2 text-md">
              <FooterLink href="#">Home</FooterLink>
              <FooterLink href="#" className="hover:text-white">
                Learning Paths
              </FooterLink>
              <FooterLink href="#" className="text-gray-400 hover:text-white">
                For Learners
              </FooterLink>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <FooterLink href="#" className="text-gray-400 hover:text-white">
                Blog
              </FooterLink>
              <FooterLink href="#" className="text-gray-400 hover:text-white">
                Case Studies
              </FooterLink>
              <FooterLink href="#" className="text-gray-400 hover:text-white">
                Help Center
              </FooterLink>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <FooterLink href="#" className="text-gray-400 hover:text-white">
                Privacy Policy
              </FooterLink>
              <FooterLink href="#" className="text-gray-400 hover:text-white">
                Terms of Service
              </FooterLink>
              <FooterLink href="#" className="text-gray-400 hover:text-white">
                Security & Compliance
              </FooterLink>
            </ul>
          </div>

          <div className="flex items-center gap-2">
            <h3 className="font-semibold">Connect With Us</h3>
            <div className="flex gap-2">
              {[
                { href: "#", icon: Facebook },
                { href: "#", icon: Twitter },
                { href: "#", icon: Linkedin },
                { href: "#", icon: Instagram },
              ].map(({ href, icon: Icon }, idx) => (
                <Link
                  key={href + idx}
                  href={href}
                  className="transition-colors"
                >
                  <Icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-sm ">
          <p>&copy; 2025 VersaPath AI | All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}
