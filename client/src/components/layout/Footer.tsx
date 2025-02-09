import { Link } from "wouter";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";
import Logo from "@/components/ui/Logo";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-200">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <Logo />
            </div>
            <p className="text-white-600 mb-4">
              Professional painting services for residential and commercial properties.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white-400 hover:text-gray-500">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-white-400 hover:text-gray-500">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-white-400 hover:text-gray-500">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services">
                  <a className="text-white-600 hover:text-gray-500">Services</a>
                </Link>
              </li>
              <li>
                <Link href="/pricing">
                  <a className="text-white-600 hover:text-gray-500">Pricing</a>
                </Link>
              </li>
              <li>
                <Link href="/gallery">
                  <a className="text-white-600 hover:text-gray-500">Gallery</a>
                </Link>
              </li>
              <li>
                <Link href="/booking">
                  <a className="text-white-600 hover:text-gray-500">Book Now</a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white-900 mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-white-600">
                <Phone className="w-5 h-5 mr-2" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center text-white-600">
                <Mail className="w-5 h-5 mr-2" />
                <span>info@atlashomeservices.com</span>
              </li>
              <li className="flex items-center text-white-600">
                <MapPin className="w-5 h-5 mr-2" />
                <span>123 Paint Street, SF, CA</span>
              </li>
            </ul>
          </div>

          {/* Business Hours */}
          <div>
            <h3 className="text-lg font-semibold text-white-900 mb-4">Business Hours</h3>
            <ul className="space-y-2">
              <li className="text-white-600">Mon - Fri: 8:00 AM - 6:00 PM</li>
              <li className="text-white-600">Saturday: 9:00 AM - 5:00 PM</li>
              <li className="text-white-600">Sunday: Closed</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white-200 mt-12 pt-8">
          <p className="text-center text-white-600">
            © {new Date().getFullYear()} Atlas HomeServices. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}