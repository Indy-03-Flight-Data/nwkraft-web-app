import Link from 'next/link';

export default function Home() {
  return (
    <>
      <div className="grid justify-items-center">
        <Link href="/signup">
          <button className="rounded-full py-2 px-4 font-bold hover:text-green-700 bg-white text-black">Sign Up</button>
        </Link>
        <Link href="/signin">
          <button className="rounded-full py-2 px-4 font-bold hover:text-green-700 bg-white text-black">Sign In</button>
        </Link>
      </div>
    </>
  );
}
