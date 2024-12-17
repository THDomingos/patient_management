import React, { useState } from 'react';
import api, { setAuthHeader } from '../../api/axiosConfig.ts';
import { useNavigate } from 'react-router-dom';


const PatientForm: React.FC = () => {
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [dob, setDob] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log('Cheguei'); // Debug

    // Validação simples
    if (!name || !cpf || !dob) {
      alert('Todos os campos são obrigatórios!');
      return;
    }

    try {
      // Recuperar as credenciais do localStorage e convertê-las para objeto
      const authData = localStorage.getItem('auth');
      if (!authData) {
        setError('Usuário não autenticado. Faça login novamente.');
        alert("Usuário não autenticado. Faça login novamente.")
        return;
      }

      const { username, password } = JSON.parse(authData); // Parse do JSON

      // Enviar os dados para o backend
      setAuthHeader(username, password);
      const response = await api.post(
        '/patients',
        {
          name,
          cpf,
          dob, // Formato "aaaa-MM-dd"
        }
      );

      // Sucesso
      alert('Paciente cadastrado com sucesso!');
      console.log('Response:', response.data);

      // Limpar os campos do formulário
      setName('');
      setCpf('');
      setDob('');
      navigate('/dashboard');
    } catch (err: any) {
      setError('Erro ao cadastrar paciente. Verifique os dados ou a conexão.');
      console.error('Erro:', err);
    }
  };

  return (    
      <div className="container mt-5">
        <h2 className="text-center mb-4">Cadastro de Pacientes</h2>
        <form onSubmit={handleSubmit}>
          {/* Campo Nome */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Nome
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Digite seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Campo CPF */}
          <div className="mb-3">
            <label htmlFor="cpf" className="form-label">
              CPF
            </label>
            <input
              type="text"
              className="form-control"
              id="cpf"
              placeholder="Digite seu CPF"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />
          </div>

          {/* Campo Data de Nascimento */}
          <div className="mb-3">
            <label htmlFor="dob" className="form-label">
              Data de Nascimento
            </label>
            <input
              type="date"
              className="form-control"
              id="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>

          {/* Botão de Submit */}
          <div className="text-center">
            <button type="submit" className="btn btn-primary">
              Cadastrar
            </button>
          </div>
        </form>
      </div>
  );
};

export default PatientForm;
