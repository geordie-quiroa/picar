const app = io()
let sensorArray = [0,0,0,0,0]
function socketEvents(){
  console.log('test')
  app.on('sensors', (data)=>{
    console.log(data)
    setChartVals(data)
    setDirection()
  })

  app.on('speed', (data)=>{
    console.log(data)
    document.getElementById('speed').innerHTML = data
  })
}

function setChartVals(data){
  let sensorsData = document.querySelectorAll('.sensor-data')
  let sensorValue = document.querySelectorAll('.sensor-value')
  let sensorTreshold = document.querySelectorAll('.sensor-threshold')
  for (let i = 0; i < sensorsData.length; i++){
    if (data[i] >= 350){
      sensorTreshold[i].innerHTML = 1
      sensorArray[i] = 1
    }else{
      sensorTreshold[i].innerHTML = 0
      sensorArray[i] = 0
    }
    sensorsData[i].style.height = ((data[i]/600)*100) + '%'
    sensorValue[i].innerHTML = data[i]
  }
}

function setDirection(){
  if (sensorArray[0] == 1 && sensorArray[1] == 1){
    document.getElementById('direction-arrow').style.transform = 'rotate(-45deg)'
  }else if (sensorArray[1] == 1 && sensorArray[2] == 1){
    document.getElementById('direction-arrow').style.transform = 'rotate(-20deg)'
  }else if (sensorArray[3] == 1 && sensorArray[2] == 1){
    document.getElementById('direction-arrow').style.transform = 'rotate(20deg)'
  }else if (sensorArray[3] == 1 && sensorArray[4] == 1){
    document.getElementById('direction-arrow').style.transform = 'rotate(45deg)'
  }else if (sensorArray[2] == 1){
    document.getElementById('direction-arrow').style.transform = 'rotate(0deg)'
  }
}

function onOff(cb){
  console.log(cb.checked)
  app.emit('run-state', cb.checked)
}