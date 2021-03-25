import { useState } from 'react';
import Modal from 'react-modal';
import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';
import { NewTransactionModal } from './components/NewTransactionModal';
import { GlobalStyle } from './styles/global';

Modal.setAppElement('#root');

export function App() {
  const [newTransactionModalIsOpen, setNewTransactionModalIsOpen] = useState(
    false,
  );

  function handleOpenNewTransactionModal() {
    setNewTransactionModalIsOpen(true);
  }

  function handleCloseNewTransaction() {
    setNewTransactionModalIsOpen(false);
  }

  return (
    <>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
      <Dashboard />
      <NewTransactionModal
        isOpen={newTransactionModalIsOpen}
        onRequestClose={handleCloseNewTransaction}
      />
      <GlobalStyle />
    </>
  );
}
