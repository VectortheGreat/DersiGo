"use client";
import Link from "next/link";

const Header = () => {
  const navs = [
    { name: "Users", path: "/users" },
    { name: "Posts", path: "/posts" },
  ];

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          DersiGo
        </Link>
        <nav className="space-x-4">
          {navs.map((nav, index) => (
            <Link key={index} href={nav.path} className="hover:text-gray-300">
              {nav.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
