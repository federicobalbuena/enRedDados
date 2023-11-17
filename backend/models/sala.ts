import { Jugador } from "./jugador";

export class Sala {
    jugadores: Jugador [];
    modoDeJuego: string;
    dificultad: number;
    codigoSala: string;


    constructor(
        jugadores: Jugador [] = [],
        modoDeJuego: string = "",
        dificultad: number = 0,
        codigoSala: string = ""
    ) {
        this.jugadores = jugadores;
        this.modoDeJuego = modoDeJuego;
        this.dificultad = dificultad;
        this.codigoSala = codigoSala
    }
}
