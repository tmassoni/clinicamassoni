'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { LinkButton } from '@/components/ui/LinkButton'
import { navigationItems } from '@/lib/navigation'
import { DOCTOR_NAME, CONTACT_WHATSAPP_NUMBER } from '@/lib/constants'
import { Menu, X, Phone } from 'lucide-react'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Set scrolled state for styling
      setIsScrolled(currentScrollY > 20)

      // Auto-hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  // Close mobile menu when clicking on a link
  // const handleNavClick = () => {
  //   setIsMobileMenuOpen(false)
  // }

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-lg shadow-lg'
            : 'bg-transparent'
        }
        ${isVisible ? 'translate-y-0' : '-translate-y-full'}
      `}
    >
      <div className="container px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <Link
            href="/#hero"
            className="flex items-center gap-3 group relative z-50"
            // onClick={handleNavClick}
          >
            <div className="relative w-12 h-12 lg:w-14 lg:h-14 transition-transform group-hover:scale-105">
              <Image
                src="/images/logo.svg"
                alt={`${DOCTOR_NAME} - Logo`}
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <p
                className={`font-bold text-lg lg:text-xl transition-colors ${
                  isScrolled ? 'text-[#042B48]' : 'text-white'
                }`}
              >
                {DOCTOR_NAME}
              </p>
              <p
                className={`text-xs lg:text-sm transition-colors ${
                  isScrolled ? 'text-[#6A7E8B]' : 'text-white/90'
                }`}
              >
                CRO-PR 4982
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navigationItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`
                  text-sm font-medium transition-colors hover:text-[#042B48] relative
                  after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5
                  after:bg-[#042B48] after:transition-all after:duration-300
                  hover:after:w-full
                  ${isScrolled ? 'text-[#6A7E8B]' : 'text-white/90'}
                `}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA Button - Desktop */}
          <div className="hidden lg:block">
            <LinkButton
              href={`https://wa.me/${CONTACT_WHATSAPP_NUMBER.replace(
                /\D/g,
                ''
              )}`}
              external
              newTab
              variant="primary"
              size="default"
              className="shadow-lg hover:shadow-xl"
            >
              <Phone className="w-4 h-4 mr-2" />
              Agendar Consulta
            </LinkButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`
              lg:hidden relative z-50 p-2 rounded-lg transition-colors
              ${
                isMobileMenuOpen
                  ? 'bg-white text-[#042B48]'
                  : isScrolled
                  ? 'bg-[#042B48]/5 text-[#042B48] hover:bg-[#042B48]/10'
                  : 'bg-white/10 text-white hover:bg-white/20'
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

      {/* Mobile Menu Overlay */}
      <div
        className={`
          lg:hidden fixed inset-0 bg-[#042B48]/95 backdrop-blur-lg transition-all duration-300 ease-in-out
          ${
            isMobileMenuOpen
              ? 'opacity-100 pointer-events-auto'
              : 'opacity-0 pointer-events-none'
          }
        `}
        style={{ top: '0' }}
      >
        <div className="flex flex-col items-center justify-center min-h-screen px-6 py-20">
          {/* Mobile Navigation Links */}
          <nav className="flex flex-col items-center gap-8 mb-12">
            {navigationItems.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                // onClick={handleNavClick}
                className={`
                  text-3xl font-bold text-white hover:text-[#C8CFD3] transition-all duration-300
                  transform hover:scale-110
                  ${
                    isMobileMenuOpen
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-4 opacity-0'
                  }
                `}
                style={{
                  transitionDelay: isMobileMenuOpen ? `${index * 75}ms` : '0ms',
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
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-4 opacity-0'
              }
            `}
            style={{
              transitionDelay: isMobileMenuOpen
                ? `${navigationItems.length * 75}ms`
                : '0ms',
            }}
          >
            <LinkButton
              href={`https://wa.me/${CONTACT_WHATSAPP_NUMBER.replace(
                /\D/g,
                ''
              )}`}
              external
              newTab
              variant="default"
              size="xl"
              className="bg-white text-[#042B48] hover:bg-white/90 shadow-2xl"
              // onClick={handleNavClick}
            >
              <Phone className="w-5 h-5 mr-2" />
              Agendar Consulta
            </LinkButton>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-20 right-10 w-32 h-32 bg-white/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-20 left-10 w-40 h-40 bg-[#3C576A]/20 rounded-full blur-3xl pointer-events-none" />
        </div>
      </div>
    </header>
  )
}
