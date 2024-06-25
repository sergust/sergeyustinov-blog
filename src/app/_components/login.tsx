import { Button } from "@/components/ui/button";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function Login() {
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <SignedOut>
              <SignInButton>
                <Button className="cursor-pointer" variant="outline">
                  👤
                </Button>
              </SignInButton>
            </SignedOut>
          </TooltipTrigger>
          <TooltipContent>
            <span className="text-md">✌️ Click to login</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <SignedIn>
        <UserButton />
      </SignedIn>
    </>
  );
}
