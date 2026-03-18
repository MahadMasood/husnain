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
        { label: 'Men', href: '/products?gender=Men' },
        { label: 'Women', href: '/products?gender=Women' },
        { label: 'Unisex', href: '/products?gender=Unisex' },
        { label: 'Kids', href: '/kids' },
      ],
    },
    {
      label: 'Sale',
      bgColor: '#c8860a',
      textColor: '#ffffff',
      links: [
        { label: 'All Sale Items', href: '/sale' },
        { label: 'Up to 50% off', href: '/sale?filter=50' },
        { label: 'Kids Sale', href: '/sale?gender=Kids' },
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
