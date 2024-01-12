import Link from "next/link";
export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Link
        href="https://www.matthewnicholson.dev/"
        className="font-bold text-[2rem]"
      >
        NBA DATABASE CREATED BY MATTHEW NICHOLSON
      </Link>
    </main>
  );
}
