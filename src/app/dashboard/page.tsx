import Link from "next/link";

export default function Page() {
  return (
    <div>
      <div>
        <Link href="/dashboard/search">
          <button className="bg-white text-black font-semibold p-3 m-2 rounded-lg">
            Add New NWKRAFT
          </button>
        </Link>
      </div>
      <div></div>
    </div>
  );
}
