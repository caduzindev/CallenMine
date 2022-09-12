# O que deve ser entregue
Deve ser entregue um fork no github com permissão de acesso para o usuário **walmeidaw**.
Se necessário, deve ter informações sobre como executar o projeto.
A base de dados usada pode ser MySQL, Mongo, PostgresSQL ou outras, mas deve ser especificado para que possa ser reproduzido na avaliação. Opcionalmente você pode usar uma base de dados na nuvem, o que já elimina esse passo de configuração durante a avaliação.

## Endpoints esperados
- [x] **EP.1** `GET`  /customer/{ document }
- [x] **EP.2** `GET`  /scheduling
- [x] **EP.3** `GET`  /scheduling/{ scheduling_id }
- [x] **EP.4** `POST` /expert/scheduling/
- [x] **EP.5** `GET`  /expert/scheduling/{ expert_id }
- [x] **EP.6** `GET`  /expert/occupied/{ expert_id }
- [x] **EP.7** `GET`  /expert/free?date={dd-MM-YYYY}
- [x] **EP.8** `POST` /blocking/scheduling
- [x] **EP.9** `GET`  /blocking/scheduling
- [x] **EP.Extra**    Modificação do *EP.7*

## Necessário enviar
- [x] link do repositório por e-mail para selecao@minery.com.br
- [x] no repositório deve ter um arquivo `HOWTO.md` com instruções de execução do código
