import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-ikontext text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/logo.jpg" alt="Logo" width={80} height={80} className="rounded-full" />
            </Link>
            <p className="text-gray-400 mb-4 py-2">
              Professional pest management solutions since 2005. Serving Mira Road, Bhayandar, and Thane with WHO &
              HACCP approved treatments.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/profile.php?id=61575939877393"><Facebook className="h-5 w-5 text-gray-400 hover:text-ikongold cursor-pointer" /></a>
              <a href="https://www.instagram.com/ikon_pest_control/"><Instagram className="h-5 w-5 text-gray-400 hover:text-ikongold cursor-pointer" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: "Home", href: "/" },
                { name: "Our Services", href: "/services" },
                { name: "Pricing Plans", href: "/pricing" },
                { name: "About Us", href: "/about" },
                { name: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-ikongold transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              {[
                "General Pest Control",
                "Termite Treatment",
                "Bed Bug Treatment",
                "Rodent Management",
                "Mosquito Control",
                "Wood Borer Treatment",
              ].map((service) => {
                const url = `/services/${service.toLowerCase().replace(/\s+/g, "-")}`;
                return (
                  <li key={service}>
                    <a href={url} className="text-gray-400 hover:text-ikongold transition-colors duration-200">
                      {service}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>


          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-ikongold" />
                <a href="tel:9892865620">
                  <div>
                    <p className="text-white text-xl font-semibold">98928 65620</p>
                    <p className="text-gray-400 text-sm">24/7 Service Available</p>
                  </div>
                </a>
              </div>
              <div className="flex items-center break-all space-x-3">
                <Mail className="h-5 w-5 text-ikongold" />
                <a href="mailto:OjHtT@example.com">
                  <div >
                    <p className="text-white">ikonpestcontrolservice@gmail.com</p>
                  </div>
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-ikongold" />
                <a href="https://maps.app.goo.gl/Hsh5sENoLLKVgaSb7">
                  <div>
                    <p className="text-white">Shop No. 7, B Wing, Bhairav Darshan</p>
                    <p className="text-gray-400 text-sm">Bhayandar (E), Thane - 401105</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      {/* <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
              <p className="text-gray-400">Get pest prevention tips and special offers</p>
            </div>
            <div className="flex w-full md:w-auto">
              <Input
                placeholder="Enter your email"
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 rounded-r-none"
              />
              <Button className="bg-green-600 hover:bg-green-700 rounded-l-none">Subscribe</Button>
            </div>
          </div>
        </div>
      </div> */}

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-400 text-sm text-center">© {new Date().getFullYear()} Ikon pest control All rights reserved, Developed by <a href="https://elfoxisdigital.com" target="_blank">Elfoxis Digital</a>.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-ikongold text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-ikongold text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
