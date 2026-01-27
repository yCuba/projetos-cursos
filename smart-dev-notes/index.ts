import fs from 'fs';

interface Note {
    id: number;
    title: string;
    content: string;
    priority: 'low' | 'medium' | 'high';
}

const FILE_PATH = './notes.json';

// Função do Perito: Salva a lista no disco
function saveNotes(notes: Note[]) {
    fs.writeFileSync(FILE_PATH, JSON.stringify(notes, null, 2));
    console.log("💾 Dados salvos no 'banco de dados' (notes.json)!");
}

// Função do Perito: Carrega os dados ao iniciar
function loadNotes(): Note[] {
    if (!fs.existsSync(FILE_PATH)) return [];
    const data = fs.readFileSync(FILE_PATH, 'utf-8');
    return JSON.parse(data);
}

const myNotes: Note[] = loadNotes();

addNote({
    id: Date.now(), // ID único baseado no tempo
    title: "Minha Primeira Nota Real",
    content: "Agora os dados não somem mais!",
    priority: "medium"
});

function addNote(newNote: Note) {
    myNotes.push(newNote);
    saveNotes(myNotes);
    console.log(`✅ Nota "${newNote.title}" adicionada!`);
}