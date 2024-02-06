## Comandos utilizados para a criacao do banco de dados e collections correspondentes.

    use curso_mongodb;

    db.createCollection("alunos");

    db.alunos.insert({ nome: "Jose", idade: 30, sexo: 'M', cpf: '123.123.123-12', rg: '123.123.123-1', matricula: 'abcd123' });

    db.alunos.insert({ nome: "Maria", idade: 25, sexo: 'F', matricula: 'uio123' });

    db.alunos.insert({ nome: "Fernanda", idade: 32, sexo: 'F', matricula: 'hjk456', cursos_interesse: [{curso: 'Curso completo do Desenvolvedor NodeJS'}, {curso: 'Curso completo de desenvolvimento web - Crie 6 projetos'}]  });

## Comandos usados para consulta de banco

    db.alunos.find({nome: {$eq:"Jose"}});

    db.alunos.find({idade: {$lt:30}}).pretty();

    db.alunos.find({idade: {$lte:30}}).pretty();

    db.alunos.find({sexo: {$ne:'M'}}).pretty();

## Comandos usados para consulta de banco (clausulas E / OU)

    //sexo igual a 'F' E idade maior que 30
    
    db.alunos.find({sexo: {$eq:"F"}, idade: {$gt:30}});


    //nome igual a 'Maria' OU nome igual a 'Jose'
    
    db.alunos.find({$or: [{nome: "Maria"}, {nome: "Jose"}]});


## Comandos usados para alterar registros no banco

    db.alunos.update({nome: 'Jose'}, {$set: {nome: 'Joao'}})

    db.alunos.update({nome: 'Maria'}, {$set: {idade: 26}})

por padrao o mongodb entende que a atualizacao de registro se aplica apenas para 1 registro do banco, caso deseje atualizar todos os registros que a condicao bater, utilizar 'multi' como 'true'.

    db.alunos.update({sexo: 'F'}, {$set: {sexo: 'Feminino'}}, {multi:true})

⚠️ Em versoes mais recentes Collection.update() (comando usado na aula) se encontra deprecado, recomendado utilizar updateOne, updateMany ou bulkWrite.

## Comandos usados para remover registros no banco

    db.alunos.remove({nome: 'Maria'})

    db.alunos.remove({idade: {$gt: 30})

    db.alunos.remove({matricula: {$eq: 'abcd123'}})

caso queira apagar apenas 1 registro, e necessario utilizar do segundo parametro chamado de 'justOne', que recebe um valor booleano de 'true' ou 'false'

    db.alunos.remove({nome: 'Maria'}, true)

⚠️ Em versoes mais recentes Collection.remove() (comando usado na aula) se encontra deprecado, recomendado utilizar deleteOne, deleteMany, findOneAndDelete ou bulkWrite.