export class Jugador {
    nombreJugador: string;
    participa: boolean;
    turno: boolean;
    puntos: number;


    constructor(
        nombreJugador: string = "",
        participa: boolean = false,
        turno: boolean = false,
        puntos: number = 0
    ) {
        this.nombreJugador = nombreJugador;
        this.participa = participa;
        this.turno = turno;
        this.puntos = puntos;
    }
}
