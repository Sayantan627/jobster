import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import Image from "next/image";
import Logo from "../assets/logo.svg";
import LandingImage from "../assets/main.svg";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <header className="max-w-6xl mx-auto px-4 sm:px-8 py-6">
        <Image src={Logo} alt="Logo" />
      </header>
      <section className="max-w-6xl mx-auto px-4 sm:px-8 h-screen -mt-20 items-center grid lg:grid-cols-[1fr,400px]">
        <div>
          <h1 className="capitalize text-4xl font-bold md:text-7xl">
            job <span className="text-primary">tracking</span> app
          </h1>
          <p className="max-w-md leading-loose mt-4">
            Your ultimate job tracking solution. Streamline your job search with
            centralized dashboards, application tracking, and deadline
            reminders. Sign up now to take control of your career!
          </p>
          <Button asChild className="mt-4">
            <Link href="/add-job">Get Started</Link>
          </Button>
        </div>
        <Image
          src={LandingImage}
          alt="Landing Image"
          className="hidden lg:block"
        />
      </section>
    </main>
  );
}
