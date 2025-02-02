"use client";

import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/netflix_logo.svg";
import { usePathname, useRouter } from "next/navigation";
import { Bell, MenuIcon, Search, XIcon } from "lucide-react";
import UserNav from "./UserNav";
import { useState } from "react";
import { Button } from "./ui/button";
import { User } from "@prisma/client";


interface linkProps {
  name: string;
  href: string;
}

const links: linkProps[] = [
  { name: "Home", href: "/" },
  { name: "Tv Shows", href: "/category/show" },
  { name: "Movies", href: "/category/movie" },
  { name: "Recently Added", href: "/category/recent" },
  { name: "My List", href: "/user/list" },
];

export default function Navbar({user} : {user : User | null}) {
 const router = useRouter()
  const pathName = usePathname();
  const [openMenu,setOpenMenu] = useState(false)
  return (
    <div className="w-full container mx-auto items-center justify-between   py-5  flex">
      <div className="flex items-center">
        <Link href="/" className="w-32">
          <Image width={300} src={Logo} alt="Netflix logo" priority />
        </Link>
        <ul  className={`fixed lg:static ${
          openMenu ? "left-0 z-50" : "-left-full"
        } top-0 px-10 py-20 lg:p-0 bg-background lg:bg-transparent lg:ml-14 transition-all duration-200 h-full lg:h-auto flex-col lg:flex-row w-full lg:w-auto flex items-start lg:items-center gap-10`}
      >
        <Button
          variant="secondary"
          size="sm"
          className="absolute top-10 right-10 lg:hidden"
          onClick={() => setOpenMenu(false)}
        >
          <XIcon className="!w-6 !h-6" />
        </Button>
          {links.map((link, idx) => (
            <div key={idx}>
              {pathName === link.href ? (
                <li>
                  <Link
                    href={link.href}
                    className="text-white font-semibold underline text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ) : (
                <li>
                  <Link
                    className="text-gray-300 font-normal text-sm"
                    href={link.href}
                  >
                    {link.name}
                  </Link>
                </li>
              )}
            </div>
          ))}
        </ul>
      </div>

      <div className="flex items-center md:space-x-5 space-x-2">
        <Search className="w-5 h-5 text-gray-300 cursor-pointer" />
        <Bell className="h-5 w-5 text-gray-300 cursor-pointer" />
        {user ? (
          <UserNav />
        ) : <Button onClick={()=>router.push("/signin")}>Login</Button>}
        <Button  onClick={() => setOpenMenu(true)} size={"icon"} className="lg:hidden bg-black text-white border border-white hover:bg-gray-500">
          <MenuIcon className="!w-4 !h-4"/>
        </Button>
      </div>
    </div>
  );
}