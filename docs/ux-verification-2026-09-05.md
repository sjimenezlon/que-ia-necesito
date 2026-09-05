# Verificación de la experiencia — 5 de septiembre de 2026

## Cambios

- Portada centrada en tareas con ejemplos interactivos y acceso al recomendador.
- Biblioteca de ocho ejemplos con contexto, audiencia, tono, vista previa, copiado y criterios de revisión. Los borradores se conservan en la pestaña con `sessionStorage`; no se envían a un modelo.
- Búsquedas y filtros en la URL para conservarlos al volver de una ficha. Filtros explícitos de precio y dificultad sin reemplazarlos silenciosamente cuando no hay coincidencias.
- Comparador visible, límite comunicado de tres herramientas y selección persistente. Favoritos visibles y accesibles desde el catálogo.
- Controles de teclado, foco visible, diálogo de filtros, contraste y reducción de movimiento. Prompt Lab se carga al abrir su ruta.

## Comprobaciones realizadas

- `npm run lint`: sin errores ni advertencias.
- `npm run build`: correcto. Permanece el aviso de tamaño del paquete principal; el catálogo completo se carga en el cliente.
- `git diff --check`: correcto.
- Integridad: los ocho ejemplos tienen identificadores únicos y todas sus herramientas existen en el catálogo.
- Navegador: selección de ejemplo desde la portada, edición de contexto y tono, copia real al portapapeles y restauración del ejemplo.
- Navegador: conservación del borrador al visitar una ficha y volver.
- Navegador: sugerencias mediante flecha y Enter; búsqueda conservada al volver de una ficha.
- Navegador: añadir tres herramientas, rechazo de una cuarta con explicación y persistencia al recargar.
- Navegador: favoritos, filtros combinados, estado vacío, limpieza y restauración al volver de una ficha.
- Móvil de 390 px: portada, ejemplos y tabla del comparador sin desbordamiento horizontal de la página; el carrusel y la tabla tienen desplazamiento propio.
- Móvil: filtros en diálogo, cierre con Escape y devolución del foco. Temas claro y oscuro.
- Navegador: carga de Prompt Lab y consola sin errores durante el recorrido probado.

## Alcance

Se conserva el catálogo editorial existente. Esta intervención no es una auditoría de la vigencia de cada precio, modelo o producto. La biblioteca prepara instrucciones; el visitante decide qué compartir con su herramienta de IA.

## Segunda iteración: dominio y recorrido de uso

- Dominio de referencia y enlaces compartidos: `https://queianecesitas.dev/`.
- Compartir ejemplo y ficha: copia verificada en el portapapeles con las rutas correctas. El enlace del ejemplo no incluye el borrador personalizado.
- Fichas con ejemplos relacionados y acceso al comparador. Los ejemplos incluyen enlaces para abrir la herramienta directamente.
- Lista de revisión con progreso; cambiar la instrucción reinicia los criterios marcados.
- Vista previa de redes en PNG de 1200 × 630, metadatos actualizados y sitemap con 141 rutas únicas.
- Verificación de móvil a 390 px sin desbordamiento de página y consola sin errores en el recorrido probado.
- Story promocional generada y guardada en `marketing/story-queianecesitas-v1.png`; prompt y uso del sticker Enlace documentados junto a ella.
