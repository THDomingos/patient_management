import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remover credenciais do localStorage
    localStorage.removeItem('auth');
    navigate('/'); // Redirecionar para a tela de login
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/dashboard">
          Dashboard
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {/* Botão Cadastrar Paciente */}
            <li className="nav-item me-3"> {/* Distância entre os itens */}
              <Link className="btn btn-outline-primary" to="/patient/new">
                Cadastrar Paciente
              </Link>
            </li>
            {/* Botão Sair */}
            <li className="nav-item">
              <button
                className="btn btn-danger nav-link text-black"
                style={{ cursor: 'pointer' }}
                onClick={handleLogout}
              >
                Sair
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
