'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { FiShoppingBag, FiSearch, FiMenu, FiX, FiUser } from 'react-icons/fi';
import { usePathname } from 'next/navigation';
import { useCart } from '@/hooks/useCart';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { data: cart } = useCart(isAuthenticated);
  
  const cartCount = cart?.items?.reduce((total, item) => total + item.qty, 0) || 0;

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-[#4F46E5] text-white p-2 rounded-xl shadow-lg shadow-primary-500/30">
              <FiShoppingBag className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold text-slate-900 tracking-tight">
              ZenCart
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/shop" 
              className={`font-medium transition-colors hover:text-indigo-600 ${pathname === '/shop' ? 'text-indigo-600' : 'text-slate-600'}`}
            >
              Shop
            </Link>
            <Link 
              href="/about" 
              className={`font-medium transition-colors hover:text-indigo-600 ${pathname === '/about' ? 'text-indigo-600' : 'text-slate-600'}`}
            >
              About
            </Link>

            {isAuthenticated ? (
              <>
                {user?.role === 'admin' && (
                  <>
                    <Link href="/dashboard" className="font-medium text-slate-600 hover:text-indigo-600 transition-colors">
                      Dashboard
                    </Link>
                    <Link href="/items/manage" className="font-medium text-slate-600 hover:text-indigo-600 transition-colors">
                      Manage Items
                    </Link>
                    <Link href="/items/add" className="font-medium text-indigo-600 hover:text-indigo-700 transition-colors bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-full">
                      Sell a Product
                    </Link>
                    <div className="h-6 w-px bg-slate-200 mx-2"></div>
                  </>
                )}
                <Link href="/cart" className="relative text-slate-600 hover:text-indigo-600 transition-colors p-2">
                  <FiShoppingBag className="w-5 h-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[20px] h-5 text-xs font-bold text-white bg-green-500 rounded-full px-1 border-2 border-white">
                      {cartCount}
                    </span>
                  )}
                </Link>
                <div className="relative group">
                  <button className="flex items-center space-x-2 text-slate-600 hover:text-indigo-600 transition-colors p-2 rounded-full hover:bg-slate-50">
                    {user?.avatarUrl ? (
                      <img src={user.avatarUrl} alt="Profile" className="w-8 h-8 rounded-full border border-slate-200 object-cover" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold">
                        {user?.name?.charAt(0) || <FiUser />}
                      </div>
                    )}
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right scale-95 group-hover:scale-100">
                    <div className="p-2 space-y-1">
                      <div className="px-3 py-2 text-sm text-gray-500 border-b border-gray-100 mb-1">
                        Signed in as <span className="font-medium text-gray-900 truncate block">{user?.email}</span>
                      </div>
                      <Link href="/profile" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                        My Profile
                      </Link>
                      <Link href="/orders" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                        My Orders
                      </Link>
                      <button 
                        onClick={() => logout()} 
                        className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link href="/login">
                  <button className="px-6 py-2.5 text-sm font-semibold text-white bg-[#4F46E5] hover:bg-[#4338ca] rounded-full shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5">
                    Login
                  </button>
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            {isAuthenticated && (
              <Link href="/cart" className="relative text-gray-600 p-2">
                <FiShoppingBag className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-accent-500 rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}
            <button 
              onClick={toggleMobileMenu}
              className="text-gray-600 hover:text-primary-600 p-2 transition-colors focus:outline-none"
            >
              {isMobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden absolute w-full bg-white border-b border-gray-100 shadow-xl transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-1 bg-white/95 backdrop-blur-md">
          <Link href="/shop" onClick={toggleMobileMenu} className="block px-3 py-3 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-lg">
            Shop
          </Link>
          <Link href="/about" onClick={toggleMobileMenu} className="block px-3 py-3 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-lg">
            About
          </Link>
          
          {isAuthenticated ? (
            <>
              {user?.role === 'admin' && (
                <>
                  <Link href="/dashboard" onClick={toggleMobileMenu} className="block px-3 py-3 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-lg">
                    Dashboard
                  </Link>
                  <Link href="/items/manage" onClick={toggleMobileMenu} className="block px-3 py-3 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-lg">
                    Manage Items
                  </Link>
                  <Link href="/items/add" onClick={toggleMobileMenu} className="block px-3 py-3 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-lg">
                    Sell a Product
                  </Link>
                </>
              )}
              <Link href="/orders" onClick={toggleMobileMenu} className="block px-3 py-3 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-lg">
                My Orders
              </Link>
              <Link href="/profile" onClick={toggleMobileMenu} className="block px-3 py-3 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-lg">
                Profile
              </Link>
              <button 
                onClick={() => { logout(); toggleMobileMenu(); }} 
                className="block w-full text-left px-3 py-3 text-base font-medium text-red-600 hover:bg-red-50 rounded-lg"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="pt-4 pb-2">
              <Link href="/login" onClick={toggleMobileMenu}>
                <button className="w-full px-6 py-3 text-base font-semibold text-white bg-primary-600 rounded-xl shadow-md">
                  Login
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
