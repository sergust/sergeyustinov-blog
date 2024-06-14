export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center p-4">
      <p>Made with ❤️ in Sydney</p>
      <p>© {new Date().getFullYear()} Sergey Ustinov</p>
    </footer>
  );
}
