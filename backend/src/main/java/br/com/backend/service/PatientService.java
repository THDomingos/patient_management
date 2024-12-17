package br.com.backend.service;

import br.com.backend.model.Patient;
import br.com.backend.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    @Transactional
    public Patient savePatient(Patient patient) {
        // Chama o método de validação
        validatePatient(patient, null);

        // Salva o paciente
        Patient savedPatient = patientRepository.save(patient);
        patientRepository.flush();
        return savedPatient;
    }

    @Transactional(readOnly = true)
    public Patient getPatientById(Long id) {
        return patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient not found"));
    }

    @Transactional
    public Patient updatePatient(Long id, Patient patient) {
        // Busca o paciente existente
        Patient existingPatient = getPatientById(id);

        // Atualiza os campos do paciente
        existingPatient.setName(patient.getName());
        existingPatient.setCpf(patient.getCpf());
        existingPatient.setDob(patient.getDob());

        // Valida antes de atualizar
        validatePatient(existingPatient, id);

        return patientRepository.save(existingPatient);
    }

    @Transactional
    public void deletePatient(Long id) {
        Patient patient = getPatientById(id);
        patientRepository.delete(patient);
    }

    @Transactional(readOnly = true)
    public List<Patient> getPatientsByParam(String name, String cpf) {
        if (name != null) {
            return patientRepository.findByNameContainingIgnoreCase(name);
        } else if (cpf != null && !cpf.isEmpty()) {
            return patientRepository.findByCpf(cpf)
                    .map(List::of) // Converte Optional<Patient> para List<Patient>
                    .orElse(List.of()); // Retorna lista vazia se não encontrar
        } else {
            return patientRepository.findAll();
        }
    }

    /**
     * Método privado para validar um paciente.
     * - Verifica se o CPF é válido.
     * - Verifica se o paciente já existe (com base no CPF) em caso de criação.
     * - Verifica se a data de nascimento é válida (menor que amanhã).
     */
    private void validatePatient(Patient patient, Long id) {
        // Validação de CPF
        if (!isValidCPF(patient.getCpf())) {
            throw new IllegalArgumentException("CPF inválido.");
        }

        // Validação de existência de paciente com o mesmo CPF (para criação)
        Optional<Patient> existingPatient = patientRepository.findByCpf(patient.getCpf());
        if (existingPatient.isPresent() && !existingPatient.get().getId().equals(id)) {
            throw new IllegalArgumentException("Paciente com o mesmo CPF já existe.");
        }

        // Validação de data de nascimento
        if (patient.getDob() == null || !patient.getDob().isBefore(LocalDate.now().plusDays(1))) {
            throw new IllegalArgumentException("A data de nascimento deve ser anterior à data de amanhã.");
        }
    }

    /**
     * Método utilitário para validar CPF.
     * @param cpf - CPF no formato String
     * @return boolean
     */
    private boolean isValidCPF(String cpf) {
        // Remove caracteres não numéricos
        cpf = cpf.replaceAll("\\D", "");

        // Valida o tamanho e sequências inválidas
        if (cpf.length() != 11 || cpf.matches("(\\d)\\1{10}")) {
            return false;
        }

        return true;
    }


}