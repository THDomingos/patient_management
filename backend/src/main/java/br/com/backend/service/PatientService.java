package br.com.backend.service;

import br.com.backend.model.Patient;
import br.com.backend.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    @Transactional
    public Patient savePatient(Patient patient) {
        //validar se o paciente já existe, só salvar se não existir. Se existir dar msg de erro
        //Validar se o cpf é valido.
        //Validar se a data de nascimento é menor que a data de amanha. Se nao for, msg de erro

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
        Patient existingPatient = getPatientById(id);
        existingPatient.setName(patient.getName());
        existingPatient.setCpf(patient.getCpf());
        existingPatient.setDob(patient.getDob());
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
        } else if (cpf != null) {
            return patientRepository.findByCpf(cpf);
        } else {
            return patientRepository.findAll();
        }
    }


}