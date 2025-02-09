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
    ["rgb(0, 0, 0)", "rgba(0, 0, 0, 0.9)"]
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

  return (
    <motion.header
      style={{ backgroundColor }}
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-sm transition-all duration-300 ${
        isScrolled ? "py-4 border-b border-gray-800" : "py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/">
          <a className="cursor-pointer">
            <Logo />
          </a>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/services">
            <span className={`cursor-pointer transition-colors ${
              isActive("/services") ? "text-white font-medium" : "text-gray-300 hover:text-white"
            }`}>
              Services
            </span>
          </Link>
          <Link href="/pricing">
            <span className={`cursor-pointer transition-colors ${
              isActive("/pricing") ? "text-white font-medium" : "text-gray-300 hover:text-white"
            }`}>
              Pricing
            </span>
          </Link>
          <Link href="/gallery">
            <span className={`cursor-pointer transition-colors ${
              isActive("/gallery") ? "text-white font-medium" : "text-gray-300 hover:text-white"
            }`}>
              Gallery
            </span>
          </Link>
          <Link href="/contact">
            <span className={`cursor-pointer transition-colors ${
              isActive("/contact") ? "text-white font-medium" : "text-gray-300 hover:text-white"
            }`}>
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