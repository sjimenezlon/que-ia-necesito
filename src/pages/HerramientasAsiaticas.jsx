import { Link } from 'react-router-dom'
import {
  Globe2, Sparkles, ArrowRight, ExternalLink, Brain, Image as ImageIcon,
  Video, Music, Code2, Bot, Search, ShieldAlert, Lock, Zap, TrendingDown,
  Languages, CheckCircle2, AlertTriangle, Compass,
  Boxes, MapPin, Landmark, Coins, Server, Info, ChevronRight, Star,
} from 'lucide-react'

/* ══════════════════════════════════════════════════════════════════
   Datos — herramientas de IA asiáticas, verificadas a julio 2026.
   Precios y versiones cambian rápido: siempre confirmar en el sitio oficial.
   ══════════════════════════════════════════════════════════════════ */

const METRICS = [
  { v: '≈61%', l: 'de los tokens en OpenRouter', s: 'son de modelos chinos abiertos' },
  { v: '$0,14', l: 'por 1M de tokens (DeepSeek)', s: '10–30× más barato que Occidente' },
  { v: '4 de 5', l: 'modelos más usados del mundo', s: 'son chinos (may-2026)' },
  { v: '7 países', l: 'con modelos propios', s: 'CN · KR · JP · IN · SG · ID · VN' },
]

const FORCES = [
  {
    icon: Boxes,
    kicker: '01',
    title: 'Código abierto como estrategia',
    body: 'China liberó los pesos de sus mejores modelos (DeepSeek, Qwen, GLM, Kimi). No es filantropía: es volverse el estándar sobre el que todos construyen y erosionar la ventaja cerrada de Occidente. En 2026 los laboratorios chinos publicaron más modelos de pesos abiertos que el resto del mundo junto.',
  },
  {
    icon: TrendingDown,
    kicker: '02',
    title: 'La guerra de precios',
    body: 'Cuando un modelo de primer nivel cuesta centavos por millón de tokens, el costo deja de ser barrera. Los buques insignia chinos suelen quedar 2,5–8× por debajo de los de EE. UU., y algunos recortaron tarifas hasta 99%. La API más cara de Occidente puede costar 10–30× su equivalente chino.',
  },
  {
    icon: Video,
    kicker: '03',
    title: 'China domina el video generativo',
    body: 'En los rankings ciegos de video de mediados de 2026, Seedance, Vidu, Kling y Wan ocupan los puestos que antes eran de Sora. Kling llegó al #1 en la App Store de decenas de mercados. El estado del arte en video e imagen ya se marca, en buena parte, desde Kuaishou, ByteDance y MiniMax.',
  },
  {
    icon: Landmark,
    kicker: '04',
    title: 'Soberanía y lengua (fuera de China)',
    body: 'Corea (HyperCLOVA X, EXAONE), Japón (Sarashina, tsuzumi), India (Sarvam, BharatGen) y Singapur (SEA-LION) no compiten por vencer a GPT en inglés: construyen modelos para hablar su idioma y guardar sus datos en casa. IA como infraestructura pública, respaldada por Estados y conglomerados.',
  },
]

const COUNTRIES = [
  {
    flag: '🇨🇳', name: 'China', tag: 'El epicentro',
    desc: 'Domina en costo, código abierto y generación de video/imagen. Docenas de modelos de frontera.',
    stars: 'DeepSeek · Qwen · Kimi · GLM · Kling · Seedance',
    color: 'text-secondary', bg: 'bg-secondary/8', ring: 'ring-secondary/15',
  },
  {
    flag: '🇰🇷', name: 'Corea del Sur', tag: 'Campeones nacionales',
    desc: 'Modelos soberanos de Naver, LG, Kakao y Upstage + apps de consumo. EXAONE, además, habla español.',
    stars: 'HyperCLOVA X · Solar · EXAONE · Wrtn',
    color: 'text-primary', bg: 'bg-primary/8', ring: 'ring-primary/15',
  },
  {
    flag: '🇯🇵', name: 'Japón', tag: 'Investigación de élite',
    desc: 'Sakana AI (ciencia autónoma) y LLMs en japonés eficientes (tsuzumi corre en 1 GPU) con soberanía de datos.',
    stars: 'Sakana · Sarashina · tsuzumi · PLaMo',
    color: 'text-accent', bg: 'bg-accent/8', ring: 'ring-accent/15',
  },
  {
    flag: '🇮🇳', name: 'India', tag: 'Apuesta soberana',
    desc: 'Modelos multilingües para 22 lenguas oficiales, respaldados por el Estado (IndiaAI Mission). Pesos abiertos.',
    stars: 'Sarvam · SUTRA · BharatGen',
    color: 'text-warm', bg: 'bg-warm/8', ring: 'ring-warm/15',
  },
  {
    flag: '🌏', name: 'Sudeste Asiático', tag: 'Lenguas incluidas',
    desc: 'SEA-LION (Singapur) y modelos regionales (Indonesia, Vietnam) para lenguas poco representadas.',
    stars: 'SEA-LION · Sahabat-AI · Viettel',
    color: 'text-emerald-600', bg: 'bg-emerald-50', ring: 'ring-emerald-200',
  },
]

/* Secciones de China por categoría */
const CHINA_SECTIONS = [
  {
    id: 'chat',
    icon: Brain,
    color: 'text-primary', bg: 'bg-primary/8', border: 'border-primary',
    title: 'Chat y razonamiento',
    lead: 'El corazón del terremoto. Modelos de lenguaje de nivel frontera —muchos con pesos abiertos— que igualan a GPT y Claude a una fracción del costo. La mayoría se usa desde su web internacional con un simple correo, sin teléfono chino.',
    tools: [
      {
        name: 'DeepSeek', company: 'High-Flyer (幻方)', version: 'V4 · abr-2026', ficha: 'deepseek',
        what: 'Razonamiento y programación de frontera al costo más bajo del mercado. El modelo que en 2025 lo cambió todo.',
        price: 'Gratis en web/app · API ≈$0,14 por 1M tokens', west: '≈ ChatGPT / Claude', open: 'Pesos abiertos',
        access: 'chat.deepseek.com — correo, sin teléfono chino',
        good: 'El mejor precio-rendimiento del planeta; pesos abiertos.',
        watch: 'Datos en China y filtro de temas políticos sensibles.',
        url: 'https://chat.deepseek.com',
      },
      {
        name: 'Qwen', company: 'Alibaba', version: 'Qwen3.7-Max · may-2026', ficha: 'qwen',
        what: 'El todoterreno con la familia de pesos abiertos más adoptada del mundo. Fuerte en agentes, código e idiomas asiáticos.',
        price: 'Chat gratis · API insignia ≈$1,25/$3,75 por 1M', west: '≈ ChatGPT / Gemini', open: 'Abiertos (los tiers no-Max)',
        access: 'chat.qwen.ai — internacional, sin teléfono chino',
        good: 'Enorme ecosistema abierto + nube empresarial.',
        watch: 'El modelo tope (Max) es cerrado.',
        url: 'https://chat.qwen.ai',
      },
      {
        name: 'Kimi', company: 'Moonshot AI (月之暗面)', version: 'K2.6 · K2.7-Code', ficha: 'kimi',
        what: 'Rey del contexto larguísimo y de las tareas agénticas: coordina enjambres de sub-agentes durante horas.',
        price: 'Chat con tier gratis · API ~80% más barata que rivales', west: '≈ Claude', open: 'Pesos abiertos (MIT modificada)',
        access: 'kimi.com — internacional + API + Hugging Face',
        good: 'Contexto y orquestación de agentes de primer nivel.',
        watch: 'Correr el modelo de 1T localmente pide mucho cómputo.',
        url: 'https://www.kimi.com',
      },
      {
        name: 'Z.ai (GLM)', company: 'Zhipu AI (智谱)', version: 'GLM-5.2 · jun-2026', ficha: 'glm-zai',
        what: 'Chatbot y agente potente, fuerte en programación. GLM-5 salió con licencia MIT, de las más permisivas en frontera.',
        price: 'Chat freemium · GLM Coding Plan desde ~$10/mes', west: '≈ Claude (más barato)', open: 'GLM-5 con licencia MIT',
        access: 'chat.z.ai — global, interfaz en inglés',
        good: 'Pesos de frontera con licencia MIT + acceso global limpio.',
        watch: 'Los benchmarks que “ganan a todos” son marketing.',
        url: 'https://chat.z.ai',
      },
      {
        name: 'Doubao (豆包)', company: 'ByteDance', version: 'Seed 2.0 · feb-2026', ficha: 'doubao',
        what: 'El chatbot de consumo más usado de China: asistente multimodal con voz, imagen y video integrados al motor de contenido de ByteDance.',
        price: 'Gratis (con tiers de pago desde may-2026)', west: '≈ ChatGPT + Canva', open: 'Cerrado',
        access: 'doubao.com — interfaz en chino, suele pedir teléfono +86',
        good: '+300M de usuarios; multimodal de consumo excelente en chino.',
        watch: 'Pensado para China: difícil de usar desde Colombia.',
        url: 'https://www.doubao.com',
      },
      {
        name: 'ERNIE (文心)', company: 'Baidu', version: 'ERNIE 5.1 · may-2026', ficha: 'ernie',
        what: 'Modelo omnimodal (texto/imagen/audio/video) integrado a la búsqueda de Baidu. La serie abierta 4.5 es autohospedable.',
        price: 'Consumo freemium · API en Baidu Qianfan', west: '≈ Gemini', open: 'Abierto solo el linaje 4.5',
        access: 'yiyan.baidu.com — orientado a China (cuenta Baidu / +86)',
        good: 'Omnimodal grande + integración con el buscador de Baidu.',
        watch: 'El 5.x es cerrado y el acceso está muy amurallado.',
        url: 'https://yiyan.baidu.com',
      },
      {
        name: 'Hunyuan / Yuanbao', company: 'Tencent', version: 'Hy3 · jul-2026',
        what: 'Modelo de coding agéntico con licencia Apache 2.0 (295B MoE) y una app de consumo (Yuanbao) dentro de WeChat.',
        price: 'App gratis · API en Tencent Cloud', west: '≈ Claude/GPT abierto (dev)', open: 'Apache 2.0',
        access: 'Pesos en Hugging Face · Yuanbao ligado a WeChat',
        good: 'Pesos de frontera con la licencia más permisiva + WeChat.',
        watch: 'Autohospedarlo exige hardware de centro de datos.',
        url: 'https://hunyuan.tencent.com',
      },
      {
        name: 'MiniMax', company: 'MiniMax (稀宇)', version: 'M3 · jun-2026',
        what: 'Modelo agéntico de gran valor precio-rendimiento y contexto de 1M. Su brazo de medios es Hailuo (video) y MiniMax Audio (voz).',
        price: 'API barata + promos gratis', west: '≈ GPT/Claude abierto', open: 'Pesos abiertos (licencia comunitaria)',
        access: 'minimax.io — global + Hugging Face + OpenRouter',
        good: 'Líder en valor agéntico + stack de medios propio.',
        watch: 'No confundir el LLM (M3) con el video (Hailuo).',
        url: 'https://www.minimax.io',
      },
    ],
    also: 'También activos: Yi (01.AI de Kai-Fu Lee, que abandonó la carrera de modelos base y pivotó a IA soberana y empresarial), iFlytek Spark (fuerte en voz, educación y traducción), StepFun, Baichuan (salud/empresa) y SenseTime (visión y espacial).',
  },
  {
    id: 'imagen',
    icon: ImageIcon,
    color: 'text-secondary', bg: 'bg-secondary/8', border: 'border-secondary',
    title: 'Imagen',
    lead: 'Los rivales chinos de Midjourney y GPT Image, especialmente fuertes en algo que Occidente sufre: renderizar texto y tipografía nítida dentro de la imagen. Varios son de pesos abiertos.',
    tools: [
      {
        name: 'Seedream', company: 'ByteDance', version: '5.0 · 2026', ficha: 'seedream',
        what: 'Imágenes en 4K con texto y tipografía nítidos, edición multi-imagen coherente. Líder en render de texto dentro de la imagen.',
        price: 'Vía Dreamina (freemium) o API por generación', west: '≈ Nano Banana / GPT Image', open: 'Cerrado',
        access: 'dreamina.capcut.com o API — sin teléfono chino',
        good: 'El mejor en texto dentro de la imagen.',
        watch: 'No hay web de consumo propia: depende de Dreamina/API.',
        url: 'https://seed.bytedance.com/en/seedream4_5',
      },
      {
        name: 'Qwen-Image', company: 'Alibaba', version: '2.0 · feb-2026',
        what: 'Modelo de imagen open-source y eficiente (7B), unifica generación y edición, fuerte en tipografía profesional.',
        price: 'Gratis (open-source) + chat Qwen + API', west: '≈ FLUX.1', open: 'Open-source',
        access: 'Hugging Face / ComfyUI o chat.qwen.ai — global',
        good: 'Pesos abiertos + calidad de texto, ligero.',
        watch: 'Correrlo local pide GPU decente.',
        url: 'https://chat.qwen.ai',
      },
      {
        name: 'Hunyuan Image', company: 'Tencent', version: '3.0 · 2026',
        what: 'El mayor modelo de imagen open-source (80B MoE). Brilla en prompts larguísimos, escenas complejas y texto bilingüe.',
        price: 'Gratis (open-source) + portales de terceros', west: '≈ FLUX.1 / gran modelo abierto', open: 'Open-source',
        access: 'Hugging Face / GitHub o portales de terceros',
        good: 'Máximo detalle en el mundo open-source.',
        watch: '80B es pesado; sin app de consumo global pulida.',
        url: 'https://github.com/Tencent-Hunyuan/HunyuanImage-3.0',
      },
      {
        name: 'Kling Image', company: 'Kuaishou', version: 'Image 3.0 · feb-2026',
        what: 'La generación de imagen de Kuaishou (heredera del modelo abierto Kolors), hoy integrada a la suite Kling. Bilingüe y fotorrealista.',
        price: 'Freemium dentro de Kling', west: '≈ SDXL / FLUX', open: 'Kolors (base) es open-source',
        access: 'klingai.com — global, registro con correo',
        good: 'Buen bilingüe integrado al ecosistema de video Kling.',
        watch: 'Kolors como marca suelta quedó absorbida por Kling.',
        url: 'https://klingai.com',
      },
      {
        name: 'Jimeng / Dreamina', company: 'ByteDance', version: 'suite creativa · 2026',
        what: 'Suite todo-en-uno (imagen, video, audio, avatares) que corre Seedream y Seedance. Dreamina es la versión internacional; Jimeng, la china.',
        price: 'Freemium · planes ~$9–84/mes', west: '≈ Adobe Firefly / Canva AI', open: 'Cerrado',
        access: 'dreamina.capcut.com — global, sin teléfono chino',
        good: 'La puerta más fácil a Seedream/Seedance para Occidente.',
        watch: 'Reputación mixta por el manejo de créditos.',
        url: 'https://dreamina.capcut.com',
      },
    ],
  },
  {
    id: 'video',
    icon: Video,
    color: 'text-warm', bg: 'bg-warm/8', border: 'border-warm',
    title: 'Video',
    lead: 'Aquí China no alcanza a Occidente: lo lidera. En los rankings ciegos de mediados de 2026, cuatro de los cinco mejores modelos de video son chinos. Audio nativo sincronizado ya es la línea base.',
    tools: [
      {
        name: 'Kling', company: 'Kuaishou', version: '3.0 · feb-2026', ficha: 'kling',
        what: 'El estándar de facto global. 4K real hasta 60fps, clips con audio nativo y storyboard multi-plano. #1 en la App Store de decenas de mercados.',
        price: 'Gratis 66 créditos/día · pagos ~$7 a ~$130/mes', west: '≈ Sora 2 / Veo 3.1 / Runway', open: 'Cerrado',
        access: 'klingai.com — global, registro con correo/Google',
        good: 'Líder de mercado con el ecosistema más maduro.',
        watch: 'Los créditos gratis se agotan rápido.',
        url: 'https://klingai.com',
      },
      {
        name: 'Seedance', company: 'ByteDance', version: '2.0 (2.5 en despliegue)', ficha: 'seedance',
        what: 'El retador técnico: #1 en varios rankings ciegos de video. La 2.5 promete planos nativos de 30s, 4K y audio-video conjunto.',
        price: 'Vía Dreamina (freemium) o API por generación', west: '≈ Sora 2 / Veo 3.1', open: 'Cerrado',
        access: 'dreamina.capcut.com o API — sin teléfono chino',
        good: 'Puntero en benchmarks y en duración de plano.',
        watch: 'Señalado en prensa por dudas de copyright en el training.',
        url: 'https://seed.bytedance.com/en/seedance',
      },
      {
        name: 'Hailuo', company: 'MiniMax', version: '2.3 · 2026', ficha: 'hailuo',
        what: 'Físicas realistas y movimiento estilizado (danza, artes marciales). Muy elogiado por su relación calidad-físicas-precio.',
        price: 'Gratis con créditos diarios · planes de suscripción', west: '≈ Sora / Veo / Kling', open: 'Cerrado',
        access: 'hailuoai.video — global, sin teléfono chino',
        good: 'Físicas y precio muy competitivos.',
        watch: 'La marca se solapa (Hailuo 02 vs 2.3): confunde al elegir.',
        url: 'https://hailuoai.video',
      },
      {
        name: 'Vidu', company: 'Shengshu (生数)', version: 'Q3 · abr-2026', ficha: 'vidu',
        what: 'Enfoque de producción de cine/TV: combina sujeto + entorno + vestuario + estilo por referencia. Consistencia de personajes para series.',
        price: 'Freemium · planes hasta ~$84/mes', west: '≈ Runway References', open: 'Cerrado',
        access: 'vidu.com — global, sin teléfono chino',
        good: 'Control por referencias y velocidad ("China speed").',
        watch: 'Resolución/duración por clip menores que Kling/Seedance tope.',
        url: 'https://www.vidu.com',
      },
      {
        name: 'PixVerse', company: 'AIsphere (爱诗)', version: 'V5.5 · 2026',
        what: 'Video social rápido con plantillas y efectos virales. Muy popular en móvil, precio de entrada bajo.',
        price: 'Free + planes $10 a $199/mes', west: '≈ Pika / Runway (consumo)', open: 'Cerrado',
        access: 'pixverse.ai — global, apps iOS/Android',
        good: 'Rapidez, plantillas y precio de entrada bajo.',
        watch: 'Calidad tope por debajo de Kling 3.0 / Seedance.',
        url: 'https://pixverse.ai',
      },
      {
        name: 'Wan (通义万相)', company: 'Alibaba', version: '2.6 · dic-2025',
        what: 'Video con audio nativo sincronizado y pesos abiertos en varias versiones. Cine multi-plano y hasta "role-play".',
        price: 'Freemium + open-source + API', west: '≈ Sora / Veo (con pesos abiertos)', open: 'Varias versiones open-weight',
        access: 'wan.video o Hugging Face — global',
        good: 'Open-weight + audio nativo.',
        watch: 'El producto de consumo es poco conocido en Occidente.',
        url: 'https://wan.video',
      },
    ],
    also: 'También: Hunyuan Video (Tencent), el ecosistema open-source de video más completo (se autohospeda y trae generación de banda sonora "Foley" aparte).',
  },
  {
    id: 'audio',
    icon: Music,
    color: 'text-violet-600', bg: 'bg-violet-50', border: 'border-violet-500',
    title: 'Audio y música',
    lead: 'Los rivales chinos de Suno y ElevenLabs. Fuertes en voz —china y multilingüe— y con exportables profesionales (stems, MIDI) que muchos competidores no dan.',
    tools: [
      {
        name: 'Mureka', company: 'Kunlun Tech (昆仑万维)', version: 'V9 · 2026', ficha: 'mureka',
        what: 'Canción completa con voz a partir de un prompt. Exporta MIDI y stems, clona voz y estrena "razonamiento musical" (planea la estructura antes de generar).',
        price: 'Free ~50 créditos/día · Pro $9/mes · Premier $27/mes', west: '≈ Suno / Udio', open: 'Cerrado',
        access: 'mureka.ai — global, registro con correo',
        good: 'Exportables profesionales (MIDI/stems) + voz china.',
        watch: 'Suno suele ganar en emoción vocal en inglés.',
        url: 'https://www.mureka.ai',
      },
      {
        name: 'MiniMax Audio', company: 'MiniMax', version: 'Speech 2.8 · 2026',
        what: 'Texto a voz realista y de baja latencia; clona una voz con ~5 segundos de audio. Multilingüe, ideal para producción de contenido.',
        price: 'Freemium web + API por uso', west: '≈ ElevenLabs', open: 'Cerrado',
        access: 'minimax.io / hailuoai.com/audio — global',
        good: 'Clonación rápida y calidad de estudio.',
        watch: 'Menos voces "occidentales" curadas; ojo con el consentimiento al clonar.',
        url: 'https://www.minimax.io',
      },
      {
        name: 'ACE Studio', company: 'TimedomAIn (时域科技)', version: '2.0 · dic-2025',
        what: 'Estudio de voz cantada: convierte MIDI + letra en una interpretación vocal expresiva. +140 voces, 8 idiomas (incluye español), integración con DAW.',
        price: 'Freemium con suscripción', west: '≈ Synthesizer V / Vocaloid', open: 'Cerrado',
        access: 'acestudio.ai — app de escritorio, global',
        good: 'Control fino de la voz cantada dentro de tu DAW.',
        watch: 'No es "prompt→canción": trabajas con MIDI y letras.',
        url: 'https://acestudio.ai',
      },
    ],
    also: 'En clonación/TTS abierto destacan CosyVoice (Alibaba) y Fish Audio, ambos open-source y populares en Occidente.',
  },
  {
    id: 'codigo',
    icon: Code2,
    color: 'text-accent', bg: 'bg-accent/8', border: 'border-accent',
    title: 'Programación',
    lead: 'La carrera del "coding agéntico" china va a toda máquina: IDEs y modelos que no autocompletan, sino que planifican y ejecutan proyectos enteros. Compiten de frente con Cursor, Devin y Claude Code —muchos gratis o con pesos abiertos.',
    tools: [
      {
        name: 'Trae', company: 'ByteDance', version: 'IDE + modo SOLO', ficha: 'trae',
        what: 'IDE completo (fork de VS Code) con agente autónomo. El modo SOLO planifica, elige herramientas y ejecuta la tarea de punta a punta. Incluye modelos frontera gratis en el tier básico.',
        price: 'Free · pagos ~$3 a ~$100/mes', west: '≈ Cursor (+ SOLO ≈ Devin)', open: 'Cerrado',
        access: 'trae.ai — internacional, registro con Google, sin +86',
        good: 'IDE gratis muy pulido con modelos premium incluidos.',
        watch: 'Es ByteDance: cuidado con código corporativo sensible.',
        url: 'https://www.trae.ai',
      },
      {
        name: 'Qwen3-Coder', company: 'Alibaba', version: '480B abierto (+ iteraciones 2026)',
        what: 'Modelo de coding agéntico de pesos abiertos (Apache 2.0), a la par de Claude Sonnet en tareas de agente. Autohospedable o por API baratísima.',
        price: 'Gratis (open-weights) + API económica + CLI abierta', west: '≈ Claude/GPT para código, pero abierto', open: 'Apache 2.0',
        access: 'Hugging Face + chat.qwen.ai + API — global',
        good: 'Coding de frontera sin lock-in; ideal para soberanía de datos.',
        watch: 'El 480B pide hardware serio; para uso ligero, usa la API.',
        url: 'https://github.com/QwenLM/Qwen3-Coder',
      },
      {
        name: 'Qoder', company: 'Alibaba', version: 'IDE agéntico · 2026',
        what: 'La apuesta global de Alibaba: un IDE agéntico independiente que trata a la IA como compañero autónomo de equipo, no como autocompletado pasivo. Potenciado por Qwen.',
        price: 'Freemium con suscripción', west: '≈ Cursor / Claude Code', open: 'Cerrado',
        access: 'qoder.com — internacional, correo/Google',
        good: 'Respaldo de Alibaba + modelos Qwen; apuesta global seria.',
        watch: 'Producto joven; menos maduro que Cursor.',
        url: 'https://qoder.com',
      },
      {
        name: 'CodeGeeX', company: 'Z.ai (Zhipu)', version: 'plugin + GLM Coding Plan',
        what: 'El asistente de código más gratuito y abierto (VS Code/JetBrains, +1M instalaciones, 100+ lenguajes). Es el front-end del GLM Coding Plan, potenciado por GLM-5.',
        price: 'Plugin gratis · GLM Coding Plan ~$10–80/mes', west: '≈ Copilot gratis / Claude Code barato', open: 'Plugin open-source',
        access: 'codegeex.cn + z.ai — plugin en Marketplace, global',
        good: 'Opción realmente gratuita + modelos GLM por muy poco.',
        watch: 'Lo potente está detrás del GLM Coding Plan de pago.',
        url: 'https://codegeex.cn',
      },
      {
        name: 'Baidu Comate', company: 'Baidu', version: 'sobre ERNIE',
        what: 'Copiloto de código integrado al ecosistema Baidu/ERNIE (100+ lenguajes, VS Code, JetBrains, Xcode). Fuerte en I+D empresarial chino.',
        price: 'Freemium (gratis individual, planes empresa)', west: '≈ GitHub Copilot', open: 'Cerrado',
        access: 'comate.baidu.com — cuenta Baidu (+86)',
        good: 'Muy integrado a la nube y datos de Baidu.',
        watch: 'El más amurallado para usuarios fuera de China.',
        url: 'https://comate.baidu.com',
      },
    ],
  },
  {
    id: 'agentes',
    icon: Bot,
    color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-500',
    title: 'Agentes autónomos',
    lead: 'Manus encendió la mecha en 2025 y detrás vino una ola de agentes generalistas que navegan, escriben código y entregan informes o sitios completos sin supervisión. Ojo con el origen: "empresa de origen chino" no siempre es "empresa china".',
    tools: [
      {
        name: 'Manus', company: 'Butterfly Effect · origen 🇨🇳, sede 🇸🇬', version: '1.6', ficha: 'manus',
        what: 'El primer agente generalista viral: ejecuta tareas complejas de varios pasos de punta a punta. Nacido en China, trasladó su sede a Singapur en 2025.',
        price: 'Free (300 créditos/día) · $20 / $40 / $200 al mes', west: '≈ Devin + AutoGPT / Operator', open: 'Cerrado',
        access: 'manus.im — global, registro con Google, sin +86',
        good: 'Ejecución autónoma end-to-end impresionante en demos.',
        watch: 'Caro por créditos y resultados inconsistentes en tareas largas.',
        url: 'https://manus.im',
      },
      {
        name: 'Monica', company: 'Butterfly Effect', version: 'asistente multi-modelo',
        what: 'Asistente todo-en-uno (extensión de navegador + apps) que agrega varios LLMs comerciales tras una sola interfaz: chat, traducción, resumen, escritura.',
        price: 'Freemium (plan Pro de pago)', west: '≈ Poe / Copilot / You.com', open: 'Cerrado',
        access: 'monica.im — global, Chrome Web Store, iOS/Android',
        good: 'Conveniencia multi-modelo integrada al navegador.',
        watch: 'Es capa sobre modelos de terceros; poca tecnología propia.',
        url: 'https://monica.im',
      },
      {
        name: 'Flowith', company: 'Flowith (Shanghái 🇨🇳)', version: 'Agent NEO',
        what: 'Agente "infinito" (hasta ~10M tokens de contexto y 1.000+ pasos, 24/7) sobre un lienzo visual con base de conocimiento propia ("Knowledge Garden").',
        price: 'Freemium por créditos, planes por niveles', west: '≈ Manus + NotebookLM', open: 'Cerrado',
        access: 'flowith.io — global, correo/Google',
        good: 'Contexto/pasos "infinitos" y UX de canvas diferenciada.',
        watch: 'Startup pequeña; dudas de sostenibilidad.',
        url: 'https://flowith.io',
      },
    ],
    also: 'Aclaración importante: Genspark —a menudo listado como "chino"— es en realidad una empresa de EE. UU. (Palo Alto) fundada por ex-ejecutivos de Baidu. Origen chino ≠ empresa china. Y recuerda que Kimi, GLM y Qwen traen sus propios modos-agente potentes.',
  },
  {
    id: 'busqueda',
    icon: Search,
    color: 'text-sky-600', bg: 'bg-sky-50', border: 'border-sky-500',
    title: 'Búsqueda e investigación',
    lead: 'Los "Perplexity chinos": buscadores con IA que responden con fuentes citadas y hacen investigación profunda, a veces materializando informes, presentaciones y hojas de cálculo completas.',
    tools: [
      {
        name: 'Metaso (秘塔)', company: 'Metaso (秘塔科技)', version: 'buscador IA sin anuncios', ficha: 'metaso',
        what: 'El "Perplexity chino" por excelencia: búsqueda sin publicidad, tres modos (rápido/profundo/académico) y Deep Research gratis con reportes citados.',
        price: 'Web y app gratis · Deep Research ~4–5 usos/día', west: '≈ Perplexity', open: 'Cerrado',
        access: 'metaso.cn — abre desde cualquier país; funciones plenas piden cuenta china',
        good: 'Cero anuncios + fuerte en literatura académica CN/EN.',
        watch: 'Interfaz principalmente en chino; sin dominio global en inglés.',
        url: 'https://metaso.cn',
      },
      {
        name: 'Skywork / Tiangong', company: 'Kunlun Tech', version: 'Super Agents · 2026',
        what: 'Super-agente de investigación profunda que "materializa" entregables: documentos, PPT, hojas, webs y podcasts. Versión desktop que ejecuta local para privacidad.',
        price: 'Freemium con planes de pago', west: '≈ Perplexity Deep Research + Manus', open: 'Cerrado',
        access: 'skywork.ai — internacional, sin +86 (tiangong.cn es el doméstico)',
        good: 'Deep research que produce entregables listos para usar.',
        watch: 'Dos marcas paralelas (Skywork intl vs Tiangong CN) que confunden.',
        url: 'https://skywork.ai',
      },
      {
        name: 'Felo', company: 'origen 🇨🇳, registro 🇯🇵/🇸🇬', version: 'buscador multilingüe',
        what: 'Buscador con IA multilingüe, muy citado junto a Metaso pero mucho más amable con el español y con acceso global sencillo.',
        price: 'Freemium', west: '≈ Perplexity', open: 'Cerrado',
        access: 'felo.ai — global, registro con Google',
        good: 'Multilingüe (buen español) y accesible desde LATAM.',
        watch: 'Fundadores de herencia china pero entidad fuera de China: aclara el origen.',
        url: 'https://felo.ai',
      },
    ],
  },
]

/* Asia fuera de China — paneles por país (research/open-weight/soberanía) */
const ASIA_COUNTRIES = [
  {
    flag: '🇰🇷', name: 'Corea del Sur', color: 'text-primary', bg: 'bg-primary/8',
    intro: 'Campeones nacionales (Naver, LG, Kakao, Upstage) construyen IA soberana coreana; varios modelos son de pesos abiertos y uno hasta habla español.',
    tools: [
      { name: 'HyperCLOVA X', org: 'Naver', what: 'La IA soberana coreana, integrada al buscador, mapas y comercio de Naver. Línea abierta "SEED" y un modelo omnimodal any-to-any.', access: 'API en NAVER Cloud + pesos SEED en Hugging Face', url: 'https://clova.ai' },
      { name: 'Solar', org: 'Upstage', what: 'El LLM coreano más "frontera" y el más fácil de usar desde fuera: 31B eficiente, agéntico, disponible en OpenRouter.', access: 'API + OpenRouter — usable desde LATAM', url: 'https://www.upstage.ai' },
      { name: 'EXAONE', org: 'LG AI Research', what: 'Modelo multimodal de razonamiento STEM con pesos abiertos. Relevante para LATAM: soporta español.', access: 'Hugging Face (licencia no comercial)', url: 'https://huggingface.co/LGAI-EXAONE' },
      { name: 'Kanana', org: 'Kakao', what: 'MoE abierto y eficiente (32B totales / 3B activos) enfocado a agentes y tool-calling.', access: 'Hugging Face (términos no comerciales)', url: 'https://github.com/kakao/kanana-2' },
      { name: 'Wrtn (뤼튼)', org: 'Wrtn', what: 'Producto de consumo real y rentable (+5M usuarios): IA de compañía y entretenimiento en Corea y Japón.', access: 'Web y app (coreano/japonés)', url: 'https://wrtn.ai' },
      { name: 'Gauss2', org: 'Samsung', what: 'IA on-device que impulsa Galaxy AI en miles de millones de dispositivos, sin nube.', access: 'Embebido en dispositivos Samsung', url: 'https://research.samsung.com/artificial-intelligence' },
    ],
  },
  {
    flag: '🇯🇵', name: 'Japón', color: 'text-accent', bg: 'bg-accent/8',
    intro: 'Investigación de élite y LLMs en japonés eficientes, con soberanía de datos y respaldo de gigantes (SoftBank, KDDI, NTT) y de la Agencia Digital.',
    tools: [
      { name: 'Sakana AI', org: 'Sakana AI (Tokio)', what: 'Ciencia autónoma (su "AI Scientist" publicó un paper que pasó revisión por pares) y fusión evolutiva de modelos. Fugu enruta los mejores LLMs tras una sola API.', access: 'API compatible con OpenAI + código en GitHub', url: 'https://sakana.ai' },
      { name: 'Sarashina', org: 'SB Intuitions / SoftBank', what: 'LLM en japonés con comprensión cultural local y datos 100% en centros japoneses. Enfoque empresarial/soberano.', access: 'API empresarial (Japón) + algunos modelos en HF', url: 'https://www.sbintuitions.co.jp' },
      { name: 'tsuzumi 2', org: 'NTT', what: 'LLM ligero que corre en 1 sola GPU, con QA sobre documentos de negocio. Elegido para la "Government AI" japonesa.', access: 'Producto empresarial NTT (on-prem)', url: 'https://www.rd.ntt/e/research/LLM_tsuzumi.html' },
      { name: 'PLaMo 3.0', org: 'Preferred Networks', what: 'Japonés de alta calidad con contexto de 256K, construido from-scratch con respaldo estatal-industrial (METI GENIAC).', access: 'API de pago (yenes) + algunos modelos en HF', url: 'https://www.preferred.jp' },
      { name: 'ELYZA', org: 'KDDI', what: 'Japonés fluido y económico (modelos basados en Llama) para atención al cliente de alto volumen.', access: 'Hugging Face + API empresarial', url: 'https://elyza.ai' },
      { name: 'Agent i', org: 'LINE Yahoo', what: 'El agente de IA de consumo masivo de Japón, dentro de LINE (100M+ usuarios).', access: 'Dentro de la app LINE', url: 'https://www.lycorp.co.jp' },
    ],
  },
  {
    flag: '🇮🇳', name: 'India', color: 'text-warm', bg: 'bg-warm/8',
    intro: 'Modelos soberanos para 22 lenguas oficiales, respaldados por el Estado (IndiaAI Mission) y con licencias abiertas. La apuesta es lingüística, no vencer a GPT en inglés.',
    tools: [
      { name: 'Sarvam AI', org: 'Sarvam (elegido por MeitY)', what: 'El LLM soberano de India: 30B y 105B open-source (Apache), entrenados from-scratch con cómputo estatal. App de consumo "Indus".', access: 'Hugging Face + API + app Indus — desde LATAM', url: 'https://www.sarvam.ai' },
      { name: 'SUTRA', org: 'Two AI (Jio + Naver)', what: 'Multilingüe en 50+ idiomas (todas las lenguas indias + varias asiáticas), fuerte en Hinglish. App gratuita ChatSUTRA.', access: 'Web/app + API — usable desde LATAM', url: 'https://www.two.ai' },
      { name: 'BharatGen', org: 'IIT Bombay (estatal)', what: 'Primera iniciativa de LLM multimodal respaldada por el gobierno indio; modelo Param2 (17B, MoE) open-source para servicios públicos.', access: 'Open source (repos públicos)', url: 'https://bharatgen.com' },
      { name: 'Krutrim', org: 'Ola', what: 'Primer unicornio GenAI de India — pero en 2026 pausó el desarrollo de modelos base y pivotó a nube de IA. Krutrim-2 sigue disponible, congelado.', access: 'Hugging Face (Krutrim-2) + cloud', url: 'https://olakrutrim.com', warn: true },
    ],
  },
  {
    flag: '🌏', name: 'Sudeste Asiático', color: 'text-emerald-600', bg: 'bg-emerald-50',
    intro: 'Modelos abiertos para lenguas poco representadas: la propuesta es inclusión digital y soberanía regional.',
    tools: [
      { name: 'SEA-LION', org: 'AI Singapore 🇸🇬', what: 'El referente regional abierto: 11+ lenguas del sudeste asiático (birmano, tagalo, indonesio, tailandés, vietnamita…) con contexto cultural local. Multimodal y agéntico.', access: 'Hugging Face (MIT) + API en sea-lion.ai', url: 'https://sea-lion.ai' },
      { name: 'Sahabat-AI', org: 'Indosat + GoTo 🇮🇩', what: 'Soberanía digital indonesia: modelo abierto (70B) que cubre indonesio + javanés, sundanés, balinés y batak.', access: 'Hugging Face (gratis)', url: 'https://www.gotocompany.com' },
      { name: 'Viettel VT', org: 'Viettel 🇻🇳', what: 'LLM vietnamita soberano (120B MoE) entrenado con datos locales, dentro de la estrategia de IA soberana de Vietnam con Nvidia.', access: 'Vía Viettel (Vietnam)', url: 'https://viettelai.vn' },
    ],
  },
]

const EQUIVALENCES = [
  { west: 'ChatGPT / Claude', cat: 'Chat y razonamiento', asia: 'DeepSeek · Qwen · Kimi · Z.ai (GLM)' },
  { west: 'GitHub Copilot / Cursor', cat: 'Programación', asia: 'Trae · Qwen3-Coder · Qoder · CodeGeeX' },
  { west: 'Midjourney / GPT Image', cat: 'Imagen', asia: 'Seedream · Qwen-Image · Hunyuan Image' },
  { west: 'Sora / Veo / Runway', cat: 'Video', asia: 'Kling · Seedance · Hailuo · Vidu' },
  { west: 'Suno / ElevenLabs', cat: 'Audio y música', asia: 'Mureka · MiniMax Audio · ACE Studio' },
  { west: 'Perplexity', cat: 'Búsqueda IA', asia: 'Metaso · Skywork · Felo' },
  { west: 'Devin / Operator', cat: 'Agentes', asia: 'Manus · Monica · Flowith' },
  { west: '(un GPT en tu idioma)', cat: 'Modelos soberanos', asia: 'HyperCLOVA X · Sarashina · Sarvam · SEA-LION' },
]

const ACCESS = [
  { icon: Globe2, title: 'Web y app', body: 'La mayoría de los productos globales (DeepSeek, Qwen Chat, Kimi, Z.ai, Manus, Kling, Hailuo) funcionan con un correo, sin número chino. Las versiones para el mercado interno (Doubao, apps .cn) sí pueden pedir teléfono +86 y estar solo en chino.' },
  { icon: Server, title: 'API y pesos abiertos', body: 'Casi todos ofrecen API compatible con el formato de OpenAI: se integran cambiando una línea. Los pesos abiertos (DeepSeek, Qwen, GLM, Kimi, EXAONE, Sarvam, SEA-LION) están en Hugging Face y se corren en tu propia infraestructura.' },
  { icon: Languages, title: 'Idioma', body: 'Los modelos son multilingües y responden en español competente. La interfaz de las apps de consumo, en cambio, suele estar pensada en chino o inglés. EXAONE (Corea) declara soporte explícito de español.' },
  { icon: Coins, title: 'Pago', body: 'Suscripciones en USD con tarjeta internacional en los productos globales. Algunos ecosistemas internos (Baidu, Doubao) exigen medios de pago chinos. Gateways como OpenRouter, Together o fal permiten pagar y acceder sin cuenta china.' },
]

const RED_FLAGS = [
  { icon: Lock, title: 'Residencia de datos', body: 'Lo que escribes puede procesarse y almacenarse en servidores en China (u otro país) bajo su marco legal. No subas datos personales, reservados o sensibles sin una política clara y una base legal — en el sector público, Ley 1581/2012.' },
  { icon: ShieldAlert, title: 'Censura de temas sensibles', body: 'Los modelos chinos evitan o reescriben temas políticamente delicados para su gobierno. Para código, traducción o análisis es irrelevante; para investigación geopolítica, tenlo presente.' },
  { icon: AlertTriangle, title: 'Verifica siempre', body: 'Rendimiento de frontera no es lo mismo que verdad: alucinan como cualquier otro. Y precios y versiones cambian casi cada mes — confirma en el sitio oficial antes de comprometer presupuesto. Cifras de negocio y benchmarks aquí citados son de la propia industria.' },
]

/* ══════════════════════════════════════════════════════════════════
   Componentes
   ══════════════════════════════════════════════════════════════════ */

function isOpen(label) {
  return label && !/cerrado/i.test(label)
}

function AsiaCard({ t, color, bg }) {
  return (
    <div className="group relative bg-surface rounded-2xl border border-border p-5 hover:shadow-lg hover:-translate-y-0.5 hover:border-primary/30 transition-all duration-300 flex flex-col">
      <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-2xl ${bg}`} />
      <div className="flex items-start justify-between gap-2 mb-2 mt-1">
        <div className="min-w-0">
          <h4 className="font-display font-bold text-text text-base tracking-tight leading-tight">{t.name}</h4>
          <div className="text-[11px] text-text-lighter mt-0.5">{t.company}</div>
        </div>
        <span className={`shrink-0 text-[10px] font-bold ${color} ${bg} px-2 py-1 rounded-full whitespace-nowrap`}>
          {t.version}
        </span>
      </div>

      <p className="text-xs text-text-light leading-relaxed mb-3 flex-1">{t.what}</p>

      <div className="flex flex-wrap gap-1.5 mb-3">
        <span className="inline-flex items-center gap-1 text-[10px] font-medium text-text-light bg-text/4 px-2 py-1 rounded-md">
          <Coins className="w-2.5 h-2.5" /> {t.price}
        </span>
        <span className={`inline-flex items-center text-[10px] font-semibold ${color} ${bg} px-2 py-1 rounded-md`}>
          {t.west}
        </span>
        {t.open && (
          <span
            className={`inline-flex items-center text-[10px] font-medium px-2 py-1 rounded-md ${
              isOpen(t.open) ? 'text-emerald-700 bg-emerald-50' : 'text-text-lighter bg-text/4'
            }`}
          >
            {t.open}
          </span>
        )}
      </div>

      <div className="flex items-start gap-1.5 text-[11px] text-text-light mb-3">
        <MapPin className="w-3 h-3 mt-0.5 shrink-0 text-text-lighter" />
        <span className="leading-snug">{t.access}</span>
      </div>

      <div className="space-y-1.5 mb-3">
        <div className="flex items-start gap-1.5 text-[11px] text-text-light">
          <CheckCircle2 className="w-3 h-3 mt-0.5 shrink-0 text-accent" />
          <span className="leading-snug">{t.good}</span>
        </div>
        <div className="flex items-start gap-1.5 text-[11px] text-text-light">
          <AlertTriangle className="w-3 h-3 mt-0.5 shrink-0 text-warm" />
          <span className="leading-snug">{t.watch}</span>
        </div>
      </div>

      <div className="flex items-center gap-3 pt-3 border-t border-border/60">
        <a
          href={t.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-1 text-[11px] font-semibold ${color} no-underline hover:gap-1.5 transition-all`}
        >
          Sitio oficial <ExternalLink className="w-3 h-3" />
        </a>
        {t.ficha && (
          <Link
            to={`/herramienta/${t.ficha}`}
            className="ml-auto inline-flex items-center gap-0.5 text-[11px] font-semibold text-text-lighter no-underline hover:text-primary transition-colors"
          >
            Ver ficha <ChevronRight className="w-3 h-3" />
          </Link>
        )}
      </div>
    </div>
  )
}

export default function HerramientasAsiaticas() {
  return (
    <div className="bg-bg">
      {/* ═══════════ HERO ═══════════ */}
      <section className="relative px-4 hero-gradient noise-overlay overflow-x-clip py-16 md:py-24">
        <div className="absolute inset-0 dot-pattern pointer-events-none" />
        <div className="absolute -top-10 -left-32 w-80 h-80 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-32 -right-20 w-72 h-72 bg-warm/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-primary/8 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-secondary/8 text-secondary px-4 py-1.5 rounded-full text-sm font-semibold mb-8 border border-secondary/10 shadow-sm">
            <Globe2 className="w-3.5 h-3.5" />
            Capítulo especial · julio 2026
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-text leading-[1.05] tracking-tight mb-6">
            IA <span className="text-gradient-primary">asiática</span>
            <br className="hidden sm:block" />
            <span className="text-text-light font-bold">el ecosistema que dejó de ser una copia</span>
          </h1>
          <p className="text-text-light text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-6">
            Mientras Occidente discute, Asia despliega. China convirtió la IA en una guerra de{' '}
            <span className="text-text font-semibold">precios y código abierto</span>; Corea, Japón e India construyen{' '}
            <span className="text-text font-semibold">modelos soberanos</span> en su propia lengua. Una guía práctica
            —en español, verificada a julio 2026— para saber qué existe, qué sirve y cómo usarlo desde Colombia.
          </p>

          <div className="flex items-center justify-center gap-2 mb-10 text-sm">
            <span className="text-text-lighter">Por</span>
            <a
              href="https://sjimenezlon.co/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-primary font-semibold no-underline hover:text-primary/80"
            >
              Santiago Jiménez Londoño
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
            {METRICS.map((m, i) => (
              <div
                key={i}
                className="bg-surface/80 backdrop-blur-sm border border-border rounded-2xl px-3 py-4 hover:border-secondary/30 hover:shadow-md transition-all duration-300"
              >
                <div className="font-display font-extrabold text-text text-xl sm:text-2xl tracking-tight leading-none">{m.v}</div>
                <div className="text-[11px] text-text-lighter mt-1 font-medium">{m.l}</div>
                <div className="text-[10px] text-secondary mt-0.5 font-semibold">{m.s}</div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-2 justify-center">
            {[
              { href: '#fuerzas', icon: Sparkles, label: 'Lo que cambió' },
              { href: '#mapa', icon: MapPin, label: 'Mapa por país' },
              { href: '#categorias', icon: Boxes, label: 'Por categoría' },
              { href: '#equivalencias', icon: ChevronRight, label: 'Equivalencias' },
              { href: '#acceso', icon: Globe2, label: 'Cómo acceder' },
              { href: '#advertencias', icon: ShieldAlert, label: 'Advertencias' },
            ].map((q) => {
              const QIcon = q.icon
              return (
                <a
                  key={q.href}
                  href={q.href}
                  className="inline-flex items-center gap-2 bg-surface border border-border text-text px-5 py-2.5 rounded-xl font-semibold no-underline hover:border-secondary/40 hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-sm"
                >
                  <QIcon className="w-4 h-4 text-secondary" />
                  {q.label}
                </a>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══════════ INTRO ═══════════ */}
      <section className="max-w-5xl mx-auto px-4 pt-12 pb-6">
        <div className="bg-surface rounded-2xl border border-border p-6 md:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-text mb-3 tracking-tight flex items-center gap-2">
            <Compass className="w-5 h-5 text-secondary" />
            ¿Por qué un capítulo para Asia?
          </h2>
          <p className="text-text-light leading-relaxed mb-3">
            Durante años, la conversación sobre IA fue un monólogo de Silicon Valley. En 2025 eso se rompió. Un modelo
            chino —DeepSeek— igualó a los mejores de Occidente con una fracción del presupuesto y lo liberó con pesos
            abiertos; el precio por millón de tokens se desplomó; y en generación de video e imagen, laboratorios chinos
            como Kling, Hailuo y Seedance pasaron a marcar el estado del arte.
          </p>
          <p className="text-text-light leading-relaxed">
            Al mismo tiempo, Corea, Japón, India y el Sudeste Asiático dejaron de esperar y construyeron sus propios
            modelos, entrenados para hablar su idioma y proteger su soberanía de datos. Ignorar Asia hoy es ignorar la
            mitad del mapa. Este capítulo traduce ese ecosistema al español y lo pone en contexto latinoamericano: qué
            herramienta asiática es la contraparte de la que ya usas, cuánto cuesta, cómo se accede desde Colombia y qué
            precauciones tomar antes de subir un solo dato.
          </p>
        </div>
      </section>

      {/* ═══════════ FUERZAS / LO QUE CAMBIÓ ═══════════ */}
      <section id="fuerzas" className="max-w-6xl mx-auto px-4 pt-6 pb-12 scroll-mt-20">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-warm/10 text-warm px-3 py-1 rounded-full text-xs font-semibold mb-3 border border-warm/15">
            <Zap className="w-3 h-3" />
            Lo que cambió en 2025–2026
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-text tracking-tight mb-2">
            Cuatro fuerzas detrás del auge
          </h2>
          <p className="text-text-light text-sm max-w-2xl mx-auto">
            Para entender el catálogo que sigue, conviene entender primero por qué Asia dejó de ir a la zaga.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FORCES.map((f) => {
            const FIcon = f.icon
            return (
              <div
                key={f.kicker}
                className="group relative bg-surface rounded-2xl border border-border p-5 hover:shadow-md hover:-translate-y-0.5 hover:border-warm/30 transition-all duration-300 flex flex-col overflow-hidden"
              >
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-warm/5 rounded-full blur-xl group-hover:bg-warm/10 transition-colors" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-warm/10 flex items-center justify-center ring-4 ring-warm/5">
                      <FIcon className="w-5 h-5 text-warm" />
                    </div>
                    <span className="font-display font-extrabold text-text-lighter/40 text-3xl tracking-tighter leading-none">
                      {f.kicker}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-text text-base leading-tight tracking-tight mb-2">{f.title}</h3>
                  <p className="text-xs text-text-light leading-relaxed">{f.body}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ═══════════ MAPA POR PAÍS ═══════════ */}
      <section id="mapa" className="max-w-6xl mx-auto px-4 py-10 scroll-mt-20">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-primary/8 text-primary px-3 py-1 rounded-full text-xs font-semibold mb-3 border border-primary/10">
            <MapPin className="w-3 h-3" />
            El mapa de un vistazo
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-text tracking-tight mb-2">
            Quién es quién en Asia
          </h2>
          <p className="text-text-light text-sm max-w-2xl mx-auto">
            China lleva la delantera en escala y costo; el resto de Asia juega la carta de la soberanía y la lengua.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {COUNTRIES.map((c) => (
            <div
              key={c.name}
              className={`group relative bg-surface rounded-2xl border border-border p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-12 h-12 ${c.bg} rounded-xl flex items-center justify-center shrink-0 ring-4 ${c.ring} text-2xl`}>
                  {c.flag}
                </div>
                <div className="min-w-0">
                  <div className={`text-[10px] font-bold uppercase tracking-[0.12em] ${c.color}`}>{c.tag}</div>
                  <h3 className="font-display font-bold text-text text-lg tracking-tight leading-none mt-0.5">{c.name}</h3>
                </div>
              </div>
              <p className="text-xs text-text-light leading-relaxed mb-3 flex-1">{c.desc}</p>
              <div className="flex items-start gap-1.5 pt-3 border-t border-border/60">
                <Star className={`w-3 h-3 mt-0.5 shrink-0 ${c.color}`} />
                <span className="text-[11px] text-text-lighter leading-snug">{c.stars}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════ QUICK NAV CATEGORÍAS ═══════════ */}
      <section id="categorias" className="max-w-5xl mx-auto px-4 py-6 scroll-mt-20">
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-text-lighter uppercase tracking-[0.12em]">
            <Boxes className="w-3 h-3" />
            El catálogo chino · salto rápido
          </div>
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          {CHINA_SECTIONS.map((s) => {
            const SIcon = s.icon
            return (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-surface border border-border rounded-full text-sm text-text-light no-underline hover:border-secondary/40 hover:text-secondary hover:shadow-md transition-all"
              >
                <SIcon className={`w-3.5 h-3.5 ${s.color}`} />
                {s.title}
              </a>
            )
          })}
        </div>
      </section>

      {/* ═══════════ SECCIONES CHINA ═══════════ */}
      <div className="max-w-6xl mx-auto px-4 pb-6 space-y-12">
        {CHINA_SECTIONS.map((section) => {
          const Icon = section.icon
          return (
            <section key={section.id} id={section.id} className="scroll-mt-20">
              <div className="flex items-start gap-4 mb-6">
                <div className={`w-12 h-12 ${section.bg} rounded-xl flex items-center justify-center shrink-0`}>
                  <Icon className={`w-6 h-6 ${section.color}`} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🇨🇳</span>
                    <h2 className="text-2xl font-bold text-text tracking-tight">{section.title}</h2>
                  </div>
                  <p className="text-text-light leading-relaxed mt-1 max-w-3xl">{section.lead}</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {section.tools.map((t) => (
                  <AsiaCard key={t.name} t={t} color={section.color} bg={section.bg} />
                ))}
              </div>

              {section.also && (
                <div className="mt-4 flex items-start gap-2.5 bg-surface border border-border rounded-xl p-4">
                  <Info className={`w-4 h-4 mt-0.5 shrink-0 ${section.color}`} />
                  <p className="text-xs text-text-light leading-relaxed">{section.also}</p>
                </div>
              )}
            </section>
          )
        })}
      </div>

      {/* ═══════════ ASIA FUERA DE CHINA ═══════════ */}
      <section className="relative overflow-hidden py-16 mt-8" style={{ background: 'linear-gradient(135deg, #0b1320 0%, #141d33 50%, #1a1530 100%)' }}>
        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 20%, #ffffff 1px, transparent 1px), radial-gradient(circle at 80% 70%, #ffffff 1px, transparent 1px)',
            backgroundSize: '48px 48px, 64px 64px',
          }}
        />
        <div className="absolute -top-32 -left-24 w-96 h-96 bg-primary/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-24 w-96 h-96 bg-warm/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-semibold mb-5 border border-white/20">
              <Landmark className="w-3 h-3" />
              Más allá de China · soberanía y lengua
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4 leading-[1.05]">
              La otra Asia: modelos <span className="text-gradient-gold">para hablar lo propio</span>
            </h2>
            <p className="text-white/70 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
              Fuera de China, la meta no es vencer a GPT en inglés, sino dominar el japonés, el coreano, las 22 lenguas
              indias o el birmano —y guardar los datos en casa—. Aquí abunda el <span className="text-white font-semibold">peso
              abierto en Hugging Face</span> y el respaldo de Estados y conglomerados.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {ASIA_COUNTRIES.map((c) => (
              <div key={c.name} className="bg-white/[0.04] backdrop-blur-sm border border-white/10 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{c.flag}</span>
                  <h3 className="font-display font-bold text-white text-xl tracking-tight">{c.name}</h3>
                </div>
                <p className="text-white/60 text-xs leading-relaxed mb-4">{c.intro}</p>
                <div className="space-y-2">
                  {c.tools.map((tool) => (
                    <a
                      key={tool.name}
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block group rounded-xl border p-3 no-underline transition-all ${
                        tool.warn
                          ? 'border-warm/30 bg-warm/[0.06] hover:border-warm/50'
                          : 'border-white/8 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.05]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-semibold text-white text-sm flex items-center gap-1.5">
                          {tool.warn && <AlertTriangle className="w-3 h-3 text-warm" />}
                          {tool.name}
                        </span>
                        <span className="text-[10px] text-white/40 shrink-0">{tool.org}</span>
                      </div>
                      <p className="text-[11px] text-white/60 mt-1 leading-snug">{tool.what}</p>
                      <div className="flex items-center gap-1.5 text-[10px] text-white/40 mt-2">
                        <MapPin className="w-2.5 h-2.5 shrink-0" />
                        <span>{tool.access}</span>
                        <ExternalLink className="w-2.5 h-2.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ EQUIVALENCIAS ═══════════ */}
      <section id="equivalencias" className="max-w-5xl mx-auto px-4 py-14 scroll-mt-20">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-semibold mb-3 border border-accent/15">
            <ChevronRight className="w-3 h-3" />
            Traductor rápido
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-text tracking-tight mb-2">
            La contraparte asiática de lo que ya usas
          </h2>
          <p className="text-text-light text-sm max-w-2xl mx-auto">
            Si tu flujo de trabajo depende de una herramienta occidental, esta tabla te dice por dónde empezar en Asia.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-border shadow-sm">
          <table className="w-full text-sm bg-surface">
            <thead>
              <tr className="border-b border-border bg-text/[0.03]">
                <th className="text-left font-bold text-text-lighter uppercase tracking-[0.1em] text-[11px] px-4 py-3">Si usas (Occidente)</th>
                <th className="text-left font-bold text-text-lighter uppercase tracking-[0.1em] text-[11px] px-4 py-3 hidden sm:table-cell">Categoría</th>
                <th className="text-left font-bold text-text-lighter uppercase tracking-[0.1em] text-[11px] px-4 py-3">Contraparte asiática</th>
              </tr>
            </thead>
            <tbody>
              {EQUIVALENCES.map((e, i) => (
                <tr key={i} className="border-b border-border/60 last:border-0 hover:bg-text/[0.02] transition-colors">
                  <td className="px-4 py-3 font-semibold text-text whitespace-nowrap">{e.west}</td>
                  <td className="px-4 py-3 text-text-lighter text-xs hidden sm:table-cell whitespace-nowrap">{e.cat}</td>
                  <td className="px-4 py-3 text-text-light">{e.asia}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ═══════════ CÓMO ACCEDER ═══════════ */}
      <section id="acceso" className="max-w-5xl mx-auto px-4 py-8 scroll-mt-20">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-primary/8 text-primary px-3 py-1 rounded-full text-xs font-semibold mb-3 border border-primary/10">
            <Globe2 className="w-3 h-3" />
            Desde Colombia
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-text tracking-tight mb-2">
            Cómo acceder (y con qué expectativa)
          </h2>
          <p className="text-text-light text-sm max-w-2xl mx-auto">
            Casi todo tiene dos caminos: la versión doméstica china (en chino, a veces con teléfono +86) y una versión
            internacional que sí funciona desde LATAM con un correo.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {ACCESS.map((a) => {
            const AIcon = a.icon
            return (
              <div key={a.title} className="bg-surface rounded-2xl border border-border p-5 hover:shadow-md hover:border-primary/30 transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-lg bg-primary/8 flex items-center justify-center shrink-0">
                    <AIcon className="w-4.5 h-4.5 text-primary" />
                  </div>
                  <h3 className="font-display font-bold text-text text-sm tracking-tight">{a.title}</h3>
                </div>
                <p className="text-xs text-text-light leading-relaxed">{a.body}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* ═══════════ ADVERTENCIAS ═══════════ */}
      <section id="advertencias" className="max-w-5xl mx-auto px-4 py-10 scroll-mt-20">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-rose-50 text-rose-700 px-3 py-1 rounded-full text-xs font-semibold mb-3 border border-rose-200">
            <ShieldAlert className="w-3 h-3" />
            Antes de subir un dato
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-text tracking-tight mb-2">
            Tres advertencias que no puedes saltarte
          </h2>
          <p className="text-text-light text-sm max-w-2xl mx-auto">
            La ventaja de costo es real; regalar información sensible también. Usar estas herramientas con criterio es la
            diferencia.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {RED_FLAGS.map((r) => {
            const RIcon = r.icon
            return (
              <div key={r.title} className="relative bg-surface rounded-2xl border border-rose-200/60 p-5 hover:shadow-md transition-all">
                <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-rose-400/60" />
                <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center mb-3 mt-1">
                  <RIcon className="w-5 h-5 text-rose-600" />
                </div>
                <h3 className="font-display font-bold text-text text-sm tracking-tight mb-2">{r.title}</h3>
                <p className="text-xs text-text-light leading-relaxed">{r.body}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* ═══════════ CIERRE / CTA ═══════════ */}
      <section className="max-w-4xl mx-auto px-4 py-14">
        <div className="relative overflow-hidden bg-surface rounded-3xl border border-border p-8 md:p-12 text-center shadow-sm">
          <div className="absolute -top-16 -right-16 w-56 h-56 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
          <div className="relative">
            <h2 className="text-2xl md:text-3xl font-extrabold text-text tracking-tight mb-3">
              Asia no es el futuro de la IA: es su presente paralelo
            </h2>
            <p className="text-text-light leading-relaxed max-w-2xl mx-auto mb-8">
              Saber qué suben estas herramientas, dónde y para qué es la diferencia entre aprovechar una ventaja de costo
              y regalar información. Compara con las opciones occidentales del catálogo, o deja que el recomendador te
              guíe si no sabes por dónde empezar.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                to="/explorar"
                className="inline-flex items-center gap-2 bg-text text-white px-6 py-3 rounded-xl font-semibold no-underline hover:bg-text/90 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Boxes className="w-4 h-4" />
                Explorar el catálogo
              </Link>
              <Link
                to="/recomendador"
                className="inline-flex items-center gap-2 bg-surface border border-border text-text px-6 py-3 rounded-xl font-semibold no-underline hover:border-primary/40 hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Compass className="w-4 h-4 text-primary" />
                Ir al recomendador
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
