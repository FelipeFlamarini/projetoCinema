# Cinema AI

O objetivo deste projeto é fornecer informações sobre filmes, como sinopse, gêneros, ano de lançamento, entre outros. Para isso, foi utilizado a API [The Movie Database](https://www.themoviedb.org/). Também é possível receber recomendações de filmes utilizando inteligência artificial, utilizando a API do [Gemini](https://ai.google.dev).

## Executando

### Pré-requisitos

- Bun (versão testada: 1.2.2)

### Configuração das chaves de API

É necessário gerar uma chave de API do TMDB e do Gemini. Para isso, faça uma cópia do arquivo [.env.example](.env.example) e renomeie para ".env".

```sh
cp .env.example .env
```

### Instalação

```sh
bun install
```

### Iniciando o servidor de desenvolvimento

```sh
bun run dev
```
