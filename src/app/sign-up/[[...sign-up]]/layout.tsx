export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex h-full w-full items-center justify-center">
      {children}
    </section>
  );
}
