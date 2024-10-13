"use client";

import { Bell, LogOut, Search } from "lucide-react";
import { ActionIcon, Button, Flex, Anchor as Link } from "@mantine/core";

import { useZuStore } from "@/store/zuStore";

export default function Header() {
  const { user, updateUser } = useZuStore((state) => state);

  return (
    <div className=" px-4 sm:px-6 md:px-8 lg:px-10 xl:px-20 py-4 w-full dark:text-white text-black sticky top-0 z-50 backdrop-blur-sm bg-black/10">
      <Flex
        direction={{ base: "row" }}
        className="flex items-center justify-between gap-10"
      >
        {/* Logo Section */}
        <Link href="/" className=" text-lg lg:text-2xl xl:text-2xl">
          NextStreaming
        </Link>

        {/* Navigation Section */}
        <div className=" text-white flex-1 justify-center  flex items-center">
          <Flex className="hidden sm:hidden md:flex lg:flex xl:flex items-center gap-4 list-none">
            <li className="">
              <Link href="/">Home</Link>
            </li>
            <li className="">
              <Link href="/">Discover</Link>
            </li>
            <li className="">
              <Link href="/">Movie Release</Link>
            </li>
            <li className="">
              <Link href="/">Forum</Link>
            </li>
            <li className="">
              <Link href="/">About</Link>
            </li>
          </Flex>
        </div>

        {/* Auth Section */}
        <div className="w-fit min-w-60 min-h-10  flex items-center justify-end">
          {/* if user logged in, show user avatar and logout button */}
          {user && (
            <Flex className="flex items-center gap-4  w-fit">
              <div className="hidden sm:hidden md:flex lg:flex xl:flex items-center gap-2 ">
                <ActionIcon
                  size="lg"
                  variant="light"
                  color="primary"
                  radius="full"
                  className="border-0 "
                >
                  <Search className=" w-5 h-5" />
                </ActionIcon>
                <ActionIcon
                  size="lg"
                  variant="light"
                  color="primary"
                  radius="full"
                  className="border-0 py-2 "
                >
                  <Bell className=" w-5 h-5" />
                </ActionIcon>
              </div>
              <div className="flex items-center gap-2">
                {/* <User
                  name="Jane Doe"
                  description="Product Designer"
                  avatarProps={{
                    src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                  }}
                /> */}
                <ActionIcon
                  size="lg"
                  variant="light"
                  radius="sm"
                  className="border-0 dark:text-white"
                  onClick={() => updateUser()}
                >
                  <LogOut className="text-white" />
                </ActionIcon>
              </div>
            </Flex>
          )}

          {/* if no user logged in, show sign up and login button */}
          {!user && (
            <div className="flex items-center gap-4 text-white">
              <ActionIcon
                size="lg"
                variant="ghost"
                color="primary"
                radius="full"
                className="border-0"
              >
                <Search className=" w-5" />
              </ActionIcon>
              <Button size="sm" variant="ghost" className="text-white">
                Sign up
              </Button>
              <Button
                size="sm"
                variant="flat"
                color="primary"
                onClick={() => updateUser()}
              >
                Login
              </Button>
            </div>
          )}
        </div>
      </Flex>
    </div>
  );
}
