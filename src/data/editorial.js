export const EDITION = { iso: '2026-11-03', label: '3 de noviembre de 2026' }

export const updates = [
  {
    title: 'Gemini 4 Argon cuesta el doble en la API desde el 1 de diciembre',
    date: '2 nov',
    body: 'Google confirmó que Gemini 4 Argon pasa de USD 2 a 4 por millón de tokens de entrada y de 10 a 20 de salida el 1 de diciembre. Ese mismo día, las llamadas a Gemini 2.5 Pro y 2.5 Flash, ya retirados de AI Studio, pasan solas a Gemini 3.8 Flash y 3.5 Flash-Lite y se cobran a esas tarifas. Y en la app, desde el 13 de noviembre, el plan Google AI Plus deja de incluir los modelos Pro. Si tienes una automatización sobre la API, revisa este mes qué modelo llamas y cuánto te va a costar.',
    url: 'https://aistudio.google.com/docs/pricing',
    source: 'Google AI Studio · precios',
  },
  {
    title: 'DeepSeek abre un agente que responde con pull requests',
    date: '31 oct',
    body: 'DeepSeek publicó en GitHub, con licencia MIT, dsh-superagent: un prototipo de agente de programación que atiende pedidos por GitHub o Feishu, trabaja en su propia sesión y contesta con un pull request. Por defecto no fusiona código y ningún mensaje puede ampliarle los permisos. La empresa advierte que es un prototipo de investigación, no un producto oficial, y no dice qué modelo usa. Sirve para estudiar cómo se acota un agente; pruébalo solo en un repositorio sin secretos.',
    url: 'https://github.com/deepseek-ai/dsh-superagent-prototype',
    source: 'DeepSeek · GitHub',
  },
  {
    title: 'GPT-6 Luna responde más corto, pero se equivoca más',
    date: '29 oct',
    body: 'OpenAI actualizó GPT-6 Luna, uno de los modelos del modo Chat de ChatGPT: da respuestas más concisas y menos complacientes, y mejora en protección de menores. Su propia ficha de seguridad reconoce más errores factuales que la versión del 7 de octubre y peores resultados en preguntas de salud. Aprovecha que va más al grano, pero verifica cifras, fechas y cualquier consejo médico antes de usarlos.',
    url: 'https://deploymentsafety.openai.com/gpt-6-luna-october-28-2026-addendum',
    source: 'OpenAI · ficha de seguridad',
  },
]
