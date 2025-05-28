"use client"
import { cn } from '@/lib/utils';
import { HomeIcon, Users2 } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'


export const links = [
  {
    id: 0,
    name: "Dashboard",
    href: "/dashboard",
    icon: HomeIcon,
  },
  {
    id: 1,
    name: "Invoices",
    href: "/dashboard/invoices",
    icon: Users2,
  },
];

export default function DashboardLinks() {
    const pathname = usePathname();
    console.log(pathname)
    
  return (
    <>
        {links.map((link) => (
            <Link
                className={cn(
                    pathname === link.href
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground",
                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary"
                )}
                href={link.href}
                key={link.id}
            >
                <link.icon className="size-4" />
                {link.name}
            </Link>
      ))}
    </>
  )
}
