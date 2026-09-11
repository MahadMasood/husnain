"use client";
import CardNav from './ui/CardNav';

const Navbar = () => {
  const navItems = [
    {
      label: 'New Arrivals',
      bgColor: '#ffffff',
      textColor: '#1a1a2e',
      links: [
        { label: 'Latest Drops', href: '/products?filter=new' },
        { label: 'Best Sellers', href: '/products?sort=rating' },
        { label: 'Lookbook', href: '/lookbook' },
      ],
    },
    {
      label: 'Collections',
      bgColor: '#fdf6ec',
      textColor: '#1a1a2e',
      links: [
        { label: 'Kids Collection', href: '/products?gender=Kids' },
        { label: 'Summer Sale', href: '/products?category=Summer' },
        { label: 'Winter Sale', href: '/products?category=Winter' },
      ],
    },
    {
      label: 'Sale',
      bgColor: '#c8860a',
      textColor: '#ffffff',
      links: [
        { label: 'All Sale Items', href: '/sale' },
        { label: 'Summer Sale', href: '/sale?season=Summer' },
        { label: 'Winter Sale', href: '/sale?season=Winter' },
      ],
    },
  ];

  return (
    <div>
      <CardNav
        logo="/vercel.svg"
        logoAlt="ThreadCo"
        items={navItems}
        baseColor="#1a1a2e"
        menuColor="#ffffff"
        buttonBgColor="#c8860a"
        buttonTextColor="#ffffff"
      />
    </div>
  );
};

export default Navbar;
