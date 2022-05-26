# Projeto RTL (React Testing Library)

# Contexto
Esse projeto foi feito como validação do bloco de `Testes automatizados com React Testing Library` no modulo de `Front-End` da Trybe.

Nos foi dado uma aplicação pronta onde devíamos implementar os testes para validar a experiência do usuário ao utilizar a aplicação.

Os testes implementados cobrem mais de 90% da aplicação, abaixo alguns dos componentes que foram testados.

Todos os testes se encontram na pasta `tests` que se localizam dentro da pasta `src`:<br>

```
/src/tests/...
```

## APP (Home)
Os testes do componente `APP (Home)` contém as validações para o menu de navegação, testando se contém um grupo de links específicos e se funcionam de acordo com o que foi proposto.

### Verifica a funcionalidade do link `"Home"`.

![img](/src/image/App-home.png)

### Verifica a funcionalidade do link `"About"`.

![img](/src/image/App-about.png)

### Verifica a funcionalidade do link `"Favorite Pokémons"`.

![img](/src/image/App-favoritePokemon.png)

### Verifica a funcionalidade da pagina `"notfound"` caso uma URL invalida seja passada.

![img](/src/image/App-notFound.png)


## About
Os testes do componente `About` contem as validações para a pagina `About`, verificando se a pagina contem todos os elementos necessários.

### Verifica se a pagina contem um titulo especifico.

![img](/src/image/About-titulo.png)

### Verifica se a pagina contem dois parágrafos descrevendo uma Pokedéx.

![img](/src/image/About-paragrafo.png)

### Verifica se a pagina contem a imagem de uma Pokedéx.

![img](/src/image/About-imagem.png)


## Pokémons Favoritos
os testes do componente `FavoritePokemons` contem as validações para a pagina `Pokémons Favoritos`, verificando se a pagina renderiza os Pokémons que foram favoritados.

### Verifica se caso não tenha nenhum Pokémon favorito a mensagem correta é renderizada.

![img](/src/image/Favorite-imagem.png)

### Verifica se a pagina contem os Pokémons que foram favoritados.

![img](/src/image/Favorite-pokemon.png)


## Técnologias usadas

Testes:
> Desenvolvido usando: React, RTL (React Testing Library), Jets, JavaScript ES6, Teste E2E.
## Instalando Dependências

``` bash
npm install
``` 
## Executando aplicação

  ``` bash
  npm start
  ```

## Execução de testes unitários

Você pode executar todos os testes unitários localmente, basta executar:

```bash
npm test
```

ou 

Caso queira executar apenas um componente de teste basta passar o caminho do componente apos o comando `npm test`, no exemplo abaixo executamos apenas o componente `About`:

```bash
npm test tests/About.test.js
```

## Dica: desativando testes

Para rodar apenas um teste, basta a utilização da função `.only` após o `describe`. Com isso, será possível que apenas um requisito rode localmente e seja avaliado.

![img](/src/image/Dica-1.png)<br>

ou

Caso queira avaliar apenas um tópico do requisito, você também pode usar o `.only` após o `it`.

![img](/src/image/Dica-2.png)