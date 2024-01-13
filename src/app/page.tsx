import Link from "next/link";
export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-b from-gray-900 to-[#2305]">
      <Link
        href="https://www.matthewnicholson.dev/"
        className="font-bold text-[2rem] text-white hover:text-gray-300"
      >
        NBA DATABASE CREATED BY MATTHEW NICHOLSON
      </Link>
    </main>
  );
}
