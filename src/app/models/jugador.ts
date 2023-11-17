export class Jugador {
    nombreJugador: string;
    participa: boolean;
    turno: boolean;
    puntos: number;
    respuestaCorrecta: boolean;


    constructor(
        nombreJugador: string = "",
        participa: boolean = false,
        turno: boolean = false,
        puntos: number = 0,
        respuestaCorrecta: boolean = false
    ) {
        this.nombreJugador = nombreJugador;
        this.participa = participa;
        this.turno = turno;
        this.puntos = puntos;
        this.respuestaCorrecta = respuestaCorrecta;
    }
}
