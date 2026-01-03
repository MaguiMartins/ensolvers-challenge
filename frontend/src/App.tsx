import { useEffect, useState } from 'react';
import axios from 'axios';


interface Category {
  id?: number; 
  name: string;
}

interface Note {
  id: number;
  title: string;
  content: string;
  archived: boolean;
  categories: Category[];
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [showArchived, setShowArchived] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [filterTag, setFilterTag] = useState('');

  const API_URL = 'http://localhost:3000/notes';

  
useEffect(() => {
    if (isLoggedIn) {
      fetchNotes();
    }
  }, [showArchived, isLoggedIn]); // Solo carga notas si está logueado

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (username === 'admin' && password === '123456') {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Usuario o contraseña incorrectos');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    setNotes([]);
  };

  const fetchNotes = async () => {
    try {
      const res = await axios.get(`${API_URL}?archived=${showArchived}`);
      setNotes(res.data);
    } catch (error) {
      console.error("Error cargando notas. Asegúrate que el backend esté corriendo.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const categories: Category[] = tags
      .split(',')
      .map(t => t.trim())
      .filter(t => t !== '')
      .map(t => ({ name: t }));

    if (editingId) {
      await axios.patch(`${API_URL}/${editingId}`, { title, content, categories });
      setEditingId(null);
    } else {
      await axios.post(API_URL, { title, content, categories });
    }
    setTitle('');
    setContent('');
    setTags('');
    fetchNotes();
  };

  const handleDelete = async (id: number) => {
    if(!confirm('¿Estás seguro de eliminar esta nota?')) return;
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
    //setTags(note.categories.map(c => c.name).join(', '));
    setTags(note.categories ? note.categories.map(c => c.name).join(', ') : '');
  };

  const filteredNotes = notes.filter(note => {
    if (filterTag === '') return true; 
    return note.categories && note.categories.some(cat => 
      cat.name.toLowerCase().includes(filterTag.toLowerCase())
    );
  });


  if (!isLoggedIn) {
    return (
      <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
        <div className="card shadow border-0 p-4" style={{ maxWidth: '400px', width: '100%' }}>
          <div className="text-center mb-4">
            <h2 className="fw-bold text-primary">Bienvenido</h2>
            <p className="text-muted">Ingresa para ver tus notas</p>
          </div>
          
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">Usuario</label>
              <input 
                type="text" 
                className="form-control" 
                value={username}
                onChange={e => setUsername(e.target.value)}
                autoFocus
              />
            </div>
            <div className="mb-4">
              <label className="form-label">Contraseña</label>
              <input 
                type="password" 
                className="form-control" 
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            
            {loginError && <div className="alert alert-danger py-2">{loginError}</div>}
            
            <button type="submit" className="btn btn-primary w-100 btn-lg">
              Ingresar
            </button>
            <div className="mt-3 text-center text-muted small">
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light">
      
      <div className="bg-white shadow-sm pb-5 pt-4 mb-5">
        <div className="container">
          
          <div className="d-flex justify-content-between align-items-center mb-4">
             <h1 className="fw-bold text-primary m-0">Notes App</h1>
             <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>Cerrar Sesión</button>
          </div>
          
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
              
              <div className="card shadow border-0" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="card-body p-4">
                  <h5 className="card-title text-center mb-3 text-secondary">
                    {editingId ? '✏️ Editar Nota' : '📝 Crear Nueva Nota'}
                  </h5>
                  
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <input 
                        type="text" className="form-control form-control-lg" placeholder="Título..." 
                        value={title} onChange={e => setTitle(e.target.value)} required 
                      />
                    </div>
                    <div className="mb-3">
                      <textarea 
                        className="form-control" rows={3} placeholder="Contenido de la nota..." 
                        value={content} onChange={e => setContent(e.target.value)} required 
                      />
                    </div>
                    <div className="mb-3">
                      <input 
                        type="text" className="form-control" placeholder="Tags (separados por coma: ej. trabajo, urgente)" 
                        value={tags} onChange={e => setTags(e.target.value)} 
                      />
                    </div>
                    
                    <div className="d-grid gap-2">
                      <button className={`btn ${editingId ? 'btn-warning' : 'btn-primary'} btn-lg`}>
                        {editingId ? 'Actualizar' : 'Guardar Nota'}
                      </button>
                      {editingId && (
                        <button type="button" className="btn btn-secondary" onClick={() => { setEditingId(null); setTitle(''); setContent(''); setTags(''); }}>
                          Cancelar
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>

      <div className="container pb-5">
        
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 gap-3">
          
          <h3 className="text-secondary m-0 border-start border-4 border-primary ps-3">
             {showArchived ? '🗄️ Archivo' : '📌 Mis Notas'}
          </h3>

          <div className="d-flex gap-2 w-100 w-md-auto justify-content-end">
            <input 
              type="text" 
              className="form-control" 
              style={{ maxWidth: '250px'}}
              placeholder="🔍 Filtrar por tag..." 
              value={filterTag}
              onChange={e => setFilterTag(e.target.value)}
            />

            <button className={`btn ${showArchived ? 'btn-secondary' : 'btn-outline-dark'}`} onClick={() => setShowArchived(!showArchived)}>
              {showArchived ? 'Ver Activas' : 'Ver Archivadas'}
            </button>
          </div>
        </div>

        <div className="row g-4">
          {filteredNotes.length === 0 && (
            <div className="col-12 text-center text-muted py-5">
              <h4>No se encontraron notas...</h4>
            </div>
          )}

          {filteredNotes.map(note => (
            <div key={note.id} className="col-md-4">
              <div className="card h-100 shadow-sm border-0 hover-card">
                <div className="card-body d-flex flex-column">
                  
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="card-title fw-bold text-dark">{note.title}</h5>
                    {note.archived && <span className="badge bg-secondary">Archivada</span>}
                  </div>
                  
                  <p className="card-text text-secondary flex-grow-1">{note.content}</p>
                  
                  <div className="mb-3">
                    {note.categories && note.categories.map((cat, idx) => (
                       <span key={idx} className="badge bg-info text-dark me-1 rounded-pill border border-info bg-opacity-25">
                         #{cat.name}
                       </span>
                    ))}
                  </div>

                  <div className="border-top pt-3 d-flex gap-2">
                    <button className="btn btn-sm btn-outline-primary flex-grow-1" onClick={() => handleEdit(note)}>Editar</button>
                    <button className="btn btn-sm btn-outline-warning" onClick={() => handleArchive(note.id, note.archived)} title="Archivar">
                      {note.archived ? 'Desarchivar' : 'Archivar'}
                    </button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(note.id)} title="Borrar">
                      Borrar
                    </button>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;