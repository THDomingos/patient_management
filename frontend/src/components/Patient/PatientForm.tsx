import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api, { setAuthHeader } from '../../api/axiosConfig.ts';

interface Params {
  id?: string;
}

const PatientForm: React.FC = () => {
  const { id } = useParams<Record<string, string | undefined>>();
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [dob, setDob] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Função para carregar dados do paciente (edição)
  useEffect(() => {
    const fetchPatient = async () => {
      if (!id) return; // Se não houver ID, está em modo de cadastro

      try {
        // Recuperar credenciais
        const authData = localStorage.getItem('auth');
        if (!authData) {
          setError('Usuário não autenticado. Faça login novamente.');
          alert('Usuário não autenticado. Faça login novamente.');
          return;
        }

        const { username, password } = JSON.parse(authData);
        setAuthHeader(username, password);

        // Buscar dados do paciente
        const response = await api.get(`/patients/${id}`);
        const { name, cpf, dob } = response.data;

        setName(name);
        setCpf(cpf);
        setDob(dob);
      } catch (err) {
        console.error('Erro ao buscar paciente:', err);
        setError('Erro ao carregar dados do paciente.');
      }
    };

    fetchPatient();
  }, [id]);

  // Função para enviar o formulário (POST ou PUT)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !cpf || !dob) {
      alert('Todos os campos são obrigatórios!');
      return;
    }

    try {
      const authData = localStorage.getItem('auth');
      if (!authData) {
        setError('Usuário não autenticado. Faça login novamente.');
        alert('Usuário não autenticado. Faça login novamente.');
        return;
      }

      const { username, password } = JSON.parse(authData);
      setAuthHeader(username, password);

      // Verifica se é edição (ID existe) ou cadastro
      if (id) {
        // Atualizar paciente existente
        await api.put(`/patients/${id}`, { name, cpf, dob });
        alert('Paciente atualizado com sucesso!');
      } else {
        // Criar novo paciente
        await api.post('/patients', { name, cpf, dob });
        alert('Paciente cadastrado com sucesso!');
      }

      navigate('/dashboard'); // Redireciona para lista de pacientes
    } catch (err) {
      console.error('Erro ao salvar paciente:', err);
      setError('Erro ao salvar paciente. Verifique os dados ou a conexão.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">{id ? 'Editar Paciente' : 'Cadastrar Paciente'}</h2>

      <form onSubmit={handleSubmit}>
        {/* Nome */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Nome
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Digite o nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* CPF */}
        <div className="mb-3">
          <label htmlFor="cpf" className="form-label">
            CPF
          </label>
          <input
            type="text"
            className="form-control"
            id="cpf"
            placeholder="Digite o CPF"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />
        </div>

        {/* Data de Nascimento */}
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

        {/* Erro */}
        {error && <div className="alert alert-danger">{error}</div>}

        {/* Botão de Submit */}
        <div className="text-center">
          <button type="submit" className="btn btn-primary">
            {id ? 'Salvar Alterações' : 'Cadastrar'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientForm;
