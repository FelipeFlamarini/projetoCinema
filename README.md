# Cinema AI

O objetivo deste projeto é fornecer informações sobre filmes, como sinopse, gêneros, ano de lançamento, entre outros. Para isso, foi utilizado a API [The Movie Database](https://www.themoviedb.org/). Também é possível receber recomendações de filmes utilizando inteligência artificial, utilizando a API do [Gemini](https://ai.google.dev).

Nossa interface é responsiva e possui três páginas principais. A página inicial mostra os filmes mais populares, a watchlist mostra filmes adicionados à watchlist e a página de filmes possui campos de pesquisa para encontrar filmes com certos detalhes, como ano de lançamento ou gêneros. Também há um botão para iniciar um chat com o Gemini, que vai recomendar 3 filmes baseados na sua mensagem.

## Autores
- [Felipe Flamarini](https://github.com/FelipeFlamarini)
- [Kauan Olival](https://github.com/kauan345developer)
- [Pedro Samuel](https://github.com/PsSave)

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

### Iniciando o servidor de produção

Crie uma build:

```sh
bun run build
```

Inicie o servidor de produção:

```sh
bun run start
```

