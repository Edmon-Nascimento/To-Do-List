import { useState, useEffect } from 'react';
import './App.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCheck } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [tarefas, setTarefas] = useState(() => {
    const tarefasStorage = localStorage.getItem('@tarefa');
    return tarefasStorage ? JSON.parse(tarefasStorage) : [];
  });

  const [input, setInput] = useState('');

  useEffect(() => {
    localStorage.setItem('@tarefa', JSON.stringify(tarefas));
  }, [tarefas]);

  function cadastrar(e) {
    e.preventDefault();
    const texto = input.trim();
    if (!texto) return;

    setTarefas((prev) => [...prev, { id: Date.now(), text: texto, done: false }]);
    setInput('');
  }

  function removerTarefa(id) {
    setTarefas((prev) => prev.filter((t) => t.id !== id));
  }

  function toggleConcluida(id) {
    setTarefas((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }

  return (
    <div className="container">
      <h1>Lista de Tarefas</h1>

      <form onSubmit={cadastrar} className="form">
        <input
          type="text"
          placeholder="Digite uma tarefa"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Adicionar</button>
      </form>

      <ul className="lista">
        {tarefas.map((tarefa) => (
          <li key={tarefa.id} className={`item ${tarefa.done ? 'concluida' : ''}`}>
            <span className="texto">{tarefa.text}</span>

            <div className="acoes">
              <button
                className={`icon-btn check ${tarefa.done ? 'ativo' : ''}`}
                onClick={() => toggleConcluida(tarefa.id)}
                aria-label={tarefa.done ? 'Desmarcar tarefa' : 'Marcar tarefa como concluída'}
                title={tarefa.done ? 'Desmarcar' : 'Concluir'}
              >
                <FontAwesomeIcon icon={faCheck} />
              </button>

              <button
                className="icon-btn trash"
                onClick={() => removerTarefa(tarefa.id)}
                aria-label="Apagar tarefa"
                title="Apagar"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
