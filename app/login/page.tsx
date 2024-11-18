
import { Button,  PasswordInput, TextInput } from "@mantine/core";
import Link from "next/link";

export default function Login() {
  return (
    <div className="flex items-center justify-center w-screen h-screen overflow-hidden -mt-16 bg-black text-white">
      <div className="max-w-sm w-full  border border-slate-600  rounded-xl p-6 gap-6 flex flex-col">
        <div className="flex flex-col items-start  justify-between w-full ">
          <h1 className="text-2xl">NextStreaming</h1>
          <span className="text-sm text-gray-500">Login to your account</span>
        </div>

        {/* login Form */}
        <div className="flex flex-col gap-4">
          <div className="flex w-full flex-col md:flex-nowrap mb-6 md:mb-0 gap-4">
            <TextInput
              type="email"
              placeholder="Your email address"
              label="Email"
              className=" text-slate-400"
            />
            <PasswordInput
              type="password"
              label="Password"
              placeholder="Your password"
              className=" text-slate-400"
            />
          </div>
          <div className="flex items-center justify-center  gap-2 text-sm text-gray-500">
            <Button component="a" href="/" color="primary">
              Forgot Password
            </Button>
          </div>
          <Button color="teal" className="w-full">
            Login
          </Button>
          <span className="text-center text-sm text-slate-500">
            Don&apos; have an account?{" "}
            <Link href="signup" color="primary" className="text-gray-100">
              Create Account
            </Link>
          </span>
        </div>

        <div className="flex items-center justify-center gap-2"></div>
      </div>
    </div>
  );
}
