# Patient Management System

Este repositório contém um sistema de gerenciamento de pacientes com um front-end desenvolvido em React e um back-end em Java. O sistema permite criar, listar, editar, excluir e pesquisar pacientes pelo nome, com acesso restrito a usuários com permissões de administrador.

---

## Requisitos

Antes de executar o projeto, certifique-se de que os seguintes itens estejam instalados em sua máquina:

### Front-end:
- Node.js (versão 23)
- NPM (gerenciador de pacotes do Node.js)

### Back-end:
- JDK (Java Development Kit) versão 23
- IntelliJ IDEA Community Edition (ou outro ambiente de desenvolvimento Java)
- PostgreSQL versão 17

---

## Configuração do Ambiente

### Banco de Dados
1. Instale e configure o PostgreSQL (versão 17).
2. Crie um banco de dados com o nome `patient_management`:
   ```sql
   CREATE DATABASE patient_management;
   ```
3. Atualize o arquivo de configuração `application.properties` no back-end com as informações de conexão ao banco de dados:
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/patient_management
   spring.datasource.username=SEU_USUARIO
   spring.datasource.password=SUA_SENHA
   ```
   > Substitua `SEU_USUARIO` e `SUA_SENHA` pelo usuário e senha configurados no PostgreSQL.

### Back-end
1. Abra o projeto do back-end no IntelliJ IDEA Community Edition.
2. Certifique-se de que a porta padrão do servidor seja `8080`. Caso precise alterar, verifique no arquivo `application.properties`:
   ```properties
   server.port=8080
   ```
3. Execute o projeto clicando em "Run" no IntelliJ IDEA ou utilizando a opção de atalho para executar aplicações Spring Boot.

### Front-end
1. Navegue até o diretório do projeto front-end pelo terminal ou pelo VS Code.
2. Instale as dependências do projeto executando o comando:
   ```bash
   npm install
   ```
3. Inicie o servidor do front-end com o comando:
   ```bash
   npm start
   ```
4. O front-end estará acessível em [http://localhost:3000](http://localhost:3000).

---

## Login no Sistema

1. Ao carregar a aplicação front-end em [http://localhost:3000](http://localhost:3000), você verá uma tela de login.
2. Use as credenciais abaixo para acessar:
   - **Usuário:** `admin`
   - **Senha:** `pass$%Tword21`

   Essas credenciais são configuradas no código do back-end:
   ```java
   .username("admin")
   .password(passwordEncoder.encode("pass$%Tword21"))
   ```

   > **Nota:** Todas as rotas do sistema são protegidas, e apenas usuários com a função de administrador podem acessá-las.

---

## Funcionalidades

O sistema permite as seguintes operações:

1. **Criar Paciente**
   - Preencha o formulário de cadastro com os dados do paciente.

2. **Listar Pacientes**
   - Visualize a lista completa de pacientes registrados no sistema.

3. **Editar Paciente**
   - Altere as informações de um paciente existente.

4. **Excluir Paciente**
   - Remova um paciente do sistema.

5. **Pesquisar por Nome do Paciente**
   - Utilize a barra de pesquisa para encontrar pacientes pelo nome.

---

## Executando os Testes

1. Certifique-se de que o back-end e o front-end estejam em execução.
2. Realize as operações mencionadas no navegador na rota do frontend.
3. Verifique o comportamento esperado na interface e nos logs do back-end para confirmação das operações.

---

## Problemas Comuns

1. **Erro de conexão com o banco de dados:**
   - Certifique-se de que o PostgreSQL está em execução e que as credenciais no arquivo `application.properties` estão corretas.

2. **Porta ocupada:**
   - Caso as portas `8080` (back-end) ou `3000` (front-end) estejam ocupadas, libere-as ou altere as configurações do servidor.

---

## Tecnologias Utilizadas

- **Front-end:** React
- **Back-end:** Spring Boot (Java)
- **Banco de Dados:** PostgreSQL

---

Sinta-se à vontade para contribuir com melhorias para este projeto!

