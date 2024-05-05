// npm i --save-dev @types/express
// Instale essa dependência para usar o express com typescript

// npm install @supabase/supabase-js
// Instale essa dependência caso seu DB esteja na Supabase

// Cross-Origin Resource Sharing
// npm install cors
// npm install --save-dev @types/cors

import { createClient } from '@supabase/supabase-js';
import express, { Express, Request, Response } from 'express';
import cors from 'cors';

const env = require('./env.js');
const supabaseUrl = env.supabaseUrl;
const supabaseKey = env.supabaseKey;
const supabase = createClient(supabaseUrl, supabaseKey);

const app: Express = express();
app.use(express.json()); // Adiciona o middleware para fazer o parsing do corpo da requisição como JSON
app.use(cors());

// Rota de teste
app.get('/', (req: Request, res: Response) => {
  res.send('API de gerenciamento de biblioteca');
});


// ==============================================================
// ========================= GET Livros =========================
// ==============================================================
async function getLivros() {
  const { data: livros, error } = await supabase.from('livros').select('*');
  if (error) {
    console.error('Erro ao buscar livros:', error.message)
    return [];
  }
  return livros;
}

app.get('/livros', async (req: Request, res: Response) => {
  try {
    const livros = await getLivros();

    if ('error' in livros) {
      res.status(500).json({ error: livros.error });
    } else {
      console.log('Livros:', livros);
      res.json(livros);
    }

  } catch (error: any) {
    console.error('Erro ao buscar livros:', error.message);
    res.status(500).json({ error: 'Erro ao buscar livros' });
  }
});


// ==============================================================
// ========================= GET Livro ==========================
// ==============================================================
async function getLivro(id: number) {
  const { data: livro, error } = await supabase.from('livros').select('*').eq('id', id);
  if (error) {
    console.error('Erro ao buscar livro:', error.message)
    return null;
  }
  return livro;
}

app.get('/livros/:id', async (req: Request, res: Response) => {
  try {
    const livroID = req.params.id;
    const livro = await getLivro(Number(livroID));

    if (!livro) {
      throw new Error("Livro não encontrado");

    } else if ('error' in livro) {
        res.status(500).json({ error: livro.error });

    } else {
        console.log('Livro:', livro);
        res.json(livro);
    }

  } catch (error: any) {
    console.error('Erro ao buscar livro:', error.message);
    res.status(500).json({ error: 'Erro ao buscar livro' });
  }
});


// ==============================================================
// ========================= POST Livro =========================
// ==============================================================
async function postLivro(titulo: string, autor: string, isbn: string, ano_publicacao: string) {
  const { data: livros, error } = await supabase.from('livros').insert([
    { titulo: titulo, autor: autor, isbn: isbn, ano_publicacao: ano_publicacao}
  ]).select();

  if (error) {
    console.error('Erro ao adicionar livro:', error.message);
    return false;
  }
  return true;
}


app.post('/livros', async (req: Request, res: Response) => {
  const { titulo, autor, isbn, ano_publicacao } = req.body;

  if (!titulo || !autor || !isbn || !ano_publicacao) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }
  
  try {
    const livroCriado = await postLivro(titulo, autor, isbn, ano_publicacao);

    if (livroCriado) {
      res.status(201).send('Livro criado com sucesso');
    } else {
      res.status(500).send('Erro ao criar livro');
    }
  } catch (error: any) {
    console.error('Erro ao criar livro:', error.message);
    res.status(500).json({ error: 'Erro ao criar livro'});
  }
});


// ==============================================================
// ========================= PUT Livro ==========================
// ==============================================================
async function putLivro(id: number, titulo: string, autor: string, isbn: string, ano_publicacao: string) {
  const { data: livro, error } = await supabase
  .from('livros')
  .update({ titulo: titulo, autor: autor, isbn: isbn, ano_publicacao: ano_publicacao})
  .eq('id', id)
  .select()

  if (error) {
    console.error('Erro ao atualizar livro:', error.message);
    return false;
  }
  return true;
}

app.put('/livros/:id', async (req: Request, res: Response) => {
  const { titulo, autor, isbn, ano_publicacao } = req.body;
  const livroID = req.params.id;

  if (!titulo || !autor || !isbn || !ano_publicacao) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }

  await putLivro(Number(livroID), titulo, autor, isbn, ano_publicacao);
  res.status(201).send(`Livro com ID ${livroID} atualizado com sucesso`);
});


// ==============================================================
// ======================== DELETE Livro ========================
// ==============================================================
async function deleteLivro(id: number) {
  const { error } = await supabase.from('livros').delete().eq('id', id);

  if (error) {
    console.error('Erro ao remover livro:', error.message);
    return false;
  }
  return true;
}

app.delete('/livros/:id', async (req: Request, res: Response) => {
  const livroID = req.params.id;
  await deleteLivro(Number(livroID));
  res.status(201).send(`Livro com ID ${livroID} excluído com sucesso`);
});


// =========================
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});