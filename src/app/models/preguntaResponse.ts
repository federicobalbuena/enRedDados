import { Respuesta } from "./respuesta";

export class PreguntaResponse {

    pregunta: string;
    respuesta: Respuesta[];

    constructor(
        pregunta: string = "",
        respuesta: Respuesta[] = [],
        
    ) {
        this.pregunta = pregunta;
        this.respuesta = respuesta;
    }
}
