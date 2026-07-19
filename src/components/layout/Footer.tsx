import React from 'react';
import Link from 'next/link';
import { FiShoppingBag, FiTwitter, FiInstagram, FiFacebook, FiGithub } from 'react-icons/fi';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand & Description */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center space-x-2">
              <div className="bg-primary-600 text-white p-1.5 rounded-lg">
                <FiShoppingBag className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-gray-900 tracking-tight">
                ZenCart
              </span>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
              Your trusted online shopping destination for quality products, secure payments, and fast delivery.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-600 transition-colors">
                <FiTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-600 transition-colors">
                <FiInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-600 transition-colors">
                <FiFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-600 transition-colors">
                <FiGithub className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Shop</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/shop?category=electronics" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">Electronics</Link>
              </li>
              <li>
                <Link href="/shop?category=fashion" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">Fashion</Link>
              </li>
              <li>
                <Link href="/shop?category=home" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">Home & Living</Link>
              </li>
              <li>
                <Link href="/shop?category=beauty" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">Beauty</Link>
              </li>
              <li>
                <Link href="/shop?sort=newest" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">New Arrivals</Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/careers" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">Careers</Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">Blog</Link>
              </li>
              <li>
                <Link href="/sell" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">Become a Seller</Link>
              </li>
            </ul>
          </div>

          {/* Support & Legal */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Support & Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/contact" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">FAQ</Link>
              </li>
              <li>
                <Link href="/shipping" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">Shipping & Returns</Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">Terms of Service</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-gray-500">
            &copy; {currentYear} ZenCart Inc. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-gray-500">
            <span>Designed with ♥ for premium shopping</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
