"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { LinkButton } from "@/app/src/components/custom/LinkButton";
import { navigationItems } from "@/app/src/lib/navigation";
import {
  DOCTOR_NAME,
  CONTACT_WHATSAPP_URL,
  DOCTOR_CRO,
} from "@/app/src/lib/constants";
import { Menu, X, Phone } from "lucide-react";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Set scrolled state for styling - add background after 20px
      setIsScrolled(currentScrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking on a link
  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${
            isScrolled
              ? "bg-white/95 backdrop-blur-lg shadow-lg"
              : "bg-white/80 backdrop-blur-sm"
          }
        `}
      >
        <div className="container px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo */}
            <Link
              href="/#hero"
              className="flex items-center gap-3 group relative z-110"
              onClick={handleNavClick}
            >
              <div className="relative w-12 h-12 lg:w-14 lg:h-14">
                <Image
                  src="/images/logo-primary.png"
                  alt={`${DOCTOR_NAME} - Logo`}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="hidden sm:block">
                <div className="font-serif font-bold text-lg lg:text-xl bg-linear-to-r from-[#28338d] to-[#5a6b91] bg-clip-text text-transparent tracking-tight">
                  {DOCTOR_NAME}
                </div>
                <div className="text-xs lg:text-sm text-[#9c9c9a] font-medium tracking-wide">
                  {DOCTOR_CRO}
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navigationItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-tertiary transition-colors hover:text-primary relative
                    after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5
                    after:bg-primary after:transition-all after:duration-300
                    hover:after:w-full"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* CTA Button - Desktop */}
            <div className="hidden lg:block">
              <LinkButton
                href={CONTACT_WHATSAPP_URL}
                external
                newTab
                variant="primary"
                size="default"
                className="shadow-lg hover:shadow-xl"
              >
                <Phone className="w-4 h-4 mr-2" />
                Agendar consulta
              </LinkButton>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`
                lg:hidden relative z-110 p-2 rounded-lg transition-colors
                ${
                  isMobileMenuOpen
                    ? "bg-white text-primary"
                    : "bg-primary/5 text-primary hover:bg-primary/10"
                }
              `}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay - Outside header */}
      <div
        className={`
          lg:hidden fixed inset-0 z-100 bg-primary transition-all duration-300 ease-in-out
          ${
            isMobileMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }
        `}
      >
        {/* Close Button - Top Right */}
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 transition-all duration-300 group z-110"
          aria-label="Close menu"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        <div className="flex flex-col items-center justify-center min-h-screen px-6 py-20">
          {/* Mobile Navigation Links */}
          <nav className="flex flex-col items-center gap-8 mb-12">
            {navigationItems.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleNavClick}
                className={`
                  text-3xl font-bold text-white hover:text-accent transition-all duration-300
                  transform hover:scale-110
                  ${
                    isMobileMenuOpen
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0"
                  }
                `}
                style={{
                  transitionDelay: isMobileMenuOpen ? `${index * 75}ms` : "0ms",
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Mobile CTA Button */}
          <div
            className={`
              transition-all duration-300
              ${
                isMobileMenuOpen
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }
            `}
            style={{
              transitionDelay: isMobileMenuOpen
                ? `${navigationItems.length * 75}ms`
                : "0ms",
            }}
          >
            <LinkButton
              href={CONTACT_WHATSAPP_URL}
              external
              newTab
              variant="default"
              size="xl"
              className="bg-white text-primary hover:bg-white/90 active:bg-primary active:text-white focus:text-white shadow-2xl hover:shadow-3xl active:scale-95 transition-all duration-200"
              onClick={handleNavClick}
            >
              <Phone className="w-5 h-5 mr-2" />
              Agendar consulta
            </LinkButton>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-20 right-10 w-32 h-32 bg-white/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-20 left-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl pointer-events-none" />
        </div>
      </div>
    </>
  );
}
