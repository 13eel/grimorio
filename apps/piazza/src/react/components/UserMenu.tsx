"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@pkg/ui/components/ui/avatar";
import { Button } from "@pkg/ui/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@pkg/ui/components/ui/dropdown-menu";

import { signIn, signOut } from "~/react/actions/auth";
import { useAuth } from "~/react/hooks/useAuth";

export default function () {
  const user = useAuth();

  if (!user) {
    return (
      <form>
        <Button formAction={signIn}>Sign in</Button>
      </form>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex gap-2 align-baseline">
          <Avatar>
            {user.image && (
              <AvatarImage
                src={user.image}
                alt={`${user.name} profile image`}
              />
            )}
            <AvatarFallback>{user.name}</AvatarFallback>
          </Avatar>
          <Button>{user.name}</Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <form>
            <Button formAction={signOut}>Log out</Button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
