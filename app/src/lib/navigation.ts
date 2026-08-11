export interface NavItem {
  href: string
  label: string
}

/*
  Ordered by destination, not by topic: the pages come first, then the two
  in-page anchors. Mixing them made Galeria — which only scrolls the current
  page — sit between Tratamentos and Blog, both of which navigate away.

  Header (desktop and mobile) and Footer all render this one array, so the
  order stays in sync across the three by construction.
*/
export const navigationItems: NavItem[] = [
  // Subpages.
  { href: '/sobre', label: 'Sobre' },
  { href: '/tratamentos', label: 'Tratamentos' },
  { href: '/blog', label: 'Blog' },
  // Anchors on the landing page.
  { href: '/#galeria', label: 'Galeria' },
  { href: '/#contato', label: 'Contato' },
]
