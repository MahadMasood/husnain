import Link from 'next/link';
import { Instagram, Twitter, Youtube, Mail, MapPin, Phone } from 'lucide-react';

const FooterSection = ({ title, links }) => (
  <div>
    <h4 className="font-bold text-sm text-slate-200 uppercase tracking-widest mb-4">{title}</h4>
    <ul className="space-y-2">
      {links.map(({ label, href }) => (
        <li key={label}>
          <Link href={href} className="font-mono text-sm text-slate-400 hover:text-amber-400 transition-colors">
            {label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      {/* Top section */}
      <div className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-black tracking-tighter text-white mb-3">ThreadCo</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xs">
              Premium clothing for every generation. From playful kids' styles to refined adult essentials — quality that lasts.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Instagram, href: '#', label: 'Instagram' },
                { icon: Twitter, href: '#', label: 'Twitter' },
                { icon: Youtube, href: '#', label: 'YouTube' },
              ].map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} aria-label={label}
                  className="w-9 h-9 border border-slate-700 rounded-full flex items-center justify-center text-slate-400 hover:border-amber-400 hover:text-amber-400 transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <FooterSection title="Shop" links={[
            { label: 'New Arrivals', href: '/products?filter=new' },
            { label: 'Men', href: '/products?gender=Men' },
            { label: 'Women', href: '/products?gender=Women' },
            { label: 'Kids', href: '/products?gender=Kids' },
            { label: 'Sale', href: '/sale' },
          ]} />

          <FooterSection title="Explore" links={[
            { label: 'Lookbook', href: '/lookbook' },
            { label: 'Collections', href: '/products' },
            { label: 'Best Sellers', href: '/products?sort=rating' },
            { label: 'Hoodies', href: '/products?category=Hoodies' },
            { label: 'Jackets', href: '/products?category=Jackets' },
          ]} />

          <FooterSection title="Help" links={[
            { label: 'Size Guide', href: '#' },
            { label: 'Shipping Info', href: '#' },
            { label: 'Returns & Exchanges', href: '#' },
            { label: 'FAQ', href: '#' },
            { label: 'Contact Us', href: '#' },
          ]} />
        </div>
      </div>

      {/* Contact bar */}
      <div className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: Mail, text: 'hello@threadco.com' },
            { icon: Phone, text: '+1 (800) 123-4567' },
            { icon: MapPin, text: 'Tokyo · New York · London' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-3 text-slate-400">
              <Icon className="w-4 h-4 text-amber-500 shrink-0" />
              <span className="font-mono text-sm">{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="border-b border-slate-800 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="font-bold text-white mb-1">Get 10% off your first order</h4>
            <p className="text-slate-400 text-sm">Join the ThreadCo community. New drops, style guides & exclusive offers.</p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 md:w-64 bg-slate-700 border border-slate-600 px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 rounded-xl font-mono text-sm"
            />
            <button className="px-5 py-3 bg-amber-500 text-white font-bold rounded-xl hover:bg-amber-600 transition-colors shrink-0">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-stone-500 font-mono text-xs">
        <p>© 2025 ThreadCo. All rights reserved.</p>
        <div className="flex gap-4">
          <Link href="#" className="hover:text-amber-400 transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-amber-400 transition-colors">Terms of Service</Link>
          <Link href="#" className="hover:text-amber-400 transition-colors">Cookie Settings</Link>
        </div>
      </div>
    </footer>
  );
}
