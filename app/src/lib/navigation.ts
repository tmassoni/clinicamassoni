export interface NavItem {
  href: string
  label: string
}

export const navigationItems: NavItem[] = [
  { href: '/#sobre', label: 'Sobre' },
  { href: '/#servicos', label: 'Serviços' },
  { href: '/#galeria', label: 'Galeria' },
  { href: '/blog', label: 'Blog' },
  { href: '/#contato', label: 'Contato' },
]
