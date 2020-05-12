import React, {useState, useEffect} from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
   api.get('repositories').then(response => {
     setRepositories(response.data);
   });
  }, []);

  async function handleAddRepository() {
    const newRepo = {
      url: "https://github.com/josuearaujo/new-repo",
      title: `Repository ${Date.now()}`,
      techs: ["React", "Node.js"],
    };

    const addedRepo = await api.post('/repositories', newRepo);

    setRepositories([...repositories, addedRepo.data]);
  }

  async function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`)
      .then(response => {
        const repositoryIndex = repositories.findIndex(repository => repository.id === id);
        
        repositories.splice(repositoryIndex, 1);
        setRepositories([...repositories]);        
      })
      .catch(response => {
        alert(response);
      });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}          
          
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
        {/* <li>
          Repositório 1

          <button onClick={() => handleRemoveRepository(1)}>
            Remover
          </button>
        </li> */}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
