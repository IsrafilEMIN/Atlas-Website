import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import Logo from "@/components/ui/Logo";

export default function Header() {
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(0, 0, 0, 1)", "rgba(0, 0, 0, 1)"]  // Set to solid black
  );
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => location === path;

  // Navigation link styling - updated with smaller text
  const linkStyle = (path: string) => 
    `cursor-pointer transition-colors duration-200 text-sm font-medium font-['SF Pro Display',-apple-system,BlinkMacSystemFont,system-ui,sans-serif] ${
      isActive(path) 
        ? "text-white" // Active state
        : "text-gray-300 hover:text-white" // Inactive state
    }`;

  return (
    <motion.header
      style={{ backgroundColor }}
      className={`fixed top-0 left-0 right-0 z-50 bg-black transition-all duration-300 ${
        isScrolled ? "py-1.5 border-b border-gray-800/50" : "py-2"
      }`}
    >
      <div className="mx-auto px-6 max-w-6xl flex items-center justify-between relative box-content">
        <Link href="/">
          <Logo />
        </Link>

        <nav className="hidden md:flex items-center space-x-16">
          <Link href="/">
            <span className={linkStyle("/")}>
              Home
            </span>
          </Link>
          <Link href="/services">
            <span className={linkStyle("/services")}>
              Services
            </span>
          </Link>
          <Link href="/pricing">
            <span className={linkStyle("/pricing")}>
              Pricing
            </span>
          </Link>
          <Link href="/gallery">
            <span className={linkStyle("/gallery")}>
              Gallery
            </span>
          </Link>
          <Link href="/contact">
            <span className={linkStyle("/contact")}>
              Contact
            </span>
          </Link>
        </nav>

        <Link href="/booking">
          <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black">
            Book Now
          </Button>
        </Link>
      </div>
    </motion.header>
  );
}