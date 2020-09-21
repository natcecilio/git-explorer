import React, { useState, useEffect } from "react";
import { Form, Card, Image, Icon } from "semantic-ui-react";
import { FaGithub } from "react-icons/fa";
import logo from "./logo.svg";
import "./App.css";

function App() {
  //todo o data q pega da API
  const [name, setName] = useState("");
  const [userName, setUsername] = useState("");
  const [followers, setFollowers] = useState("");
  const [following, setFollowing] = useState("");
  const [repos, setRepos] = useState("");
  const [starred, setStarred] = useState("");
  const [avatar, setAvatar] = useState("");
  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://api.github.com/users")
      .then((res) => res.json())
      .then((data) => {
        setDate(data);
      });
  }, []);

  const setDate = ({
    name,
    login,
    followers,
    following,
    public_repos,
    avatar_url,
    stargazers_count,
  }) => {
    setName(name);
    setUsername(login);
    setFollowers(followers);
    setFollowing(following);
    setRepos(public_repos);
    setAvatar(avatar_url);
    setStarred(stargazers_count);
  };

  const handleSearch = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = () => {
    fetch(`https://api.github.com/users/${userInput}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setError(data.message);
        } else {
          setDate(data);
          setError(null);
        }
      });
  };

  return (
    <div>
      <div className="navbar">
        <div className="icone">
          <FaGithub />
        </div>
        <div className="titulo"> GitHub Explorer</div>
      </div>
      <div className="search">
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Input
              placeholder="Pesquisar Usuário"
              name="github user"
              onChange={handleSearch}
            />
            <Form.Button content="Pesquisar" />
          </Form.Group>
        </Form>
      </div>
      {error ? (
        <h1>{error}</h1>
      ) : (
        <div className="card">
          <Card>
            <Image src={avatar} wrapped ui={false} />
            <Card.Content>
              <Card.Header>{name}</Card.Header>
            </Card.Content>
            <Card.Content>
              <Card.Header>{userName}</Card.Header>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name="users" />
                {followers} Seguidores
              </a>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name="folder open" />
                {repos} Repositórios
              </a>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name="user" />
                {following} Seguindo
              </a>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name="star" />
                {starred} Starred
              </a>
            </Card.Content>
          </Card>
        </div>
      )}
    </div>
  );
}

export default App;
