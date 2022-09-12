# Como executar projeto
Bom configurei o projeto pra rodar com docker, pois ja vem tudo configurado e evita imcompatibilidade com seu sistema

Antes de tudo se você estiver no windows, recomendo que utilize o WSL com o Docker Desktop para rodar o projeto
### **Clone o projeto**

`git clone https://github.com/caduzindev/CallenMine.git`

### **Execute**
Na raiz do projeto você so precisa executar

`docker-compose up -d`

pode demorar um pouquinho no inicio pois as imagens precisam ser baixadas

### **Como testar?**
Apos você executar o comando anterior será disponibilizado os seguintes serviços:
- No navegador abra `localhost:8080`, isso e o admin do banco de dados caso você queira inserir alguma coisa... para saber as informações de login basta ir em `env/local.pg.env` do projeto, que você terá as informações de login,senha e nome do banco de dados

- Em `localhost:3000` é a api de agendamentos, aqui você pode usar qualquer tipo de cliente http como insominia,postman e etc.

### **Para encerrar os containers**
Rode na raiz do projeto `docker-compose down`

### **Lembrete**
Quando você subir o projeto, ja vão ser pre-cadastrados experts e customers no banco inicialmente, você pode usa-los para testar ou então inserir mais... basta acessar o banco(expliquei como anteriormente) e colocar mais customers ou experts

### **Experts já pre-cadastrados no banco**
```json
[
    {"id":1,"name":"Alberto","expertises":["python","BI","matematica"]},
    {"id":2,"name":"Romerio","expertises":["Redes","Mecanica","linguas"]},
    {"id":3,"name":"Luiz","expertises":["marketing","SEO"]},
]
```
### **Customers já pre-cadastrados no banco**
```json
[
    {"id":1,"document":"14108865452","name":"Paulo"},
    {"id":2,"document":"14108865450","name":"Jose"},
    {"id":3,"document":"14108865480","name":"Carlos"},
]
```