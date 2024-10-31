# WatchTKO

![exemplo](example.gif)

## TODO

- desacoplar código criando funções e classes;
- conseguir criar múltiplas linhas;
- conseguir ler múltiplos arquivos de histórico.
- criar uma classe só para processar os dados do `./history` adicionando no topo do texto `hash,date,type,command,value`;
  - validar o hash
- ultilizar a API do github para coletar os dados de nome e foto;
- melhorar a interface gráfica;
- otimizar o código com cache;
- criar filtros;
- criar uma segunda visualização do código usando o `.tko/daily.json`

## Como usar?

Coloque o `history.csv` na pasta `./scripts/data/vctorfarias/.tko` e adicione no topo do arquivo `hash,date,type,command,value` para realizar leitura dos dados das colunas

Ainda não é possível plotar o gráfico de vários alunos.

## Como eu gostaria de estruturar os arquivos

- data
  - nome-de-usuario 
    - .tko
      - history.csv
      - daily.json
  - nome-de-usuario
    - .tko
      - history.csv
      - daily.json
- index.html
- styles
  - ... TODO 
- scripts
  - ... TODO
