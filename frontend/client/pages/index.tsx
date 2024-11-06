import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      router.push("/login");
    }else{
      router.push("/post");
    }
  }, [router]);

  return <h1>Bem-vindo à Página Inicial!</h1>;
}
