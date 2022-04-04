require('dotenv').config()
const cors = require('cors')
const passport = require("passport")
const express = require('express')
require('./config/database')
const { Server } = require("socket.io")
const {getUserConected} = require('./controllers/socketControllers')



const Router = require('./routes/routes')
const PORT = process.env.PORT || 4000
const HOST = process.env.HOST || '0.0.0.0'
const path = require ('path')

const app = express()


//middlewares
app.use(cors())
app.use(express.json())
app.use(passport.initialize())
app.use('/api', Router)

if(process.env.NODE_ENV === 'production'){

    app.use(express.static('client/build'))
    app.get('*', (req, res)=>{
        res.sendFile(path.join(__dirname+"/client/build/index.html"))
    })

}

const server = app.listen(PORT, HOST,()=>console.log('Server ready on PORT '+PORT))

const io = new Server(server, { cors: { origin: '*' } }) //creamos la constante io y le pasamos los atributos de server y cors

io.on('connect', (socket) => {  // CONEXION PRIMARIA ENTRE EL SERVER Y NUESTRO IP LLAMADA DESDE APP
  console.log("Socket Connected")

  socket.on('userList', async () => {  
             //ES LLAMADA HOME CUANDO EL USUARIO YA REALIZO SIGNIN
    console.log("change on chat list")


    await getUserConected()       //BUSCA EN LA DB LOS USUARIOS CONECTADOS
      .then(response => {

        console.log(response)
        socket.emit('usersConected', { response }) //LO EMITE PARA TU SOCKET LO RECIBE EN "UsersConected"
        socket.broadcast.emit('usersConected', { response }) //LO EMITE PARA TODOS LOS SOCKETS "UsersConected"
      })
  });

  
});
