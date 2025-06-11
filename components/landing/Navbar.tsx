import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logo.png"
import { RainbowButton } from "../magicui/rainbow-button";

export function Navbar() {
  return (
    <div className="flex items-center justify-between py-5">
      <Link href="/" className="flex items-center gap-2">
        <Image src={Logo} alt="Logo" className="size-8" />
        <h3 className="text-2xl font-bold text-gray-800">
          Billance
        </h3>
      </Link>
      <Link href="/login">
        <RainbowButton>Get Started</RainbowButton>
      </Link>
    </div>
  );
}