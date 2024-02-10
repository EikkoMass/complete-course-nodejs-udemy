# Atividades para fixação do conteúdo

## Crie um banco de dados chamado biblioteca

    use biblioteca;

## Crie uma coleção (collection) chamada livros

    db.createCollection("livros");

## Crie os seguintes documentos:

 título: Introdução a linguagem de marcação HTML

valor: 25.00

Autor: João

    db.livros.insert({ titulo: "Introducao a linguagem de marcacao HTML", valor: 25, autor: "Joao" });

título: NodeJS do básico ao avançado

valor: 280.00

Autor: Jorge

    db.livros.insert({ titulo: "NodeJS do basico ao avancado", valor: 280, autor: "Jorge" });

título: Android - criando apps reais

valor: 290.00

Autor: Jamilton

    db.livros.insert({ titulo: "Android - criando apps reais", valor: 290, autor: "Jamilton" });

título: PHP e MySQL

valor: 190.00

Autor: Fernando

    db.livros.insert({ titulo: "PHP e MySQL", valor: 190, autor: "Fernando" });

título: Lógica de Programação

valor: 20.00

Autor: Maria

    db.livros.insert({ titulo: "Logica de programacao", valor: 20, autor: "Maria" });

## Crie as seguintes consultas:

Crie uma consulta que retorne apenas os documentos de livros com valores superiores a 200.00

    db.livros.find({valor: {$gt: 200}})

Crie uma consulta que retorne apenas os documentos com valores entre 10 e 30

    db.livros.find({valor: {$gt: 10, $lt: 30}})

Crie uma consulta que retorne todos os documentos, executo (exceto?) aqueles cujo autor seja Fernando

    db.livros.find({autor: {$ne:'Fernando'}})

##  Atualize os seguintes documentos:

Atualize o documento cujo o título é PHP e MySQL, passando seu valor de 190.00 para 175.00

    db.livros.updateOne({titulo: "PHP e MySQL"}, {$set: {valor: 175}})

Atualize o documento cujo autor é Jorge, passando seu título para Curso Completo de NodeJS

    db.livros.updateOne({autor: "Jorge"}, {$set: {titulo: "Curso completo de NodeJS"}})

Atualize todos os documentos cujo valor são iguais ou inferiores a 25.00 para o valor 27.00

    db.livros.updateMany({valor: {$lte: 25}}, {$set: {valor: 27}})

## Remove os seguintes documentos:

Remova o documento cujo autor é João

    db.livros.deleteOne({autor: "Joao"})

Remova todos os documentos cujo valor é superior a 280.00

    db.livros.deleteMany({valor: {$gt: 280}})

Remova todos os documentos cujo valor é inferior a 30.00

    db.livros.deleteMany({valor: {$lt: 30}})