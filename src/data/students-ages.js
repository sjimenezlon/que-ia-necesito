// Edades mínimas según los términos publicados por cada empresa. Verificado el 20 de octubre de 2026.
// Las condiciones cambian: cada fila enlaza a su fuente para revisarla antes de crear una cuenta.
export const AGES_VERIFIED = '20 de octubre de 2026'

// Edad por id del catálogo (src/data/tools.json), para las fichas que ven estudiantes.
export const TOOL_AGE = {
  chatgpt: '13+ con permiso',
  gemini: '13+',
  notebooklm: '13+ · colegio: todas',
  perplexity: '13+ con permiso',
  canva: '13+ · colegio: todas',
  suno: '13+ con permiso',
  quizlet: 'Menores de 13: con un adulto',
  'github-copilot': '13+',
  claude: '18+',
}

export const AGE_TABLE = [
  {
    tool: 'ChatGPT',
    age: '13+',
    note: 'Entre 13 y 17 años, con permiso de mamá, papá o tutor.',
    source: 'https://openai.com/policies/terms-of-use/',
    level: 'ok',
  },
  {
    tool: 'Gemini',
    age: '13+',
    note: 'Menores de 13 solo si la familia lo activa en Google Family Link.',
    source: 'https://support.google.com/gemini/answer/16109150',
    level: 'ok',
  },
  {
    tool: 'Gemini Notebook (NotebookLM)',
    age: '13+',
    note: 'Con cuenta personal desde 13. Con la cuenta educativa del colegio, cualquier edad, con filtros más estrictos.',
    source: 'https://blog.google/feed/notebooklm-is-now-available-to-younger-users/',
    level: 'ok',
  },
  {
    tool: 'Perplexity',
    age: '13+',
    note: 'Si eres menor de edad, tu mamá, papá o tutor debe aceptar los términos.',
    source: 'https://www.perplexity.ai/hub/legal/terms-of-service',
    level: 'ok',
  },
  {
    tool: 'Canva',
    age: '13+',
    note: 'Menores de 13 solo con Canva Educación, a través del colegio.',
    source: 'https://www.canva.com/policies/terms-of-use/',
    level: 'ok',
  },
  {
    tool: 'Suno',
    age: '13+',
    note: 'Entre 13 y 17 años, con consentimiento expreso de la familia.',
    source: 'https://suno.com/legal/terms',
    level: 'ok',
  },
  {
    tool: 'Quizlet',
    age: 'Todas',
    note: 'Menores de 13 se registran con el correo de mamá, papá o acudiente.',
    source: 'https://help.quizlet.com/hc/articles/360031259591',
    level: 'ok',
  },
  {
    tool: 'GitHub Copilot',
    age: '13+',
    note: 'Requiere cuenta de GitHub, que exige 13 años.',
    source: 'https://docs.github.com/en/site-policy/github-terms/github-terms-of-service',
    level: 'ok',
  },
  {
    tool: 'Claude',
    age: '18+',
    note: 'Solo para mayores de edad. No es para estudiantes de colegio.',
    source: 'https://www.anthropic.com/legal/consumer-terms',
    level: 'adult',
  },
  {
    tool: 'Khanmigo',
    age: 'Con la familia',
    note: 'Menores entran por la cuenta de sus padres, pero exige dirección de facturación en Estados Unidos.',
    source: 'https://support.khanacademy.org/hc/en-us/articles/13982227159437',
    level: 'warn',
  },
  {
    tool: 'Character.AI',
    age: 'Sin chat abierto',
    note: 'Desde el 25 de noviembre de 2025 cerró las conversaciones abiertas para menores de 18.',
    source: 'https://techcrunch.com/2025/10/29/character-ai-is-killing-the-chatbot-experience-for-minors/',
    level: 'adult',
  },
]
