import React, { useEffect, useState } from "react";

import "./styles.css";

import api from './services/api';

import Item from './components/Item';

function App() {
  const [repositories, setRepositories] = useState([]);
  useEffect(() => {
    api.get('repositories').then(response => setRepositories(response.data));
  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `New Repo ${Date.now()}`,
      owner: 'Marcel'
    });
    const newRepository = response.data;
    setRepositories([...repositories, newRepository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    setRepositories(repositories.filter(repository => repository.id !== id))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <Item
            key={repository.id}
            id={repository.id}
            title={repository.title}
            removeRepository={handleRemoveRepository}
          />))
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
