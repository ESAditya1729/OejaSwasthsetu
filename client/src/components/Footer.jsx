import React from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
  Linkedin as LinkedIn,
  XIcon
} from "lucide-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXTwitter } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 text-gray-700 dark:text-gray-300 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-4 gap-10">
        {/* Logo & Intro */}
        <div>
          <h3 className="text-2xl font-bold text-blue-800 dark:text-blue-300 mb-3">
            Oeja SwasthSetu
          </h3>
          <p className="text-sm">
            Committed to delivering high-quality healthcare with compassion and
            innovation. Your wellness is our mission.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-blue-700 dark:text-blue-400">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#services" className="hover:text-blue-600 transition">
                Services
              </a>
            </li>
            <li>
              <a href="#doctors" className="hover:text-blue-600 transition">
                Our Doctors
              </a>
            </li>
            <li>
              <a
                href="#testimonials"
                className="hover:text-blue-600 transition"
              >
                Testimonials
              </a>
            </li>
            <li>
              <a href="#facilities" className="hover:text-blue-600 transition">
                Facilities
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-blue-700 dark:text-blue-400">
            Contact Us
          </h4>
          <ul className="text-sm space-y-2">
            <li className="flex items-start gap-2">
              <Phone className="w-4 h-4 mt-1" />
              +91 9457 220433
            </li>
            <li className="flex items-start gap-2">
              <Mail className="w-4 h-4 mt-1" />
              admin@oejaswasthsetu.com
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-1" />
              Haldwani, Nainital,Uttarakhand 263139,India
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <div className="flex gap-4">
            <a href="https://www.facebook.com/share/16Pb8or9k4/" className="hover:text-blue-600 transition">
              <Facebook />
            </a>
            <a href="https://www.instagram.com/oeja_swasthsetu?utm_source=qr&igsh=OWF1aHFzYTRod3cy" className="hover:text-blue-600 transition">
              <Instagram />
            </a>
            <a href="https://x.com/oejaswasthsetu?t=jC5McpY-OO8oznRremC-qw&s=08" className="hover:text-blue-600 transition">
              <FontAwesomeIcon icon={faXTwitter} />
            </a>
            <a href="https://www.linkedin.com/company/oeja-swasthsetu/" className="hover:text-blue-600 transition">
              <LinkedIn />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400 border-t pt-4 border-blue-100 dark:border-blue-900">
        &copy; {new Date().getFullYear()} OejaSwasthsetu. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
