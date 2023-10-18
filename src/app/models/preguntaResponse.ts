export class PreguntaResponse {
    pregunta: string;
    respuesta: respuesta[];

    constructor(
        pregunta: string = "",
        respuesta: respuesta[] = [],
        
    ) {
        this.pregunta = pregunta;
        this.respuesta = respuesta;
    }
}

export class respuesta {
    id: number;
    posibleRespuesta: string;
    esLaCorrecta: boolean;

    constructor(
        id: number,
        posibleRespuesta: string,
        esLaCorrecta: boolean
    ) {
        this.id = id;
        this.posibleRespuesta = posibleRespuesta;
        this.esLaCorrecta = esLaCorrecta
    }
}

