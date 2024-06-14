import Logo from "./logo";
import Nav from "./nav";

export function Header() {
  return (
    <header className="flex items-center justify-between p-4">
      <Logo />
      <Nav />
    </header>
  );
}
