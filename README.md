# SejaBestTeste

API construída em Node, Express e Typescript.

## Endpoints

## Persons

### GET `/persons`

Rota para listagem de pessoas, ou de uma unica pessoa especifico pelo id como query params.

/persons response:

```json
[
	{
		"id": "23414a81-e82f-4806-af3c-773131e77dd1",
		"name": "Fischer",
		"surname": "Fischer",
		"phone": null
	},
	{
		"id": "4d4d117b-cf1a-4446-a8d6-41397fd82144",
		"name": "Fischer",
		"surname": "Fischer",
		"phone": {
			"id": "53b01998-fcbe-449f-9039-200d5a230163",
			"code": "19",
			"number": "992866886",
			"cel": true
		}
	}
]
```

/persons?id=123 response:

```json
{
	"id": "23414a81-e82f-4806-af3c-773131e77dd1",
	"name": "Fischer",
	"surname": "Fischer",
	"phone": null
}
```

### POST `/persons`

Rota para criacao de pessoas, com ou sem a criacao de um telefone.

payload: 

```json
{
	"name": "Fischer",
	"surname": "Fischer"
}
```

response: 

```json
{
	"id": "23414a81-e82f-4806-af3c-773131e77dd1",
	"name": "Fischer",
	"surname": "Fischer",
	"phone": null
}
```

payload: 

```json
{
	"name": "Fischer",
	"surname": "Fischer",
	"phone": {
		"code": "19",
		"number": "992866886",
		"cel": true
	}
}
```

response: 

```json
{
	"id": "4d4d117b-cf1a-4446-a8d6-41397fd82144",
	"name": "Fischer",
	"surname": "Fischer",
	"phone": {
		"id": "53b01998-fcbe-449f-9039-200d5a230163",
		"code": "19",
		"number": "992866886",
		"cel": true
	}
}
```

### PUT `/persons`

Rota para atualizar/editar uma pessoa pelo id.

Caso nao seja encontrado nenhuma pessoa com esse id, sera retornado 404.

`/persons/:id`

E possivel enviar os atributos `name` e `surname`, porem ambos sao opcionais nessa requisicao.

`/persons/f81ae04e-0ed1-4ae9-88b3-89f367a021ff`

payload: 

```json
{
	"name": "Robson Henrique"
}
```

response: 

```json
{
	"id": "f81ae04e-0ed1-4ae9-88b3-89f367a021ff",
	"name": "Robson Henrique",
	"surname": "Fischer",
	"phone": null
}
```

### DELETE `/persons`

Rota para remover uma pessoa pelo id.

Caso nao seja encontrado nenhuma pessoa com esse id, sera retornado 404.

`/persons/:id`

`/persons/f81ae04e-0ed1-4ae9-88b3-89f367a021ff`

response: status 200


## Phones

### GET `/phones`

Rota para listagem de telefones, ou de um unico telefone especifico pelo id como query params.

/phones response:

```json
[
	{
		"id": "53b01998-fcbe-449f-9039-200d5a230163",
		"code": "19",
		"number": "992866886",
		"cel": true
	},
	{
		"id": "98325c39-1391-4d19-90e4-fd10e96dca53",
		"code": "19",
		"number": "992866886",
		"cel": true
	},
	{
		"id": "d00585eb-2b60-4e4d-9e7b-d720e3af730f",
		"code": "19",
		"number": "992866886",
		"cel": true
	},
]
```

/phones?id=53b01998-fcbe-449f-9039-200d5a230163 response:

```json
{
	"id": "53b01998-fcbe-449f-9039-200d5a230163",
	"code": "19",
	"number": "992866886",
	"cel": true
}
```


### POST `/phones`

Rota para criacao de telefones.

payload: 

```json
{
	"code": "19",
	"number": "992866886",
	"cel": true
}
```

response: 

```json
{
	"id": "aefac306-d9b6-44e4-937c-a12d486ae75f",
	"code": "19",
	"number": "992866886",
	"cel": true
}
```


### PUT `/phones`

Rota para atualizar/editar um telefone pelo id.

Caso nao seja encontrado nenhum telefone com esse id, sera retornado 404.

`/phones/:id`

E possivel enviar os atributos `code`, `number` e `cel`, porem os 3 sao opcionais nessa requisicao.

`/phones/aefac306-d9b6-44e4-937c-a12d486ae75f`

payload: 

```json
{
	"code": "18",
}
```

response: 

```json
{
	"id": "35e4520c-b281-41b4-b318-1420f8102bf6",
	"code": "18",
	"number": "992866886",
	"cel": true
}
```

### DELETE `/phones`

Rota para remover um telefone pelo id.

Caso nao seja encontrado nenhum telefone com esse id, sera retornado 404.

`/phones/:id`

`/phones/aefac306-d9b6-44e4-937c-a12d486ae75f`

response: status 200