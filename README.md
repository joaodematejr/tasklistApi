# DESAFIO TÉCNICO

# API RESTful + Front end 
API RESTful com Spring Boot, Java 8, MySQL e React no Frontend

### Como executar a aplicação
Certifique-se de ter o Maven instalado e adicionado ao PATH de seu sistema operacional, assim como o Git.
```
git clone https://github.com/joaodematejr/tasklistApi
cd tasklistApi
mvn spring-boot:run
Acesse http://localhost:8080/api/task
```
### APIs Endpoints (LOCAL)
GET http://localhost:8080/api/task [Lista todas as tarefas cadastrada no banco]  
POST http://localhost:8080/api/task [Cadastra uma nova tarefa]  
PUT http://localhost:8080/api/task/{id} [Atualizar os dados de uma tarefa]  
DELETE http://localhost:8080/api/task/{id} [remove uma tarefa por ID]  

### APIs Endpoints (NUVEM)
GET https://apitaskjr.herokuapp.com/api/task [Lista todas as tarefas cadastrada no banco]  
POST https://apitaskjr.herokuapp.com/api/task [Cadastra uma nova tarefa]  
PUT https://apitaskjr.herokuapp.com/api/task/{id} [Atualizar os dados de uma tarefa]  
DELETE https://apitaskjr.herokuapp.com/api/task/{id} [remove uma tarefa por ID]  

Exemplo de corpo para realização da requisição post da funcionalidade cadastrar

```
{
	"title": "String",
	"status": "Boolean",
	"description": "String"
}
```

### Importando o projeto no Eclipse ou STS
No terminal, execute a seguinte operação:
```
mvn eclipse:eclipse
```
No Eclipse/STS, importe o projeto como projeto Maven.

### Como executar frontend (LOCAL)
Certifique-se de ter o Node instalado em seu sistema operacional.
```
git clone https://github.com/joaodematejr/tasklistApi
cd frontend
npm install && npm start se for usar yarn [precisar ter o yarn instalado] e usar comando yarn && yarn start
Acesse http://localhost:3000/
```

### Como executar frontend (NUVEM)

http://frontendtaskjr.herokuapp.com/ [Hospedagem Gratis pode demorar um pouco ou dar erro na primeira vez]


