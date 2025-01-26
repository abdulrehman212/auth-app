"use client"
import { redirect, useRouter } from "next/navigation";
import { isTokenExpired } from "../utils/tokenUtils.ts";
import { useEffect } from "react";


export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token || isTokenExpired(token)) {
      localStorage.removeItem("token");
      router.push("/login");
    }
  }, [router]);

  redirect("/dashboard");
}
