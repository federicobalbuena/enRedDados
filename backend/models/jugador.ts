export class Jugador {
    nombreJugador: string;
    turno: boolean;
    codigoSala: String;


    constructor(
        nombreJugador: string = "",
        turno: boolean = false,
        codigoSala: string = ""
    ) {
        this.nombreJugador = nombreJugador;
        this.turno = turno;
        this.codigoSala = codigoSala;
    }
}
