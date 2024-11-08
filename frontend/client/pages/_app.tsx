import { useRouter } from "next/router";
import { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "@/styles/globals.css";
//import '@/styles/placar.css';
import type { AppProps } from "next/app";
import Container from 'react-bootstrap/Container';
import MeuNavbar from "./components/MeuNavBar";


export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isLoginPage = router.pathname === "/login" || router.pathname ==="/cadastro"; 

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn && (router.pathname !== "/login" && router.pathname !== "/cadastro")) {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
      {!isLoginPage && <MeuNavbar />}
      <main className="flex-grow-1">
        <Container fluid>
          <Component {...pageProps} />
        </Container>
      </main>
    </div>
  );
}
