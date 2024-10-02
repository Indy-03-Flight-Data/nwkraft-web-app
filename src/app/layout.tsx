import "@/app/globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        <nav className="flex item-center justify-between bg-slate-400 rounded-lg p-5">
          <a href="" className="float-left">
            Back
          </a>
          <a href="" className="float-right">
            Profile
          </a>
        </nav>
        {children}
      </body>
    </html>
  );
}
