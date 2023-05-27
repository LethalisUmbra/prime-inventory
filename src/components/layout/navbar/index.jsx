"use client";
// React
import { useContext, useState } from "react";
// Next
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
// React Icons
import { HiMenu, HiX } from "react-icons/hi";
import { MdLogin } from "react-icons/md";
// Navbar Components
import DropdownLink from "./DropdownLink";
import NavbarLink from "./NavbarLink";
import VerticalLink from "./VerticalLink";
import VerticalDropdownLink from "./VerticalDropdownLink";
// Context
import { Context } from "@/context";

export default function Navbar() {
  // Context
  const { user } = useContext(Context);
  // Variables
  const [isOpen, setIsOpen] = useState(false);

  // Pathname
  const pathname = usePathname();

  // Functions
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className='fixed w-full top-0 z-50 bg-neutral-800 text-white font-medium'>
      <div className='mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-strech justify-between h-14'>
          <div className='flex justify-center'>
            <div className='flex-shrink-0 self-center'>
              <Link
                href='/'
                className={`${
                  pathname === "/" ? "drop-shadow-[0_0_3px_#FBBF24]" : ""
                } hover:drop-shadow-[0_0_5px_#FBBF24]  transition-all`}
              >
                <Image alt='logo' src={"/favicon.ico"} width={40} height={40} />
              </Link>
            </div>
            {user && (
              <div className='ml-4 hidden md:flex items-stretch md:ml-6'>
                <DropdownLink
                  active={
                    pathname.startsWith("/primary") ||
                    pathname.startsWith("/secondary") ||
                    pathname.startsWith("/melee")
                  }
                  text='Weapons'
                  links={[
                    {
                      text: "Primary",
                      href: "/primary",
                      active: pathname.startsWith("/primary"),
                    },
                    {
                      text: "Secondary",
                      href: "/secondary",
                      active: pathname.startsWith("/secondary"),
                    },
                    {
                      text: "Melee",
                      href: "/melee",
                      active: pathname.startsWith("/melee"),
                    },
                  ]}
                />
                <NavbarLink
                  title={"Warframes"}
                  href={"/warframes"}
                  active={pathname.startsWith("/warframes")}
                />
                <NavbarLink
                  title={"Archwings"}
                  href={"/archwings"}
                  active={pathname.startsWith("/archwings")}
                />
                <NavbarLink
                  title={"Companions"}
                  href={"/companions"}
                  active={pathname.startsWith("/companions")}
                />
              </div>
            )}
          </div>
          <div className='hidden md:flex'>
            <div className='flex px-2 gap-3 text-center font-bold text-white'>
              {user ? (
                <DropdownLink
                  active={pathname.startsWith("/profile")}
                  text={user.name}
                  links={
                    user.is_admin
                      ? [
                          {
                            text: "Profile",
                            href: "/profile",
                            active: pathname.startsWith("/profile"),
                          },
                          {
                            text: "Admin",
                            href: "/admin",
                          },
                          {
                            text: "Log out",
                            href: "/auth/logout",
                          },
                        ]
                      : [
                          {
                            text: "Profile",
                            href: "/profile",
                            active: pathname.startsWith("/profile"),
                          },
                          {
                            text: "Log out",
                            href: "/auth/logout",
                          },
                        ]
                  }
                />
              ) : (
                <Link
                  href={"/auth/login"}
                  className='w-full flex gap-2 items-center justify-center transition-all px-5 border border-white hover:text-black hover:bg-white my-2'
                >
                  <MdLogin size={20} /> Login
                </Link>
              )}
              <Link
                href={"https://www.warframe.com"}
                target='_blank'
                className='w-full flex items-center justify-center border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all px-5 whitespace-nowrap my-2'
              >
                Official webpage
              </Link>
            </div>
          </div>
          <div className='-mr-2 flex items-center md:hidden'>
            <button
              onClick={toggleNavbar}
              type='button'
              className='flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-neutral-900 focus:outline-none transition-all duration-150'
              aria-label='Main menu'
              aria-expanded='false'
            >
              {isOpen ? <HiX size={20} /> : <HiMenu size={20} />}
            </button>
          </div>
        </div>
      </div>
      <div className={`${isOpen ? "" : "hidden"} md:hidden`}>
        <div className='px-2 pt-2 pb-3 sm:px-3'>
          <VerticalDropdownLink
            active={
              pathname.startsWith("/primary") ||
              pathname.startsWith("/secondary") ||
              pathname.startsWith("/melee")
            }
            text='Weapons'
            links={[
              {
                text: "Primary",
                href: "/primary",
                active: pathname.startsWith("/primary"),
              },
              {
                text: "Secondary",
                href: "/secondary",
                active: pathname.startsWith("/secondary"),
              },
              {
                text: "Melee",
                href: "/melee",
                active: pathname.startsWith("/melee"),
              },
            ]}
          />
          <VerticalLink
            href={"/warframes"}
            active={pathname.startsWith("/warframes")}
          >
            Warframes
          </VerticalLink>
          <VerticalLink
            href={"/archwings"}
            active={pathname.startsWith("/archwings")}
          >
            Archwings
          </VerticalLink>
          <VerticalLink
            href={"/companions"}
            active={pathname.startsWith("/companions")}
          >
            Companions
          </VerticalLink>

          <div className='flex flex-col py-2 gap-3 text-center font-bold text-white'>
            {user ? (
              <VerticalDropdownLink
                active={pathname.startsWith("/profile")}
                text={user.name}
                links={
                  user.is_admin
                    ? [
                        {
                          text: "Profile",
                          href: "/profile",
                          active: pathname.startsWith("/profile"),
                        },
                        {
                          text: "Admin",
                          href: "/admin",
                        },
                        {
                          text: "Log out",
                          href: "/auth/logout",
                        },
                      ]
                    : [
                        {
                          text: "Profile",
                          href: "/profile",
                          active: pathname.startsWith("/profile"),
                        },
                        {
                          text: "Log out",
                          href: "/auth/logout",
                        },
                      ]
                }
              />
            ) : (
              <Link
                href={"/auth/login"}
                className='w-full flex gap-2 items-center justify-center transition-all px-4 py-2 border border-white hover:text-black hover:bg-white my-2'
              >
                <MdLogin size={20} /> Login
              </Link>
            )}
            <Link
              href={"https://www.warframe.com"}
              target='_blank'
              className='w-full flex items-center justify-center transition-all px-4 py-2 border border-red-600 text-red-600 hover:bg-red-600 hover:text-white whitespace-nowrap truncate'
            >
              Official webpage
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
