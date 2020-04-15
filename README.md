# Dia 07 - TypeScript

Data: Apr 14, 2020
Hora de início: 18:30
Hora de término: 22:00
Status: Finalizado

Hoje vou inciar o módulo de Typescript!

## Aulas

- [x] Por que Typescript ?
- [x] Configurando o projeto
- [x] Quando adicionar tipos
- [x] Tipando objetos e vetores

# Por que Typescript ?

O que é Typescript ?

Typescript é uma linguagem totalmente baseada em Javascript, ela utiliza o Javascript por baixo dos panos, mas ela adiciona algo á mais, a primeira coisa mais importante que o Typescript adiciona, são as tipagens, outra coisa que ele nos permite é utilizar as features mais recentes do Javascript independentemente de onde estamos executando nossa aplicação, funciona similar ao _babel_, nem Node, nem o Browser entendem Typescript;

```js
/**
 * Função que exibe os dados do usuário
 */

function displayUserInformation(user) {
  return `${user.name} - ${user.email}`;
}

export default displayUserInformation;
```

**Desafio:** Incluir a informação da cidade e UF do usuário nesse retorno.

- Qual o formato do objeto de usuário ?
- Utilizo `**user.city**` ou `**user.address.city**`?
- Será que a cidade e UF são obrigatórias ?

Se não utilizamos o Typescript, o IntelliSense não funciona;

## IntelliSense

O editor não conhece o formato da variável user e por isso, não consegue determinar suas propriedades.

![https://i.imgur.com/92DXzyf.png](https://i.imgur.com/92DXzyf.png)

Sem o typescript nosso editor não fica muito esperto, dificilmente ele vai entender a variáveis e saber qual é o seu formato.

Nesse caso o editor consegue saber exatamente os dados que um usuário pode ter e oferecer inteligência de IDE;

![https://i.imgur.com/XbnF0MP.png](https://i.imgur.com/XbnF0MP.png)

## Mitos e verdade

- Typescript diminui a produtividade ?
  - No incio da aprendizagem em relação ao Typescript é natural uma lentidão para a produtividade, pois o typescript impõe regras que você precisa obedecer, e se você está acostumado com tipagem dinâmica, pode sentir um pouco de dificuldade, mas depois de se acostumar com esses conceitos sua produtividade aumenta drasticamente.
- Typescript é transformar Javascript em Java ou C# ?
  - O typescript não é a mesma coisa que uma linguagem fortemente tipada, quando utilizamos esse conceito, utilizamos a tipagem é fraca, ou seja adicionamos tipagem em informações que o editor não consegue determinar o tipo de forma automática
- O mercado não usa Typescript
  - Mito, o typescript vem ganhado cada vez mais espaço no mercado, por causa de seus benefícios em relação a escalabilidade do projeto, e manutenibilidade.
- Typescript substitui o Javascript por completo
  - Mito, o typescript é totalmente baseado em Javascript.
- Typescript atrapalha quem é inciante

  - Isso é relativo, assim como eu disse no primeiro tópico, isso é totalmente momentâneo.
  - Ele ajuda quem é inciante, pois facilita a inteligencia do editor.

  ***

# Configurando o projeto

Inciando um projeto typescript

- Crie uma pasta
- Execute normalmente o `**yarn init**`;

        yarn init -y

Agora vamos instalar uma dependência que é necessária em todos os projetos typescript:

    yarn add typescript -D

Vamos criar um projetinho básico, então siga os próximos passos:

- Crie uma pasta `src`
- Crie um arquivo chamado `index.ts` dentro da pasta `src`
- Adicione o `express`.

        yarn add express

- Agora vamos instalar o pacote de declaração de Tipos do `express`;

        yarn add -D @types/express

Agora vamos editar o arquivo `index.ts`.

```ts
import express from "express";

const app = express();

app.get("/", (req, res) => {
  return res.json({ message: "Hello World" });
});

app.listen(3333);
```

Antes de executar é importante salientar que devemos inicializar o typescript no nosso código, para que ele seja convertido e entendido corretamente, execute o seguinte comando:

```bash
    yarn tsc --init
```

Ele automaticamente cria um arquivo `**tsconfig.json**`, agora podemos executar o seguinte comando:

```bash
    yarn tsc
```

Ele automaticamente vai encontrar os arquivos typescript e converter para Javascript, agora executando o comando abaixo podemos ver a aplicação funcionando:

```bash
    node src/index.js
```

Show !, agora vamos fazer uma configuração no arquivo `**tsconfig.json**`, descomente e modifique a seguinte instrução do arquivo `**tsconfig.json**`.

```json
{
  "outDir": "./dist"
}
```

Executando novamente o comando `**yarn tsc**`, ele automaticamente ele converte nosso código para a pasta que informamos nessa instrução do arquivo `**tsconfig.json**`.

---

# Quando adicionar tipos

Agora vamos entender quando nós devemos adicionar tipos na nossa aplicação, na grande maioria das vezes é muito fácil pra discernir, o Visual Studio code sempre vai nos avisar quando devemos adicionar tipagem.

Para vermos a definição de tipos na prática, vamos criar um arquivo chamado `**routes.ts**`, dentro desse arquivo é onde vamos expor nossa rota que se encontra dentro do arquivo `**index.ts**`.

```ts
// routes.ts
import { Request, Response } from "express";

export function helloWorld(req: Request, res: Response) {
  return res.json({ message: "Hello world" });
}
```

Toda vez que formos abstrair uma lógica neste caso, a lógica das rotas que recebe os parâmetros `Request`, `Response`, que estariam bem definidos dentro do escopo da importação da lib `express`, devemos importar os tipos para os parâmetros de uma determinada função que estamos abstraindo do contexto onde ela estaria bem definida, mas não se preocupe, basicamente toda vez que necessitarmos utilizar a tipagem o editor vai nos avisar, passando o mouse em cima da variável, se ele disser o tipo, show, ams se ele mostrar o tipo `**any**`, é melhor definir seu tipo;

---

# Tipando objetos e vetores

Agora, vamos entender como criar nossas próprias tipagens!

Para contextualizar vamos criar o seguinte cenário:

- Crie um serviço que cadastre um usuário

  - Crie uma pasta `**services**`, dentro de `**src**`:
  - Agora dentro dessa pasta `**services**`, vamos criar uma função que cria um usuário, crie um arquivo com o nome `**CreateUser.ts**`;
  - Essa função vai executar nossa regra de negócio, e retornara um resultado;

```ts
/** CreateUser.ts
      para criar um usuário: nome, email, senha
    **/
export default function createUser(nome, email, senha) {
  const user = {
    name,
    email,
    senha,
  };
  return user;
}
```

Estamos utilizando o `**export default**`, pois é uma boa prática todo `service`, exportar somente uma função;

Dado o Exemplo acima, existem algumas formas de definirmos o tipo de uma variável, a principio siga o exemplo abaixo:

```ts
// CreateUser.ts
/**
     para criar um usuário: nome, email, senha
    */
export default function createUser(nome = "", email: string, senha: string) {
  const user = {
    name,
    email,
    senha,
  };
  return user;
}
```

A primeira forma é setando seu valor, partindo do pressuposto que essa variável não é obrigatória, seguimos o exemplo da variável `name = ''`,agora, se a informação é obrigatória, seguimos o exemplo do `email: string`, além de `string`, temos vários outros tipos, como `number`, `boolean`, `object` e etc.

A partir deste momento o formato do retorno da função já está bem definido, dessa forma na hora que formos chamar a função em qualquer outro lugar do código, se por acaso esquecermos de algum argumento que essa função recebe o editor já vai reclamar e o IntelliSense já vai nos dizer o que está faltando.

A invocação dessa função ficará assim:

```ts
import createUser from "./services/CreateUser";

const user = createUser("Daniel", "danphp7@gmail.com", "12345678");
```

Outra coisa bem interessante é definir um nome para os parâmetros dessa função, vamos voltar com o exemplo anterior definindo nomes para os nosso parâmetros:

A invocação dessa função ficará assim:

```ts
// CreateUser.ts
/**
     para criar um usuário: nome, email, senha
    */
interface CreateUserData {
  name?: string;
  email: string;
  passoword: string;
}
export default function createUser({
  name = "",
  email,
  password,
}: CreateUserData) {
  const user = {
    name,
    email,
    senha,
  };
  return user;
}
```

Nossa função agora recebe um único objeto por parâmetro, e definimos o tipo de cada propriedade desse objeto em uma variável separada;

Aqui, desestruturamos nossos parâmetros, e definimos seus tipos na variável `interface`, observando essa `interface`, vemos algumas definições, a primeira é a definição de `name`, `name` é seguido de um `?`, esse `?` significa que esse parâmetro `name`, é opcional, logo após vem a definição do seu tipo, e assim por diante;

> A `**interface**` nada mais é do que uma forma de definir tipagem de uma conjunto de dados.

Agora, invocaremos essa função dessa forma aqui:

```ts
import createUser from "./services/CreateUser";

const user = createUser({
  name: "Daniel",
  email: "danphp7@gmail.com",
  password: "12345678",
});
```

Não mudou muita coisa, mudou que ela recebe somente um parâmetro, e ele é um objeto com o nome dos parâmetros.

Agora vamos ver como definir tipos pra vetores, vamos utilizar o mesmo exemplo acima.

Vamos supor que essa função `createUser`, receba mais um parâmetro `**techs**`, e esse parâmetro é um array, como definimos seu tipo ? segue o exemplo abaixo:

```ts
// CreateUser.ts
/**
     para criar um usuário: nome, email, senha
    */
interface CreateUserData {
  name?: string;
  email: string;
  passoword: string;
  techs: Array<string>;
}

export default function createUser({
  name = "",
  email,
  password,
  techs,
}: CreateUserData) {
  const user = {
    name,
    email,
    senha,
    techs,
  };
  return user;
}
```

Bem, definimos mais uma propriedade na nossa interface, e a gente disse que ela é do tipo `Array`, e esse `Array` é do tipo `string`, mas e se esse array for misto ? digamos que ele possa receber também um objetos como esse : `{ title: 'React', experience: 100 }`, como definimos um tipo pra esse conjunto de dados ? nós criamos outra `interface` e informamos que esse Array, alem de ter propriedades do tipo `string`, também tem propriedades do tipo `object` vamos lá:

```ts
// CreateUser.ts
/**
     para criar um usuário: nome, email, senha
    */
interface TechObj {
  title: string;
  experience: number;
}

interface CreateUserData {
  name?: string;
  email: string;
  passoword: string;
  techs: Array<string | TechObj>;
}

export default function createUser({
  name = "",
  email,
  password,
  techs,
}: CreateUserData) {
  const user = {
    name,
    email,
    senha,
    techs,
  };
  return user;
}
```

Complicado ? até que não, e assim podemos adicionar vários outros tipos de dados para vários outros parâmetros que por ventura virmos a receber.

Agora, nós podemos chamar a função `**createUser()**`, dessa forma:

```ts
import createUser from "./services/CreateUser";

// assim
const user = createUser({
  name: "Daniel",
  email: "danphp7@gmail.com",
  password: "12345678",
  techs: ["Nodejs", "React Native"],
});

// ou assim
const newUser = createUser({
  name: "Daniel",
  email: "danphp7@gmail.com",
  password: "12345678",
  techs: ["Nodejs", "React Native", { title: "React", experience: 100 }],
});
```

Show!!

Agora, se esse nosso `array` de `techs`, for receber somente `strings`, tem uma maneira muito mais simples de tipar isso:

```ts
// CreateUser.ts
/**
     para criar um usuário: nome, email, senha
    */

interface CreateUserData {
  name?: string;
  email: string;
  passoword: string;
  techs: string[];
}

export default function createUser({
  name = "",
  email,
  password,
}: CreateUserData) {
  const user = {
    name,
    email,
    senha,
  };
  return user;
}
```

Porém dessa forma só podemos invocar essa função dessa form:

```ts
import createUser from "./services/CreateUser";

const user = createUser({
  name: "Daniel",
  email: "danphp7@gmail.com",
  password: "12345678",
  techs: ["Nodejs", "React Native"],
});
```

Show Finalizamos o módulo de Typescript!!!
