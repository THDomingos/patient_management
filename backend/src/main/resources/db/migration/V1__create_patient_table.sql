CREATE TABLE IF NOT EXISTS patient (
    id SERIAL PRIMARY KEY, -- ID gerado automaticamente
    name VARCHAR(255) NOT NULL, -- Nome do paciente
    cpf CHAR(11) NOT NULL CHECK (cpf ~ '^[0-9]{11}$'), -- CPF com exatamente 11 dígitos numéricos
    dob DATE NOT NULL CHECK (dob < CURRENT_DATE) -- Data de nascimento obrigatória e no passado
);
