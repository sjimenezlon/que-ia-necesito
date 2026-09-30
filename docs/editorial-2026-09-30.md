# Actualización editorial — 30 de septiembre de 2026

## Alcance

Revisión de la ventana **24 → 30 de septiembre de 2026**, centrada en los **modelos** de IA. El catálogo sigue en **131 herramientas**; **46 fichas** llevan `releaseReview` del 30 de septiembre (30 con cambios de texto, 16 revisadas sin novedad). Verificación por tres barridos web paralelos (frontera occidental, Asia, creativas y código), con HECHO separado de ANUNCIO, y cruce de las cifras clave contra la fuente primaria antes de publicar.

## Frontera occidental

- **Claude Sonnet 5.5** (28-sep): $2/$10 por millón de tokens (caché $0,20), 1M de contexto, 128K de salida; «30 %+ más rápido» y «hasta 30 % más barato por tarea» que Sonnet 5; primer Sonnet con retroceso visible a Sonnet 5 en tareas de ciberseguridad de alto riesgo. Sonnet por defecto en Claude Code desde 2.1.284; en GitHub Copilot (desde Pro), Cursor, Perplexity API, Vercel AI Gateway y OpenRouter. Haiku 5.5 sigue «en las próximas semanas». **Sonnet 4.5 deprecado el 30-sep** (retiro de la API el 30-nov-2026). Portal de envío de plugins al directorio de Claude (25-sep, planes de pago).
- **GPT-6.1 Sol** (29-sep, DevDay): $2/$10 por API, entrada cacheada $0,10, «cerca de Astra a una quinta parte del precio», nivel «Critical» en ciberseguridad; solo en ChatGPT Work y Codex para Plus, Pro, Business, Enterprise y Edu, **no en el modo Chat**; modelo por defecto en Codex CLI 0.159.1; en GitHub Copilot desde Pro+. También «dots» (agentes siempre activos para Pro y Business Premium) y nivel Ultrafast de GPT-6 Astra ($60/$300 por API). GPT-5.5 sigue saliendo el 14-oct. La cancelación de un «GPT-6.1 Astra» es reporte del WSJ, sin confirmación oficial.
- **Gemini 4 Argon** (30-sep): anunciado con salida de 1M de tokens y precio de USD 2/10 (introductorio) y 4/20 (estándar), pero solo para defensores del programa Fairwind; después API de pago y AI Ultra, sin fecha; no aparece en la página de precios de la API. Gemini 3.5 Pro queda como cancelado. En la app, las **Skills reemplazan a los Gems** (30-sep).
- **Microsoft «nuevo Copilot»** (25-sep): Home, Code y Autopilot; Frontier «en las próximas semanas», Autopilot en vista previa privada; chat por puesto y trabajo agéntico por uso.
- **GitHub Copilot**: Sonnet 5.5 (28), GPT-6.1 Sol (29), HydraFusion en vista previa (30); activación por defecto de funciones GA en Business y Enterprise desde el 22-oct. **Kiro**: Opus 5.5 (28-sep, 2,0× créditos) y flujos de trabajo multiagente (30-sep). **Perplexity API**: Sonnet 5.5 y GPT-6.1 Sol; retiro de GPT-5.4 y anteriores el 24-oct. **Meta**: la ficha estaba atrasada, Muse Spark 1.3 es del 2-sep (pesos de Spark siguen sin publicarse). **Mistral**: sin modelo nuevo; hub en Múnich (28-sep); OCR 4.0 retirado el 30-sep. **Grok 4.8** sigue sin salir. **Cursor**: Sonnet 5.5 en el selector; su catálogo de OpenAI llega hasta GPT-5.6, sin GPT-6. **Devin**: 1.000 M USD de ingresos anualizados (25-sep). **Antigravity** 2.18.1 con catálogo de complementos; la vista previa de mayo se apaga el 5-oct.

## Asia

Semana **sin modelo nuevo de los grandes** (DeepSeek, Qwen, GLM, Kimi, ByteDance, Baidu, StepFun, LongCat), verificado en changelogs y en Hugging Face por fecha. Radar de `/asia` reconstruido (siguen siendo **diez** tarjetas): entran **MiMo-V2.6 Pro y Flash MOPD** de Xiaomi (27-sep, MIT, corrige la repetición de llamadas a herramientas), **M3.1-Flash-Preview** de MiniMax (27-sep, solo dentro de MiniMax Code, sin ficha ni precio ni pesos), **Sarvam Vision 2.1** (India, 24-sep, OCR en 22 lenguas, solo API) y **Yuanbao para HarmonyOS** con Hy4 preview de serie (24-sep); salen Nemotron-SEA-LION-v4.8, Kimi para finanzas, Vidu S2 y DeepSeek V4.1-Flash (todas siguen en sus fichas). Métrica nueva del héroe: **dos laboratorios de EE.UU. acusan a Moonshot de destilación** (Anthropic 10-sep, OpenAI 30-sep) con la investigación del CAC aún abierta. Corregido en `qwen` y en la tarjeta del radar: Apsara se anunció el **22** de septiembre (no «22–24»), y el desglose de Qwen4 en Max/Plus/Flash/27B es de prensa, no del comunicado; sumados Qwen4.5/Qwen5 (5–10 billones) y Qwen-Image 3.1 (fin de año) como ANUNCIO.

## Creativas

- **ElevenLabs Eleven v4 y v4 Turbo** (28-sep): más de 90 idiomas, clonación instantánea con 10 s de audio, ~150 ms en Turbo, etiquetas de actuación en el texto; 3× créditos en Creator+ hasta el 12-oct. Valoración de 22.000 M USD (30-sep).
- **Ideogram 4.5** (30-sep): modelo de edición multi-turno sin acumulación de artefactos; app, API y socios; pesos «pronto». Sin precio en la página oficial. La ficha suma que Ideogram 4.0 (junio) tiene pesos Apache 2.0.
- **Midjourney** (24-sep): el editor solo toca los píxeles seleccionados; vistas previas de estilos; sigue V8.2. **Recraft V4.1 Flash** (23-sep, 1,3 s de mediana). **HeyGen** estaba en Avatar IV: la generación vigente es Avatar V (8-abr-2026). **Lovable**: fecha real del chat gratis (24-sep) y apps dentro del tenant de Microsoft (28-sep). **Bolt**: usa proyectos y chats para entrenar, activado por defecto fuera de UE/UK/Suiza, contenido desde el 7-oct. **Replit** compró Atta (25-sep). **GPT Image**: gpt-image-1-mini y 1.5 se apagan el 1-dic.

## Correcciones a ediciones anteriores

- `meta-ai` decía «Muse Spark 1.2» como último modelo: Spark 1.3 salió el 2 de septiembre.
- `heygen` decía «Avatar IV»: Avatar V es de abril.
- `deepseek` y `kimi` traían pasos de inicio con nombres viejos («DeepThink (R1)», «modo K2.6»); `qwen`, «Qwen3-Max / Qwen3-Coder».
- Cifras de Hugging Face que **no** hay que copiar: la insignia «763B» de DeepSeek-V4.1-Flash (oficial: 552.000 millones de backbone) y «1.8T» de LongCat-2.0 (oficial: 1,6 billones).

## No verificado (no se afirma en el sitio)

Si el plan Free de claude.ai sirve exactamente Sonnet 5.5 (la página de precios solo nombra la familia «Sonnet»); cambios del plan Pro de ChatGPT (20×→10×, «Pro 500», solo en BGR); planes SuperGrok; Sonnet 5.5 o GPT-6.1 Sol en Microsoft 365 Copilot y en Poe; contexto de entrada de Gemini 4 Argon; Kimi K3.1 (solo un identificador en la API, TechNode 29-sep); modalidad, tamaño y precio de M3.1-Flash-Preview; precio por imagen de Ideogram 4.5; plan gratuito de Recraft (30 generaciones/día según su blog frente a 50 créditos/día en la ficha); Udio «v4»; respuesta de Moonshot a OpenAI; cuota de modelos chinos en OpenRouter (CNBC 26-sep, 403).

## Sellos de fecha movidos al 30 de septiembre

Footer, Acerca de (×2), Prompt Lab (`UPDATED_AT` + `MODEL_SNAPSHOT` reescrito con Sonnet 5.5, GPT-6.1 Sol, Gemini 4 Argon, Grok 4.7, MiMo MOPD y DeepSeek V4.1-Flash) y los tres sellos de `/asia`. Se dejan a propósito: `/investigadores` (24-sep, no se re-verificó) y `/sector-publico` (5-sep).

## Validación

`npm run build` y `npm run lint` sin errores (ver commit).
