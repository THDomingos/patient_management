import React, { useEffect, useState, useCallback } from 'react';
import api, { setAuthHeader } from '../../api/axiosConfig.ts';
import { useNavigate } from 'react-router-dom';

interface Patient {
  id: number;
  name: string;
  cpf: string;
  dob: string;
}

const PatientList: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]); // Lista de pacientes
  const [search, setSearch] = useState(''); // Campo de busca
  const [error, setError] = useState(''); // Mensagem de erro
  const [loading, setLoading] = useState(false); // Estado de carregamento
  const navigate = useNavigate();


  // Função otimizada para buscar pacientes
  const fetchPatients = useCallback(
    async (searchParam: string = '') => {
      try {
        setLoading(true); // Indica que a busca está em andamento
        setError(''); // Limpa os erros anteriores

        // Recupera as credenciais
        const authData = localStorage.getItem('auth');
        if (!authData) {
          setError('Usuário não autenticado. Faça login novamente.');
          alert('Usuário não autenticado. Faça login novamente.');
          return;
        }

        const { username, password } = JSON.parse(authData);
        setAuthHeader(username, password); // Configura o header de autenticação

        // Determina o parâmetro correto (name ou cpf)
        const params: any = {};
        if (searchParam.trim()) {
          if (/^\d+$/.test(searchParam)) {
            params.cpf = searchParam; // Busca por CPF se o input for numérico
          } else {
            params.name = searchParam; // Busca por nome se o input tiver letras
          }
        }

        // Chamada ao backend
        const response = await api.get('/patients', { params });
        setPatients(response.data);
      } catch (err) {
        console.error('Erro ao buscar pacientes:', err);
        setError('Erro ao buscar pacientes. Verifique sua conexão ou permissões.');
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    },
    []
  );

  // Carrega todos os pacientes ao iniciar
  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  // Aplica debounce para busca
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchPatients(search);
    }, 500); // Aguarda 500ms antes de fazer a busca

    return () => clearTimeout(timer); // Limpa o timer ao atualizar o search
  }, [search, fetchPatients]);

  // Função para deletar um paciente
  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/patients/${id}`);
      fetchPatients(); // Atualiza a lista após a exclusão
    } catch (err) {
      console.error('Erro ao deletar paciente:', err);
      setError('Erro ao deletar paciente. Tente novamente.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Lista de Pacientes</h2>

      {/* Campo de busca */}
      <input
        type="text"
        placeholder="Pesquisar por nome"
        className="form-control mb-3"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Mensagem de erro */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Indicador de carregamento */}
      {loading && <p>Carregando...</p>}

      {/* Tabela de pacientes */}
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Nome</th>
            <th>CPF</th>
            <th>Data de Nascimento</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id}>
              <td>{patient.name}</td>
              <td>{patient.cpf}</td>
              <td>{patient.dob}</td>
              <td>
                {/* Botão Editar */}
                <button 
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => navigate(`/patients/edit/${patient.id}`)}
                >
                  <i className="bi bi-pencil"></i>
                </button>

                {/* Botão Excluir */}
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(patient.id)}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          ))}
          {patients.length === 0 && !loading && (
            <tr>
              <td colSpan={4} className="text-center">
                Nenhum paciente encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PatientList;
