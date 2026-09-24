# Actualización editorial — 24 de septiembre de 2026

## Alcance

Revisión de la ventana **17 → 24 de septiembre de 2026** y capítulo nuevo **«IA para jóvenes investigadores»** (`/investigadores`). El catálogo sigue en **131 herramientas**; se revisaron **34 fichas** (llevan `releaseReview` del 24 de septiembre). Verificación por cuatro barridos web paralelos (occidente, Asia, creativas/código/negocios, investigación académica), con HECHO separado de ANUNCIO.

## Frontera occidental

- **Claude Opus 5.5** (22-sep): $4/$20, 1M de contexto, 128K de salida; modelo por defecto en la app y en Claude Code 2.1.280, donde Pro y Team Standard pasan de Sonnet a Opus. Sonnet 5.5 y Haiku 5.5 anunciados «en semanas», sin fecha. Claude Marketplace (23-sep).
- **GPT-6 Sol ($2/$10) y Luna ($0,10/$0,50)** (22-sep): solo en ChatGPT Work y Codex, **no en el modo Chat**; Free y Go tienen Luna en la app de escritorio. GPT-5.5 sigue saliendo el 14-oct.
- **Gemini 3.5 Pro aparcado**: Google dice que Gemini 4 está en post-entrenamiento, sin fecha.
- **Grok 4.7 salió** (21-sep) al mismo precio del 4.6. El 4.8 es solo una declaración de Musk.
- Copilot (M365 y GitHub), Perplexity, Poe, Cursor, Devin, Lovable, Runway, Pika, ElevenLabs, HubSpot (UNBOUND), Salesforce (Dreamforce), Notion (cierre de Notion Mail) y Suno (nueva demanda de Universal y Sony) actualizados.
- **Sora**: la API se apagó el 24-sep según la página oficial de deprecaciones; la ficha queda en pasado.

## Asia

Radar de `/asia` reconstruido (siguen siendo **diez** tarjetas): MiMo-V2.6 de Xiaomi (≈1 billón, MIT), Xing4.0 de China Telecom, Solar Mini 4 de Upstage, Step 5 Preview, Qwen-Image-2.1 (licencia de solo investigación), Qwen3.8-Omni-Flash y LiveTranslate, Nemotron-SEA-LION-v4.8, Kimi para finanzas, Vidu S2 y DeepSeek V4.1-Flash. Hallazgo de la semana: el regulador chino (CAC) abrió el 22-sep una investigación a DeepSeek y Moonshot por seguridad de datos.

## Correcciones a la edición del 17 de septiembre

- **DeepSeek V4.1-Flash no subió de precio**: el registro oficial dice que con su lanzamiento «los precios de la API se redujeron». La subida fuerte fue la de V4-Pro en agosto. Corregidos la ficha, la tarjeta del capítulo, la FUERZA 02 y la métrica del héroe.
- **Hy4 «ligero de 214 GB»**: no aparece en la ficha oficial de Hugging Face (solo una versión FP8, con despliegue recomendado en ocho GPU). Se retiró de la ficha, de la tarjeta, de la FUERZA 01 y de la métrica del héroe.

## Capítulo nuevo: `/investigadores`

`src/pages/Investigadores.jsx` + datos en `src/data/researchers.js`. Secciones: principios, matriz qué delegar, herramientas por momento de la investigación (siete momentos con prompt, trampa, fichas del catálogo y herramientas externas), kit gratuito filtrable, semáforo de Springer Nature y tabla de políticas por editorial, **generador de la declaración de uso de IA** (español/inglés, fórmula de Elsevier) con formatos APA 7, revisión por pares, contexto colombiano (Ley 1581, Resolución 8430, CONPES 4144, convocatorias de Minciencias, Publindex, CvLAC), riesgos con evidencia, prompts, lista de verificación antes de enviar y tres citas verificadas de *Algoritmos Deshumanizantes* (pp. 22, 141 y 146).

Enlazado en el menú, en la portada (tercera tarjeta de capítulos), en Acerca de y en `sitemap.xml`. Fichas de investigación con precios verificados: consensus, scispace, research-rabbit, connected-papers, humata, julius, notebooklm y semantic-scholar.

## No verificado (no se afirma en el sitio)

Políticas de IA de universidades colombianas (UNAL, UdeA, EAFIT, Andes, Javeriana); una guía de Minciencias sobre IA generativa en investigación (no se encontró); Circular 002 de 2024 de la SIC; cupos exactos de investigación profunda de ChatGPT, Gemini y Perplexity; límites gratuitos de Consensus, Undermind, Paperpal y ChatPDF; el caso de «Certainly, here is…» en un artículo de Elsevier (se usó el de «Regenerate response», verificado en Nature).

## Validación

`npm run build` y `npm run lint` sin errores. Revisado en escritorio (1440 y 1280 px) y en móvil (390 px con Playwright, sin desborde horizontal).

## Segunda pasada (24 de septiembre, tarde): verificación y ampliación de `/investigadores`

**Nuevas secciones:** «Lo que hoy sí puedes hacer» (seis posibilidades, cada una con su contrapeso de responsabilidad), «Seis investigaciones, de la pregunta a la declaración» (ejemplos ilustrativos por disciplina: salud pública, ingeniería ambiental, educación, historia, economía y biología), «¿Qué harías?» (cinco dilemas éticos interactivos y seis preguntas para el semillero) y «Tu espacio de trabajo» (`src/components/ResearchWorkspace.jsx`: bitácora de uso de IA, reflexiones y compromiso de uso responsable; todo en `localStorage`, descargable en Markdown).

**Verificación afirmación por afirmación** contra fuente primaria (Europe PMC, web.archive.org y Chrome para páginas bloqueadas). Confirmados los estudios (Walters y Wilder, Chelli, Liang, Kobak, Chen), las políticas editoriales, la APA y todo lo de Colombia. Corregido:
- NIH NOT-OD-23-149 aplica a la evaluación de **propuestas de financiación**, no de manuscritos.
- OpenAlex: la API **no exige llave** para consultas básicas; con llave gratuita, USD 1 al día. Se retiró la fecha de febrero de 2026, que no aparece en fuentes oficiales.
- Zotero 10 no introdujo el aviso de retractaciones (existe desde hace años).
- Consensus gratis: búsqueda básica sin análisis de IA, 10 mensajes Pro y hasta 3 revisiones profundas al mes (también en la ficha).
- ATLAS.ti: no se encontró un «modo privacidad»; sí que la IA se activa a pedido y que no entrena con tus datos.
- NVivo: su autocodificación no es IA. Springer Nature: el rojo es «imágenes fotorrealistas falsas (deepfakes)». Colab: el límite de edad es del agente, no de Colab. Asta, Litmaps y MAXQDA con precisiones; Ley 1581 art. 26 matizado; precio de Paperpal retirado (no verificable).
