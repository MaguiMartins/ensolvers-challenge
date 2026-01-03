import { useEffect, useState } from 'react';
import axios from 'axios';


interface Note {
  id: number;
  title: string;
  content: string;
  archived: boolean;
}

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showArchived, setShowArchived] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const API_URL = 'http://localhost:3000/notes';

  
  useEffect(() => {
    fetchNotes();
  }, [showArchived]);

  const fetchNotes = async () => {
    const res = await axios.get(`${API_URL}?archived=${showArchived}`);
    setNotes(res.data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await axios.patch(`${API_URL}/${editingId}`, { title, content });
      setEditingId(null);
    } else {
      await axios.post(API_URL, { title, content });
    }
    setTitle('');
    setContent('');
    fetchNotes();
  };

  const handleDelete = async (id: number) => {
    if(!confirm('Delete note?')) return;
    await axios.delete(`${API_URL}/${id}`);
    fetchNotes();
  };

  const handleArchive = async (id: number, status: boolean) => {
    await axios.patch(`${API_URL}/${id}`, { archived: !status });
    fetchNotes();
  };

  const handleEdit = (note: Note) => {
    setEditingId(note.id);
    setTitle(note.title);
    setContent(note.content);
  };

  return (
    <div className="container mt-5">
      <h1>My Notes App</h1>

      {/* Formulario */}
      <div className="card p-3 mb-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <input 
              type="text" className="form-control" placeholder="Title" 
              value={title} onChange={e => setTitle(e.target.value)} required 
            />
          </div>
          <div className="mb-2">
            <textarea 
              className="form-control" placeholder="Content" 
              value={content} onChange={e => setContent(e.target.value)} required 
            />
          </div>
          <button className="btn btn-primary">{editingId ? 'Update' : 'Create'}</button>
          {editingId && <button type="button" className="btn btn-secondary ms-2" onClick={() => { setEditingId(null); setTitle(''); setContent(''); }}>Cancel</button>}
        </form>
      </div>

      {/* Filtro Archivo */}
      <div className="mb-3">
        <button className={`btn ${showArchived ? 'btn-secondary' : 'btn-outline-secondary'}`} onClick={() => setShowArchived(!showArchived)}>
          {showArchived ? 'Show Active Notes' : 'Show Archived Notes'}
        </button>
      </div>

      {/* Lista de Notas */}
      <div className="row">
        {notes.map(note => (
          <div key={note.id} className="col-md-4 mb-3">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{note.title}</h5>
                <p className="card-text">{note.content}</p>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(note)}>Edit</button>
                <button className="btn btn-sm btn-info me-2" onClick={() => handleArchive(note.id, note.archived)}>
                  {note.archived ? 'Unarchive' : 'Archive'}
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(note.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;