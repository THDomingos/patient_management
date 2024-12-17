import React, { useEffect, useState } from 'react';
import api, { setAuthHeader } from '../../api/axiosConfig.ts';

interface Patient {
  id: number;
  name: string;
  cpf: string;
  dob: string;
}

const PatientList: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  const fetchPatients = async () => {
    try {
        // Recuperar as credenciais do localStorage e convertê-las para objeto
        const authData = localStorage.getItem('auth');
        if (!authData) {
          setError('Usuário não autenticado. Faça login novamente.');
          alert(error)
          return;
        }
  
        const { username, password } = JSON.parse(authData); // Parse do JSON

      // Chamada ao backend com autenticação básica
      setAuthHeader(username, password);
      const response = await api.get('/patients', {
        params: { name: search }, // Envia o nome para busca
      });

      console.log('Pacientes:', response.data); // Debug
      setPatients(response.data);
      setError('');
    } catch (err: any) {
      console.error('Erro ao buscar pacientes:', err);
      setError('Erro ao buscar pacientes. Verifique sua conexão ou permissões.');
    }
  };

    // Carrega os pacientes ao iniciar
  useEffect(() => {
    fetchPatients();
  }, []);

  // Atualiza ao alterar o campo de busca
  useEffect(() => {
    if (search.trim()) {
      fetchPatients();
    }
  }, [search]);

  const handleDelete = async (id: number) => {
    await api.delete(`/patients/${id}`);
    fetchPatients();
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Lista de Pacientes</h2>
      <input
        type="text"
        placeholder="Pesquisar por nome ou CPF"
        className="form-control mb-3"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <table className="table">
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
                <button className="btn btn-warning btn-sm me-2">✏️</button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(patient.id)}
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientList;
