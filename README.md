## Prueba Técnica: API y Carrito de Compras

**Deploy:** [https://tiendaprueba-beta.vercel.app/](https://tiendaprueba-beta.vercel.app/)

Aplicación completa que implementa:

- Backend (API) con endpoints REST para `products` y `cart` (estado en memoria)
- Frontend en React + TypeScript que consume la API
- Lógica para encontrar la mejor combinación de productos que maximiza el valor sin exceder un presupuesto

## Instalación y Ejecución

Requisitos:

- Node.js 20+ y npm

Pasos:

```bash
npm install
npm run dev
```

La app se abrirá en `http://localhost:5173` (Vite). En desarrollo, las peticiones a `/api/*` se mockean con `axios-mock-adapter` para una experiencia local fluida. Puedes forzar los mocks con la variable `VITE_USE_MOCKS=true`.

Build y preview de producción:

```bash
npm run build
npm run preview
```

## API

Base URL (local con mocks): `http://localhost:5173/api`

- `GET /products`
  - Respuesta: lista estática de productos
  - Ejemplo de respuesta:
    ```json
    [
      { "id": 1, "name": "Producto 1", "price": 60 },
      { "id": 2, "name": "Producto 2", "price": 100 },
      { "id": 3, "name": "Producto 3", "price": 120 },
      { "id": 4, "name": "Producto 4", "price": 70 }
    ]
    ```

- `GET /cart`
  - Respuesta: items en el carrito (id, name, price, quantity)
  - Ejemplo: `[{ "id": 1, "name": "Producto 1", "price": 60, "quantity": 2 }]`

- `POST /cart`
  - Body: `{ "id": number }`
  - Acción: incrementa en 1 la cantidad del producto indicado

- `PATCH /cart` (extra)
  - Body: `{ "id": number, "quantity": number }`
  - Acción: fija la cantidad exacta (<= 0 elimina el ítem)

- `DELETE /cart` (extra)
  - Acción: vacía el carrito
  - Nota: en serverless real devuelve `204 No Content`; en mocks devuelve `200` con `[]`.

Ejemplos cURL (con Vite + mocks):

```bash
curl -s http://localhost:5173/api/products | jq
curl -s -X POST http://localhost:5173/api/cart -H 'Content-Type: application/json' -d '{"id":1}' | jq
curl -s http://localhost:5173/api/cart | jq
curl -s -X PATCH http://localhost:5173/api/cart -H 'Content-Type: application/json' -d '{"id":1, "quantity":3}' | jq
curl -i -X DELETE http://localhost:5173/api/cart
```

## Frontend

- Lista de productos con botón “Agregar al carrito”: `components/ProductList.tsx`
- Carrito de compras con cantidades y vaciado: `components/Cart.tsx`
- Consumo de API y estado:
  - `hooks/useProducts.ts`
  - `hooks/useCart.ts`

### SEO e Icono de pestaña

- Metadatos SEO y Open Graph en `index.html` (título, descripción, keywords, twitter/og, schema.org)
- Icono de pestaña actualizado: referencia a `public/favicon.svg` en `index.html`

## Lógica de Presupuesto

- Función: `utils/findBestCombination.ts`
  - Recibe `products: Product[]` y `budget: number`
  - Devuelve la combinación con mayor suma de `price` sin superar el presupuesto
- Hook: `hooks/useBudgetOptimizer.ts`
- UI: `components/BudgetOptimizer.tsx` + `components/BestCombinationList.tsx`

Ejemplo (budget = 150):

```json
[
  { "id": 1, "name": "Producto 1", "price": 60 },
  { "id": 4, "name": "Producto 4", "price": 70 }
]
```

Total: 130.

## Estructura Relevante

- `api/products.ts`: `GET /api/products`
- `api/cart.ts`: `GET|POST|PATCH|DELETE /api/cart`
- `api/shared.ts`: productos fijos y estado de carrito en memoria
- `services/api.ts`: cliente axios + mocks en desarrollo
- `App.tsx`: composición de página y secciones

## Notas Técnicas

- El carrito es in-memory. En entornos serverless puede reiniciarse entre invocaciones (esperado para esta prueba).
- En desarrollo, las rutas `/api/*` se mockean con `axios-mock-adapter` para no requerir backend real.

---

## Scripts

- `npm run dev`: entorno de desarrollo con Vite
- `npm run build`: build de producción
- `npm run preview`: servidor de preview de producción
- `npm run typecheck`: chequeo de tipos TypeScript
