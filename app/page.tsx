import SignDashboard from "@/components/signDashboard";
import Image from "next/image";

export default function Home() {
  return (
    <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          src="/sign-flow-logo.svg"
          alt="SignFlow logo"
          width={80}
          height={106}
          priority
        />

        <SignDashboard />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
