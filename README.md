# Firebase

Apenas um projeto simples de firebase para aprender os principais conceitos a cerca dessa stack

a seguir temos alguns dos principais comandos:

## Modificando dados do banco de dados

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

## Resgatando dados do banco de dados

```javascript
// pegar dados do banco
let db = firebase.firestore();

// pega os dados e faz alguma coisa com eles
db.collection("NomeDaCollection").where("notas.nota1", ">", 5).get()
	.then((snapshot) => {
		snapshot.forEach((doc) => {
			let aluno = doc.data();
			console.log(aluno)
		})
	})

// para ficar vigiando em tempo real as mudanças no banco
db.collection("NomeDaCollection").where("notas.nota1", ">", 5).onSnapshot(
	snapshot.forEach((doc) => {
		let aluno = doc.data();
		console.log(aluno);
	});
)
```
## Deletar os dados

```javascript
// deletear algum campo

	cidades: firebase.firestore.FieldValue.delete();

// deletar um documento completo

db.collection("NomeDaCollection").doc("id do documento").delete().then()
```

para deletar todos os documentos de uma collection tem que selecionar um de cada vez e ir deletando (usa um for seleciona o id e vai deletando) 

## Criar usuário

```javascript
function criarUsuario() {
  let newUserEmail = "novoteste@teste.com";
  let newUserPassword = "123123";

    auth
    .createUserWithEmailAndPassword(newUserEmail, newUserPassword)
    .then((user) => {
      console.log(user);
    })
    .catch((err) => {
      console.log(err);
    });
}
```

## Login 
```javascript
function login() {
  let userEmail = "novoteste@teste.com";
  let oserPassword = "123123";

  auth
    .signInWithEmailAndPassword(userEmail, oserPassword)
    .then((loggedUser) => {
      console.log(loggedUser);
    })
    .catch((err) => {
      console.log(err);
    });
}
```
## Vigiar estado do usuário
```javascript
auth.onAuthStateChanged((user) => {
  if (user) {
    console.log(user);
  } else {
    console.log("Ninguem logado");
  }
});
```
## Logout
```javascript
function logout() {
  auth
    .signOut()
    .then(() => {
      console.log("usuario deslogado");
    })
    .catch((err) => {
      console.log(err);
    });
}
```

## Regras do banco de dados
algumas regras comuns:

### Somente Usuários autenticados podem ler ou modificar:
```jsx
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```
### Somente os donos do conteúdo podem ler ou modificar:

```jsx
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow only authenticated content owners access
    match /some_collection/{userId}/{documents=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId
    }
  }
}
```
### Todos podem ler mas apenas os donos do conteúdo podem modificar:

```jsx
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow public read access, but only content owners can write
    match /some_collection/{document} {
      allow read: if true
      allow create: if request.auth.uid == request.resource.data.author_uid;
      allow update, delete: if request.auth.uid == resource.data.author_uid;
    }
  }
}
```

### Permissão baseada no papel do usuário:

```jsx
service cloud.firestore {
  match /databases/{database}/documents {
    // For attribute-based access control, Check a boolean `admin` attribute
    allow write: if get(/databases/$(database)/documents/users/$(request.auth.uid)).data.admin == true;
    allow read: true;

    // Alterntatively, for role-based access, assign specific roles to users
    match /some_collection/{document} {
     allow read: if get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == "Reader"
     allow write: if get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == "Writer"
   }
  }
}
```
