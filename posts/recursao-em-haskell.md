---
title: "A Recursão em Haskell, um novo mundo animalesco"
description: "Este é um exemplo de post com LaTeX."
date: "2025-01-20"
---

##  Entendendo a Base das Regras e a Magia da Recursão

Olá, caro leitor! Hoje trago uma reflexão que talvez você já tenha se deparado: por que algumas coisas são simplesmente definidas como "isso é isso", sem a necessidade de mais cálculos ou explicações? Um exemplo clássico disso está no fatorial de 0 ser igual a 1. Parece mágica, mas é pura matemática e lógica aplicada!
Vamos juntos explorar esse conceito e entender como a recursão aproveita essas regras básicas para simplificar a vida do desenvolvedor (e do matemático também, claro).
Por exemplo, se chamarmos a função com o valor 5, ela não vai diretamente ao *f(x) = algumacoisa*

## A Regra da Base

Quando passamos um valor que já temos como regra — como no caso do fatorial de 0 ser igual a 1 — não precisamos reinventar a roda ou criar cálculos desnecessários. Essa base é o ponto de partida da nossa função, o pilar que sustenta os resultados subsequentes.

Pense em um conceito básico de matemática, como *f(x)=algumacoisa*. Aqui, definimos que para *f(0)*, o resultado será 1. Simples assim!

Agora, imagine que temos uma função em uma linguagem de programação que recebe um *Int* e retorna um *Int*. Algo como:

```
fun(0) = 1  
fun(n) = n * fun(n - 1)
```

Essa é a nossa definição. Quando o parâmetro for 0, retornamos 1. E pronto, nossa base está resolvida.

## Como a Recursão Aproveita Isso

A mágica da recursão é que ela sabe onde parar. Assim que atingimos o cenário base — como *n=0* — toda a sequência é interrompida. Não há necessidade de continuar calculando algo que já foi definido como uma regra.
Por exemplo, se chamarmos a função com o valor 5, ela não vai diretamente ao n=0. Em vez disso, começa a calcular:

#### *fun(5)* = *5* *fun(4)*  
#### *fun(4)* = *4* *fun(3)*  
#### *fun(3)* = *3* *fun(2)*  
#### *fun(2)* = *2* *fun(1)*  
#### *fun(1)* = *1* *fun(0)*  
#### *fun(0)* = 1

No final, ela retorna todo o caminho de volta com os resultados: *5×4×3×2×1*

> Um bom jeito de pensar é em termos de reescritas  
> Você quer avaliar fact 5, então  
> fact 5 (aplica a regra. 5 = 0? Não, então...)  
> 5 * fact 4 (4 = 0? Não, então...)  
> 5 * 4 * fact 3 (3 != 0)  
> 5 * 4 * 3 * fact 2 (2 != 0)  
> 5 * 4 * 3 * 2 * fact 1 (1 != 0)  
> 5 * 4 * 3 * 2 * 1 * fact 0  
> 5 * 4 * 3 * 2 * 1 * 1  
> -Polvo

## Pattern Matching e Linguagens Funcionais

Se você já trabalhou com linguagens funcionais como Haskell, talvez tenha notado que esse padrão é chamado de pattern matching. É uma forma declarativa de definir as regras diretamente no código.
Por exemplo:

```
fun(0) = 1  
fun(n) = n * fun(n - 1)  
```

Aqui, a função entende que:
- Quando o valor é *0*, ela retorna *1 (regra base)*.
- Para qualquer outro valor *(n)* , ela calcula n *X fun(n-1)*

Simples, direto, elegante e matematicamente correto.

## Finalmente

A recursão não é apenas um conceito técnico ou uma curiosidade de linguagens de programação. Ela é uma ferramenta poderosa que se baseia em conceitos matemáticos para resolver problemas complexos de forma elegante e eficiente.