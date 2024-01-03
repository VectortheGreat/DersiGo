import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          DersiGo
        </Link>
        <nav className="space-x-4">
          <Link href="/users" className="hover:text-gray-300">
            Users
          </Link>
          <Link href="/posts" className="hover:text-gray-300">
            Posts
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
