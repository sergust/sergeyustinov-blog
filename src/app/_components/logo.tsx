import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="align-center flex items-center gap-2">
      <Image
        src="/images/logo.jpeg"
        alt="Sergey Ustinov"
        width="50"
        height="50"
        className="rounded-full"
      />
      <span className="text-2xl font-semibold md:text-4xl">Sergey Ustinov</span>
    </Link>
  );
}
