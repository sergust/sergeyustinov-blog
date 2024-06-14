import { ModeToggle } from "@/components/theme-mode-toggle";
import Login from "./login";

export default function Nav() {
  return (
    <nav className="my-2 flex items-center gap-4 py-4">
      <a href="/blog" className="ml-4">
        Blog
      </a>
      <a href="/about" className="ml-4">
        About
      </a>
      <Login />
      <ModeToggle />
    </nav>
  );
}
