import Link from "next/link";
import { useEffect, useState } from "react";
//import { useRouter } from 'next/router'
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const MeuNavbar = () => {
  //const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    //Pode ser necessário ou não.
    //router.push("/login");
  };

  const [userId, setUserId] = useState("");

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if(storedUserId){
      setUserId(storedUserId);
    }
  }, []);
  

  return (
    <Navbar bg="dark" expand="md" data-bs-theme="dark" fixed="top">
      <Container>
        <Navbar.Brand>
          <Link href="/">Y</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} href="/post" passHref>
              Página Inicial
            </Nav.Link>
            <Nav.Link as={Link} href="/explorar" passHref>
              Explorar
            </Nav.Link>
            <Nav.Link as={Link} href="/cachorro" passHref>
              Cachorrinho
            </Nav.Link>
            <Nav.Link as={Link} href={`/perfil/${userId}`} passHref>
              Perfil
            </Nav.Link>
            <Nav.Link as={Link} href="#" passHref onClick={handleLogout}>
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MeuNavbar;