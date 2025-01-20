---
title: "Caminhos Para Sua Primeira Biblioteca"
description: "Visões a respeito de bibliotecas e como elas podem nos inspirar."
date: "2024-09-22"
---

Olá caro leitor, primeiramente peço desculpas pelo atraso em criar mais um post, coisas da minha cabeça que poderiam ser resolvida com algo, e esse algo pode ter várias funcionalidades que fariam eu me animar para criar mais um post, e é com essa breve introdução que iremos debater a respeito de caminhos para criar sua primeira biblioteca em Java, afinal, talvez essas funcionalidades, possa ser usada em mais cabecinhas e quem sabe, ser útil para muitos outros desenvolvedores que, como eu, estão em busca de algo que nos inspire.
 
Uma biblioteca é nada mais nada menos que um código escrito por outra pessoa, seja por conta de uma necessidade que levou a pessoa escrever em seus projetos pessoais, ou até mesmo dentro de empresas onde tem um suporte, mas vamos focar na primeira opção, pois acredito que conseguimos fazer isso acontecer bem melhor.
 
Quando adicionamos ela como dependência ao nosso projeto, conseguimos acessos o que queremos acessar, exemplo, imagine que você precise criar um sistema de autenticação para seu projeto, você olha e pensa, pow, eu estou utilizando Java com Spring Boot, certamente já tem algo criado que possa me ajudar nessa jornada, como o Spring Security, adicionamos a dependência dele ao nosso projeto
```java
    <dependency>
      <groupId>org.springframework.security</groupId>
      <artifactId>spring-security-test</artifactId>
      <scope>test</scope>
    </dependency>
```

Exemplo de como podemos iniciar nosso sistema de autenticação. Aqui percebemos que o problema existe e mais desenvolvedores certamente vão ter esse problema e é resolvido com nossa dependência, onde torna mais fácil trabalhar com segurança do que propriamente escrever tudo do zero.

Quando adicionamos, ela em nosso projeto, percebemos que estamos utilizamos o Maven, para tornar o build possível e atualizar ela ao nosso projeto, e termos assim o acesso ao código da nossa dependência. 
 
Agora pensa comigo, quando você já tem o código pronto, na verdade, antes mesmo de ter o código pronto, supondo que esteja usando o Maven, no arquivo pom.xml, você irá ter algo como esse exemplo no início de seu projeto.

```java
  <groupId>com.example</groupId>
  <artifactId>demo</artifactId>
  <version>0.0.1-SNAPSHOT</version>
  <name>demo</name>
```

Aqui temos nosso ```groupID``` ``` artifactId``` versão e por aí vai, percebeu o que está acontecendo? Está mostrado o caminho de seu projeto, versão, atributos que é atribuído ao seu projeto.

Hoje, você vai dar início de sua primeira biblioteca, então, creio que não seja necessário inicialmente já publicar no repositório do Maven, você pode utilizar seu próprio repositório, pedir para o usuário clonar, e em seguida navegar até a pasta do projeto (Sua biblioteca) e rodar o 
```mvn clean install```  ao rodar, vai permitir o usuário a usar sua primeira biblioteca em seu projeto.

```java
  <groupId>com.example</groupId>
  <artifactId>demo</artifactId>
  <version>0.0.1-SNAPSHOT</version>
  <name>demo</name>
  <packaging>jar</packaging> // jar < ----
```
Ao acionar, a dependência, você poderá acessar o seu código em outros projetos e quem sabe outros desenvolvedores também, também tem a opção de publicar no próprio Maven, mas para isso, iniciaremos em outra hora.
 
A conclusão desse post não é para ser visto como a parte técnica, mas como nós desenvolvedores podemos nos comunicar com outros com base em nossos códigos, em como alguém pode utilizar nossas próprias coisinhas de problemas que tivemos em nossa jornada, em busca de nos inspirar e inspirar novos desenvolvedores a contribuir, seja uma coisa muito complicada ou algo mais simples, esteja pronto para receber colaboradores, pessoas que estão disposta a manter sua biblioteca, e claro, interaja com bibliotecas de terceiros, pode ser um caminho interessante para entender como o desenvolvedor resolveu aquele problema, compartilhar feadbacks, melhorias, bom.

Até mais.
