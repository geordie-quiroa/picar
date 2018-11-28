import { createServer, Server } from 'http'
import express from 'express'
import cors from 'cors'
import socketIo from 'socket.io'
import * as path from 'path'

import chalk from 'chalk';


class App{  
  public server: Server
  public io: SocketIO.Server
  public app: express.Application
  public on: boolean = false

  constructor () {
    // App Express
    this.app = express()
    // Carga los archivos estaticos del directorio 'client'
    this.app.use(express.static(path.resolve(__dirname, '../client')))
    // Mount extra routes
    this.mountRoutes()
    // Http Server
    this.server = createServer(this.app)
    // Socket.io Server
    this.io = socketIo(this.server)
  }

  private mountRoutes(): void {
    const router: any = express.Router()

    // CORS module to allow cross origin resource sharing
    router.use(cors())

    router.post('/sensors/:data', (req: express.Request, res: express.Response) => {
      console.log(chalk.cyan(`Valores sensores ${req.params.data}`))

      this.io.emit('sensors', JSON.parse(req.params.data))

      res.status(200).send({'status': 200, 'data': req.params.data})      
    })

    router.post('/speed/:speed', (req: express.Request, res: express.Response) => {
      console.log(chalk.cyan(`Velocidad del carro ${req.params.speed}`))

      this.io.emit('speed', JSON.parse(req.params.speed))

      res.status(200).send({'status': 200, 'data': req.params.speed})
    })

    router.get('/on', (req: express.Request, res: express.Response) => {
      console.log(chalk.cyan(`Pedido de encendido, ${this.on}`))
      res.status(200).send(this.on)
    })

    // Set router location
    this.app.use('/', router)
  }
}

//Exportar app
export default new App()