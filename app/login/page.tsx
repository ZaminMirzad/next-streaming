import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import { X } from "lucide-react";

export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-lg w-full border  rounded-xl p-6 gap-10 flex flex-col">
        <div className="flex items-center justify-between w-full ">
          <h1 className="text-2xl">NextStreaming</h1>
          <Button color="primary" variant="flat" className="p-0 m-0">
            <X className="p-0" />
          </Button>
        </div>

        {/* login Form */}
        <div className="flex flex-col gap-4">
          <div className="flex w-full flex-col md:flex-nowrap mb-6 md:mb-0 gap-4">
            <Input size="sm" type="email" label="Email" />
            <Input size="sm" type="password" label="Password" />
          </div>
          <Button color="primary" className="w-full">
            Login
          </Button>
          <span className="text-center">
            Don&apos; have an account?{" "}
            <Link
              showAnchorIcon
              href="signup"
              color="primary"
              size="md"
              className=""
            >
              Create Account
            </Link>
          </span>
        </div>

        <div className="flex items-center justify-center  gap-2">
          <Link showAnchorIcon href="#" color="primary" size="md">
            Primary
          </Link>
          <Link showAnchorIcon href="#" size="md" className="rounded-sm">
            Forgot password?
          </Link>
        </div>

        <div className="flex items-center justify-center gap-2"></div>
      </div>
    </div>
  );
}
