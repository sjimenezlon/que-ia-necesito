# Capítulo de sector público — revisión del 5 de septiembre de 2026

## Resultado

El capítulo se organiza como una guía de trabajo: ocho rutas por rol con contexto editable, destinatario, tipo de datos, prompt copiable, ejemplo ficticio de salida, controles de revisión y métricas. El acceso desde Inicio anuncia la actualización de septiembre.

Las rutas cubren atención ciudadana, contratación, planeación, control interno, comunicaciones, dirección, jurídica y tecnología. Se conservan las anclas públicas `roles`, `prompts`, `notebook-lab`, `madurez`, `red-flags`, `primera-semana`, `quick-wins` y `reflexiones`; se añaden `novedades` y `fuentes`.

Cada ruta puede compartirse con `?caso=ID#roles`. Ese enlace contiene únicamente el identificador de ruta. Los contextos y las revisiones se mantienen en memoria durante la visita, separados por ruta; las revisiones también se separan por tipo de datos. No se guardan en almacenamiento persistente ni se envían a un modelo.

## Criterio editorial y fuentes

Se consultaron fuentes oficiales para distinguir leyes, sentencias, conceptos, guías y anuncios. La selección no es un inventario exhaustivo de regulación ni una determinación jurídica sobre un expediente.

- [CCE, C-1015 de 2026](https://relatoria.colombiacompra.gov.co/conceptos/c-1015-de-2026/): la ficha identifica fecha 10 de agosto de 2026. Se incorpora como concepto sobre IA y contratación, con énfasis en revisión, trazabilidad y responsabilidad.
- [Guía ética, publicación MinTIC del 7 de enero de 2026](https://mintic.gov.co/portal/715/w3-article-425888.html) y [documento](https://www.mintic.gov.co/portal/715/articles-425888_recurso_1.pdf): se distingue el alcance orientador y el enfoque en entidades del orden nacional.
- [MSPI e IA, MinTIC, 22 de abril de 2026](https://www.mintic.gov.co/portal/715/w3-article-437197.html): seguridad y privacidad durante el ciclo del sistema.
- [CONPES 4144, resumen oficial DNP](https://sisconpes.dnp.gov.co/SisCONPESWeb/new_ctmp/DocumentosConpes/ConpesParalaGente/CONPES_GENTE_4144.pdf): seis ejes, 106 acciones y financiación estimada. No se presenta como ejecución presupuestal.
- [SIC, Circular Externa 002 de 2024](https://sedeelectronica.sic.gov.co/transparencia/normativa/circular-externa-2-de-2024-de-la-superintendencia-de-industria-y-comercio-lineamientos-sobre-el-tratamiento-de-datos): tratamiento de datos personales en IA.
- [Ley 1581 de 2012, SUIN](https://www.suin-juriscol.gov.co/viewDocument.asp?ruta=Leyes%2F1684507): la excepción de autorización no elimina los demás deberes de tratamiento.
- [T-323 de 2024, Corte Constitucional](https://www.corteconstitucional.gov.co/Relatoria/2024/T-323-24.htm): se conserva su contexto judicial. Se eliminan afirmaciones categóricas de nulidad y sanción automática de actos administrativos.
- [Ley 1755 de 2015](https://www.funcionpublica.gov.co/eva/gestornormativo/norma_pdf.php?i=65334) y [Ley 4 de 1913, art. 62](https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=8426): términos generales orientativos; no se automatiza el vencimiento de expedientes.
- [Resolución 1519 de 2020, MinTIC](https://normograma.mintic.gov.co/mintic/compilacion/docs/resolucion_mintic_1519_2020.htm): accesibilidad web y referencia WCAG 2.1 AA.
- [Bogotá Te Escucha, 25 de marzo de 2026](https://bogota.gov.co/mi-ciudad/gestion-publica/bogota-lanzo-canal-de-conversacion-y-atencion-ciudadania-con-ia): orientación desde fuentes oficiales y derivación al canal formal. La fuente enlazada no acredita el porcentaje 17% → 97% anterior; se retira.
- [ADRES, anuncio del 14 de abril de 2026](https://www.adres.gov.co/sala-de-prensa/noticias/adres-lanza-el-sistema-inteligente-de-auditoria-soportado): el cuerpo del comunicado presenta la reducción a menos de dos semanas como expectativa. Se diferencia de un resultado observado. La página muestra también una fecha de actualización en mayo.
- [Ayuda oficial NotebookLM](https://support.google.com/notebooklm/answer/16269187?hl=es-419) y [documentación de cuenta y privacidad](https://support.google.com/gemininotebook/answer/16164461?hl=es): se remite a condiciones y límites vigentes, sin garantizar un número universal de fuentes ni privacidad por el solo uso de un correo institucional.

Se retiraron cifras de desempeño no sustentadas, garantías de ausencia de alucinaciones y el reproductor de audio sin archivo real. Los ejemplos y sus resultados están marcados como ficticios y se separan de los anuncios institucionales. El laboratorio NotebookLM es una guía interactiva sin integración con el proveedor.

## Verificación

- `npm run lint`, `npm run build` y `git diff --check`.
- Comprobación de referencias del contenido: ocho identificadores de ruta únicos, nueve fichas de fuentes, dos casos documentados y ninguna herramienta o referencia inexistente.
- Navegador real sobre Vite: selección de las ocho rutas, títulos, ejemplos y dos herramientas asociadas a cada una.
- Edición del contexto y destinatario; persistencia al cambiar de ruta y regresar. Restauración disponible sin alterar las otras rutas.
- Selección de datos personales o reservados: orientación y prompt reflejan la condición elegida.
- Copia del prompt personalizada: portapapeles verificado con el contexto editado y estado de éxito.
- Compartir ruta: portapapeles verificado con URL del dominio canónico y sin contexto personal.
- Apertura de enlace directo desde otra pestaña: selección correcta, desplazamiento a casos y ejemplo original, sin el borrador privado.
- Ficha: dos condiciones, copia con marcas correctas, separación por ruta, regreso con progreso conservado, seis condiciones y reinicio a cero. Completar no se presenta como aprobación institucional.
- Calculadora: valores iniciales `(40 − 15 − 10) × 20 = 300 min`, ahorro de 5 horas; revisión de 50 minutos produce −500 minutos y muestra coste adicional. Campo vacío mediante teclado muestra instrucción, sin NaN. El `fill('')` del navegador automatizado no vació el control numérico; se verificó con selección y retroceso del teclado.
- Laboratorio: navegación al paso 3, texto coherente y copia del prompt de lectura comprobada en el portapapeles.
- Revisión visual en tema claro y oscuro, escritorio y móvil de 390 px. A 320 px el ancho del documento coincide con el viewport; el índice horizontal desplaza dentro de su propio contenedor.
- Corregido el número de sección para que no se parta en pantallas estrechas. Foco de teclado visible en el contexto.
- Consola del capítulo: sin errores durante las pruebas.

La advertencia de Vite sobre el bundle principal de más de 500 kB era previa y continúa. El capítulo conserva carga diferida y su contenido está separado del componente para facilitar próximas revisiones.
