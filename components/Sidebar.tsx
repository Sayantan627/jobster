"use client";
import Image from "next/image";
import Logo from "../assets/logo.svg";
import links from "@/utils/links";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <aside className="px-8 py-4 h-full bg-muted">
      <Image src={Logo} alt="logo" className="mx-auto" />
      <div className="flex flex-col gap-y-4 mt-20">
        {links.map((link) => (
          <Button
            key={link.label}
            asChild
            variant={pathname === link.href ? "default" : "link"}
          >
            <Link href={link.href} className="flex items-center gap-x-2">
              {link.icon} <span className="capitalize">{link.label}</span>
            </Link>
          </Button>
        ))}
      </div>
    </aside>
  );
};
export default Sidebar;
