"use client";

import { Button, PasswordInput, Radio, TextInput } from "@mantine/core";
import Link from "next/link";
import { useState } from "react";

export default function SignUp() {
  const [agreementCheck, setAgreementCheck] = useState(false);
  return (
    <div className="flex items-center justify-center h-screen w-screen  overflow-hidden  -mt-16 bg-black text-white">
      <div className="max-w-sm w-full  border border-slate-600  rounded-xl p-6 gap-10 flex flex-col">
        <div className="flex flex-col items-start justify-between w-full ">
          <h1 className="text-2xl">NextStreaming</h1>
          <span className="text-sm text-gray-500">
            Register to enjoy the features
          </span>
        </div>

        {/* Register Form */}
        <div className="flex flex-col gap-4">
          <div className="flex w-full flex-col md:flex-nowrap mb-6 md:mb-0 gap-4">
            <TextInput
              type="text"
              placeholder="username"
              label="Username"
              className=" text-slate-400"
            />
            <TextInput
              type="email"
              label="Email"
              placeholder="Your email address"
              className=" text-slate-400"
            />
            <PasswordInput
              type="password"
              label="Password"
              placeholder="Your password"
              className=" text-slate-400"
            />
          </div>
          <div className="flex items-center w-full  md:flex-nowrap mb-6 md:mb-0 gap-4">
            <Radio
              checked={agreementCheck}
              variant="outline"
              onClick={() => setAgreementCheck((prev) => !prev)}
              className="hover:cursor-pointer"
            />
            <p className="text-gray-500 text-xs">
              I agree to your{" "}
              <Link href={"/"} className="text-gray-50">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link href={"/"} className="text-gray-50">
                Terms & Conditions
              </Link>
            </p>
          </div>

          <Button disabled={!agreementCheck} color="teal" className="w-full">
            Register
          </Button>
        </div>

        <div className="flex items-center justify-center  gap-2 text-sm text-gray-500">
          <span className="text-center text-sm text-gray-500">
            Already; have an account?{" "}
            <Link href="/login" color="primary" className="text-gray-100">
              Login
            </Link>
          </span>
        </div>

        <div className="flex items-center justify-center gap-2"></div>
      </div>
    </div>
  );
}
