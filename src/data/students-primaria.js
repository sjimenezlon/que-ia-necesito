export const PRIMARIA_INDEX = [
  { id: 'p-que-es', label: '¿Qué es la IA?' },
  { id: 'p-tiene-ia', label: '¿Tiene IA?' },
  { id: 'p-detective', label: 'Detective' },
  { id: 'p-secretos', label: '¿Se lo cuento?' },
  { id: 'p-reglas', label: 'Reglas de oro' },
  { id: 'p-cuentos', label: 'Cuentos juntos' },
  { id: 'p-sin-pantalla', label: 'Sin pantalla' },
  { id: 'p-familias', label: 'Para familias' },
  { id: 'p-acuerdo', label: 'Acuerdo familiar' },
]

export const KID_EXPLAIN = [
  {
    title: 'Un loro que leyó muchísimo',
    body: 'Imagina un loro que escuchó millones de conversaciones. Aprendió qué palabras suelen ir juntas y las repite muy bien. Pero no sabe de verdad lo que dice.',
  },
  {
    title: 'Un autocompletar gigante',
    body: 'Cuando escribes en el celular, el teclado adivina la palabra que sigue. La IA hace lo mismo, pero con frases enteras y muy rápido.',
  },
  {
    title: 'Una máquina, no una persona',
    body: 'Puede hablar bonito y ser amable, pero no siente, no te quiere ni te extraña. Es un programa en un computador muy grande.',
  },
]

export const HAS_AI = [
  { item: 'Un asistente de voz que te responde', icon: '🗣️', answer: true, why: 'Escucha tu voz, la convierte en texto y calcula una respuesta.' },
  { item: 'Una linterna', icon: '🔦', answer: false, why: 'Solo prende y apaga. No aprende nada.' },
  { item: 'Los videos que te recomienda una app', icon: '📺', answer: true, why: 'Un algoritmo aprende qué te gusta ver y te muestra más de eso.' },
  { item: 'Una calculadora', icon: '🧮', answer: false, why: 'Sigue reglas fijas. Dos más dos siempre da cuatro, no adivina.' },
  { item: 'Un filtro que te pone orejas de gato', icon: '🐱', answer: true, why: 'Reconoce dónde están tus ojos, nariz y boca en la imagen.' },
  { item: 'Un reloj despertador', icon: '⏰', answer: false, why: 'Suena a la hora que tú pones. No decide nada.' },
  { item: 'Un traductor que escucha y traduce', icon: '🌎', answer: true, why: 'Aprendió de millones de textos en varios idiomas.' },
  { item: 'Un juguete que solo repite lo que grabas', icon: '🧸', answer: false, why: 'Repetir una grabación no es inteligencia: no inventa respuestas nuevas.' },
]

// Cada respuesta tiene un pedazo equivocado (wrong) que el niño debe encontrar.
export const DETECTIVE = [
  {
    question: '¿Cuántas patas tiene una araña?',
    parts: ['Las arañas son animales pequeños', 'que tejen telarañas', 'y tienen seis patas.'],
    wrong: 2,
    fix: 'Las arañas tienen ocho patas. Los insectos, como las hormigas, tienen seis.',
  },
  {
    question: '¿Qué mares tocan a Colombia?',
    parts: ['Colombia tiene costa', 'en el mar Caribe', 'y en el océano Índico.'],
    wrong: 2,
    fix: 'Colombia tiene costa en el mar Caribe y en el océano Pacífico.',
  },
  {
    question: '¿Cuántos lados tiene un triángulo?',
    parts: ['Un triángulo es una figura', 'que tiene cuatro lados', 'y tres esquinas.'],
    wrong: 1,
    fix: 'Un triángulo tiene tres lados y tres esquinas. Tri quiere decir tres.',
  },
  {
    question: '¿Qué necesita una planta para vivir?',
    parts: ['Las plantas necesitan agua', 'luz del sol', 'y comer insectos todos los días.'],
    wrong: 2,
    fix: 'La mayoría de plantas fabrican su alimento con luz, agua y aire. Solo unas pocas atrapan insectos.',
  },
]

export const SHARE_GAME = [
  { item: 'Tu color favorito', answer: 'si', why: 'No dice quién eres ni dónde vives.' },
  { item: 'Tu dirección', answer: 'no', why: 'Nunca. Es información para tu familia, no para una máquina.' },
  { item: 'Un cuento de un dragón que inventaste', answer: 'si', why: '¡Claro! Imaginar es lo mejor que puedes compartir.' },
  { item: 'El nombre de tu colegio', answer: 'no', why: 'Con eso alguien podría saber dónde encontrarte.' },
  { item: 'Una foto tuya', answer: 'no', why: 'Tu cara es tuya. No la subas sin un adulto.' },
  { item: 'Una contraseña', answer: 'no', why: 'Las contraseñas no se cuentan a nadie, ni a la IA.' },
  { item: 'Una pregunta sobre dinosaurios', answer: 'si', why: 'Preguntar por curiosidad está muy bien.' },
  { item: 'Que estás triste o asustado', answer: 'adulto', why: 'Eso cuéntaselo a un adulto de confianza. Una persona sí te puede abrazar.' },
]

export const GOLDEN_RULES = [
  { icon: '👀', title: 'Con un adulto cerca', body: 'Usa la IA en un lugar de la casa donde tu familia te vea.' },
  { icon: '🤐', title: 'Tus datos son tuyos', body: 'Nunca digas tu nombre completo, dirección, colegio, fotos ni contraseñas.' },
  { icon: '🔍', title: 'Se puede equivocar', body: 'Revisa lo que te diga en un libro o pregúntale a un adulto.' },
  { icon: '🤖', title: 'No es una persona', body: 'Aunque hable bonito, no es tu amigo de verdad. Tus amigos son personas.' },
  { icon: '🚪', title: 'Si algo te incomoda, cierra', body: 'Si te da miedo o te hace sentir raro, cierra y cuéntale a un adulto. No te vas a meter en problemas.' },
]

export const STORY_OPTIONS = {
  hero: ['una perrita astronauta', 'un niño inventor', 'una tortuga muy rápida', 'una abuela pirata', 'un robot que no sabía bailar'],
  place: ['un barrio de Medellín', 'el fondo del mar', 'una finca cafetera', 'la Luna', 'una biblioteca mágica'],
  problem: ['se le perdió algo muy importante', 'tiene que ayudar a un amigo', 'le da miedo la oscuridad', 'quiere aprender algo difícil', 'encontró una puerta secreta'],
}

export const UNPLUGGED = [
  {
    title: 'El robot obediente',
    age: '6 a 11 años',
    body: 'Una persona es el robot y solo hace exactamente lo que le dicen: «da dos pasos», «gira a la derecha». La otra lo guía hasta la cocina. Así se entiende que las máquinas siguen instrucciones al pie de la letra.',
  },
  {
    title: '¿Qué palabra sigue?',
    age: '6 a 11 años',
    body: 'Alguien dice el comienzo de un dicho o de una canción y los demás adivinan cómo sigue. Eso mismo hace la IA: adivina la palabra más probable.',
  },
  {
    title: 'Enseñarle a una máquina',
    age: '8 a 11 años',
    body: 'Dibujen 10 frutas y sepárenlas en dos grupos: «redondas» y «alargadas». Luego muestren una fruta nueva: ¿en qué grupo cae? Así aprende la IA, con muchos ejemplos.',
  },
  {
    title: 'Primero yo, después la máquina',
    age: '8 a 11 años',
    body: 'El niño dibuja o escribe su idea primero. Después, con un adulto, le piden algo parecido a la IA y comparan: ¿cuál tiene más de ti?',
  },
]

export const PARENT_KEYS = [
  {
    title: 'Revisa la edad mínima',
    body: 'ChatGPT, Gemini y Perplexity piden 13 años o más, y permiso de la familia para menores de 18; Claude exige 18. Gemini solo admite menores de 13 si los padres lo activan en Family Link. Abajo está la tabla con las fuentes.',
  },
  {
    title: 'Acompaña más de lo que prohíbes',
    body: 'A esta edad la IA es una actividad para hacer juntos, en un espacio común de la casa, no una pantalla para quedarse solo.',
  },
  {
    title: 'Ojo con juguetes y apps que conversan',
    body: 'Antes de comprar un juguete o instalar una app con IA, averigua si graba la voz, dónde guarda lo que oye y cómo se borra.',
  },
  {
    title: 'Los «amigos virtuales» no son para niños',
    body: 'Las apps de compañía con IA están diseñadas para que la persona vuelva una y otra vez. Un niño no tiene cómo defenderse de eso.',
  },
  {
    title: 'Explícale que es una máquina',
    body: 'Dilo con frecuencia y con naturalidad: «es un programa, no una persona; se puede equivocar».',
  },
  {
    title: 'Tú también eres ejemplo',
    body: 'Si te ven verificar, preguntar y dejar el celular en la mesa, eso aprenden.',
  },
]

export const BY_AGE = [
  {
    range: '6 a 8 años',
    doThis: ['Usarla siempre con un adulto, como una actividad juntos', 'Crear cuentos, adivinanzas y dibujos a partir de sus ideas', 'Repetir que es una máquina y que se equivoca'],
    avoid: ['Cuentas propias o uso a solas', 'Asistentes que conversan sin supervisión', 'Subir fotos o grabaciones del niño'],
  },
  {
    range: '9 a 11 años',
    doThis: ['Uso acompañado para curiosidad y proyectos creativos', 'Empezar a verificar: «¿cómo sabemos si es verdad?»', 'Hablar de imágenes y videos falsos'],
    avoid: ['Que haga las tareas por él o ella', 'Apps de compañía o «amigos virtuales»', 'Compartir datos del colegio o de amigos'],
  },
]

export const BEFORE_APP = [
  '¿Qué edad mínima piden sus términos?',
  '¿Graba la voz, la cámara o lo que se escribe?',
  '¿Dónde guarda esa información y por cuánto tiempo?',
  '¿Puedo ver el historial y borrarlo?',
  '¿Tiene controles para padres o cuentas supervisadas?',
  '¿Muestra publicidad o empuja a comprar?',
]

export const PARENT_SCRIPTS = [
  '¿Tú crees que la IA piensa como nosotros? ¿Por qué?',
  'Si la IA te dice algo y no sabemos si es verdad, ¿cómo lo averiguamos?',
  '¿Qué cosas nunca le contarías a un desconocido? ¿Y a una máquina?',
  '¿Qué te gustó más: lo que inventaste tú o lo que inventó la IA?',
  'Si algo en una pantalla te asusta, ¿a quién se lo cuentas?',
]

export const PARENT_PROMPTS = [
  {
    title: 'Ayudar con la tarea sin hacerla',
    text: 'Mi hijo de 8 años tiene una tarea de restas con llevadas. No me des las respuestas. Explícame cómo enseñárselo con fríjoles o con monedas, paso a paso, y dame 3 ejercicios para practicar juntos.',
  },
  {
    title: 'Responder una pregunta difícil',
    text: 'Mi hija de 7 años me preguntó por qué el cielo es azul. Ayúdame a explicárselo con palabras sencillas y un experimento casero que podamos hacer con lo que hay en la cocina.',
  },
  {
    title: 'Plan de fin de semana',
    text: 'Propón 5 actividades sin pantallas para un sábado en familia con niños de 6 y 10 años en Colombia, con poco presupuesto. Incluye una que se pueda hacer si llueve.',
  },
  {
    title: 'Hablar de la IA en casa',
    text: 'Ayúdame a preparar una conversación de 10 minutos para explicarle a mi hijo de 9 años qué es la inteligencia artificial, por qué se equivoca y qué datos nunca debe compartir. Usa ejemplos de su vida diaria.',
  },
]

export const AGREEMENT_PRIMARIA = [
  { id: 'adulto', text: 'Usamos la IA con un adulto cerca, en la sala o el comedor.' },
  { id: 'datos', text: 'Nunca compartimos nombre completo, dirección, colegio, fotos ni contraseñas.' },
  { id: 'verificar', text: 'Si la IA nos dice algo importante, lo revisamos en otra fuente.' },
  { id: 'primero', text: 'Primero pensamos o dibujamos nosotros; después usamos la IA.' },
  { id: 'contar', text: 'Si algo nos asusta o incomoda, cerramos y se lo contamos a un adulto, sin regaños.' },
  { id: 'tiempo', text: 'Acordamos un tiempo de pantalla y lo respetamos.' },
  { id: 'comidas', text: 'En las comidas no hay pantallas, tampoco para los adultos.' },
  { id: 'apps', text: 'Antes de instalar una app o un juguete con IA, lo revisamos juntos.' },
]

export const HELP_LINES = [
  { name: 'Línea 141 del ICBF', body: 'Gratuita, nacional y las 24 horas. Para reportar maltrato, violencia sexual o acoso escolar. Pueden llamar niños y adultos.', url: 'https://www.icbf.gov.co/noticias/linea-141' },
  { name: 'Te Protejo', body: 'Reporte confidencial de situaciones de violencia sexual en entornos digitales contra menores de 18 años.', url: 'https://www.teprotejo.org/' },
  { name: 'Línea 192, opción 4', body: 'Línea nacional de salud mental del Ministerio de Salud. Gratuita y las 24 horas.', url: 'https://www.minsalud.gov.co/' },
  { name: 'Línea 123', body: 'Emergencias. Si un niño corre peligro inmediato, llama primero aquí.', url: 'https://www.policia.gov.co/' },
]
