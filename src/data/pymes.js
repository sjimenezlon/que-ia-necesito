export const sectors = ['Comercio', 'Servicios', 'Alimentos y turismo', 'Manufactura']
export const sizes = ['1–10 personas', '11–50 personas', '51–200 personas']
export const sizeAdvice = [
  'Empieza con una tarea del dueño o de una persona del equipo. Una herramienta y una revisión son suficientes para el primer piloto.',
  'Elige un responsable y otra persona que revise. Comparen resultados con el mismo formato durante una semana.',
  'Prueba en una sola área. Define responsables, permisos y un criterio de calidad antes de extenderlo a otros equipos.',
]

export const exercises = [
  {
    id: 'ventas',
    area: 'Ventas',
    title: 'Responde una cotización con claridad',
    minutes: 15,
    level: 'Para empezar',
    outcome: 'Un borrador comercial con precio comprobable y un siguiente paso.',
    learn: 'Separar lo que sabes de lo que debes confirmar antes de prometer.',
    data: 'Caso ficticio. Un cliente pide 20 kits de bienvenida. Cada kit cuesta COP 45.000. Hay 30 disponibles. Preparación: 3 días hábiles desde la confirmación. No se conoce el costo de envío ni el tratamiento de impuestos. No hay descuentos autorizados.',
    task: 'Redacta una respuesta de máximo 120 palabras para WhatsApp. Incluye cantidad, precio unitario, subtotal y plazo de preparación. Separa los datos por confirmar y termina con una pregunta para avanzar.',
    expected:
      '20 × COP 45.000 = COP 900.000 de subtotal. Preparación: 3 días hábiles desde la confirmación. Envío e impuestos: por confirmar. Preguntar destino y fecha requerida; no asegurar una fecha de entrega ni inventar descuentos.',
    checks: [
      'Verifiqué el subtotal de COP 900.000.',
      'No ofrecí descuentos ni envío gratuito.',
      'Separé preparación de entrega y marqué los datos faltantes.',
    ],
    question: 'La IA ofrece 10 % de descuento para cerrar la venta. ¿Qué haces?',
    options: [
      'Lo envío porque suena convincente.',
      'Lo retiro: no existe un descuento autorizado.',
      'Cambio el descuento por envío gratuito.',
    ],
    answer: 1,
    feedback:
      'El tono convincente no autoriza condiciones comerciales. La persona responsable aprueba precios, descuentos y compromisos.',
    metric: 'Minutos por cotización revisada y porcentaje de cotizaciones sin correcciones.',
    transfer:
      'Usa un producto propio, su lista de precios aprobada y su disponibilidad. Haz cinco borradores y compara el tiempo total, incluida la revisión.',
    tools: ['chatgpt', 'claude', 'gemini'],
  },
  {
    id: 'servicio',
    area: 'Servicio',
    title: 'Atiende una queja sin inventar promesas',
    minutes: 15,
    level: 'Para empezar',
    outcome: 'Una respuesta empática y una ruta de escalamiento.',
    learn:
      'Convertir una política en una respuesta útil sin tomar decisiones que no te corresponden.',
    data: 'Caso ficticio. Pedido P-104: el cliente dice que recibió un artículo distinto. Política interna de práctica: registrar el caso, pedir el código del producto recibido por canal privado y escalar a servicio al cliente. El equipo confirma el siguiente paso en 1 día hábil. No están definidos reintegros, compensaciones ni el plazo de reemplazo. No se incluyen datos personales.',
    task: 'Escribe una respuesta de máximo 90 palabras y una nota interna de tres puntos. Reconoce el problema, pide solo la información necesaria y explica qué debe revisar una persona.',
    expected:
      'Reconocer el inconveniente; solicitar el código por un canal privado; explicar que servicio al cliente confirmará el siguiente paso en 1 día hábil. La nota interna registra P-104, la diferencia reportada y la revisión pendiente. No garantiza reintegro ni reemplazo.',
    checks: [
      'La respuesta respeta el plazo de 1 día hábil.',
      'No promete un reintegro o reemplazo no aprobado.',
      'Pide datos mínimos por un canal privado.',
    ],
    question: 'La política no dice si corresponde devolver el dinero. ¿Qué debe hacer la IA?',
    options: [
      'Escalar la decisión y explicar qué falta.',
      'Aprobar el reintegro.',
      'Negar siempre la solicitud.',
    ],
    answer: 0,
    feedback:
      'La ausencia de una regla no permite inventarla. El ejercicio practica atención, no determina derechos del consumidor ni reemplaza la revisión del caso.',
    metric: 'Tiempo hasta una respuesta revisada y número de promesas incorrectas.',
    transfer:
      'Prueba con cinco casos anonimizados y la política vigente de tu empresa. Una persona revisa cada borrador antes de enviarlo.',
    tools: ['chatgpt', 'claude', 'gemini'],
  },
  {
    id: 'marketing',
    area: 'Marketing',
    title: 'Planea una semana de contenido útil',
    minutes: 20,
    level: 'Para empezar',
    outcome: 'Tres publicaciones con una oferta verificable y una acción medible.',
    learn: 'Dar contexto de cliente, oferta y canal para evitar contenido genérico.',
    data: 'Caso ficticio. Taller de reparación de bicicletas. Público: personas que usan bicicleta para ir al trabajo. Servicio: ajuste básico por COP 60.000; incluye revisión de frenos, cambios y presión de llantas, no incluye repuestos. Atención de lunes a sábado con cita. Objetivo: consultas de personas interesadas. No hay testimonios ni fotografías de clientes autorizadas.',
    task: 'Diseña tres publicaciones: una educativa, una que resuelva una duda y una de oferta. Devuelve una tabla con día, idea, texto de máximo 60 palabras, propuesta visual y llamada a la acción. Mantén los datos del negocio ficticio tal como están.',
    expected:
      'Una pieza explica señales para revisar la bicicleta; otra aclara qué incluye el ajuste; la tercera invita a pedir cita por COP 60.000, sin repuestos. Medir consultas pertinentes y citas confirmadas; no inventar reseñas ni prometer resultados garantizados.',
    checks: [
      'El precio y lo incluido coinciden con el caso.',
      'No hay testimonios inventados ni fotos sin permiso.',
      'Cada publicación tiene una acción que puedo medir.',
    ],
    question: '¿Qué indicador se acerca más al objetivo del ejercicio?',
    options: [
      'Cantidad de adjetivos del texto.',
      'Número de emojis.',
      'Consultas pertinentes y citas confirmadas.',
    ],
    answer: 2,
    feedback:
      'Una publicación útil se evalúa por su relación con el objetivo. Los likes por sí solos no demuestran ventas.',
    metric: 'Consultas pertinentes, citas confirmadas y tiempo de creación más revisión.',
    transfer:
      'Sustituye el caso por una oferta real y aprobada. Revisa texto, imágenes y condiciones antes de publicar; mide durante siete días.',
    tools: ['chatgpt', 'claude', 'canva'],
  },
  {
    id: 'inventario',
    area: 'Operaciones',
    title: 'Detecta qué inventario necesita atención',
    minutes: 20,
    level: 'Con números',
    outcome: 'Una lista de prioridades con cálculos que puedes reproducir.',
    learn: 'Exigir fórmulas, unidades y supuestos antes de aceptar una recomendación.',
    data: 'Datos ficticios. Producto A: inventario 12 unidades, venta media 4 unidades/día, reposición 5 días. Producto B: inventario 40 unidades, venta media 2 unidades/día, reposición 7 días. Producto C: inventario 0 unidades, venta media 0 unidades/día, reposición 3 días. Supón demanda constante solo para este ejercicio. No hay datos de estacionalidad ni pedidos en tránsito.',
    task: 'Calcula cobertura en días = inventario / venta media diaria. Marca alerta cuando cobertura sea menor o igual al tiempo de reposición. Si la venta media es cero, indica que no se puede calcular. Muestra fórmula, resultado y dato faltante. No emitas órdenes de compra.',
    expected:
      'A: 12/4 = 3 días; alerta porque 3 ≤ 5. B: 40/2 = 20 días; sin alerta frente a 7 días. C: división por cero, cobertura no calculable; requiere revisar demanda. Esto no determina cuánto comprar: faltan pedidos en tránsito, stock de seguridad y variaciones de demanda.',
    checks: [
      'Recalculé A = 3 días y B = 20 días.',
      'C aparece como no calculable, no como cero días.',
      'La recomendación reconoce datos faltantes y no compra automáticamente.',
    ],
    question: 'Con ventas diarias iguales a cero, ¿cuál es la cobertura?',
    options: [
      'Cero días.',
      'No se calcula con esta fórmula; hay que revisar el caso.',
      'Tres días.',
    ],
    answer: 1,
    feedback:
      'Dividir por cero no da una cobertura válida. La IA debe reconocer el límite antes de recomendar una compra.',
    metric: 'Errores de cálculo encontrados y minutos para preparar el reporte revisado.',
    transfer:
      'Copia cinco referencias sin datos de clientes. Comprueba cálculos en una hoja de cálculo y pide al responsable de compras validar las alertas.',
    tools: ['chatgpt', 'claude', 'gemini'],
  },
  {
    id: 'caja',
    area: 'Administración',
    title: 'Entiende los movimientos de la semana',
    minutes: 20,
    level: 'Con números',
    outcome: 'Una conciliación sencilla de entradas y salidas de efectivo.',
    learn: 'Distinguir movimiento de caja de utilidad y separar cobros de ventas.',
    data: 'Caso ficticio en COP. Saldo inicial: 2.000.000. Cobros recibidos: 3.500.000. Pago a proveedores: 1.800.000. Nómina pagada: 1.200.000. Arriendo pagado: 500.000. Una factura de venta por 900.000 sigue pendiente de cobro. No hay otros movimientos en el ejercicio.',
    task: 'Organiza los movimientos en una tabla. Calcula entradas, salidas, flujo neto y saldo final, mostrando las sumas. Separa la factura pendiente. Explica en dos frases por qué el saldo final no equivale a utilidad. No des recomendaciones de crédito, inversión ni impuestos.',
    expected:
      'Entradas: COP 3.500.000. Salidas: 1.800.000 + 1.200.000 + 500.000 = COP 3.500.000. Flujo neto: COP 0. Saldo final: COP 2.000.000. La factura pendiente de COP 900.000 no es un cobro recibido. Caja y utilidad siguen criterios distintos; estos datos no bastan para calcular utilidad.',
    checks: [
      'Comprobé entradas y salidas de COP 3.500.000.',
      'El saldo final es COP 2.000.000 y excluye la factura pendiente.',
      'El informe no confunde saldo de caja con utilidad.',
    ],
    question: '¿Se suman los COP 900.000 pendientes al efectivo disponible?',
    options: [
      'No, hasta que se reciba el pago.',
      'Sí, porque la factura ya existe.',
      'Solo la mitad.',
    ],
    answer: 0,
    feedback:
      'Una cuenta por cobrar aún no es efectivo recibido. La referencia es un ejercicio aritmético de caja, no un estado financiero ni asesoría contable.',
    metric: 'Diferencias contra el registro original y tiempo para revisar el resumen.',
    transfer:
      'Practica con cifras simuladas de tu operación. Cuando uses información real, trabaja en una cuenta autorizada y concilia con tu responsable contable.',
    tools: ['chatgpt', 'claude', 'gemini'],
  },
  {
    id: 'procesos',
    area: 'Operaciones',
    title: 'Convierte una tarea repetida en un proceso',
    minutes: 25,
    level: 'Siguiente paso',
    outcome: 'Un procedimiento de cinco pasos y un diseño de automatización supervisada.',
    learn: 'Documentar una tarea antes de conectar aplicaciones o automatizarla.',
    data: 'Caso ficticio. Llegan solicitudes de cotización a un formulario. Campos: identificador, producto y cantidad. Un auxiliar revisa si están completos, consulta la lista de precios vigente, prepara un borrador y lo pasa al responsable comercial. Solo esa persona puede aprobar descuentos y enviar. Pueden llegar solicitudes duplicadas o sin cantidad.',
    task: 'Escribe un procedimiento de cinco pasos con responsable, entrada y salida. Propón qué pasos podrían automatizarse con Make y dónde debe parar el flujo para aprobación. Añade pruebas para datos incompletos, duplicados y precios no encontrados. No conectes servicios ni envíes mensajes.',
    expected:
      'Recibir y validar → detectar duplicados por identificador → consultar precio vigente → preparar borrador → revisar y enviar por una persona. Los casos incompletos o sin precio se detienen. Un duplicado no debe generar otro envío. Registrar resultado y costo; probar primero sin envíos reales.',
    checks: [
      'Hay una persona que aprueba antes del envío.',
      'Incluí pruebas de duplicados, datos incompletos y precios ausentes.',
      'El diseño contempla un registro, un límite de gasto y una forma de detenerlo.',
    ],
    question: '¿Cuándo tiene sentido activar el envío automático?',
    options: [
      'Después de que funcione una sola vez.',
      'En cuanto se pueda conectar el correo.',
      'Tras pruebas, permisos y una decisión explícita del responsable.',
    ],
    answer: 2,
    feedback:
      'Una demostración no valida un proceso. Primero prueba las excepciones, mide fallos y define quién responde cuando algo sale mal.',
    metric: 'Porcentaje de casos correctos, duplicados evitados y costo por ejecución.',
    transfer:
      'Dibuja el proceso actual. Ensaya diez solicitudes ficticias, incluidos errores, con envíos desactivados; evalúa automatizar solo después.',
    tools: ['claude', 'chatgpt', 'make'],
  },
]

export function buildBusinessPrompt(exercise, profile, data, goal) {
  return `CONTEXTO\nEstoy aprendiendo a aplicar IA en una PyME de ${profile.sector.toLowerCase()}, con un equipo de ${profile.size}. El caso de práctica puede pertenecer a otro sector: conserva sus hechos y usa mi perfil solo para adaptar la explicación.\n\nOBJETIVO\n${goal || exercise.outcome}\n\nDATOS DEL EJERCICIO\n${data}\n\nTAREA Y ENTREGABLE\n${exercise.task}\n\nCRITERIOS\nUsa únicamente los datos proporcionados. No inventes precios, políticas, testimonios ni resultados. Si falta información, señálala y pregunta. Muestra operaciones comprobables cuando haya cifras. No publiques, envíes, compres ni modifiques sistemas. Devuelve un borrador para revisión humana.\n\nAL TERMINAR\nIndica qué debo comprobar y hazme una pregunta para verificar que comprendí el resultado.`
}
