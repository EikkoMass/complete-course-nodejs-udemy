Comandos utilizados para a criacao do banco de dados e collections correspondentes.

    use curso_mongodb;

    db.createCollection("alunos");

    db.alunos.insert({ nome: "Jose", idade: 30, sexo: 'M', cpf: '123.123.123-12', rg: '123.123.123-1', matricula: 'abcd123' });

    db.alunos.insert({ nome: "Maria", idade: 25, sexo: 'F', matricula: 'uio123' });

    db.alunos.insert({ nome: "Fernanda", idade: 32, sexo: 'F', matricula: 'hjk456', cursos_interesse: [{curso: 'Curso completo do Desenvolvedor NodeJS'}, {curso: 'Curso completo de desenvolvimento web - Crie 6 projetos'}]  });

Comandos usados para consulta de banco

    db.alunos.find({nome: {$eq:"Jose"}});

    db.alunos.find({idade: {$lt:30}}).pretty();

    db.alunos.find({idade: {$lte:30}}).pretty();

    db.alunos.find({sexo: {$ne:'M'}}).pretty();