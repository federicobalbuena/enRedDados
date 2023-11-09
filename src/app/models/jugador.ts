export class Jugador {
    nombreJugador: string;
    turno: boolean;


    constructor(
        nombreJugador: string = "",
        turno: boolean = false,
    ) {
        this.nombreJugador = nombreJugador;
        this.turno = turno;
    }
}
