# Incognidex

Uma plataforma web inovadora, **Incognidex** é projetada para transformar a experiência de aprendizado universitário. Inicialmente para a comunidade, a plataforma oferece um ecossistema dinâmico com materiais de estudo centralizados e metodologias criativas. Nosso objetivo é ir além de um simples repositório, fomentando a autonomia do estudante e promovendo um aprendizado colaborativo e contínuo na era digital.

-----

### :notebook\_with\_decorative\_cover: Sumário

  - [Sobre o Projeto]
  - [Objetivos]
  - [Tecnologias]
  - [Estrutura da Equipe]
  - [Cronograma de Execução]

-----

### :rocket: Sobre o Projeto

A vida acadêmica contemporânea exige ferramentas que vão além do tradicional. Muitos estudantes sentem dificuldade em encontrar materiais de estudo centralizados e de qualidade, além de se sentirem desmotivados por métodos de ensino passivos. A plataforma Incognidex nasce da necessidade de criar um ecossistema digital que não só organiza o conhecimento, mas também o torna mais acessível e engajador. Ao integrar questionários, perfis e abordagens criativas de estudo, o projeto visa aumentar a retenção de conhecimento, fortalecer a comunidade estudantil e preparar os alunos para os desafios do século atual.

### :dart: Objetivos

#### Objetivo Geral

Desenvolver uma plataforma web funcional e intuitiva que sirva como um hub de recursos educacionais para os estudantes, promovendo a colaboração e métodos de estudos inovadores.

#### Objetivos Específicos

  - **Implementar um Sistema de Autenticação**: Módulo de gerenciamento de usuários seguro, com cadastro, validação e login protegido por criptografia.
  - **Desenvolver Perfis de Usuário Interativos**: Sistema de perfis personalizáveis para gerenciar a identidade digital e interesses acadêmicos de cada membro.
  - **Modelar e Estruturar o Banco de Dados**: Conceber um banco de dados relacional para persistência, integridade e segurança de dados de usuários, conteúdos e questionários.
  - **Construir um Módulo de Avaliações Dinâmicas**: Sistema de questionários interativos com feedback imediato para autoavaliação e fixação do conhecimento.
  - **Curar e Desenvolver Seções de Conteúdo Multimídia**: Módulos de conteúdo diversificado, incluindo o uso de mídias inovadoras como vídeos e análises de cultura pop.
  - **Garantir uma Experiência de Usuário (UX) Otimizada**: Projetar e codificar uma interface intuitiva, responsiva e acessível para desktops.

### :hammer\_and\_wrench: Tecnologias

  - **Backend**:

      - **Linguagem**: Java 21
      - **Framework**: Spring Boot `3.5.4`
      - **Dependências**:
          - `Spring Web`
          - `Spring Data JPA`
          - `Spring Security`
          - `Validation`
          - `Lombok`
          - `Spring Boot DevTools`
          - `Spring Boot Starter Test`
          - `SpringDoc OpenAPI UI`

  - **Frontend**:

      - **Linguagem**: JavaScript
      - **Framework**: React (a definir)
      - **Marcação e Estilo**: HTML5, CSS3, Bootstrap (a definir)

  - **Banco de Dados**:

      - **SGBD**: MySQL
      - **Driver**: `MySQL Driver`

  - **Controle de Versão**:

      - **Ferramentas**: Git e GitHub

### :busts\_in\_silhouette: Estrutura da Equipe

  - **Líder Técnico**: Ágatha Ariell Soares de Sousa Leite
  - **Analista de Requisitos**: Rhawan Henrique de Jesus Moura
  - **Testers (QA)**: Thawan Campos Coelho
  - **Programadores**: Gabriel Haddad Soares Brandão, Felipe Eduardo de Souza Araujo, Pedro Júlio Borges Barreto (e apoio dos demais)

### :calendar: Cronograma de Execução (9 Semanas)

  - **Semana 1: Planejamento e Estruturação**
      - Foco: Alinhamento, escopo, requisitos e ambiente de desenvolvimento.
  - **Semana 2: Arquitetura e Design**
      - Foco: Definição da arquitetura (Spring Boot), modelagem do banco de dados (MER/DER) e criação de protótipos de telas.
  - **Semana 3: Desenvolvimento - Core (Back-end)**
      - Foco: Implementação da estrutura Spring Boot e da API de Autenticação (`/register` e `/login`).
  - **Semana 4: Desenvolvimento - Core (Front-end)**
      - Foco: Configuração do projeto React/Bootstrap e desenvolvimento das telas de login e cadastro.
  - **Semana 5: Desenvolvimento - Funcionalidades (Back-end)**
      - Foco: Desenvolvimento das APIs de CRUD para Perfil do Usuário e Módulo de Conteúdo.
  - **Semana 6: Desenvolvimento - Funcionalidades (Front-end)**
      - Foco: Desenvolvimento das páginas de Perfil e Conteúdo, e início da interface do módulo de questionários.
  - **Semana 7: Desenvolvimento e Integração - Módulos Finais**
      - Foco: Finalização da API de Questionários, do módulo interativo no frontend e início dos testes de integração.
  - **Semana 8: Testes e Refinamento**
      - Foco: Execução de testes funcionais, de usabilidade e correção intensiva de bugs.
  - **Semana 9: Finalização e Apresentação**
      - Foco: Congelamento do código, elaboração da documentação final e preparação da apresentação do projeto.
