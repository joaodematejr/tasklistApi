import React, { useState, useEffect } from 'react';

import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import LinearProgress from '@material-ui/core/LinearProgress';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import moment from 'moment';
import 'moment/locale/pt-br';

import api from "./services/api";
import './App.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0D47A1',
    },
    secondary: {
      main: '#1B5E20',
    },
  },
});

export default function Main() {
  moment.locale('pt-br')
  //STATES TASK
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState(false);
  const [description, setDescription] = useState("");
  const [datesCreation, setDatesCreation] = useState("");
  const [datesConclusion, setDatesConclusion] = useState("");
  const [isUpdateTask, setIsUpdateTask] = useState(false);
  const [loadingList, setLoadingList] = useState(true);
  const [loadingSave, setLoadingSave] = useState(false);
  const [tasks, setTasks] = useState([]);


  useEffect(() => {
    queryListTasks()
  }, [loadingList]);


  //CONSULTAR LISTA NO BACK-END
  async function queryListTasks() {
    await api.get('/api/task/', {
    }).then(function (response) {
      setTasks(response.data)
      setLoadingList(false)
    }).catch(function (error) {
      console.log(error)
    });
  }

  //FUNÇÃO ATUALIZAR TASK
  async function handleUpdate() {

  }
  //FUNÇÃO CADASTRAR TASK
  async function handleRegister(e) {
    setLoadingSave(true)
    e.preventDefault();

  }

  //RENDER BOTAO ATUALIZAR
  function renderButtonUpdate() {
    return (
      <div>

      </div>
    )
  }

  //RENDER BOTAO SALVAR
  function renderButtonSave() {
    if (loadingSave === true) {
      return (
        <>
          <br />
          <LinearProgress />
        </>
      )
    } else {
      return (
        <button type="submit">
          Salvar
        </button>
      )
    }
  }

  //MUDAR VALOR SWITCH
  function handleChangeStatus() {
    if (status === true) {
      setStatus(false)
    } else {
      setStatus(true)
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <div id="app">
        <aside>
          <strong>{isUpdateTask === true ? 'Atualização' : 'Cadastrar uma nova tarefa'}</strong>
          <form onSubmit={isUpdateTask === true ? handleUpdate : handleRegister}>
            <div className="input-block">
              <input
                placeholder="Titulo"
                name="title"
                required
                type="text"
                autoComplete="title"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </div>
            <div className="input-block">
              <input
                placeholder="Descrição"
                name="description"
                required
                type="text"
                autoComplete="description"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </div>
            <br />
            <FormGroup row>
              <FormControlLabel
                control={
                  <Switch
                    checked={status}
                    onChange={handleChangeStatus}
                    value="checkedB"
                    color="primary" />
                }
                label="Concluído"
              />
            </FormGroup>
            {isUpdateTask === true ? renderButtonUpdate() : renderButtonSave()}
          </form>
        </aside>
        <main>
          {tasks.length === 0 ? (
            <div>
              <CircularProgress />
            </div>
          ) : (
              <ul>
                {tasks.map(task => (
                  <li className="dev-item" key={task.id}>
                    {console.log('task', task)}
                    <header>
                      <div className="user-info">
                        <strong>
                          Titulo:{" "}
                          {task.title}
                        </strong>
                      </div>
                    </header>
                    <p>
                      <strong>
                        Descrição:{" "}
                      </strong>
                      {task.description}
                    </p>
                    <p>
                      <strong>
                        Criado em:{" "}
                      </strong>
                      {moment(task.datesCreation).format('ll')}
                    </p>
                    <p>
                      <strong>
                        Atualizado pela ultima vez em:{" "}
                      </strong>
                      {moment(task.datesEdition).format('ll')}
                    </p>
                    <p>
                      <FormGroup row>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={task.status}
                              onChange={handleChangeStatus}
                              value="checkedB"
                              color="primary" />
                          }
                          label="Concluído"
                        />
                      </FormGroup>
                    </p>
                  </li>
                ))}
              </ul>
            )}

        </main>
      </div>
    </ThemeProvider>
  )

}
