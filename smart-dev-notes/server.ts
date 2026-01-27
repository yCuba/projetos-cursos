import express from 'express';
import cors from 'cors';
import fs from 'fs';

interface Note {
    id: number;
    title: string;
    content: string;
    priority: 'low' | 'medium' | 'high';
  }

const app = express();
app.use(cors());

const PORT = 3000;
const FILE_PATH = './notes.json';

const getNotes = () => {
    if (!fs.existsSync(FILE_PATH)) return [];
    const data = fs.readFileSync(FILE_PATH, 'utf-8');
    return JSON.parse(data);
};

app.get('/notas', (req, res) => {
    const notes = getNotes();
    res.json(notes);
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}/notas`);
});


app.use(express.json()); 

app.post('/notas', (req, res) => {
  const { title, content, priority } = req.body;
  const notes = getNotes();
  
  const newNote = {
    id: Date.now(),
    title,
    content,
    priority: priority || 'low'
  };

  notes.push(newNote);
  fs.writeFileSync(FILE_PATH, JSON.stringify(notes, null, 2));
  res.status(201).json(newNote);
});

app.put('/notas/:id', (req, res) => {
  const { id } = req.params;
  const {title, content, priority} = req.body;
  let notes = getNotes();

  const index = notes.findIndex((n: any) => n.id === Number(id)); //Encontra o índice da nota na lista
  if(index !== -1) {
    notes[index] = {...notes[index], title, content, priority};
    fs.writeFileSync(FILE_PATH, JSON.stringify(notes, null, 2));
    res.json(notes[index]);
  } else {
    res.status(404).json({message: "Nota não encontrada"});
  }
});

app.delete('/notas/:id',(req, res) => {
  const {id} = req.params; // Pega o ID que vem na URL
  let notes = getNotes();

  const filteredNotes = notes.filter((note: Note) => note.id !== Number(id));

  if (notes.length === filteredNotes.length) {
    return res.status(404).json({message: "Nota não encontrada"});
  }

  fs.writeFileSync(FILE_PATH, JSON.stringify(filteredNotes, null, 2));
  res.json({message: "Nota deletada com sucesso!"});
});

