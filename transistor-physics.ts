/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * EFA Oretana - CFGM SMR
 * Motor de física y lógica didáctica para el estudio de transistores (BJT y MOSFET)
 * Cálculos puros desacoplados para pruebas unitarias y simulación de circuitos.
 */

export type BjtType = 'NPN' | 'PNP';
export type BjtOperatingRegion = 'corte' | 'activa' | 'saturacion';

export interface BjtCircuitParams {
  type: BjtType;
  vcc: number; // Tensión de alimentación en Voltios (ej. 12V)
  vin: number; // Tensión de entrada en Base en Voltios (ej. 0 a 5V)
  rb: number; // Resistencia de base en Ohmios (ej. 10000)
  rc: number; // Resistencia de carga / colector en Ohmios (ej. 220)
  beta: number; // Ganancia de corriente hFE (ej. 100)
  vbeOn?: number; // Tensión umbral base-emisor, típica 0.7V
  vceSat?: number; // Tensión de saturación colector-emisor, típica 0.2V
}

export interface BjtSimulationState {
  region: BjtOperatingRegion;
  ibMicroAmps: number;
  icMilliAmps: number;
  vbe: number;
  vce: number;
  lampBrightnessPercent: number; // 0 a 100%
  powerDissipatedWatts: number; // Potencia disipada en el transistor
  isSwitchClosed: boolean;
  explanation: string;
}

/**
 * Calcula el estado de funcionamiento de un transistor BJT en circuito de conmutación/amplificación
 */
export function simulateBjt(params: BjtCircuitParams): BjtSimulationState {
  const vbeThreshold = params.vbeOn ?? 0.7;
  const vceSaturation = params.vceSat ?? 0.2;
  const { vcc, vin, rb, rc, beta, type } = params;

  // Para NPN: la base debe ser más positiva que el emisor
  // Para PNP: la base debe ser más negativa que el emisor (o Vin menor a Vcc)
  const effectiveVin = type === 'NPN' ? vin : Math.max(0, vcc - vin);

  if (effectiveVin < vbeThreshold) {
    // Zona de CORTE
    return {
      region: 'corte',
      ibMicroAmps: 0,
      icMilliAmps: 0,
      vbe: effectiveVin,
      vce: vcc,
      lampBrightnessPercent: 0,
      powerDissipatedWatts: 0,
      isSwitchClosed: false,
      explanation: 'El transistor está en CORTE (I_B = 0). Actúa como un interruptor abierto. La bombilla/carga no recibe corriente y V_CE es igual a la tensión de alimentación V_CC.',
    };
  }

  // Tensión sobre la base fijada por la unión PN
  const vbe = vbeThreshold;
  // Corriente de base en Amperios
  const ibAmps = (effectiveVin - vbeThreshold) / rb;
  const ibMicroAmps = ibAmps * 1e6;

  // Corriente de saturación máxima que el circuito exterior permite
  const icSatAmps = Math.max(0, (vcc - vceSaturation) / rc);

  // Corriente teórica en activa
  const icLinearAmps = beta * ibAmps;

  if (icLinearAmps >= icSatAmps) {
    // Zona de SATURACIÓN
    const icMilliAmps = icSatAmps * 1000;
    const vce = vceSaturation;
    const powerDissipatedWatts = vce * icSatAmps;
    return {
      region: 'saturacion',
      ibMicroAmps: Number(ibMicroAmps.toFixed(2)),
      icMilliAmps: Number(icMilliAmps.toFixed(2)),
      vbe,
      vce,
      lampBrightnessPercent: 100,
      powerDissipatedWatts: Number(powerDissipatedWatts.toFixed(4)),
      isSwitchClosed: true,
      explanation: 'El transistor está en SATURACIÓN. La unión colector-base se polariza directamente y V_CE cae a su mínimo (~0.2V). Actúa como un interruptor cerrado (conducción máxima).',
    };
  } else {
    // Zona ACTIVA / LINEAL
    const icAmps = icLinearAmps;
    const icMilliAmps = icAmps * 1000;
    const vce = Math.max(vceSaturation, vcc - icAmps * rc);
    const lampBrightnessPercent = Math.min(100, Math.round((icAmps / icSatAmps) * 100));
    const powerDissipatedWatts = vce * icAmps;

    return {
      region: 'activa',
      ibMicroAmps: Number(ibMicroAmps.toFixed(2)),
      icMilliAmps: Number(icMilliAmps.toFixed(2)),
      vbe,
      vce: Number(vce.toFixed(2)),
      lampBrightnessPercent,
      powerDissipatedWatts: Number(powerDissipatedWatts.toFixed(4)),
      isSwitchClosed: false,
      explanation: 'El transistor está en zona ACTIVA / LINEAL. La corriente de colector es proporcional a la de base (I_C = β · I_B). Funciona como amplificador de señal.',
    };
  }
}

export type MosfetType = 'N-Channel' | 'P-Channel';
export type MosfetOperatingState = 'corte' | 'lineal_ohmic' | 'saturacion';

export interface MosfetCircuitParams {
  type: MosfetType;
  vdd: number; // Tensión de alimentación (ej. 12V para VRM/ventilador)
  vgs: number; // Tensión Puerta-Surtidor (0 a 10V)
  vth: number; // Tensión umbral (ej. 2.0V para nivel lógico TTL)
  rdson: number; // Resistencia de canal encendido en Ohmios (ej. 0.008 = 8mΩ)
  rLoad: number; // Resistencia de carga (ej. 6Ω para ventilador PC de 2A)
  pwmPercent?: number; // Modulación por ancho de pulsos opcional (0 a 100%)
}

export interface MosfetSimulationState {
  state: MosfetOperatingState;
  isOn: boolean;
  vds: number;
  idMilliAmps: number;
  channelResistanceOhms: number;
  powerLossWatts: number;
  fanSpeedRpm: number; // Estimación para hardware de PC SMR
  explanation: string;
}

/**
 * Simula el comportamiento de un MOSFET de potencia (ej. MOSFET de fases VRM de placa base)
 */
export function simulateMosfet(params: MosfetCircuitParams): MosfetSimulationState {
  const { vdd, vgs, vth, rdson, rLoad, pwmPercent } = params;

  if (vgs < vth) {
    return {
      state: 'corte',
      isOn: false,
      vds: vdd,
      idMilliAmps: 0,
      channelResistanceOhms: 10e6, // Casi infinita (megaohmios)
      powerLossWatts: 0,
      fanSpeedRpm: 0,
      explanation: 'El MOSFET está en CORTE (V_GS < V_TH). El canal conductor no se ha formado. No hay paso de corriente y la tensión completa V_DD cae en el Drenador.',
    };
  }

  // Si supera el umbral, el canal se satura/conduce
  const effectiveDuty = pwmPercent !== undefined ? Math.max(0, Math.min(100, pwmPercent)) / 100 : 1;
  const vgsOverdrive = vgs - vth;

  // Calculamos la resistencia efectiva en función de Vgs
  // Cuanto mayor sea Vgs por encima de Vth, menor es la resistencia del canal hasta alcanzar Rds(on)
  const kFactor = 2.0;
  const channelResistance = Math.max(rdson, rdson + 2 / (1 + kFactor * vgsOverdrive));

  // Tensión drenador-surtidor cuando conduce
  const totalR = channelResistance + rLoad;
  const maxIdAmps = vdd / totalR;
  const actualIdAmps = maxIdAmps * effectiveDuty;
  const idMilliAmps = actualIdAmps * 1000;
  const vds = actualIdAmps * channelResistance;
  const powerLossWatts = Math.pow(actualIdAmps, 2) * channelResistance;
  const maxFanRpm = 2800; // Ventilador típico PWM de caja PC
  const fanSpeedRpm = Math.round(maxFanRpm * (actualIdAmps / (vdd / (rdson + rLoad))));

  return {
    state: channelResistance <= rdson * 2 ? 'lineal_ohmic' : 'saturacion',
    isOn: true,
    vds: Number(vds.toFixed(3)),
    idMilliAmps: Number(idMilliAmps.toFixed(1)),
    channelResistanceOhms: Number(channelResistance.toFixed(4)),
    powerLossWatts: Number(powerLossWatts.toFixed(4)),
    fanSpeedRpm,
    explanation: 'El MOSFET está CONDUCIENDO en zona óhmica con bajísima resistencia R_DS(on). En placas base modernas se emplean para conmutar decenas de amperios a la CPU con mínimas pérdidas térmicas.',
  };
}

/**
 * Función de simulación de comprobación de transistor con Polímetro (Multímetro) en modo DIODO
 * Vital para el alumnado de 1º SMR (Montaje y Mantenimiento de Equipos).
 */
export type MultimeterLead = 'Base' | 'Collector' | 'Emitter' | 'Gate' | 'Drain' | 'Source';

export interface DiodeMeasurementResult {
  voltageDrop: number | 'OL'; // 'OL' = Open Loop (Fuera de rango / circuito abierto)
  isConducting: boolean;
  isShortCircuit: boolean;
  technicalInterpretation: string;
}

export function testComponentJunction(
  componentType: 'BJT_NPN' | 'BJT_PNP' | 'MOSFET_N_GOOD' | 'MOSFET_N_SHORT',
  redLead: MultimeterLead,
  blackLead: MultimeterLead
): DiodeMeasurementResult {
  if (componentType === 'BJT_NPN') {
    // NPN: P en Base, N en Colector y Emisor
    // Rojo en Base, Negro en Emisor -> Diodo directo (~0.65V)
    if (redLead === 'Base' && blackLead === 'Emitter') {
      return {
        voltageDrop: 0.65,
        isConducting: true,
        isShortCircuit: false,
        technicalInterpretation: 'Unión Base-Emisor en directa polarizada correctamente (0.65V típico de silicio).',
      };
    }
    // Rojo en Base, Negro en Colector -> Diodo directo (~0.63V)
    if (redLead === 'Base' && blackLead === 'Collector') {
      return {
        voltageDrop: 0.63,
        isConducting: true,
        isShortCircuit: false,
        technicalInterpretation: 'Unión Base-Colector en directa polarizada correctamente (0.63V típico de silicio). La caída B-C suele ser ligeramente menor que B-E.',
      };
    }
    // En inversa o entre Colector-Emisor -> OL
    return {
      voltageDrop: 'OL',
      isConducting: false,
      isShortCircuit: false,
      technicalInterpretation: 'Circuito abierto (OL). Polarización inversa o aislamiento correcto entre Colector y Emisor.',
    };
  }

  if (componentType === 'BJT_PNP') {
    // PNP: N en Base, P en Colector y Emisor
    // Rojo en Emisor, Negro en Base -> Directa (~0.65V)
    if (redLead === 'Emitter' && blackLead === 'Base') {
      return {
        voltageDrop: 0.65,
        isConducting: true,
        isShortCircuit: false,
        technicalInterpretation: 'Unión Emisor-Base en directa (0.65V). En PNP la base es material N, por lo que la sonda negra va a la base.',
      };
    }
    // Rojo en Colector, Negro en Base -> Directa (~0.63V)
    if (redLead === 'Collector' && blackLead === 'Base') {
      return {
        voltageDrop: 0.63,
        isConducting: true,
        isShortCircuit: false,
        technicalInterpretation: 'Unión Colector-Base en directa (0.63V).',
      };
    }
    return {
      voltageDrop: 'OL',
      isConducting: false,
      isShortCircuit: false,
      technicalInterpretation: 'Circuito abierto (OL). Correcto para polarización inversa en transistor PNP en buen estado.',
    };
  }

  if (componentType === 'MOSFET_N_GOOD') {
    // MOSFET Canal N bueno:
    // Diodo parásito interno (Body Diode) entre Source (Ánodo) y Drain (Cátodo)
    if (redLead === 'Source' && blackLead === 'Drain') {
      return {
        voltageDrop: 0.52,
        isConducting: true,
        isShortCircuit: false,
        technicalInterpretation: 'Diodo interno de protección (Body Diode) en directa (~0.52V). Normal en MOSFET de potencia.',
      };
    }
    // Gate está aislada por SiO2 -> con cualquier terminal debe dar OL siempre
    if (redLead === 'Gate' || blackLead === 'Gate') {
      return {
        voltageDrop: 'OL',
        isConducting: false,
        isShortCircuit: false,
        technicalInterpretation: 'Aislamiento galvánico perfecto de la Puerta (Gate por dióxido de silicio). La puerta no debe conducir en ningún sentido.',
      };
    }
    // Drain a Source en inversa
    return {
      voltageDrop: 'OL',
      isConducting: false,
      isShortCircuit: false,
      technicalInterpretation: 'Aislamiento Drenador-Surtidor sin polarizar la puerta. Correcto.',
    };
  }

  // MOSFET DAÑADO (Cortocircuito por sobretensión en fase VRM de placa base)
  if (componentType === 'MOSFET_N_SHORT') {
    if (
      (redLead === 'Drain' && blackLead === 'Source') ||
      (redLead === 'Source' && blackLead === 'Drain')
    ) {
      return {
        voltageDrop: 0.01,
        isConducting: true,
        isShortCircuit: true,
        technicalInterpretation: '¡FALLA CRÍTICA DETECTADA! Cortocircuito directo entre Drenador y Surtidor (0.01V / 0Ω). La fuente entra en protección OCP.',
      };
    }
    return {
      voltageDrop: 'OL',
      isConducting: false,
      isShortCircuit: false,
      technicalInterpretation: 'Medición de aislamiento.',
    };
  }

  return {
    voltageDrop: 'OL',
    isConducting: false,
    isShortCircuit: false,
    technicalInterpretation: 'Medición no válida.',
  };
}

/**
 * Sistema de gamificación y progresión de competencias para 1º CFGM SMR
 */
export interface UserProgress {
  xp: number;
  streakDays: number;
  cardsMastered: string[];
  cardsReviewing: string[];
  scenariosResolved: string[];
  badges: string[];
}

export interface LevelInfo {
  level: number;
  title: string;
  minXp: number;
  nextLevelXp: number;
  rankBadge: string;
}

export function calculateSmrLevel(xp: number): LevelInfo {
  if (xp < 200) {
    return {
      level: 1,
      title: 'Aprendiz de Taller SMR',
      minXp: 0,
      nextLevelXp: 200,
      rankBadge: '🔧 Nivel 1',
    };
  }
  if (xp < 550) {
    return {
      level: 2,
      title: 'Técnico de Hardware y Fuentes',
      minXp: 200,
      nextLevelXp: 550,
      rankBadge: '⚡ Nivel 2',
    };
  }
  return {
    level: 3,
    title: 'Especialista en Diagnóstico y VRM',
    minXp: 550,
    nextLevelXp: 1000,
    rankBadge: '🏆 Nivel 3 (Maestro SMR)',
  };
}
