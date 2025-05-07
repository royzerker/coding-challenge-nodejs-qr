# API 1 - Factorización QR

Esta API recibe una matriz numérica (array de arrays), realiza su **factorización QR** y envía las matrices resultantes (`Q` y `R`) a una segunda API para el cálculo de estadísticas.

## 🚀 Funcionalidades

- Recibir una matriz numérica de entrada.
- Calcular su **factorización QR** (implementada manualmente o con librerías si se requiere).
- Enviar las matrices resultantes `Q` y `R` a otra API vía HTTP.
- Retornar al cliente la factorización junto con las estadísticas calculadas.

## 🛠️ Tecnologías utilizadas

- Node.js
- Express.js
- Axios (para comunicar APIs)
- dotenv (para variables de entorno)
- Logger (console o personalizado)

## 📌 Endpoint

### `POST /factorize`

#### Descripción

Realiza la factorización QR de la matriz enviada.

#### Request Body

```json
{
	"matrix": [
		[1, 2],
		[3, 4],
		[5, 6]
	]
}
```

### Variables de entorno

- PORT=8000
- STATS_API_URL=http://localhost:8000/stats
- JWT_SECRET=your_jwt_secret
- JWT_EXPIRES_IN=1h
