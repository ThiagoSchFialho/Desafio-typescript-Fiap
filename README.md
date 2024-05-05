# Sistema de Gerenciamento de Livros

Este é um sistema simples de gerenciamento de livros desenvolvido em HTML, CSS, JavaScript (frontend) e Node.js com Express e Supabase (backend). Ele permite adicionar, visualizar, editar e excluir livros de uma biblioteca.

## Índice

1. Instruções de Uso
2. Pré-requisitos
3. Instalação
4. Endpoints da API
5. Executando o Servidor
6. Licença

## Instruções de Uso

Para usar este sistema, você pode clonar este repositório e seguir as instruções de instalação abaixo.

## Pré-requisitos

- Node.js instalado
- Conta no Supabase (opcional, pode ser substituído por outro banco de dados)

## Instalação

1. Clone este repositório:

```git clone https://github.com/seu-usuario/seu-repositorio.git```


2. Instale as dependências:

```cd seu-repositorio```
```npm install```


3. Configure as variáveis de ambiente:
   - Crie o arquivo `env.js`.
   - Preencha as variáveis `supabaseUrl` e `supabaseKey` com as informações do seu banco de dados Supabase.

## Endpoints da API

- `GET /livros`: Retorna todos os livros cadastrados.
- `GET /livros/:id`: Retorna um livro específico com base no ID.
- `POST /livros`: Adiciona um novo livro.
- `PUT /livros/:id`: Atualiza as informações de um livro existente.
- `DELETE /livros/:id`: Remove um livro do banco de dados.

## Executando o Servidor

Para iniciar o servidor, execute o seguinte comando:

npm start


O servidor estará acessível em `http://localhost:3000`.
