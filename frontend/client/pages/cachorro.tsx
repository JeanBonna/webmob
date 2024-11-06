// pages/index.tsx
import React from 'react';
import Dog from './components/Doguinho';
import { Container } from 'react-bootstrap';

const Home: React.FC = () => {
  return (
    <Container className="mt-5 p-5" style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Doguinho pedindo dez pro professor</h1>
      <Dog />
    </Container>
  );
};

export default Home;
