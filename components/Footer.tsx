"use client";

import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="px-20 py-10 text-white/80 border-t border-white/20">
      <div className="flex items-start justify-between gap-4 h-full">
        <div className="">
          <h1 className="text-3xl max-w-sm ">
            Our plateform is one of the Trusted by millions of customers around
            the world, it feature all new movies and shows that people love to
            watch
          </h1>
        </div>

        <div className="flex flex-col gap-4 justify-between items-end h-full min-h-52  text-white/60">
          {/* menu links */}
          <div className="flex gap-4 items-center">
            <Link href="#" className="hover:text-white/90">
              Home
            </Link>
            <Link href="#" className="hover:text-white/90">
              About
            </Link>
            <Link href="#" className="hover:text-white/90">
              Contact
            </Link>
          </div>

          {/* social iconslinks */}
          <div className="flex gap-4 items-center">
            <Link href="#" className="hover:text-white/90">
              <Twitter className="w-5 h-5" />
            </Link>
            <Link href="#" className="hover:text-white/90">
              <Facebook className="w-5 h-5" />
            </Link>
            <Link href="#" className="hover:text-white/90">
              <Instagram className="w-5 h-5" />
            </Link>
            <Link href="#" className="hover:text-white/90">
              <Youtube className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm mt-10 text-white/30">
        <p className="">NextStreaming. All rights reserved.</p>
        <span>&copy; {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
