const express = require('express');
const app = express();
const PORT = 8080;

const cors = require('cors');

app.use(cors());
const options = {
  cors: {
    origin: 'http://localhost:4200',
  },
};

const server = require('http').Server(app);
const io = require('socket.io')(server, options);

app.get('/', function (req, res) {
  res.send('Hola Mundo!');
});



io.on('connection', function (socket) {

  const handshake = socket.id;
  let { nameRoom } = socket.handshake.query;
  console.log(`Hola dispositivo ${handshake} -> ${nameRoom}`)
  socket.join(nameRoom)

  //socket.on -> escucha eventos emmit
  //socket.to -> emite a todos menos al que envía el emit.
  //socket.emit -> emite a todos, incluyendo al que envía el msj.

  socket.on('event', (res) => {
    socket.to(nameRoom).emit('event', res);

  })

  socket.on('join-player', function (jugador) {
    console.log(jugador.nombreJugador)
    console.log(jugador.codigoSala)
    console.log('ingresó el jugador');
  });


  socket.on('disconnect', function () {
    console.log('se desconectó el usuario');
  });
});

server.listen(PORT, function () {
  console.log('\n')
  console.log(`>> Socket listo y escuchando por el puerto: ${PORT}`)
})
