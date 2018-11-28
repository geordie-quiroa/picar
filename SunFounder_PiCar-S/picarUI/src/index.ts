import app from './App'
import chalk from 'chalk';

const port: any = process.env.PORT || 3000

app.server.listen(port, '0.0.0.0', (err: any) => {
  if (err){
    console.log(err)
  }
  console.log(`Servidor está en puerto ${port}`)

  app.io.on('connect', (socket: SocketIO.Socket) => {
    socket.on('run-state', (data)=>{
      app.on = data
      console.log(chalk.red(`Iniciando/apagando piCAR-S, ${data}`))
    })
  })
})
