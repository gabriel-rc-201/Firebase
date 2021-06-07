# Firebase

Apenas um projeto simples de firebase para aprender os principais conceitos a cerca dessa stack

a seguir temos alguns dos principais comandos:

## modificando dados do banco de dados

```javascript
// modificar valores no banco de dados do firebase

// Arrays
// Adicionar ao array
Estados: firebase.firestore.FieldValue.arrayUnion("Rio de Janeiro");
Estados: firebase.firestore.FieldValue.arrayUnion("São Paulo", "Minas Gerais", "Vitória");

// Remover do array
Estados: firebase.firestore.FieldValue.arrayRemove("Vitória");

// Números
Faltas: firebase.firestore.FieldValue.increment(1); // aumenta em um a quantidade de Faltas

```
