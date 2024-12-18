import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="grid gap-4">
        <Link href="/signin">
          <button className="rounded-full w-40 py-3 px-6 font-bold hover:bg-blue-500 hover:text-white transition duration-300 bg-white text-black">
            Sign In
          </button>
        </Link>
        <Link href="/signup">
          <button className="rounded-full w-40 py-3 px-6 font-bold hover:bg-blue-500 hover:text-white transition duration-300 bg-white text-black">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
}
