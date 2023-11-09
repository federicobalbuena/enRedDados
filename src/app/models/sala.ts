import { Jugador } from "./jugador";

export class Sala {
    jugadores: Jugador [];
    modoDeJuego: string;
    dificultad: number;


    constructor(
        jugadores: Jugador [] = [],
        modoDeJuego: string = "",
        dificultad: number = 0
    ) {
        this.jugadores = jugadores;
        this.modoDeJuego = modoDeJuego;
        this.dificultad = dificultad;
    }
}
