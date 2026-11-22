/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * EFA ORETANA - 1º CFGM SMR (Sistemas Microinformáticos y Redes)
 * Banco de contenidos curriculares: Tarjetas Didácticas y Supuestos Prácticos de Taller
 */

export interface Flashcard {
  id: string;
  category: 'concepto' | 'bjt' | 'mosfet' | 'smr_hardware' | 'diagnostico';
  level: 1 | 2 | 3;
  levelLabel: string;
  question: string;
  subtitle: string;
  frontKeyPoints: string[];
  schematicType?: 'bjt_npn' | 'bjt_pnp' | 'mosfet_n' | 'diode_test' | 'vrm_phase';
  backTitle: string;
  explanation: string;
  keyFormula?: string;
  smrTip: string;
  tags: string[];
}

export const FLASHCARDS_DATA: Flashcard[] = [
  {
    id: 'fc-1',
    category: 'concepto',
    level: 1,
    levelLabel: 'Nivel 1 · Fundamentos',
    question: '¿Qué es un transistor y cuáles son sus dos funciones esenciales en informática?',
    subtitle: 'El bloque fundamental de toda la arquitectura computacional moderna',
    frontKeyPoints: [
      'Dispositivo semiconductor de 3 terminales',
      'Sustituto de las antiguas válvulas de vacío',
      'Control de grandes flujos mediante señales diminutas'
    ],
    schematicType: 'bjt_npn',
    backTitle: 'Interruptor Digital y Amplificador Analógico',
    explanation: 'Un transistor es un componente semiconductor con tres patillas capaz de controlar el flujo de corriente entre dos de ellas mediante una señal eléctrica aplicada a la tercera. En informática (hardware de PC), funciona principalmente como INTERRUPTOR DIGITAL ULTRARRÁPIDO (estados 0 y 1 lógicos en CPU, GPU y memoria RAM) y como CONMUTADOR DE POTENCIA en fuentes ATX y placas base.',
    keyFormula: 'I_E = I_B + I_C  |  V_CE(sat) ≈ 0.2V',
    smrTip: 'En 1º SMR, el 95% de las veces que analices un transistor en placa base o fuente lo encontrarás trabajando en conmutación (abierto o cerrado), nunca como amplificador de audio analógico.',
    tags: ['Concepto', 'Semiconductores', 'Conmutación', 'Hardware']
  },
  {
    id: 'fc-2',
    category: 'concepto',
    level: 1,
    levelLabel: 'Nivel 1 · Fundamentos',
    question: '¿Cuáles son las 3 zonas de trabajo de un transistor bipolar (BJT)?',
    subtitle: 'Comprender cómo responde según la polarización aplicada a su base',
    frontKeyPoints: [
      'Zona de Corte (Cutoff)',
      'Zona Activa o Lineal (Active)',
      'Zona de Saturación (Saturation)'
    ],
    schematicType: 'bjt_npn',
    backTitle: 'Zonas de Operación: Corte, Activa y Saturación',
    explanation: '1. CORTE: I_B = 0, no hay paso de corriente entre colector y emisor (interruptor abierto, circuito desconectado). 2. ACTIVA: I_C = β · I_B, corriente de salida proporcional a la entrada (amplificador). 3. SATURACIÓN: Conducción máxima permitida por la carga exterior, la caída de tensión V_CE es mínima (~0.2V, interruptor cerrado).',
    keyFormula: 'Corte: I_C = 0 | Saturación: V_CE ≈ 0.2V',
    smrTip: 'Para controlar un relé, un altavoz piezoeléctrico de la BIOS (beeper) o un LED de encendido, el transistor debe trabajar SIEMPRE en Corte (apagado) o Saturación (encendido total), nunca en activa.',
    tags: ['Zonas de Trabajo', 'BJT', 'Corte', 'Saturación']
  },
  {
    id: 'fc-3',
    category: 'bjt',
    level: 1,
    levelLabel: 'Nivel 1 · BJT',
    question: 'BJT NPN vs PNP: ¿Cómo diferenciarlos por su símbolo y polarización?',
    subtitle: 'La regla mnemotécnica de la flecha del emisor en los esquemas de taller',
    frontKeyPoints: [
      'NPN: Flecha sale hacia afuera',
      'PNP: Flecha entra hacia adentro',
      'Regla: NPN = No Pica Nada / PNP = Pica No Pica'
    ],
    schematicType: 'bjt_npn',
    backTitle: 'Sentido de la Corriente y Polaridad de la Base',
    explanation: 'En el transistor NPN, la base necesita una tensión más positiva que el emisor (+0.7V) para conducir, y la corriente fluye de Colector a Emisor (la flecha del símbolo SALE). En el PNP, la base debe ser más negativa que el emisor, y la corriente fluye de Emisor a Colector (la flecha ENTRA).',
    keyFormula: 'NPN: V_BE > 0.7V para encender | PNP: V_EB > 0.7V',
    smrTip: 'En electrónica digital de PC, el NPN se usa frecuentemente como "Low-Side Switch" (conmutando el polo negativo a masa GND).',
    tags: ['BJT', 'NPN', 'PNP', 'Símbolo']
  },
  {
    id: 'fc-4',
    category: 'mosfet',
    level: 2,
    levelLabel: 'Nivel 2 · MOSFET',
    question: '¿Qué significa MOSFET y por qué domina las placas base y fuentes ATX frente al BJT?',
    subtitle: 'Metal-Oxide-Semiconductor Field-Effect Transistor',
    frontKeyPoints: [
      'Puerta (Gate) aislada por óxido de silicio (SiO2)',
      'Control por TENSIÓN (V_GS), no por corriente',
      'Consumo de corriente estática casi nulo en la puerta',
      'Velocidades de conmutación en nanosegundos'
    ],
    schematicType: 'mosfet_n',
    backTitle: 'Control por Campo Eléctrico y Altísima Eficiencia',
    explanation: 'El MOSFET se controla aplicando una diferencia de potencial entre Puerta y Surtidor (V_GS). Al estar la puerta aislada eléctricamente por una capa microscópica de dióxido de silicio, la corriente de puerta es prácticamente CERO. Esto permite que el microcontrolador o chipset no se sobrecargue y que la conmutación sea hiperveloz.',
    keyFormula: 'I_G ≈ 0 A | V_GS > V_TH para conducir',
    smrTip: 'Sin los MOSFETs no existirían los procesadores modernos ni las fuentes de alimentación con certificación 80 Plus Platinum.',
    tags: ['MOSFET', 'Eficiencia', 'Placas Base', 'SMR']
  },
  {
    id: 'fc-5',
    category: 'mosfet',
    level: 2,
    levelLabel: 'Nivel 2 · MOSFET',
    question: 'Terminales del MOSFET: ¿Qué son Gate, Drain y Source?',
    subtitle: 'Correspondencia directa con la Base, Colector y Emisor del BJT',
    frontKeyPoints: [
      'Gate (Puerta / G): Terminal de control aislado',
      'Drain (Drenador / D): Por donde entra la corriente principal',
      'Source (Surtidor o Fuente / S): Por donde sale la corriente'
    ],
    schematicType: 'mosfet_n',
    backTitle: 'Equivalencia de Terminales BJT vs MOSFET',
    explanation: 'Base (B) equivale a Gate (G); Colector (C) equivale a Drain (D); Emisor (E) equivale a Source (S). En un MOSFET Canal N de enriquecimiento (el más común en placas base), cuando aplicas tensión positiva en Gate (V_GS > V_TH), se crea un canal de electrones que permite a la corriente viajar de Drain a Source.',
    keyFormula: 'Canal N: V_GS > V_TH  |  R_DS(on) ultra baja (mΩ)',
    smrTip: 'Cuidado con la electricidad estática (ESD): la finísima capa de óxido de la Puerta (Gate) puede perforarse si manipulas un MOSFET sin pulsera antiestática conectada a tierra en el taller.',
    tags: ['Gate', 'Drain', 'Source', 'ESD']
  },
  {
    id: 'fc-6',
    category: 'smr_hardware',
    level: 2,
    levelLabel: 'Nivel 2 · Hardware de PC',
    question: '¿Qué es el parámetro R_DS(on) y por qué es crítico en las fases VRM de la placa base?',
    subtitle: 'Resistencia entre Drenador y Surtidor en estado de conducción plena',
    frontKeyPoints: [
      'Se mide en milióhmios (mΩ, ej. 2 a 10 mΩ)',
      'Determina cuánto calor genera el MOSFET al alimentar la CPU',
      'P = I² · R_DS(on)'
    ],
    schematicType: 'vrm_phase',
    backTitle: 'Pérdidas por Efecto Joule en la Alimentación del Procesador',
    explanation: 'Una CPU moderna puede consumir 150 Amperios a 1.2 Voltios. La potencia disipada en calor es P = I² · R. Si un MOSFET tiene R_DS(on) = 5 mΩ (0.005 Ω), disipará infinitamente menos calor que uno de 20 mΩ. Menor R_DS(on) = placa base más fría, mayor estabilidad para overclocking y mayor longevidad de los condensadores electrolíticos.',
    keyFormula: 'P_disipada = (I_Drain)² · R_DS(on)',
    smrTip: 'Si los disipadores metálicos que rodean el zócalo de la CPU queman al tacto o la pasta térmica de los thermal pads está reseca, los MOSFETs trabajarán a más de 90°C y pueden entrar en cortocircuito.',
    tags: ['VRM', 'R_DS(on)', 'CPU', 'Temperatura']
  },
  {
    id: 'fc-7',
    category: 'diagnostico',
    level: 2,
    levelLabel: 'Nivel 2 · Diagnóstico en Taller',
    question: '¿Cómo se comprueba un transistor BJT con el polímetro en prueba de diodos?',
    subtitle: 'El modelo equivalente de los dos diodos PN contrapuestos',
    frontKeyPoints: [
      'Poner el multímetro en el icono del diodo (prueba de unión PN)',
      'BJT NPN: Sonda ROJA en Base, NEGRA en Emisor y Colector',
      'Lectura esperada: 0.6V a 0.7V en directa; "OL" en inversa'
    ],
    schematicType: 'diode_test',
    backTitle: 'Prueba de las Uniones Base-Emisor y Base-Colector',
    explanation: 'Un transistor bipolar se comporta internamente como dos diodos unidos por la base. En un NPN: 1) Rojo en Base + Negro en Emisor -> ~0.65V. 2) Rojo en Base + Negro en Colector -> ~0.63V (ligeramente inferior a B-E). 3) Invertir las sondas (Negro en Base) -> debe dar "OL" (Open Loop). 4) Entre Colector y Emisor -> SIEMPRE debe dar "OL" en ambos sentidos. Si marca 0.00V o pita, está en cortocircuito.',
    keyFormula: 'V_BE directa ≈ 0.65V  |  V_BC directa ≈ 0.63V  |  C-E = OL',
    smrTip: 'Esta prueba permite además identificar cuál patilla es el emisor: la unión Base-Emisor tiene un dopado más alto y da una caída de tensión ligeramente MAYOR (ej. 670 mV) que Base-Colector (ej. 650 mV).',
    tags: ['Polímetro', 'Diodo', 'Diagnóstico', 'Taller SMR']
  },
  {
    id: 'fc-8',
    category: 'diagnostico',
    level: 3,
    levelLabel: 'Nivel 3 · Diagnóstico Avanzado',
    question: '¿Cómo detectar un MOSFET de placa base quemado en corto sin desoldarlo?',
    subtitle: 'Síntoma: La fuente ATX hace "clic" y apaga los ventiladores al instante',
    frontKeyPoints: [
      'Causa: Activación de la protección OCP/SCP de la fuente',
      'Medición en el conector EPS 12V de 4/8 pines con polímetro en continuidad',
      'Pita entre los pines amarillos (+12V) y negros (GND)'
    ],
    schematicType: 'vrm_phase',
    backTitle: 'Cortocircuito High-Side en el Módulo Regulador de Tensión (VRM)',
    explanation: 'Cuando el MOSFET superior (High-Side) del VRM se perfora, se convierte en un puente directo (0 Ohmios) entre la línea de 12V de la fuente y la línea de salida hacia la CPU o masa a través del Low-Side. La fuente detecta cortocircuito y salta su circuito de protección en menos de 10 milisegundos para evitar que los 12V destruyan el silicio de la CPU.',
    keyFormula: 'R_medida ≈ 0.0 Ω  |  V_drop = 0.00 V',
    smrTip: 'NUNCA puentear el cable verde con uno negro de la fuente ATX con una placa en corto conectada; forzarás la corriente y derretirás las pistas internas de cobre de la placa base.',
    tags: ['VRM', 'Cortocircuito', 'OCP', 'Seguridad']
  },
  {
    id: 'fc-9',
    category: 'smr_hardware',
    level: 3,
    levelLabel: 'Nivel 3 · Periféricos y Sensores',
    question: '¿Qué es un fototransistor y dónde se utiliza en el parque informático de una empresa?',
    subtitle: 'Transistores controlados por fotones de luz en lugar de corriente en la base',
    frontKeyPoints: [
      'La base es activada por fotones de luz infrarroja o visible',
      'Sensores ópticos de paso de papel en impresoras',
      'Sensores de intrusión en cajas de servidores rack (Chassis Intrusion)',
      'Encoders de velocidad de rodillos y ventiladores'
    ],
    schematicType: 'bjt_npn',
    backTitle: 'Optoacopladores y Barreras Infrarrojas',
    explanation: 'En un fototransistor, la unión base-colector está expuesta a través de una lente transparente. Cuando recibe luz (habitualmente emitida por un LED infrarrojo emparejado), se generan pares electrón-hueco que inyectan corriente de base y hacen que el transistor conduzca. Si una hoja de papel o la chapa de un servidor corta el haz, el fototransistor entra en CORTE y la salida pasa a nivel lógico ALTO (5V o 3.3V).',
    keyFormula: 'Con luz: Saturación (V_out ≈ 0V) | Sin luz: Corte (V_out = V_CC)',
    smrTip: 'Si una impresora de la empresa da "atasco de papel fantasma", comprueba primero con un hisopo y alcohol isopropílico si la lente del fototransistor tiene toner acumulado antes de desmontar los engranajes.',
    tags: ['Fototransistor', 'Impresoras', 'Sensores', 'Mantenimiento']
  },
  {
    id: 'fc-10',
    category: 'smr_hardware',
    level: 2,
    levelLabel: 'Nivel 2 · Control Térmico',
    question: '¿Cómo regula un transistor la velocidad de un ventilador de 3 pines vs 4 pines (PWM)?',
    subtitle: 'Control por tensión analógica vs Modulación por Ancho de Pulsos (PWM)',
    frontKeyPoints: [
      'Ventilador 3 pines: Transistor regulando tensión continua (5V a 12V)',
      'Ventilador 4 pines: MOSFET conmutando a alta frecuencia (25 kHz)',
      'El cuarto cable envía pulsos de control directo al circuito integrado interno'
    ],
    schematicType: 'mosfet_n',
    backTitle: 'Eficiencia Térmica del Control PWM vs Lineal',
    explanation: 'En ventiladores de 3 pines clásicos, el transistor de la placa debía disipar como calor la caída de tensión sobrante (ej. para entregar 7V, el transistor se tragaba 5V a 0.3A = 1.5W de calor). En ventiladores PWM de 4 pines, el MOSFET interno conmuta a 25.000 veces por segundo: o está 100% abierto (0 corriente) o 100% saturado (caída de tensión casi cero). Eficiencia superior al 95%.',
    keyFormula: 'Duty Cycle (%) = (T_on / T_periodo) · 100',
    smrTip: 'Si en el taller un ventilador de 3 pines se queda al 100% de ruido aunque lo bajes por BIOS, es muy probable que el transistor de conmutación de esa cabecera FAN se haya quedado fundido en cortocircuito permanente.',
    tags: ['PWM', 'Ventiladores', 'Placa Base', 'Refrigeración']
  }
];

export interface DiagnosticScenario {
  id: string;
  title: string;
  hardwareContext: string;
  initialSymptom: string;
  difficulty: 1 | 2 | 3;
  difficultyLabel: string;
  estimatedTimeMin: number;
  testPoints: {
    id: string;
    label: string;
    location: string;
    diodeReading: number | 'OL';
    voltageReading: string;
    status: 'normal' | 'defectuoso' | 'alerta';
    hint: string;
  }[];
  // 4 pedagogical pillars
  steps: {
    phase: 'observacion' | 'consecuencia' | 'adaptacion' | 'pensamiento_critico';
    title: string;
    instruction: string;
    question: string;
    options: {
      id: string;
      text: string;
      isCorrect: boolean;
      feedback: string;
    }[];
  }[];
  summaryLearning: string;
}

export const DIAGNOSTIC_SCENARIOS: DiagnosticScenario[] = [
  {
    id: 'case-vrm-short',
    title: 'Caso 1: Placa base que no enciende y fuente ATX en protección (VRM CPU)',
    hardwareContext: 'Aula 204 SMR · Placa base Asus Prime B550M-A con procesador AMD Ryzen 5',
    initialSymptom: 'Al presionar el pulsador frontal de la torre, los ventiladores amagan con girar medio segundo, se escucha un "clic" en la fuente de alimentación BeQuiet! 600W y el equipo se apaga por completo. El LED verde de standby (+5VSB) de la placa permanece encendido.',
    difficulty: 3,
    difficultyLabel: 'Nivel 3 · Avanzado (VRM de Placa Base)',
    estimatedTimeMin: 12,
    testPoints: [
      {
        id: 'tp-eps12v',
        label: 'Conector EPS 12V (CPU 8 pines)',
        location: 'Toma superior izquierda junto al zócalo AM4',
        diodeReading: 0.01,
        voltageReading: '0.00 V (0.2 Ω respecto a masa GND)',
        status: 'defectuoso',
        hint: '¡Continuidad directa entre la línea de 12V y tierra! Debería marcar al menos cientos de ohmios o diodo normal.'
      },
      {
        id: 'tp-mosfet-high1',
        label: 'MOSFET High-Side Fase 1 (Q1)',
        location: 'Encapsulado PowerPAK SO-8 Fase 1 VRM',
        diodeReading: 0.53,
        voltageReading: 'Aislamiento normal D-S en inversa',
        status: 'normal',
        hint: 'Diodo interno de protección mide 0.53V. Este transistor está en buen estado.'
      },
      {
        id: 'tp-mosfet-high2',
        label: 'MOSFET High-Side Fase 2 (Q3)',
        location: 'Encapsulado PowerPAK SO-8 Fase 2 VRM',
        diodeReading: 0.00,
        voltageReading: '0.00 V en ambos sentidos (Drenador a Surtidor)',
        status: 'defectuoso',
        hint: '¡PUNTOS EN CORTO! El drenador y el surtidor están fundidos internamente.'
      },
      {
        id: 'tp-pwm-ic',
        label: 'Controlador PWM VRM (ASP1106G)',
        location: 'Chip integrado adyacente a inductores',
        diodeReading: 0.68,
        voltageReading: 'Línea VCC 5V normal',
        status: 'normal',
        hint: 'Las señales de control parecen íntegras.'
      }
    ],
    steps: [
      {
        phase: 'observacion',
        title: 'Fase 1: Observación Rigurosa de Síntomas y Mediciones',
        instruction: 'Analiza los datos del polímetro en el conector EPS y en los transistores del VRM.',
        question: '¿Qué evidencia concluyente arroja la prueba con el multímetro en el punto de prueba Q3 (MOSFET High-Side de Fase 2)?',
        options: [
          {
            id: 'obs-1',
            text: 'El MOSFET está abierto y no conduce corriente hacia la CPU.',
            isCorrect: false,
            feedback: 'Incorrecto. Si estuviera abierto marcaría OL (Open Loop) y no provocaría el disparo de la protección de la fuente.'
          },
          {
            id: 'obs-2',
            text: 'Existe un cortocircuito franco (0.00V / 0Ω) entre Drenador y Surtidor, uniendo los 12V directos a masa a través de la fase.',
            isCorrect: true,
            feedback: '¡Excelente observación! El semiconductor sufrió una rotura por avalancha térmica y su unión D-S se ha perforado.'
          },
          {
            id: 'obs-3',
            text: 'El pulsador de encendido de la torre tiene un cable pelado.',
            isCorrect: false,
            feedback: 'No concuerda con las mediciones en los componentes del VRM de la placa base.'
          }
        ]
      },
      {
        phase: 'consecuencia',
        title: 'Fase 2: Consecuencia y Causa Técnica',
        instruction: 'Predice el impacto de este fallo en el resto del ecosistema del ordenador.',
        question: '¿Por qué la fuente de alimentación se apaga tras el "clic" en vez de suministrar corriente normalmente?',
        options: [
          {
            id: 'con-1',
            text: 'Se activa el circuito de protección OCP/SCP (sobrecorriente/cortocircuito) de la fuente ATX para evitar el incendio del cableado y placa.',
            isCorrect: true,
            feedback: '¡Correcto! Las fuentes modernas con certificación ATX supervisan el riel de 12V y cortan la oscilación de potencia en milisegundos.'
          },
          {
            id: 'con-2',
            text: 'Porque el procesador ha enviado una orden por el bus I2C para suspender el equipo.',
            isCorrect: false,
            feedback: 'El procesador ni siquiera llega a inicializarse porque la tensión nunca alcanza el estado Power Good.'
          },
          {
            id: 'con-3',
            text: 'Porque la pila botón CR2032 de la BIOS está descargada.',
            isCorrect: false,
            feedback: 'Una pila agotada provoca pérdida de hora y configuración CMOS, jamás el disparo de protección de la fuente.'
          }
        ]
      },
      {
        phase: 'adaptacion',
        title: 'Fase 3: Adaptación del Diagnóstico en el Taller SMR',
        instruction: 'Un compañero de clase te sugiere: "Vamos a puentear el cable verde con negro de la fuente ATX con un clip para obligarla a arrancar".',
        question: 'Como futuro técnico SMR, ¿cómo adaptas tu procedimiento y evalúas esta propuesta?',
        options: [
          {
            id: 'ada-1',
            text: 'Rechazar la maniobra tajantemente: puentear la fuente anulando su protección inyectará más de 40A en las pistas de cobre de la placa, fundiéndolas y pudiendo destruir la CPU.',
            isCorrect: true,
            feedback: '¡Impecable criterio profesional! Forzar el encendido de una fuente ante un corto evidente es una negligencia que destruye hardware.'
          },
          {
            id: 'ada-2',
            text: 'Aceptar el consejo, ya que así veremos de dónde sale humo para encontrar la falla más rápido.',
            isCorrect: false,
            feedback: '¡Peligro! Provocarás daños irreparables en la placa multicapa, riesgo de quemaduras y humo tóxico.'
          },
          {
            id: 'ada-3',
            text: 'Cambiar la memoria RAM de ranura para ver si el corto desaparece.',
            isCorrect: false,
            feedback: 'La RAM se alimenta de la línea de 1.2V/1.35V generada por su propio VRM independiente, no del conector EPS 12V de CPU.'
          }
        ]
      },
      {
        phase: 'pensamiento_critico',
        title: 'Fase 4: Pensamiento Crítico y Resolución Definitiva',
        instruction: 'Decide el plan de reparación o sustitución con rigor técnico y criterio económico.',
        question: '¿Cuál es el protocolo técnico profesional adecuado para devolver el equipo a producción?',
        options: [
          {
            id: 'crit-1',
            text: 'Desoldar el MOSFET Q3 con estación de aire caliente, verificar que el corto desaparece de la línea EPS, comprobar el diodo bootstrap del driver y soldar un MOSFET equivalente con igual o menor R_DS(on) y mismo amperaje.',
            isCorrect: true,
            feedback: '¡Resolución de nivel especialista SMR! Confirmar el driver evita que el nuevo MOSFET vuelva a quemarse inmediatamente por polarización incorrecta.'
          },
          {
            id: 'crit-2',
            text: 'Poner más pasta térmica sobre el procesador y volver a probar.',
            isCorrect: false,
            feedback: 'La pasta térmica no repara un transistor de silicio perforado mecánicamente.'
          },
          {
            id: 'crit-3',
            text: 'Cortar los dos cables amarillos del conector de la fuente que van a esa fase.',
            isCorrect: false,
            feedback: 'Una chapuza inaceptable que desequilibra las fases y quemará el resto de inductores.'
          }
        ]
      }
    ],
    summaryLearning: 'Los MOSFETs de canal N de las fases VRM soportan corrientes extremas. Cuando fallan, casi siempre lo hacen en cortocircuito entre drenador y surtidor. En 1º SMR, el polímetro en escala de diodos/continuidad en el conector EPS 12V es la herramienta más rápida para diagnosticarlo sin desmontar el disipador.'
  },
  {
    id: 'case-fan-pwm',
    title: 'Caso 2: Ventilador de caja siempre al 100% de RPM sin control PWM',
    hardwareContext: 'Taller de reparación · Torre de sobremesa de secretaría de centro educativo',
    initialSymptom: 'El usuario se queja de un ruido insoportable de "turbina de avión". En la configuración UEFI/BIOS, la velocidad del ventilador de chasis marca 4200 RPM continuas. Cambiar el perfil a "Silent" o modificar la curva de temperatura no altera en absoluto la velocidad del ventilador.',
    difficulty: 2,
    difficultyLabel: 'Nivel 2 · Intermedio (Control de Periféricos)',
    estimatedTimeMin: 8,
    testPoints: [
      {
        id: 'tp-fan-header',
        label: 'Cabecera SYS_FAN1 (Pines 1, 2 y 3)',
        location: 'Borde inferior de la placa base',
        diodeReading: 0.00,
        voltageReading: '12.0 V fijos en el pin positivo con masa continua',
        status: 'alerta',
        hint: 'Tensión máxima inalterable independientemente de la carga de la CPU.'
      },
      {
        id: 'tp-bjt-q2',
        label: 'Transistor BJT SMD SOT-23 (Q2 Conmutador FAN)',
        location: 'Junto a la cabecera SYS_FAN1 en la placa base',
        diodeReading: 0.02,
        voltageReading: '0.02 V entre Colector y Emisor (C-E)',
        status: 'defectuoso',
        hint: '¡Continuidad anormal entre Colector y Emisor con la placa apagada!'
      },
      {
        id: 'tp-superio-pin',
        label: 'Pin de control PWM del Chip Super I/O (Nuvoton NCT6798D)',
        location: 'Pin 42 del chip Super I/O',
        diodeReading: 0.65,
        voltageReading: 'Onda cuadrada PWM varía correctamente del 20% al 80%',
        status: 'normal',
        hint: 'El chip Super I/O genera la señal de control perfectamente.'
      }
    ],
    steps: [
      {
        phase: 'observacion',
        title: 'Fase 1: Observación de Señales de Control vs Potencia',
        instruction: 'Compara la señal que sale del chip Super I/O con el estado del transistor Q2.',
        question: '¿Qué revela el hecho de que el Super I/O emita la señal correcta pero el transistor Q2 marque 0.02V entre Colector y Emisor?',
        options: [
          {
            id: 'fan-obs-1',
            text: 'El transistor BJT de conmutación está en cortocircuito permanente (fundido internamente), alimentando el ventilador al 100% sin importar la señal lógica de la base.',
            isCorrect: true,
            feedback: '¡Exacto! El transistor actúa como un interruptor soldado en posición "CERRADO".'
          },
          {
            id: 'fan-obs-2',
            text: 'El ventilador tiene los rodamientos atascados.',
            isCorrect: false,
            feedback: 'Si los rodamientos estuvieran atascados, el ventilador giraría lento o no giraría, no a 4200 RPM constantes.'
          },
          {
            id: 'fan-obs-3',
            text: 'Falta actualizar la versión de firmware del BIOS.',
            isCorrect: false,
            feedback: 'El Super I/O ya genera la señal PWM correcta, el fallo es físico a nivel de hardware.'
          }
        ]
      },
      {
        phase: 'consecuencia',
        title: 'Fase 2: Consecuencia del Fallo Semiconductor',
        instruction: 'Reflexiona sobre qué ocurriría si ignoramos la causa semiconductora.',
        question: '¿Qué consecuencia inmediata tiene cambiar el ventilador por otro nuevo idéntico?',
        options: [
          {
            id: 'fan-con-1',
            text: 'El nuevo ventilador funcionará a la perfección y respetará el perfil silencioso.',
            isCorrect: false,
            feedback: 'No, porque la placa base seguirá entregando 12V constantes por el transistor fundido.'
          },
          {
            id: 'fan-con-2',
            text: 'El nuevo ventilador girará exactamente igual de rápido y ruidoso al 100%, gastando dinero del cliente inútilmente sin solucionar la avería.',
            isCorrect: true,
            feedback: '¡Pensamiento deductivo clave! El técnico debe diagnosticar la causa raíz, no sustituir periféricos al azar.'
          }
        ]
      },
      {
        phase: 'adaptacion',
        title: 'Fase 3: Adaptación Rápida en Taller Informático',
        instruction: 'Si el cliente necesita el equipo hoy mismo para trabajar y no hay tiempo para soldadura SMD en placa base:',
        question: '¿Cuál es la solución de adaptación técnica más inteligente y económica?',
        options: [
          {
            id: 'fan-ada-1',
            text: 'Conectar el ventilador a otra cabecera libre de la placa (ej. SYS_FAN2 o CHA_FAN) cuyo transistor esté sano, o instalar un cable reductor de 7V/adaptador con control PWM independiente.',
            isCorrect: true,
            feedback: '¡Excelente adaptación profesional! Da respuesta inmediata al cliente sin incurrir en costes desmedidos.'
          },
          {
            id: 'fan-ada-2',
            text: 'Desconectar el ventilador y dejar la torre sin ventilación trasera.',
            isCorrect: false,
            feedback: 'Provocarás estrangulamiento térmico (Thermal Throttling) y riesgo de daño en la fuente y GPU.'
          }
        ]
      },
      {
        phase: 'pensamiento_critico',
        title: 'Fase 4: Pensamiento Crítico',
        instruction: 'Analiza por qué pudo quemarse el transistor original.',
        question: '¿Qué práctica errónea cometida habitualmente en talleres suele provocar el quemado de este transistor?',
        options: [
          {
            id: 'fan-crit-1',
            text: 'Conectar múltiples ventiladores de alto amperaje o tiras RGB en paralelo a una misma cabecera mediante un ladrón/splitter simple, superando el límite de 1 Amperio del transistor.',
            isCorrect: true,
            feedback: '¡Gran visión técnica! Las cabeceras estándar suelen soportar 1A (12W). Superar esa corriente destruye por sobretemperatura la unión del transistor SMD.'
          },
          {
            id: 'fan-crit-2',
            text: 'Tener el cable Ethernet conectado.',
            isCorrect: false,
            feedback: 'No existe relación alguna.'
          }
        ]
      }
    ],
    summaryLearning: 'Los transistores de baja señal (SOT-23) en placas base actúan como interruptores para ventiladores y relés. Si se sobrecarga la cabecera, se perforan en cortocircuito colector-emisor. Comprender la diferencia entre señal lógica de control y conmutación de potencia ahorra sustituciones innecesarias.'
  },
  {
    id: 'case-printer-optical',
    title: 'Caso 3: Impresora láser de secretaría con atasco fantasma persistente',
    hardwareContext: 'Impresora HP LaserJet Enterprise M608 de la oficina de administración',
    initialSymptom: 'La pantalla táctil muestra permanentemente el error "13.00.00 Atasco de papel en zona de registro". Al abrir las compuertas y bandejas, no hay absolutamente ninguna hoja ni trozo de papel.',
    difficulty: 2,
    difficultyLabel: 'Nivel 2 · Intermedio (Fototransistores y Sensores Ópticos)',
    estimatedTimeMin: 10,
    testPoints: [
      {
        id: 'tp-flag',
        label: 'Palanca mecánica basculante (Sensor Flag)',
        location: 'Entrada de papel en bandeja 2',
        diodeReading: 0.00,
        voltageReading: 'Movimiento libre, muelle de retroceso en perfecto estado',
        status: 'normal',
        hint: 'Mecánicamente la palanca sube y baja sin trabarse.'
      },
      {
        id: 'tp-ir-led',
        label: 'LED Infrarrojo de la barrera óptica',
        location: 'Lado emisor de la herradura óptica',
        diodeReading: 1.15,
        voltageReading: '1.2 V de polarización (visible con cámara de móvil)',
        status: 'normal',
        hint: 'El LED IR emite luz infrarroja correctamente.'
      },
      {
        id: 'tp-phototransistor',
        label: 'Fototransistor receptor de la barrera óptica',
        location: 'Lado receptor de la herradura óptica',
        diodeReading: 'OL',
        voltageReading: '5.0 V fijos en el Colector con o sin palanca activada',
        status: 'defectuoso',
        hint: 'El fototransistor nunca conmuta a masa: permanece en corte continuo (5V).'
      }
    ],
    steps: [
      {
        phase: 'observacion',
        title: 'Fase 1: Observación de Sensores Optoelectrónicos',
        instruction: 'Revisa cómo funciona un fototransistor en una barrera óptica (optointerruptor tipo herradura).',
        question: 'Si la tensión en el colector del fototransistor permanece en 5V cuando la palanca está levantada (haz de luz libre), ¿qué deduce el técnico?',
        options: [
          {
            id: 'print-obs-1',
            text: 'El fototransistor no está detectando la luz infrarroja: para él, el haz siempre está "cortado", por lo que la electrónica interpreta que hay papel tapando el paso.',
            isCorrect: true,
            feedback: '¡Exacto! Sin luz que excite su base fotónica, el transistor se mantiene en corte y la resistencia de pull-up mantiene la línea en 5V (estado de atasco).'
          },
          {
            id: 'print-obs-2',
            text: 'El motor principal de arrastre está quemado.',
            isCorrect: false,
            feedback: 'El motor no tiene relación con la lectura óptica del sensor de paso.'
          }
        ]
      },
      {
        phase: 'consecuencia',
        title: 'Fase 2: Consecuencia del Entorno de Oficina',
        instruction: 'En impresoras láser de gran volumen, el polvo de tóner microscópico y la pelusa de papel flotan continuamente.',
        question: '¿Qué consecuencia física directa tiene la acumulación de tóner sobre la lente del fototransistor?',
        options: [
          {
            id: 'print-con-1',
            text: 'El polvo de tóner opaco bloquea físicamente la llegada de los fotones infrarrojos a la base del transistor, impidiendo su polarización aunque no haya papel.',
            isCorrect: true,
            feedback: '¡Brillante! El 80% de los atascos fantasma se deben a suciedad que ciega la ventana óptica del fototransistor.'
          },
          {
            id: 'print-con-2',
            text: 'El tóner aumenta la conductividad eléctrica del cable USB.',
            isCorrect: false,
            feedback: 'No tiene fundamento físico en este caso.'
          }
        ]
      },
      {
        phase: 'adaptacion',
        title: 'Fase 3: Adaptación y Mantenimiento Preventivo',
        instruction: 'Antes de tramitar la garantía o pedir una placa lógica de 200€ al fabricante:',
        question: '¿Qué acción correctora de bajo coste debe realizar el técnico de SMR?',
        options: [
          {
            id: 'print-ada-1',
            text: 'Limpiar con aire comprimido suave y un hisopo con alcohol isopropílico la ranura óptica del LED y del fototransistor para retirar el tóner carbonizado.',
            isCorrect: true,
            feedback: '¡Esa es la actitud del buen técnico! Mantenimiento físico de precisión antes de sustituir componentes caros.'
          },
          {
            id: 'print-ada-2',
            text: 'Reinstalar el sistema operativo Windows en todos los equipos del aula.',
            isCorrect: false,
            feedback: 'El error reside en el hardware interno de la impresora, no en el cliente de red.'
          }
        ]
      },
      {
        phase: 'pensamiento_critico',
        title: 'Fase 4: Pensamiento Crítico y Verificación Posterior',
        instruction: 'Tras la limpieza, ¿cómo verificas objetivamente que el fototransistor ha vuelto a operar con normalidad?',
        question: '¿Qué variación de tensión debes medir en el colector al mover manualmente la palanca oscilante?',
        options: [
          {
            id: 'print-crit-1',
            text: 'Debe alternar limpiamente entre ~0.1V (saturado con luz directa) y ~5.0V (en corte cuando la palanca bloquea el haz infrarrojo).',
            isCorrect: true,
            feedback: '¡Perfecto! La transición limpia alto/bajo confirma que la unión semiconductora conmuta sin interferencias.'
          },
          {
            id: 'print-crit-2',
            text: 'Debe mantenerse constante a 230V de corriente alterna.',
            isCorrect: false,
            feedback: 'La electrónica lógica trabaja a baja tensión DC (5V / 3.3V), jamás a 230V AC.'
          }
        ]
      }
    ],
    summaryLearning: 'Los fototransistores convierten la presencia de luz en corriente de base. En impresoras, escáneres y sensores de intrusión de chasis, la suciedad ambiental simula falsas fallas mecánicas. Comprobar la conmutación de tensión 0V/5V evita descartar equipos viables.'
  },
  {
    id: 'case-atx-standby',
    title: 'Caso 4: Servidor que no enciende tras tormenta (Transistor auxiliar +5VSB)',
    hardwareContext: 'Armario Rack Sala de Servidores · Servidor de archivos NAS con fuente ATX EPS 750W',
    initialSymptom: 'Tras una fuerte tormenta eléctrica nocturna, el servidor está completamente inerte. Al pulsar el botón de encendido no ocurre nada: ningún LED parpadea en la placa base ni en la tarjeta de red integrada.',
    difficulty: 3,
    difficultyLabel: 'Nivel 3 · Avanzado (Seguridad Eléctrica y Fuentes ATX)',
    estimatedTimeMin: 15,
    testPoints: [
      {
        id: 'tp-sb-cable',
        label: 'Línea +5VSB (Pin 9 cable Violeta conector ATX 24p)',
        location: 'Conector principal ATX',
        diodeReading: 'OL',
        voltageReading: '0.00 V (Debería tener +5.0V estables siempre)',
        status: 'defectuoso',
        hint: '¡Falta total de tensión Standby! Sin 5VSB el chipset no puede despertar la fuente.'
      },
      {
        id: 'tp-primary-caps',
        label: 'Condensadores electrolíticos de alta tensión primarios (400V)',
        location: 'Etapa caliente de la fuente ATX',
        diodeReading: 'OL',
        voltageReading: '¡PELIGRO! 320 V DC residuales acumulados',
        status: 'alerta',
        hint: 'Descargar con resistencia de carga de potencia de 1kΩ antes de cualquier manipulación.'
      },
      {
        id: 'tp-mosfet-aux',
        label: 'Transistor MOSFET del circuito Flyback auxiliar Standby',
        location: 'Pequeño disipador en zona primaria',
        diodeReading: 0.00,
        voltageReading: 'Puerta-Surtidor (G-S) en cortocircuito por sobretensión',
        status: 'defectuoso',
        hint: 'El pico inductivo de la tormenta perforó la fina capa aislante de la Puerta.'
      }
    ],
    steps: [
      {
        phase: 'observacion',
        title: 'Fase 1: Observación y Medición de la Cadena de Arranque',
        instruction: 'Recuerda el estándar ATX de conmutación de fuentes de ordenador.',
        question: '¿Por qué la ausencia de los +5VSB (Standby) impide por completo encender el servidor?',
        options: [
          {
            id: 'sb-obs-1',
            text: 'Porque el chip Super I/O y el circuito BMC del servidor se alimentan exclusivamente de los +5VSB para poder leer el pulsador frontal y poner a masa el pin verde (PS_ON#).',
            isCorrect: true,
            feedback: '¡Exacto! Sin los 5VSB de espera, el "cerebro de arranque" de la placa base está completamente apagado.'
          },
          {
            id: 'sb-obs-2',
            text: 'Porque los discos duros requieren 5VSB para girar antes de iniciar.',
            isCorrect: false,
            feedback: 'Los discos duros se alimentan de las líneas principales de 12V y 5V cuando la fuente ya ha arrancado.'
          }
        ]
      },
      {
        phase: 'consecuencia',
        title: 'Fase 2: Consecuencia y Protocolo de Seguridad Eléctrica',
        instruction: 'En el punto de prueba de los condensadores primarios hay más de 300 Voltios continuos residuales.',
        question: '¿Qué consecuencia fatídica puede tener tocar el circuito primario sin descargar previamente los condensadores?',
        options: [
          {
            id: 'sb-con-1',
            text: 'Descarga eléctrica grave o mortal que puede provocar fibrilación ventricular o quemaduras por arco voltaico.',
            isCorrect: true,
            feedback: '¡Prioridad absoluta a la seguridad! Los condensadores de 400V almacenan energía letal incluso horas después de desenchufar.'
          },
          {
            id: 'sb-con-2',
            text: 'Simplemente que el multímetro se descalibre un poco.',
            isCorrect: false,
            feedback: 'Inconsciencia total. La seguridad humana prevalece sobre cualquier componente.'
          }
        ]
      },
      {
        phase: 'adaptacion',
        title: 'Fase 3: Adaptación del Diagnóstico al MOSFET Auxiliar',
        instruction: 'Al medir el transistor de la línea Standby, la unión Gate-Source da 0.00V (cortocircuito).',
        question: '¿Cómo se explica físicamente este fallo tras la tormenta?',
        options: [
          {
            id: 'sb-ada-1',
            text: 'El pico de sobretensión en la red eléctrica superó la rigidez dieléctrica del óxido de silicio (SiO2) de la Puerta (típicamente ±20V max), perforándola microscópicamente.',
            isCorrect: true,
            feedback: '¡Riguroso análisis de semiconductores! El dieléctrico de la puerta del MOSFET es ultrafino y muy vulnerable a transitorios sin varistor.'
          },
          {
            id: 'sb-ada-2',
            text: 'El transistor se oxidó por la lluvia de la tormenta dentro de la sala.',
            isCorrect: false,
            feedback: 'El servidor está en un rack interior climatizado, no es corrosión húmeda.'
          }
        ]
      },
      {
        phase: 'pensamiento_critico',
        title: 'Fase 4: Pensamiento Crítico y Decisión en Entorno Empresarial',
        instruction: 'Estás en una empresa con un servidor de producción crítico.',
        question: '¿Cuál es la decisión técnica y de gestión más sensata en este escenario?',
        options: [
          {
            id: 'sb-crit-1',
            text: 'Sustituir la fuente de alimentación completa por una unidad redundante de repuesto de certificación homologada para restaurar el servicio en minutos, y proteger la línea con un SAI/UPS online con supresor de transitorios.',
            isCorrect: true,
            feedback: '¡Mentalidad de administrador de sistemas SMR! En un servidor de empresa, el tiempo de inactividad cuesta miles de euros; la fuente debe reemplazarse de inmediato y prevenir futuros rayos con SAI.'
          },
          {
            id: 'sb-crit-2',
            text: 'Poner cinta aislante alrededor del transistor roto y volver a encender.',
            isCorrect: false,
            feedback: 'Riesgo inminente de explosión o incendio.'
          }
        ]
      }
    ],
    summaryLearning: 'La etapa auxiliar Standby (+5VSB) de una fuente ATX funciona ininterrumpidamente las 24 horas del día. Su transistor de conmutación sufre un desgaste continuo y es el primero en sucumbir ante transitorios de red. La seguridad en el taller SMR exige descargar siempre condensadores antes de medir.'
  }
];

export interface QuizQuestion {
  id: string;
  category: string;
  level: 1 | 2 | 3;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  pillar: 'Observación' | 'Consecuencia' | 'Adaptación' | 'Pensamiento Crítico';
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q-1',
    category: 'BJT',
    level: 1,
    question: 'En un transistor BJT NPN de silicio en zona activa, ¿qué tensión típica aproximada existe entre su Base y su Emisor (V_BE)?',
    options: ['0.0 Voltios', '0.7 Voltios', '3.3 Voltios', '12.0 Voltios'],
    correctIndex: 1,
    explanation: 'La unión Base-Emisor es un diodo PN polarizado en directa, por lo que presenta la típica caída de tensión de silicio de aproximadamente 0.6V a 0.7V.',
    pillar: 'Observación'
  },
  {
    id: 'q-2',
    category: 'MOSFET',
    level: 1,
    question: 'A diferencia del transistor BJT (que se gobierna por corriente de base), ¿cómo se controla la conducción de un transistor MOSFET?',
    options: [
      'Por corriente continua en el drenador',
      'Por tensión aplicada entre Puerta y Surtidor (V_GS)',
      'Por temperatura ambiental',
      'Por frecuencia de reloj del procesador'
    ],
    correctIndex: 1,
    explanation: 'El MOSFET es un dispositivo controlado por campo eléctrico (tensión en la puerta V_GS). Como su puerta está aislada por óxido, prácticamente no absorbe corriente de entrada.',
    pillar: 'Observación'
  },
  {
    id: 'q-3',
    category: 'Zonas de Trabajo',
    level: 2,
    question: 'Si medimos un transistor con el voltímetro y encontramos V_CE = 0.2V y la carga (ventilador o bombilla) funcionando al máximo, ¿en qué estado se encuentra?',
    options: ['Corte', 'Activa o Lineal', 'Saturación', 'Averiado en circuito abierto'],
    correctIndex: 2,
    explanation: 'En saturación, la caída de tensión Colector-Emisor se desploma a su valor mínimo de saturación (~0.2V), comportándose como un interruptor cerrado ideal.',
    pillar: 'Consecuencia'
  },
  {
    id: 'q-4',
    category: 'Diagnóstico SMR',
    level: 2,
    question: 'Al verificar un transistor con el multímetro en modo DIODO, obtenemos lectura de 0.00V y pitido de continuidad entre Colector y Emisor en ambos sentidos. ¿Qué significa?',
    options: [
      'Que el transistor está perfectamente polarizado',
      'Que la unión semiconductora está en cortocircuito (destruido)',
      'Que el transistor está en zona de corte',
      'Que el multímetro se ha quedado sin batería'
    ],
    correctIndex: 1,
    explanation: 'Entre Colector y Emisor en un transistor sano siempre debe dar OL (abierto). Si pita o marca 0.00V, la unión está fundida y debe reemplazarse.',
    pillar: 'Consecuencia'
  },
  {
    id: 'q-5',
    category: 'VRM Placa Base',
    level: 3,
    question: 'En las fases de alimentación VRM de una placa base de gama alta, ¿por qué los fabricantes utilizan MOSFETs con una R_DS(on) inferior a 3 mΩ?',
    options: [
      'Para que la placa base pese menos',
      'Para reducir las pérdidas por calor Joule (P = I² · R) ante consumos de más de 100 Amperios de la CPU',
      'Para iluminar los LEDs RGB de la torre',
      'Para aumentar la velocidad de la memoria RAM'
    ],
    correctIndex: 1,
    explanation: 'Con intensidades elevadísimas como las que demanda un procesador moderno, una resistencia de canal ínfima (milióhmios) es vital para evitar el sobrecalentamiento y la destrucción térmica de la placa.',
    pillar: 'Pensamiento Crítico'
  },
  {
    id: 'q-6',
    category: 'Taller SMR',
    level: 2,
    question: 'Si un equipo no enciende y notas que el MOSFET superior de la fase 1 del VRM está caliente incluso con el PC en reposo, ¿qué procedimiento técnico debes adaptar?',
    options: [
      'Echar agua fría sobre la placa base',
      'Desconectar la alimentación inmediatamente, descargar condensadores y comprobar cortocircuito en la línea de 12V EPS con el polímetro',
      'Subir el voltaje en la BIOS',
      'Cambiar el cable de corriente de 230V'
    ],
    correctIndex: 1,
    explanation: 'Un MOSFET que calienta en reposo indica fuga o semicortocircuito. Continuar encendiendo el equipo dañará irreversiblemente el PCB y el procesador.',
    pillar: 'Adaptación'
  },
  {
    id: 'q-7',
    category: 'Fototransistores',
    level: 2,
    question: 'En un sensor óptico de intrusión de chasis de un servidor, ¿qué ocurre con el fototransistor cuando la tapa del chasis está cerrada impidiendo la entrada de luz externa?',
    options: [
      'Pasa a estado de corte si dependía de luz externa, o conduce si se activa un haz interno conmutado',
      'El transistor explota',
      'El transistor consume 50W de potencia',
      'La memoria ECC se borra'
    ],
    correctIndex: 0,
    explanation: 'Los fototransistores conmutan su conducción según la incidencia de fotones en su base, generando estados lógicos 0 y 1 para la monitorización de seguridad del chasis.',
    pillar: 'Adaptación'
  },
  {
    id: 'q-8',
    category: 'Seguridad SMR',
    level: 3,
    question: 'Antes de medir con el multímetro los transistores de conmutación de la etapa primaria de una fuente de alimentación de PC, ¿cuál es el paso de seguridad OBLIGATORIO?',
    options: [
      'Encender la fuente a máxima potencia',
      'Desconectar de la red y descargar los condensadores electrolíticos de alta tensión (400V) mediante una resistencia de potencia adecuada',
      'Poner el multímetro en modo amperímetro a la red',
      'No hace falta tomar ninguna medida de seguridad'
    ],
    correctIndex: 1,
    explanation: 'Los condensadores primarios acumulan tensiones letales de más de 300V que pueden provocar descargas graves o destruir los instrumentos de medición.',
    pillar: 'Pensamiento Crítico'
  }
];
