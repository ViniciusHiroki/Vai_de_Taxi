# Vai_de_Taxi
 
--USO DA API--
Para executar o projeto, primeiro instale as dependências executando o comando 'npm i' e depois 'npm start' na pasta raiz(Vai_de_Taxi),
e para pode visualizar o banco de dados, recomendo a seguinte extensão https://database-client.com/#/home

A aplicação estará rodando no http://localhost:3000 e poderá a dar início ao uso da API:
    1 - Iniciar Corrida

    curl --location 'http://localhost:3000/iniciarCorrida' \
    --header 'Content-Type: application/json' \
    --data '{
        "CliId": 1,
        "MotId": 2,
        "CorOrigem": "Rua Las Palmas 20",
        "CorDestino": "Rua Mandioca 50"
    }'

    Com a curl acima você poderá criar uma corrida com o cliente 1, e motorista 2 com o local de origem e destino. Se quiser você pode utilizar outros Ids de motorista e cliente, veja o Ids existente na tabela tblCliente e tblMotorista. É possível criar usuários também mas lembre-se de cadastrar um usuário na tabela tblUsuario e associa-lo à tabela tblCliente ou tblMotorista ou até mesmo os dois.
    Assim que criado a corrida, a API retornará o seguinte:

    {
        "status": true,
        "msg": "A corrida está em andamento",
        "info": {
            "CorId": 14,
            "dadosCliente": {
                "Nome": "Alex Junior",
                "Idade": 28,
                "CPF": "45678998745"
            },
            "dadosMotorista": {
                "Nome": "Joao Jose",
                "Idade": 30,
                "CPF": "23654685225"
            }
        }
    }  
-------------------------------------------------------------------------------------
    2 - Finalizar Corrida

    curl --location 'http://localhost:3000/finalizarCorrida' \
    --header 'Content-Type: application/json' \
    --data '{
        "CorId": 14,
        "Tipo": "concluido"
    }'

    Utilizando o Id da corrida criada (CorId) retornado na primeira API, será possível cancelar a corrida com a curl acima, podendo escolher o tipo de finalização: 'concluido' ou 'cancelado'. caso o tipo seja concluido, irá adicionar 1 à contagem de corridas á ambos os usuarios nas tabelas tblCliente e tblMotorista.
---------------------------------------------------------------------------------------
    3 - Algumas considerações

    Enquanto um usuário está em uma corrida, ele não pode iniciar outra, entaõ caso esteja tendo problemas ao testar basta alterar o campo UsuEmCorrida na tabela tblUsuario para 0, assim o usuário poderá iniciar a corrida.
---------------------------------------------------------------------------------------
    4 - Teste unitário

    Para utilizar o teste unitário basta executar o comando 'npx mocha testeUnitario.js' na pasta 'src'

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

--SOBRE O PROJETO--
Utilizei O Node.js por ser mais familiarizado com esse framework, essa foi a primeira vez que ultilizei o Sqlite então tive alguns problemas e dificuldades, como por exemplo a função de Select do ultimo id inserido na tabela que não consegui implementar.
No final acabei apenas realizando a tarefa de criação de corrida pois não possuia informações o suficiente para realizar a função de autorização de transação

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

--CONSIDERAÇÕES FINAIS--
Foi interessante utilizar o SQLite, o projeto em si foi divertido de se realizar, e com a experiência de ter realizado esse projeto acredito que pelo aprendizado já tenha valido a pena, mesmo que não seja escolhido no processo seletivo. Então agradeço desde já pela oportunidade

Muito Obrigado
