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
        <nav className="flex items-center-center m-2 px-10 py-5 justify-between bg-inherit rounded-b-md ">
          <Link href="/dashboard/" className="">Dashboard</Link>

          <Link href="" className="float-right">
            Profile
          </Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
