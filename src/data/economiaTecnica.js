// Caja técnica del capítulo «Decisiones económicas»: pricing, bases de datos, Markdown y monitoreo.
// Los dos conjuntos de datos.gov.co se comprobaron el 16-nov-2026 (campos y respuesta).

export const technical = [
  {
    id: 'pricing',
    label: 'Pricing',
    title: 'Los conceptos que hay que tener claros antes de pedirle un precio a la IA.',
    intro:
      'Un asistente puede estimar y simular. Para leer lo que entrega hacen falta diez ideas de microeconomía.',
    concepts: [
      [
        'Elasticidad precio',
        'Cambio porcentual de la cantidad ÷ cambio porcentual del precio. Si es −1,5, subir 10 % el precio baja cerca de 15 % las unidades.',
      ],
      [
        'Demanda elástica o inelástica',
        'Con elasticidad mayor que 1 en valor absoluto, subir el precio reduce el ingreso. Con menor que 1, lo aumenta.',
      ],
      [
        'Elasticidad cruzada',
        'Cómo cambia la venta de un producto cuando cambia el precio de otro: positiva entre sustitutos, negativa entre complementos.',
      ],
      [
        'Disposición a pagar',
        'Lo máximo que un cliente pagaría. La diferencia con el precio es su excedente; ahí vive la segmentación.',
      ],
      [
        'Costo marginal',
        'Lo que cuesta producir una unidad más. El precio se decide con el marginal, no con el costo promedio.',
      ],
      [
        'Margen de contribución',
        'Precio menos costo variable unitario. Es lo que cada unidad aporta para cubrir costos fijos y utilidad.',
      ],
      [
        'Regla de Lerner',
        '(Precio − costo marginal) ÷ precio = 1 ÷ |elasticidad|. Con elasticidad −2, el margen que maximiza la utilidad es 50 %. Solo aplica con demanda elástica.',
      ],
      [
        'Punto de equilibrio',
        'Costos fijos ÷ margen de contribución unitario: las unidades desde las que se deja de perder.',
      ],
      [
        'Traspaso de costos',
        'Qué parte de un alza de costos (dólar, insumos, salario) llega al precio final. Rara vez es el 100 %.',
      ],
      [
        'Segmentación de precios',
        'Cobrar distinto por versión, volumen, canal o momento. Exige que los segmentos no puedan revenderse entre sí.',
      ],
    ],
    code: {
      label: 'Prompt técnico',
      lang: 'text',
      text: `Te entrego ventas semanales por producto: fecha, producto, precio, unidades, promoción (sí/no).

1. Estima la elasticidad precio de cada producto con una regresión log-log:
   ln(unidades) = a + b·ln(precio) + c·promoción + efectos de mes.
   Reporta b con su intervalo de confianza del 95 % y el número de observaciones.
2. Di en cuáles productos el intervalo no permite distinguir demanda elástica de inelástica.
3. Con el costo variable que te doy, calcula el margen de contribución actual y el margen de la regla de Lerner (1/|b|) solo donde |b| > 1.
4. Advierte los problemas de identificación: precios que cambian junto con la demanda, quiebres de inventario, pocos cambios de precio.
5. Entrega el código en Python (pandas + statsmodels) para que yo lo corra sobre la base completa.

No inventes cifras. Si la muestra no alcanza, dilo.`,
    },
    keep: 'La elasticidad estimada con datos pasados describe a los clientes que ya se tienen, con los precios que ya se probaron. Fuera de ese rango, es una apuesta.',
  },
  {
    id: 'datos',
    label: 'Bases de datos',
    title: 'Tres caminos para que la IA trabaje con sus datos, del más simple al más serio.',
    intro:
      'Un asistente no ve la base de la organización hasta que alguien se la conecta. Cómo se conecta decide qué tan confiable y qué tan seguro es el resultado.',
    concepts: [
      [
        '1 · Subir un archivo',
        'Exportar a CSV o Excel y adjuntarlo. Sirve para explorar. Límite: es una foto, y el archivo sale de la organización.',
      ],
      [
        '2 · Pedirle la consulta',
        'Describir las tablas y que el asistente escriba el SQL; lo corre una persona en la base. Los datos no salen; sale solo el resultado que se decida pegar.',
      ],
      [
        '3 · Conector de solo lectura',
        'El asistente consulta la base por un conector (por ejemplo, un servidor MCP) con un usuario que solo puede leer una vista. Es el camino para análisis repetidos.',
      ],
      [
        'Tabla, llave y vista',
        'Una tabla guarda filas; la llave identifica cada fila sin repetirse; una vista es una consulta guardada que expone solo las columnas necesarias.',
      ],
      [
        'Cadena de conexión',
        'Dirección, base, usuario y contraseña. Va en una variable de entorno o en un gestor de secretos. Nunca en el chat ni en el código.',
      ],
      [
        'API de datos abiertos',
        'datos.gov.co, DANE y Banco de la República publican series que se consultan por dirección web, sin base propia y sin permiso de nadie.',
      ],
    ],
    code: {
      label: 'SQL · ventas mensuales desde una vista de solo lectura',
      lang: 'sql',
      text: `-- La vista v_ventas expone solo lo necesario: sin nombres ni documentos de clientes
SELECT producto,
       DATE_TRUNC('month', fecha) AS mes,
       SUM(unidades)              AS unidades,
       SUM(unidades * precio) / SUM(unidades) AS precio_medio
FROM   v_ventas
WHERE  fecha >= DATE '2025-01-01'
GROUP  BY producto, mes
ORDER  BY producto, mes;`,
    },
    code2: {
      label: 'Python · contratos públicos de SECOP II por API abierta',
      lang: 'python',
      text: `import pandas as pd
from urllib.parse import quote

filtro = quote("fecha_de_firma > '2026-01-01'")   # los espacios se codifican
url = ("https://www.datos.gov.co/resource/jbjy-vk9h.json"
       "?$select=nombre_entidad,proveedor_adjudicado,valor_del_contrato,fecha_de_firma"
       f"&$where={filtro}"
       "&$limit=5000")
contratos = pd.read_json(url)
contratos["valor_del_contrato"] = contratos["valor_del_contrato"].astype(float)
print(contratos.groupby("nombre_entidad")["valor_del_contrato"].sum().nlargest(10))`,
    },
    keep: 'Qué datos puede ver la máquina. Usuario de solo lectura, una vista con lo mínimo, datos personales fuera, y la consulta guardada junto al resultado para que otro pueda rehacerla.',
  },
  {
    id: 'markdown',
    label: 'Markdown',
    title: 'El formato en el que una persona y un modelo leen lo mismo.',
    intro:
      'Markdown es texto plano con unas pocas marcas. No depende de ningún programa, se puede versionar y es el formato que mejor entienden los asistentes.',
    concepts: [
      ['# Título', 'Un numeral es un título; dos, un subtítulo. La estructura le dice al modelo qué es contexto y qué es instrucción.'],
      ['- Lista', 'Un guion por elemento. Para pasos en orden, números: 1. 2. 3.'],
      ['| Tabla |', 'Barras verticales separan columnas. Sirve para diccionarios de datos y cuadros de supuestos.'],
      ['``` Código', 'Tres acentos graves abren y cierran un bloque: consultas, fórmulas y resultados quedan intactos.'],
      [
        'Archivo de contexto',
        'Un .md con la pregunta, los datos y las reglas. Se pega al empezar o se deja como instrucción permanente del proyecto.',
      ],
      [
        'Bitácora',
        'Un .md por análisis: qué se preguntó, qué consulta se corrió, qué salió, qué se decidió. Es la memoria que el chat no tiene.',
      ],
    ],
    code: {
      label: 'contexto-precios.md',
      lang: 'markdown',
      text: `# Contexto: revisión de precios de la línea A

## Pregunta
¿Subimos 4 % el precio de la línea A en el próximo trimestre?

## Datos disponibles
| Tabla    | Fuente             | Corte      | Llave           |
|----------|--------------------|------------|-----------------|
| v_ventas | ERP, solo lectura  | 2026-10-31 | producto, fecha |
| ipc      | DANE               | 2026-10    | mes             |
| trm      | datos.gov.co       | diario     | fecha           |

## Reglas para el asistente
- No inventes cifras. Si falta un dato, pídelo.
- Toda cifra va con fuente y fecha de corte.
- Entrega intervalos, no un solo número.
- Separa lo que estimaste de lo que supusiste.

## Lo que no decides tú
A qué clientes se les sube y cuándo se comunica. Eso lo firma la gerencia comercial.`,
    },
    keep: 'El contenido. Markdown ordena lo que se sabe; no reemplaza saberlo. Un contexto con supuestos equivocados produce respuestas equivocadas muy bien formateadas.',
  },
  {
    id: 'monitoreo',
    label: 'Monitoreo',
    title: 'Una decisión no termina cuando se firma: se vigila.',
    intro:
      'Monitorear es comparar un dato con un umbral cada cierto tiempo y saber qué hacer cuando lo cruza. La IA puede montar la vigilancia; la acción tiene responsable.',
    concepts: [
      ['Indicador', 'El dato que se vigila, con su fuente y su fecha de publicación: TRM, IPC, tasa de política, cartera vencida, error del pronóstico.'],
      ['Umbral', 'El valor que obliga a revisar. Fijo (más de 5 % de mora) o estadístico (fuera de la media ± 2 desviaciones estándar).'],
      ['Frecuencia', 'Cada cuánto se mira. La marca la fuente: diaria para la TRM, mensual para el IPC, trimestral para el PIB.'],
      ['Error del pronóstico', 'MAPE: promedio de |real − pronóstico| ÷ real. Si crece mes a mes, el modelo dejó de describir el mercado.'],
      ['Deriva', 'Los datos de hoy ya no se parecen a los que entrenaron el modelo. Se detecta comparando distribuciones, no promedios.'],
      ['Alerta, no tablero', 'Un tablero espera a que alguien lo abra. Una alerta llega sola, a una persona con nombre, con la acción sugerida.'],
    ],
    code: {
      label: 'Python · alerta de TRM fuera de banda (datos abiertos)',
      lang: 'python',
      text: `import pandas as pd

url = ("https://www.datos.gov.co/resource/32sa-8pi3.json"
       "?$order=vigenciadesde%20DESC&$limit=60")
trm = pd.read_json(url)
trm["valor"] = trm["valor"].astype(float)

hoy = trm["valor"].iloc[0]
media, desv = trm["valor"].mean(), trm["valor"].std()
piso, techo = media - 2 * desv, media + 2 * desv

if not piso <= hoy <= techo:
    print(f"ALERTA · TRM {hoy:,.0f} fuera de la banda {piso:,.0f} a {techo:,.0f}")
    # aquí va el aviso: correo, Teams o una fila en la bitácora
else:
    print(f"TRM {hoy:,.0f} dentro de la banda {piso:,.0f} a {techo:,.0f}")`,
    },
    code2: {
      label: 'ficha-de-monitoreo.md',
      lang: 'markdown',
      text: `# Ficha de monitoreo

| Indicador            | Fuente       | Frecuencia | Umbral                  | Responsable       | Acción                          |
|----------------------|--------------|------------|-------------------------|-------------------|---------------------------------|
| TRM                  | datos.gov.co | diaria     | fuera de media ± 2 desv | Tesorería         | Revisar precios de importados   |
| IPC anual            | DANE         | mensual    | cambio > 0,5 puntos     | Gerencia comercial| Revisar lista de precios        |
| Error del pronóstico | modelo       | mensual    | MAPE > 15 %             | Planeación        | Reestimar o cambiar de método   |
| Cartera vencida      | ERP          | semanal    | > 5 % de la cartera     | Comité de crédito | Revisar cupos                   |`,
    },
    keep: 'El umbral y la acción. Una máquina puede vigilar mil series; decidir cuál importa y qué se hace cuando se mueve es parte de la decisión original.',
  },
]
