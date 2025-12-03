"use client";
import CardNav from './ui/CardNav'; // Assuming your file is in the same directory

const Navbar = () => {
  const navItems = [
    {
      label: 'New Arrivals',
      // High contrast White card with black text
      bgColor: '#ffffff', 
      textColor: '#000000',
      links: [
        { label: 'Latest Drops', href: '#' },
        { label: 'Best Sellers', href: '#' },
        { label: 'Lookbook', href: '#' },
      ],
    },
    {
      label: 'Collections',
      // Dark Charcoal card
      bgColor: '#262626',
      textColor: '#ffffff',
      links: [
        { label: 'Winter 2025', href: '#' },
        { label: 'Techwear', href: '#' },
        { label: 'Essentials', href: '#' },
      ],
    },
    {
      label: 'Sale',
      // Bold "International Orange" for the last card
      bgColor: '#ff4400', 
      textColor: '#ffffff',
      links: [
        { label: 'Flash Sale', href: '#' },
        { label: 'Last Chance', href: '#' },
        { label: 'Archive', href: '#' },
      ],
    },
  ];

  return (
    <div>
      <CardNav
        logo="/vercel.svg"
        logoAlt="Urban Brand"
        items={navItems}
        // Base Navigation Bar Colors
        baseColor="#121212"      // Deep Black/Grey Background
        menuColor="#ffffff"      // White Hamburger Menu
        buttonBgColor="#ffffff"  // White CTA Button
        buttonTextColor="#000000" // Black CTA Text
      />
    </div>
  );
};

export default Navbar;