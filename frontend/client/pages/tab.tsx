// pages/admin.tsx
import React from 'react';
import { Container } from 'react-bootstrap';
import TabBootStrap from './components/TabBootStrap';

const Tab: React.FC = () => {
  return (
    <Container className="mt-5">
      <h1>Painel de Administração</h1>
      <p>Use as abas abaixo para gerenciar usuários e posts, e para ver outras informações.</p>
      <TabBootStrap />
    </Container>
  );
};

export default Tab;
