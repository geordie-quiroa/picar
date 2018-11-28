from SunFounder_Line_Follower import Line_Follower
from picar import front_wheels
from picar import back_wheels
import time
import picar

import yaml
import json

def readConf():
	with open("config.yml", 'r') as ymlfile:
		config = yaml.load(ymlfile)
	return config

def straight_run():
	while True:
		bw.speed = config['traccion_trasera']['straight_run'] #70
		bw.forward()
		fw.turn_straight()

def main():
    bw.speed = forward_speed
    bw.forward()

def destroy():
	bw.stop()
	fw.turn(90)

config = readConf()

picar.setup()

REFERENCES = config['sensor_IR']['referencias']
#calibrate = True
calibrate = config['sensor_IR']['calibrate']
forward_speed = config['traccion_trasera']['forward_speed'] #80
backward_speed = config['traccion_trasera']['backward_speed'] #70
turning_angle = config['eje_delantero']['turning_angle'] #40

max_off_track_count = 30

delay = config['sensor_IR']['delay'] #0.0005

refe = 350

fw = front_wheels.Front_Wheels(db='config')
bw = back_wheels.Back_Wheels(db='config')
lf = Line_Follower.Line_Follower()

lf.references = REFERENCES
fw.ready()
bw.ready()
fw.turning_max = config['eje_delantero']['turning_max'] #45

if __name__ == '__main__':
    try:
        while True:
            main()
    except KeyboardInterrupt:
        destroy()