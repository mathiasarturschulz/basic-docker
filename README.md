# basic-docker

Aprendendo a utilizar o Docker. 

Criação de uma imagem MySQL versão 5, uma imagem NODE versão 10 e uma imagem PHP versão 7.2. 

Criando um container MySQL para salvar os produtos, criando um container com uma API NODE que se comunica com o MySQL e criando o website PHP que se comunica com a API.



# Docker

### O que é o Docker?
Plataforma open-source escrita em GO.
Possui o objetivo de criar ambientes isolados para aplicações e serviços.
Vantagem: As aplicações e serviços podem rodar em várias máquinas da forma esperada.
Docker é uma ferramenta para criar e manter containers.
Responsável por armazenar vários serviços de forma isolada do SO host.
Como: web server, banco de dados, aplicação entre outros.

O back-end é baseado em LXC (LinuX Containers).
LXC funciona isolando processos do sistema operacional host.
É uma espécie de virtualização bastante leve.
Não faz uso de emulação.
O Docker utiliza o mesmo Kernel do servidor host, tornando tudo muito rápido.

### Instalando o Docker
`sudo apt-get install docker.io`

### Imagens docker podem ser encontradas no Docker Hub (hub.docker.com)

### Baixar uma imagem docker
`docker pull [nome_imagem]`

### Visualizar todas imagens baixadas
`docker images`

### Apagar uma imagem
`docker rmi [imagem_id ou imagem_nome]`

### Iniciar um container de uma imagem
`docker run [nome_imagem]`

### Listar todos os containers em execução
`docker ps`

### Executar comandos dentro do container
`docker exec [container_id] [comando]`

### Parar a execução de todos os containers
`docker stop $(docker ps -aq)`

### Excluir um container
`docker rm [container_id ou container_nome]`

### Excluir todos os containers criados
`docker rm $(docker ps -aq)`

### Docker Compose
O Docker Compose é um orquestador de containers da Docker.
Falicita a contrução de um projeto que necessita vários containers.
É possível definir uma aplicação multi-container.

### Visualizar o IP de container
`docker inspect [container_nome]`
`docker inspect mysql-container`

Buscar por "Networks / brigde / IPAddress"

### Visualizar o ID dos container
`sudo docker ps -qa`

### Status de um container
Tempo de execução; Nível de consumo de recursos na máquina host;
`sudo docker stats bc5fdb751dd1`



# Docker - MySQL

### Contruir o container MySQL

-t -> Tag para a imagem, nome da imagem

-f -> Diretório onde se encontra o Dockerfile

.  -> Significa que a imagem será construída a partir da pasta atual /Docker

`docker build -t mysql-image -f api/bd/Dockerfile .`

### Executar o container

-d     -> Executa o docker em segundo plano, sem apresentar os logs

--rm   -> Se o container já existe, será excluído e criado o novo

--name -> Atribui um nome ao container

`docker run -d --rm --name mysql-container mysql-image`

### Executar o script dentro do container

-i -> Comando no modo interativo, o processo não é finalizado até que esteja concluído

`docker exec -i mysql-container mysql -uroot -psenha < api/bd/script.sql`

### Abrir o interpretador de comandos Bash do container

Acessar o terminal do container

`docker exec -it mysql-container /bin/bash`

Acessar o MySQL

`mysql -uroot -psenha`

Sair do MySQL e do container

`exit`

### Parar o container

`docker stop mysql-container`

### Executando o container sem que as alterações no container sejam perdidas

Sem perder as tabelas criadas

-v                 -> Volume. Informa a pasta do meu host que é compartilhada com o container

$(pwq)/api/bd/data -> Pasta host

:                  -> Separador

/var/lib/mysql     -> Pasta de toda a estrutura no mysql no container

`docker run -d -v $(pwd)/api/bd/data:/var/lib/mysql --rm --name mysql-container mysql-image`

# Em seguida é só rodar o script.sql novamente



# Docker - Node

### Iniciar o projeto

`cd api/`

`npm init`

### Instalar o nodemon

Deixar a aplicação Node rodando

E realizar o reload sempre que os arquivos JS forem atualizados

`npm install --save-dev nodemon`

### Instalar o Express

Para construir rotas que retornam os produtos

`npm install --save express mysql`

### Insert um comando de start no package.json

Comando start executando o nodemon

```
"scripts": {
    "start": "nodemon ./src/index"
},
```

### Criar o arquivo index.js em api/src/index.js

### Inserir o IP do container MySQL no host para conexão

### Contruir a imagem Node
`docker build -t node-image -f api/Dockerfile .`

### Rodar o container Node

-p          -> Determina que a porta dentro do container estará exposta para acesso na porta do host

porta:porta -> porta_host:porta_dentro_container

`docker run -d -v $(pwd)/api:/home/node/app -p 9001:9001 --rm --name node-container node-image`

### Rodar o container Node com a tag link

-p     -> Determina que a porta dentro do container estará exposta para acesso na porta do host

--link -> Determina que esse container possui um link com o container mysql-container

`docker run -d -v $(pwd)/api:/home/node/app -p 9001:9001 --link mysql-container --rm --name node-container node-image`



# Docker - PHP

### Contruir a imagem Docker
`docker build -t php-image -f website/Dockerfile .`

### Rodar a imagem PHP
`docker run -d -v $(pwd)/website:/var/www/html -p 8888:80 --link node-container --rm --name php-container php-image`
