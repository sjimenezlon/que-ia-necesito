# Edición del 8 de octubre de 2026

## Aprendizaje y PyMEs

- `/aprender`: cuatro lecciones con un caso continuo, comparación de instrucciones, preguntas con retroalimentación y progreso local.
- `/pymes`: seis talleres de ventas, atención, marketing, inventario, caja y procesos. Cada taller tiene datos ficticios editables, un prompt, una referencia del caso original, tres criterios y una pregunta de comprensión.
- El cierre de un taller requiere las tres comprobaciones y la respuesta correcta. Cambiar sus datos u objetivo invalida el cierre previo. El texto explica que la referencia no valida los datos editados.
- Perfil de sector y tamaño de equipo, filtros por área, enlaces por `?caso=`, borradores y progreso en el navegador; sin envío de estos campos a un servidor.
- Plan de siete días y estimación de capacidad en cuatro semanas, con tiempo de revisión incluido. Se distingue expresamente el valor del tiempo del ahorro de efectivo. Descarga TXT y vista del plan para copiar.
- Accesos visibles desde Inicio y navegación, menú compacto de recursos, estilos adaptables a móvil y modo oscuro.

## Revisión editorial

Revisión focalizada, no auditoría completa de las 131 herramientas. Se actualizaron las fichas de ChatGPT, Claude y Make, el panorama de Prompt Lab y las novedades destacadas de Inicio/PyMEs. Los otros capítulos conservan su fecha de revisión individual.

Fuentes primarias consultadas:

- OpenAI, [notas de ChatGPT](https://help.openai.com/en/articles/6825453-chatgpt-release-notes): audio del 6 de octubre, GPT-6 e Intelligent UI del 7–8 de octubre, disponibilidad por plan y despliegue progresivo.
- OpenAI, [planes](https://chatgpt.com/pricing/).
- Anthropic, [Haiku 5.5](https://www.anthropic.com/claude-haiku-5-5), 7 de octubre, y [modelos vigentes](https://platform.claude.com/docs/en/models/overview).
- Google, [notas de Gemini](https://gemini.google/us/release-notes/?hl=en): skills del 30 de septiembre, revisadas el 8 de octubre. No se presenta como lanzamiento de octubre.
- Make, [planes](https://www.make.com/en/pricing) y [créditos de agentes](https://help.make.com/credit-usage-for-ai-agents).

## Comprobaciones

- `npm run lint`, `npm run build` y `git diff --check`: correctos. Vite conserva una advertencia sobre el tamaño del paquete principal; no se modificó la arquitectura del catálogo.
- Navegador: taller de ventas completo, respuesta incorrecta/correcta, perfil incluido en el prompt, copia confirmada, progreso tras recargar, filtro Operaciones (dos casos), cierre bloqueado antes de comprobar y cuatro lecciones de aprendizaje completas.
- Vistas de 390 px y 1440 px sin desbordamiento horizontal; navegación móvil y tema oscuro revisados.
- Cálculo: ejemplo base (10 horas; COP 120.000 de capacidad neta), pérdida de tiempo, cero casos, campos vacíos/negativos/no numéricos/infinito y desbordamiento numérico.
- Almacenamiento ausente: el lector retorna el estado inicial. Estructura, identificadores y respuestas de los seis talleres comprobados.
- El navegador integrado no notificó el evento de descarga de Blob; no se afirma una descarga de archivo verificada desde ese navegador. El plan tiene una alternativa visible y copiable.

## Publicación

Proyecto Vercel verificado: `prj_W3Rd0PZaQLubj6mCgs28LzM9paQa`, equipo `team_sQkaUtZ3Gc302pX42lWe8oDK`. La publicación de producción actualizó el dominio principal `queianecesitas.dev`; el alias histórico `que-ia-necesito.vercel.app` se comprueba por separado.
