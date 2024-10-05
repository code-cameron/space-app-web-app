"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

// data files
import { links, LinkType } from "./NavLinks.data.types";

const Nav = () => {
  const pathname = usePathname();

  return (
    <nav className="container py-4 lg:py-12 flex justify-end items-center">
      <div className="flex justify-between gap-x-8">
        {links.map((link: LinkType, index) => {
          return (
            <Link
              key={index}
              href={link.path}
              className={`${
                link.path === pathname
                  ? "bg-backgroundLayer text-blue-600"
                  : "hover:text-blue-600"
              } capitalize text-lg transition-all rounded-md px-4 py-2`}
            >
              <span>{link.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Nav;
