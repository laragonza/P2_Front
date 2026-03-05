P2


cd ~/Practica2_Front/Lara
npm install
PORT=3004 npm run dev

En el 3004 para evitar colisiones

La app quedará disponible en `http://localhost:3004`


En la página principal (/) aparece un listado de países.

Se puede buscar por nombre y filtrar por región.

Cada país sale en una tarjeta con su bandera, nombre y población.

Si haces clic en una tarjeta, te lleva a /country/[name], donde se ven los detalles del país: nombre oficial, capital, subregión, lenguajes, monedas, bandera y población.

También hay un botón para volver a la página principal.

Cómo funciona la app

El listado de países se carga en el cliente, así la búsqueda y los filtros funcionan al instante sin recargar la página.

La página de detalle del país se carga en el servidor, para que los datos aparezcan directamente cuando entras.

Tratamiento de datos

La API tiene datos anidados (como idiomas o monedas), así que se usan comprobaciones para evitar errores.
También se piden solo los campos necesarios a la API para que la respuesta sea más ligera.

Pruebas rápidas

Abrir http://localhost:3004.

Probar la búsqueda y el filtro por región.

Entrar en un país (por ejemplo Spain) y comprobar que salen sus datos.

Notas técnicas

Si Next.js da algún error al arrancar, normalmente se soluciona borrando la carpeta .next y reiniciando el proyecto.
