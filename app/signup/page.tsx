import { Button, Input } from "@mantine/core";
import { X } from "lucide-react";
import Link from "next/link";

export default function SignUp() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-lg w-full border  rounded-xl p-6 gap-10 flex flex-col">
        <div className="flex items-center justify-between w-full ">
          <h1 className="text-2xl">NextStreaming</h1>
          <Button color="primary" variant="flat" className="p-0 m-0">
            <X className="p-0" />
          </Button>
        </div>

        {/* Register Form */}
        <div className="flex flex-col gap-4">
          <div className="flex w-full flex-col md:flex-nowrap mb-6 md:mb-0 gap-4">
            <Input size="sm" type="text" />
            <Input size="sm" type="text" />
            <Input size="sm" type="email" />
            <Input size="sm" type="password" />
            <Input size="sm" type="password" />
          </div>
          <Button color="primary" className="w-full">
            Register
          </Button>
          <span className="text-center">
            Already; have an account?{" "}
            <Link href="/login" color="primary" className="">
              Login
            </Link>
          </span>
        </div>

        <div className="flex items-center justify-center  gap-2">
          <Link href="#" color="primary">
            Primary
          </Link>
          <Link href="#" className="rounded-sm">
            Forgot password?
          </Link>
        </div>

        <div className="flex items-center justify-center gap-2"></div>
      </div>
    </div>
  );
}
