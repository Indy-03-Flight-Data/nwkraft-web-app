import "@/app/globals.css";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        <nav className="flex item-center justify-between bg-slate-400 rounded-b-md p-5">
          <Link href="/dashboard/">Dashboard</Link>

          <Link href="" className="float-right">
            Profile
          </Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
