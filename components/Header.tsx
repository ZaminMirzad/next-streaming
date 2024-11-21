"use client";

import { Bell, LogOut, Search } from "lucide-react";
import {
  ActionIcon,
  Button,
  Flex,
  Group,
  UnstyledButton,
} from "@mantine/core";

import { useZuStore } from "@/store/zuStore";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/ns.png"

export default function Header() {
  const { user, updateUser } = useZuStore((state) => state);

  return (
    <div className=" px-4 sm:px-6 md:px-8 lg:px-10 xl:px-20 py-4 w-full max-h-16 dark:text-white text-black sticky top-0 z-[999] backdrop-blu bg-gradient-to-b from-black/60 to-transparent ">
      <Flex
        direction={{ base: "row" }}
        className="flex items-center justify-between gap-10 text-white"
      >
        {/* Logo Section */}
        <UnstyledButton component={Link} fz={24} href="/" className="p-0">
          <Image src={logo} alt="logo" width={120} height={100} className="" />
        </UnstyledButton>

        {/* Navigation Section */}
        <div className=" text-white flex-1 justify-center  flex items-center">
          <Group
            justify="center"
            className="hidden sm:hidden md:flex lg:flex xl:flex items-center gap-4 list-none text-white"
          >
            <li className="">
              <UnstyledButton component={Link} href="/">
                Home
              </UnstyledButton>
            </li>
            <li className="">
              <UnstyledButton component={Link} href="/">
                Discover
              </UnstyledButton>
            </li>
            <li>
              <UnstyledButton component={Link} href="/m">
                Movie Release
              </UnstyledButton>
            </li>
            <li className="">
              <UnstyledButton component={Link} href="/">
                Forum
              </UnstyledButton>
            </li>
            <li className="">
              <UnstyledButton component={Link} href="/">
                About
              </UnstyledButton>
            </li>
          </Group>
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
                  color="white"
                  radius="full"
                  className="border-0 "
                >
                  <Search className=" w-5 h-5" />
                </ActionIcon>
                <ActionIcon
                  size="lg"
                  variant="light"
                  color="white"
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
                  variant=""
                  color="red"
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
                variant="light"
                color="primary"
                radius="full"
                className="border-0"
              >
                <Search className=" w-5" />
              </ActionIcon>
              <Button
                component={Link}
                size="sm"
                variant="light"
                color="primary"
                className="text-white"
                href="/signup"
              >
                Sign up
              </Button>
              <Button
                size="sm"
                variant=""
                color="red"
                component={Link}
                href="/login"
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
