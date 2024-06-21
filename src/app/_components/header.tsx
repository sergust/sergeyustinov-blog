import Logo from "@/app/_components/logo";
import Nav from "@/app/_components/nav";

export function Header() {
  return (
    <header className="container flex items-center justify-between p-4">
      <Logo />
      <Nav />
    </header>
  );
}
