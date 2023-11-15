export class Jugador {
    nombreJugador: string;
    participa: boolean;
    turno: boolean;


    constructor(
        nombreJugador: string = "",
        participa: boolean = false,
        turno: boolean = false
    ) {
        this.nombreJugador = nombreJugador;
        this.participa = participa;
        this.turno = turno;
    }
}
