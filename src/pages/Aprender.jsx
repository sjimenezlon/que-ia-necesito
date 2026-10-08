import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowLeft, CheckCircle2, BookOpen } from 'lucide-react'
import CopyButton from '../components/CopyButton'
import { readProgress, saveProgress } from '../utils/learning'
import './learning.css'

const lessons = [
  {
    title: 'Empieza por el resultado',
    subtitle: 'La tarea viene antes que la herramienta.',
    explanation:
      'Elige algo pequeño que puedas comprobar: un correo, una tabla o un resumen. Especifica para quién es y qué debe permitir hacer.',
    before: 'Ayúdame con mi negocio.',
    after:
      'Necesito un borrador de correo para confirmar una cita con un cliente. Debe incluir fecha, hora, lugar y cómo reprogramar.',
    question: '¿Cuál es el objetivo más fácil de comprobar?',
    options: [
      'Mejorar toda la empresa.',
      'Crear un correo con cuatro datos confirmados.',
      'Usar la IA más nueva.',
    ],
    answer: 1,
    feedback:
      'Un entregable concreto permite saber si la respuesta sirve. «Mejorar toda la empresa» todavía no define una tarea.',
  },
  {
    title: 'Dale material para trabajar',
    subtitle: 'Contexto + datos + entregable + criterio.',
    explanation:
      'Un prompt es una instrucción. Incluye la información necesaria, el formato que esperas y las reglas que debe respetar. Si un dato falta, pide que lo señale.',
    before: 'Escribe algo amable y profesional.',
    after:
      'Redacta un correo de máximo 80 palabras. Cita: martes 13 de octubre de 2026, 10:00 a. m., por videollamada. El enlace está pendiente. No lo inventes. Pide confirmar disponibilidad.',
    question: 'Si no tienes el enlace de la reunión, ¿qué debes pedir?',
    options: [
      'Que invente uno verosímil.',
      'Que omita la reunión.',
      'Que lo marque como pendiente.',
    ],
    answer: 2,
    feedback:
      'Un dato pendiente debe seguir siendo pendiente. Más detalle en la instrucción ayuda, pero no garantiza una respuesta correcta.',
  },
  {
    title: 'Comprueba lo importante',
    subtitle: 'Que suene bien no significa que esté bien.',
    explanation:
      'Contrasta nombres, cifras, fechas y fuentes con el material original. Si aparece una afirmación nueva, pide evidencia o retírala. Repite los cálculos por tu cuenta.',
    before: 'La IA dice: «Confirmamos la reunión presencial a las 11:00».',
    after:
      'Corregir: la cita es por videollamada, a las 10:00 a. m. El enlace sigue pendiente. Revisar el correo completo antes de enviarlo.',
    question: '¿Qué haces con una respuesta que cambió la hora?',
    options: [
      'La corrijo contra la fuente y reviso el resto.',
      'La envío porque está bien escrita.',
      'Le pido un tono más elegante.',
    ],
    answer: 0,
    feedback:
      'Comprobar contra la fuente descubre errores que una mejora de estilo no soluciona. La persona que usa el resultado conserva la decisión final.',
  },
  {
    title: 'Mejora y vuelve a intentar',
    subtitle: 'Una corrección precisa enseña más que «hazlo mejor».',
    explanation:
      'Señala qué falló, qué debe conservar y cómo sabrás que la versión nueva funciona. Después aplica el mismo método a otra tarea.',
    before: 'No me gusta. Hazlo mejor.',
    after:
      'Mantén fecha y modalidad. Corrige la hora a las 10:00 a. m. Incluye «enlace pendiente de confirmación». Reduce a 80 palabras y termina pidiendo confirmar asistencia.',
    question: '¿Cuál es el siguiente paso después de corregir?',
    options: [
      'Dejar que siempre envíe sin revisión.',
      'Revisar la nueva versión y medir si te ayudó.',
      'Aceptar cualquier respuesta más larga.',
    ],
    answer: 1,
    feedback:
      'Aprender con IA es un ciclo: definir, probar, comprobar y ajustar. El progreso se ve en una tarea mejor resuelta, no en la longitud de la respuesta.',
  },
]

export default function Aprender() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState(() =>
    readProgress(
      'qia-learning-v1',
      {},
      (v) =>
        typeof v === 'object' &&
        !Array.isArray(v) &&
        Object.entries(v).every(
          ([k, a]) => ['0', '1', '2', '3'].includes(k) && [0, 1, 2].includes(a)
        )
    )
  )
  const [storageOk, setStorageOk] = useState(true)
  const heading = useRef(null)
  const lesson = lessons[step]
  const count = lessons.filter((l, i) => answers[i] === l.answer).length
  const move = (value) => {
    setStep(value)
    heading.current?.focus()
  }
  return (
    <div className="learning-page">
      <section className="lab-container lab-section learn-intro">
        <span className="lab-kicker">
          <BookOpen size={16} /> Tu primera ruta · 10 minutos
        </span>
        <h1>
          Aprende a pedir.
          <br />
          <em>Aprende a comprobar.</em>
        </h1>
        <p>
          No necesitas saber de modelos ni de programación. Practica cuatro decisiones que hacen más
          útil cualquier herramienta de IA.
        </p>
        <div className="lab-progress-copy">
          <span>{count} de 4 ideas comprobadas</span>
          <span>Sin cuenta · a tu ritmo</span>
        </div>
        <progress max={4} value={count} aria-label="Ideas comprobadas" />
      </section>
      <section className="lab-container">
        <div className="lab-workshop">
          <nav className="lab-steps" aria-label="Lecciones">
            {lessons.map((l, i) => (
              <button
                key={l.title}
                onClick={() => move(i)}
                aria-current={step === i ? 'step' : undefined}
              >
                <span>{answers[i] === l.answer ? <CheckCircle2 size={18} /> : i + 1}</span>
                {['Define', 'Da contexto', 'Comprueba', 'Mejora'][i]}
              </button>
            ))}
          </nav>
          <div className="lab-workshop-body">
            <div tabIndex={-1} ref={heading}>
              <span className="lab-kicker">Lección {step + 1} / 4</span>
              <h2>{lesson.title}</h2>
              <h3>{lesson.subtitle}</h3>
            </div>
            <p>{lesson.explanation}</p>
            <div className="lab-two-col learn-comparison">
              <div>
                <span className="lab-kicker">Punto de partida</span>
                <p>«{lesson.before}»</p>
              </div>
              <div>
                <span className="lab-kicker">Una decisión más útil</span>
                <p>{lesson.after}</p>
              </div>
            </div>
            <fieldset className="lab-quiz">
              <legend>{lesson.question}</legend>
              {lesson.options.map((option, i) => (
                <label key={option}>
                  <input
                    type="radio"
                    name={`lesson-${step}`}
                    checked={answers[step] === i}
                    onChange={() => {
                      const next = { ...answers, [step]: i }
                      setAnswers(next)
                      setStorageOk(saveProgress('qia-learning-v1', next))
                    }}
                  />
                  {option}
                </label>
              ))}
              {answers[step] !== undefined && (
                <p
                  role="status"
                  className={`lab-feedback ${answers[step] === lesson.answer ? 'good' : ''}`}
                >
                  <strong>
                    {answers[step] === lesson.answer ? 'Exacto. ' : 'Inténtalo de nuevo. '}
                  </strong>
                  {lesson.feedback}
                </p>
              )}
            </fieldset>
          </div>
          <div className="lab-step-footer">
            <button
              className="lab-text-button"
              disabled={step === 0}
              onClick={() => move(step - 1)}
            >
              <ArrowLeft size={16} />
              Anterior
            </button>
            <span>{step + 1} de 4</span>
            {step < 3 ? (
              <button
                className="lab-primary"
                disabled={answers[step] !== lesson.answer}
                onClick={() => move(step + 1)}
              >
                Continuar <ArrowRight size={16} />
              </button>
            ) : (
              <Link className="lab-primary" to="/pymes">
                Practicar en mi negocio <ArrowRight size={16} />
              </Link>
            )}
          </div>
        </div>
        <p className="lab-small" role="status">
          {storageOk
            ? 'Tus respuestas se guardan en este navegador para que puedas retomar la ruta.'
            : 'No se pudo guardar el avance en este navegador. Puedes continuar aprendiendo.'}
        </p>
      </section>
      <section className="lab-container lab-section">
        <span className="lab-kicker">Tu siguiente intento</span>
        <h2>{count === 4 ? 'Ya tienes un método. Ahora úsalo.' : 'Llévate esta plantilla.'}</h2>
        <p>Completa los espacios con una tarea propia y comprueba lo que recibas.</p>
        <div className="lab-prompt">
          <pre>
            {
              'Necesito [entregable] para [persona y objetivo].\nEstos son los datos confirmados: [datos].\nDevuélvelo en [formato y extensión].\nDebe cumplir [criterios].\nSi falta información, indícala; no la inventes.\nAl final, dime qué debo verificar.'
            }
          </pre>
        </div>
        <CopyButton
          text={
            'Necesito [entregable] para [persona y objetivo].\nEstos son los datos confirmados: [datos].\nDevuélvelo en [formato y extensión].\nDebe cumplir [criterios].\nSi falta información, indícala; no la inventes.\nAl final, dime qué debo verificar.'
          }
          label="Copiar mi plantilla"
        />
        <div className="lab-tool-links">
          <Link to="/pymes">
            Talleres para PyMEs <ArrowRight size={16} />
          </Link>
          <Link to="/ejemplos">
            Ejemplos para otras tareas <ArrowRight size={16} />
          </Link>
          <Link to="/recomendador">
            Elegir mi herramienta <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  )
}
