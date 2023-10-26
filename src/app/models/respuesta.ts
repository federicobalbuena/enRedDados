export class Respuesta {
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
