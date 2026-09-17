# Actualización editorial — 17 de septiembre de 2026

## Alcance

Revisión de modelos y herramientas sobre la ventana del **1 al 17 de septiembre de 2026**, continuando la revisión puntual del 14 de septiembre (que solo cubrió ChatGPT y Gemini). Se mantienen las **131 herramientas** del catálogo: ninguna se añadió ni se eliminó. Se revisaron y actualizaron **61 fichas**, cada una con su marca de «novedades revisadas» y enlaces a fuentes oficiales; las fichas no revisadas no llevan esa marca.

Verificación hecha por cuatro barridos web paralelos (laboratorios occidentales, IA asiática, herramientas creativas, y código/productividad/negocios), con la regla de separar hecho publicado de anuncio o rumor. Lo que no se pudo verificar en fuente accesible **no se tocó** (ver «Pendientes»).

## Lo que cambió en el catálogo

**Frontera occidental.** Anthropic fusionó Cowork con el chat el 16 de septiembre y estrenó Claude Docs y Slides en beta; no hubo modelo nuevo después de Fable 5.1. De GPT-6 Astra se precisó lo que faltaba: precio ($10/$50 por millón), contexto (1,05 M) y, sobre todo, **quién lo tiene** —en el chat solo Pro, Business y Enterprise; Plus únicamente en Work y Codex; Free y Go no—, más el retiro de GPT-5.5 el 14 de octubre. Gemini sumó app de Windows y modelo de voz 3.8 Live, y se dejó dicho que **Gemini 3.5 Pro sigue sin salir**. Grok 4.7 **no existe**: se anunció, se aplazó dos veces y su propio fundador ya habla de un 4.8. Microsoft Copilot y GitHub Copilot quedaron descritos como lo que son hoy, selectores multimodelo.

**Errores duros corregidos.** `claude-code` decía «familia Claude 4.x»; `openai-codex` decía «impulsado por GPT-5.5»; `antigravity` ofrecía «Gemini 3.5 Flash» en su plan gratis. Los tres estaban equivocados.

**Renombres y dueños.** Windsurf → **Devin Desktop**; NotebookLM → **Gemini Notebook**; Grammarly → módulo de **Superhuman**; Freepik AI → **Magnific**; Luma Dream Machine → **Luma**; Canva Magic Studio → **Canva AI 2.0**; Intuit Assist → **Intuit Intelligence**; BloombergGPT → **ASKB**; Copy.ai pasó a Fullcast y eliminó su plan gratuito.

**Fechas de cierre, que es lo que un lector necesita saber antes de montar algo encima.** La API de Sora se apaga el **24 de septiembre de 2026** sin sucesor; **remove.bg cierra el 1 de diciembre** (usuarios a Canva, API a Leonardo, créditos vencidos ese día); `gpt-image-1` se apaga el 23 de octubre; OpenAI propuso —no confirmó— cortarle sus modelos a Cursor el 12 de noviembre.

**Lo gratis que dejó de serlo.** ResearchRabbit ya cobra, Lindy y Copy.ai se quedaron sin plan gratuito, PhotoRoom eliminó el suyo, Suno ya no permite descargar en el plan libre y Duolingo Max está siendo retirado para nuevos suscriptores (Video Call bajó a Super; «Explain My Answer» sí es gratis).

**Asia.** DeepSeek publicó **V4.1-Flash** con pesos MIT… y **subió el piso de precio del mercado** (de $0,14/$0,28 a $0,30/$1,20 en hora pico): la primera vez en dos años que el relato de «cada mes más barato» se rompe. Z.ai publicó los pesos de GLM-5.3 el 28 de agosto pero **cambió la licencia** (ya no es MIT). Tencent comprimió Hy4 de 1,5 TB a **214 GB**, con Apache 2.0, y con eso un modelo de 770.000 millones de parámetros deja de exigir centro de datos. **QwenWork abrió edición internacional con América Latina como mercado objetivo**, lo que invalida la advertencia anterior del capítulo. Vidu estrenó video interactivo en tiempo real. Manus volvió a ser independiente tras el veto chino a su compra por Meta.

## Qué se editó en el sitio

- `src/data/tools.json`: 61 fichas revisadas (texto, precios, pros/contras, primeros pasos y campo `releaseReview` con fuentes).
- `src/pages/HerramientasAsiaticas.jsx`: sellos movidos al 17 de septiembre; radar reconstruido (siguen siendo **diez** tarjetas: salieron las de julio y comienzos de agosto, entraron Vidu S2, DeepSeek V4.1-Flash, Qwen3.8-Max-0902, Hy4 ligero y los pesos de GLM-5.3); fuerzas 01 y 02 reescritas (tres regímenes de apertura; el piso de precio que sube); cuarta advertencia actualizada; tarjetas de DeepSeek, Qwen, Kimi, GLM, Doubao, Hunyuan, Trae, QwenWork, Manus y Vidu al día.
- `src/pages/PromptRefiner.jsx` y `ConstraintsStep.jsx`: fecha, panorama de modelos y lista de destinos.
- `src/components/Footer.jsx`, `src/pages/About.jsx`: sellos de fecha.

## Validación

- `npm run build`: correcto (persiste el aviso preexistente de tamaño del paquete).
- `npm run lint`: sin errores.
- Recuento de fichas sin cambios: 131.

## Pendientes declarados (no se tocaron por falta de fuente verificable)

Perplexity y Poe (sitios con 403 al lector automático), Gamma, Udio, Ideogram (precios), DeepL (tarifas), Wolfram, y el grupo julius · obviously-ai · polymer · connected-papers · consensus · scispace · pdf-ai · humata · chatpdf · fireflies · quillbot · rytr · danelfin · kensho · copilot-finance · adcreative · Fiscal.ai. También quedó fuera lo anunciado en el evento UNBOUND de HubSpot (16–18 de septiembre), que termina después de este corte.

`SectorPublico.jsx` conserva su propia fecha de revisión (5 de septiembre de 2026): su contenido son casos verificados del Estado colombiano y re-verificarlos es otro trabajo.
