import React, { useState, useEffect } from 'react';

import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import LinearProgress from '@material-ui/core/LinearProgress';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

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
      main: '#d50000',
    },
  },
});

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function Main() {
  moment.locale('pt-br');
  const classes = useStyles();
  //STATES TASK
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState(false);
  const [description, setDescription] = useState("");
  const [isUpdateTask, setIsUpdateTask] = useState(false);
  const [loadingList, setLoadingList] = useState(true);
  const [loadingSave, setLoadingSave] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
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
      if (error) {
        alert('Ocorreu um erro por favor entre em contato com desenvolvedor.')
      }
    });
  }

  //FUNÇÃO ATUALIZAR TASK
  async function handleConfirmUpdate(taks) {
    setIsUpdateTask(true);
    setId(taks.id);
    setTitle(taks.title);
    setDescription(taks.description);
    setStatus(taks.status);
  }

  //CONFIRMAÇÃO DA ATUALIZAÇÃO
  async function handleUpdate(e) {
    e.preventDefault();
    setLoadingUpdate(true);
    await api.put(`/api/task/${id}`,
      {
        title,
        status,
        description,
      }).then(async function (response) {
        alert('Aviso !!! Tarefa Atualizada com Sucesso !!!');
        setIsUpdateTask(false)
        queryListTasks()
        setId('');
        setTitle('');
        setDescription('');
        setStatus('');
        setLoadingUpdate(false)
      }).catch(function (error) {
        if (error) {
          alert('Ocorreu um erro por favor entre em contato com desenvolvedor.')
        }
        setLoadingUpdate(false)
      });
  }

  //FUNÇÃO ATUALIZAR RAPIDA TASK
  async function handleUpdateTask(taks) {
    setLoadingUpdate(true)
    let status = false
    if (taks.status === false) {
      status = true
    } else {
      status = false
    }
    await api.put(`/api/task/${taks.id}`,
      {
        title: taks.title,
        status: status,
        description: taks.description,

      }).then(async function (response) {
        alert('Aviso !!! Tarefa Atualizada com Sucesso !!!');
        queryListTasks()
        setLoadingUpdate(false)
      }).catch(function (error) {
        if (error) {
          alert('Ocorreu um erro por favor entre em contato com desenvolvedor.')
        }
        setLoadingUpdate(false)
      });

  }
  //FUNÇÃO PARA DELETAR PESSOA
  async function handleDelete(taks) {
    setModalDelete(false);
    setLoadingUpdate(true)
    await api.delete(`/api/task/${taks.id}`
    ).then(function (response) {
      setLoadingUpdate(false)
      alert("Aviso !!! Deletado com Sucesso")
      queryListTasks()
    }).catch(function (error) {
      alert(error.response)
    })
  }
  //FUNÇÃO CADASTRAR TASK
  async function handleRegister(e) {
    setLoadingSave(true)
    e.preventDefault();
    await api.post('/api/task/',
      {
        title,
        description,
        status
      }).then(function (response) {
        setTasks([...tasks, response.data]);
        setLoadingSave(false)
        alert('Aviso !!! Tarefa cadastrada com Sucesso !!!');
        setTitle('');
        setDescription('');
        setStatus(false);
      }).catch(function (error) {
        setLoadingSave(false)
        if (!error.response) {
          alert('Aviso !!! Problema com API');
        } else {
          if (error.response.status === 400) {
            error.response.data.errs.forEach(erro => {
              alert(erro)
            });
          }
        }
      });


  }

  //RENDER BOTAO ATUALIZAR
  function renderButtonUpdate() {
    if (loadingUpdate === true) {
      return (
        <>
          <br />
          <LinearProgress />
        </>
      )
    } else {
      return (
        <button type="submit">
          Atualizar
        </button>
      )
    }
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
                      {moment(task.datesEdition).format('LLL')}
                    </p>
                    <p>
                      <strong>
                        Data de Conclusão:{" "}
                      </strong>
                      {task.datesConclusion === null ? 'Não Concluido ainda' : moment(task.datesConclusion).format('LLL')}
                    </p>
                    <p>
                      <FormGroup row>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={task.status}
                              onChange={() => handleUpdateTask(task)}
                              value="checkedB"
                              color="primary" />
                          }
                          label={task.status === true ? 'Concluído' : 'Não Concluído'}
                        />
                      </FormGroup>
                    </p>
                    <div className={classes.root}>
                      <Fab color="secondary" aria-label="delete" onClick={() => setModalDelete(true)}>
                        <Icon />
                      </Fab>
                      <Fab color="primary" aria-label="edit" onClick={() => handleConfirmUpdate(task)}>
                        <EditIcon />
                      </Fab>
                    </div>
                    <Dialog
                      open={modalDelete}
                      onClose={() => setModalDelete(false)}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description">
                      <DialogTitle id="alert-dialog-title">{`Aviso !!! Você tem certeza que desja excluir ${task.description} da listagem ?`}</DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          Não será possivel recuperar o registro apos a exclusão.
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={() => setModalDelete(false)} color="primary">
                          Não, Desejo manter o tarefa
                        </Button>
                        <Button onClick={() => handleDelete(task)} color="primary" autoFocus>
                          Sim, Desejo excluir mesmo assim
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </li>
                ))}
              </ul>
            )}
        </main>
      </div>
      <div>
        <Dialog
          open={loadingUpdate}
          onClose={() => setLoadingUpdate(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">{"Aviso !!!!"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Aguarde um momento !!!
              <br /> <br />
              <LinearProgress style={{ width: '100%' }}
                size={24}
                thickness={4}
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setLoadingUpdate(false)} color="primary">
              OK
          </Button>
          </DialogActions>
        </Dialog>
      </div>
    </ThemeProvider>
  )

}
