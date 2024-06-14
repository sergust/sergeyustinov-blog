import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function Login() {
  return (
    <>
      <SignedOut>
        <SignInButton>
          <Button asChild className="cursor-pointer" variant="outline">
            <span className="text-xl">👤</span>
          </Button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <UserButton />
      </SignedIn>
    </>
  );
}
