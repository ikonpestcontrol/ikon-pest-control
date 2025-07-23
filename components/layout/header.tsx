"use client"

import { Button } from "@/components/ui/button"
import { Phone, Menu, X } from "lucide-react"
import Link from "next/link"
import { useState, useRef } from "react"
import { ChevronDown } from "lucide-react"
import Image from "next/image"
import { usePathname } from "next/navigation"


export default function Header() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
    }
    setIsDropdownOpen(true)
  }

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false)
    }, 200) // 200ms delay before hiding
  }


  const navigation = [
    { name: "Home", href: "/" },
    {
      name: "Services",
      href: "/services",
      submenu: [
        {
          title: "General Disinfectant",
          description: "Effective control for cockroaches, lizards, spiders, silverfish, and more.",
          href: "/services/general-pest-control",
          popular: true,
        },
        {
          title: "Termite Treatment (White Ant)",
          description: "Complete termite elimination and prevention.",
          href: "/services/termite-treatment",
        },
        {
          title: "Bed Bugs Treatment",
          description: "Specialized treatment for bed bug eradication.",
          href: "/services/bed-bug-treatment",
        },
        {
          title: "Wood Borer Treatment",
          description: "Protection and eradication of wood borers and damage prevention.",
          href: "/services/wood-borer-treatment",
        },
        {
          title: "Rat Control",
          description: "Includes trap, poison, RotaBox, and gum pad solutions for rat control.",
          href: "/services/rodent-management",
        },
        {
          title: "Ticks Treatment",
          description: "Comprehensive treatment for tick infestations.",
          href: "/services/ticks-treatment",
        },
        {
          title: "Honey Bee Removal",
          description: "Humane removal of honey bee colonies.",
          href: "/services/honey-bee-removal",
        },
        {
          title: "Pre-Construction Termite Treatment",
          description: "Preventative termite treatment before construction.",
          href: "/services/termite-treatment",
        },
        {
          title: "Post-Construction Termite Treatment",
          description: "Termite control after construction to protect the building.",
          href: "/services/termite-treatment",
        },
        {
          title: "Mosquito Fogging",
          description: "Mosquito control for commercial and residential areas.",
          href: "/services/mosquito-control",
        }
      ]
    },
    { name: "Pricing", href: "/pricing" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]


  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/logo.png" alt="Logo" width={131} height={46} className="lg:mr-28" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 relative">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                {item.submenu ? (
                  <>
                    <div
                      className="relative"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <Link
                        href="/services"
                        className={`flex items-center font-medium transition-colors ${pathname.startsWith("/services")
                          ? "text-ikongold font-semibold"
                          : "text-ikontext hover:text-ikongold"
                          }`}
                      >
                        Services
                        <ChevronDown className="ml-1 w-4 h-4" />
                      </Link>

                      {isDropdownOpen && (
                        <div className="absolute left-0 mt-2 w-72 bg-white h-80 overflow-auto  shadow-lg border rounded-md z-50">
                          {navigation.find((item) => item.name === "Services")?.submenu?.map((subItem) => (
                            <Link
                              key={subItem.title}
                              href={subItem.href}
                              className="block px-4 py-3 hover:bg-gray-50 transition"
                              onClick={() => setIsDropdownOpen(false)}
                            >
                              <div className="font-semibold text-sm text-ikontext flex justify-between items-center">
                                {subItem.title}
                                {subItem.popular && (
                                  <span className="text-xs bg-ikongold text-ikontext px-2 py-0.5 rounded">
                                    Popular
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-ikontext0">{subItem.description}</p>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={`font-medium transition-colors ${pathname === item.href
                      ? "text-ikongold font-semibold"
                      : "text-ikontext hover:text-ikongold"
                      }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>


          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="tel:9892865620" className="text-ikontext text-xl font-semibold md:hidden lg:hidden xl:inline">
              98928 65620
            </a>
            <a href="tel:9892865620">
              <Button className="bg-ikongold text-xl hover:bg-ikontext hover:text-ikongold text-ikontext">
                <Phone className="mr-2 h-4 w-4" />
                Free Inspection
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6 text-ikontext" /> : <Menu className="h-6 w-6 text-ikontext" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {
          isMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <nav className="flex flex-col space-y-4">
                {navigation.map((item) =>
                  item.submenu ? (
                    <div key={item.name}>
                      <Link
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`font-medium transition-colors ${pathname.startsWith(item.href)
                          ? "text-ikongold font-semibold"
                          : "text-ikontext hover:text-ikongold"
                          }`}
                      >
                        {item.name}
                      </Link>
                      <div className="ml-4 mt-2 flex flex-col space-y-2">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.title}
                            href={subItem.href}
                            className={`flex items-center font-medium transition-colors ${pathname === subItem.href
                              ? "text-ikongold font-semibold"
                              : "text-ikontext hover:text-ikongold"
                              }`}
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {subItem.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`font-medium transition-colors ${pathname === item.href
                        ? "text-ikongold font-semibold"
                        : "text-ikontext hover:text-ikongold"
                        }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )
                )}
                <div className="pt-4 border-t">
                  <a href="tel:9892865620" className="block text-ikontext font-semibold mb-3">
                    98928 65620
                  </a>
                  <Button className="w-full bg-ikongold text-ikontext hover:bg-ikontext hover:text-ikongold" onClick={() => { window.location.href = "tel:8448520507" }} >
                    <Phone className="mr-2 h-4 w-4" />
                    Free Inspection
                  </Button>
                </div>
              </nav>
            </div>
          )
        }
      </div >
    </header >
  )
}
