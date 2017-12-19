# Bemobi Hire.me
Projeto do processo Bemobi. Descrição [aqui](Bemobi_instructions.md). Api desenvolvida utilizando [Express](http://expressjs.com/pt-br/).

## Desenvolvimento

Para executar a aplicação, você deve ter instalado o [docker-compose](https://docs.docker.com/compose/). 

Após instalação do docker-compose, execute no modo de desenvolvimento com:

```bash
$ docker-compose up
```

O servidor deve iniciar em [http://localhost:3000](http://localhost:3000)

Para consultar a documentação da API no formato [Swagger UI](https://swagger.io/swagger-ui/), acesse [http://localhost:3000/api-docs/explorer](http://localhost:3000/api-docs/explorer)

## Teste

Para executar os testes:

```bash
$ docker-compose -f docker-compose.test.yml up
```