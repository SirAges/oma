"use client";
import { handleSignOut } from "@/lib/actions/auth.actions";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <Button
      variant={"link"}
      onClick={async () => await handleSignOut()}
      className="px-3  cursor-pointer hover:no-underline"
    >
      sign out
    </Button>
  );
};
export default Header;
