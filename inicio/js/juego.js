
//Variables que necesito
const MAX_PERSONAJES = 50;
const MAX_IMPACTOS = 3;
const CLAVE_HISTORIAL = 'historialRescate';

//Velicidades
const configDificultad = {
  facil: { velocidadMin: 2, velocidadMax: 4, aparicionMin: 1800, aparicionMax: 3200, nombre: 'Fácil' },
  normal: { velocidadMin: 3, velocidadMax: 7, aparicionMin: 1000, aparicionMax: 3000, nombre: 'Normal' },
  dificil: { velocidadMin: 5, velocidadMax: 10, aparicionMin: 450, aparicionMax: 1200, nombre: 'Difícil' }
};

//juego Inicial
const juego = {
  
  temporizadores: [],
  intervaloMovimiento: null,
  partidaActiva: false,
  finalizada: false,
  salvados: 0,
  impactos: 0,
  resueltos: 0,
  puntos: 0,
  partidaGuardada: false,
  dificultad: 'normal'
};

//Cojo todos los elementos
const elementos = {
  iniciar: document.querySelector('#iniciar'),
  reiniciar: document.querySelector('#reiniciar'),
  dificultad: document.querySelector('#dificultad'),
  personajes: document.querySelector('#personajes'),
  suelo: document.querySelector('#suelo'),
  escenario: document.querySelector('#escenario'),
  salvados: document.querySelector('#salvados'),
  estrellados: document.querySelector('#estrellados'),
  resueltos: document.querySelector('#resueltos'),
  panelInicio: document.querySelector('#panel-inicio'),
  panelFinal: document.querySelector('#panel-final'),
  resultado: document.querySelector('#resultado'),
  guardarPartida: document.querySelector('#guardar-partida'),
  nombre: document.querySelector('#nombre'),
  verHistorial: document.querySelector('#ver-historial'),
  historial: document.querySelector('#historial'),
  filasHistorial: document.querySelector('#filas-historial'),
  ordenHistorial: document.querySelector('#orden-historial'),
  estadoGuardado: document.querySelector('#estado-guardado'),
  estadoHistorial: document.querySelector('#estado-historial'),
  cerrarHistorial: document.querySelector('#cerrar-historial')
};


