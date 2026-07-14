# Simulador de Examen - Universidad Estatal Amazónica

SPA construida con React + Vite + Tailwind CSS. Exportable como sitio estático para GitHub Pages.

## Estructura de componentes

```
src/
├── App.jsx                     # Orquesta las 3 pantallas (welcome | quiz | results)
├── main.jsx                    # Punto de entrada
├── data/
│   └── preguntas.json          # Banco de preguntas (mock con 5 ejemplos)
├── hooks/
│   └── useQuizEngine.js        # Estado del examen: pregunta actual, temporizador, puntaje, respuestas
└── components/
    ├── WelcomeScreen.jsx       # Pantalla 1: nombre + botón iniciar
    ├── QuizScreen.jsx          # Pantalla 2: pregunta, opciones, feedback
    ├── ResultsScreen.jsx       # Pantalla 3: resumen y nota final
    ├── ProgressTimer.jsx       # Barra de progreso animada (30s)
    ├── OptionButton.jsx        # Botón de opción con estados default/correct/incorrect
    └── FeedbackCard.jsx        # Tarjeta "¡Correcto!" / "Incorrecto" + justificación
```

## Poblar el banco de preguntas

`src/data/preguntas.json` es un array de objetos con esta forma:

```json
{
  "id": 1,
  "categoria": "Razonamiento Lógico",
  "pregunta": "¿Qué número sigue en la serie: 2, 4, 8, 16, __?",
  "opciones": ["37", "64", "32", "34"],
  "respuestaCorrecta": "32",
  "justificacion": "La serie se forma multiplicando cada término anterior por 2."
}
```

Reemplaza el contenido del array con las 100 preguntas de `preguntas.md`. Notas importantes:

- `opciones` es un array de 4 strings (sin el prefijo "A)", "B)", etc. — las letras se generan automáticamente en la UI).
- `respuestaCorrecta` debe coincidir **exactamente** (carácter por carácter) con uno de los valores de `opciones`, ya que así se determina si la respuesta es correcta.
- El orden del array determina el orden de las preguntas en el examen.

> Si prefieres, puedo escribir un script que parsee automáticamente `preguntas.md` a este formato JSON — solo dímelo.

## Desarrollo

```bash
npm install
npm run dev
```

## Build para producción / GitHub Pages

```bash
npm run build
```

Esto genera la carpeta `dist/` con rutas relativas (`base: './'` en `vite.config.js`), lista para publicarse en cualquier subruta de GitHub Pages sin configuración adicional.

Para publicar:
1. Sube `dist/` a la rama `gh-pages` (manualmente o con la acción `peaceiris/actions-gh-pages`), o
2. Configura GitHub Pages para servir desde `dist/` en la rama `main` vía GitHub Actions.

## Lógica del examen

- Cada pregunta tiene un límite de **30 segundos**, visualizado con una barra que se vacía y cambia de color (verde → amarillo → rojo).
- Al seleccionar una opción o agotarse el tiempo, el temporizador se detiene y se muestra la retroalimentación (correcta en verde, incorrecta en rojo, justificación).
- El botón "Siguiente Pregunta" solo aparece tras responder.
- Cada acierto vale 10 puntos. La nota final es sobre 1000 puntos (100 preguntas × 10 pts).
- Los resultados distinguen: aciertos, fallos (opción incorrecta elegida) y preguntas sin responder (por tiempo agotado).
