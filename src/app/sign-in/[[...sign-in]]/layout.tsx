export default function SignInLayout({
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
