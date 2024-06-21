"use client";

import { ModeToggle } from "@/components/theme-mode-toggle";
import Login from "./login";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignInButton } from "@clerk/nextjs";

export default function Nav({ isAdmin }: { isAdmin?: boolean }) {
  const { user } = useUser();

  return (
    <nav className="my-2 flex items-center gap-4 py-4">
      <div className="hidden items-center gap-4 py-4 md:flex">
        {isAdmin && <Button>Admin</Button>}
        <Search />
        <ModeToggle />
        <Login />
      </div>
      <div className="flex md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <span className="text-xl">🍔</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {user ? (
              <>
                <DropdownMenuLabel>
                  <div className="flex items-center gap-2">
                    <span>{user?.fullName}</span>
                    <Login />
                  </div>
                </DropdownMenuLabel>
                {isAdmin && <Button>Admin</Button>}
              </>
            ) : (
              <DropdownMenuItem>
                <SignInButton></SignInButton>
              </DropdownMenuItem>
            )}

            <DropdownMenuSeparator />

            <DropdownMenuLabel>
              <div className="flex justify-between">
                <Search />
                <ModeToggle />
              </div>
            </DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}

function Search() {
  return (
    <Button variant="outline" className="text-xl">
      🔍
    </Button>
  );
}
