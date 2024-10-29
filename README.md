# WatchTKO

## TODO

- desacoplar código para criando funções e objetos;
- conseguir criar múltiplas linhas;
- conseguir ler múltiplos arquivos de histórico.
- criar uma classe só para processar os dados do `./history` adicionando no topo do texto `id,date,type,command,value`;
- ultilizar a API do github coletar os dados de nome de usuário e foto;
- melhorar a interface gráfica;
- otimizar o código com cache;
- criar filtros;
- criar uma segunda visualização do código usando o `.tko/daily.json`

## Como usar?

Coloque o `history.csv` na pasta `./history` e adicione no topo do arquivo `id,date,type,command,value` para realizar leitura dos dados das colunas

## Como eu gostaria de estruturar os arquivos

- data
  - .tko-nome-de-usuario
    - history.csv
    - daily.json
  - .tko-nome-de-usuario
    - history.csv
    - daily.json
- index.html
- styles
  - ... TODO 
- scripts
  - ... TODO
