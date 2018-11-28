import yaml
import time

with open("config.yml", 'r') as ymlfile:
        config = yaml.load(ymlfile)

REFERENCES = config['sensor_IR']['referencias']
print(REFERENCES)

def testingCiclos(num):
    print(num)

def startStop():
    with open("config.yml", 'r') as ymlfile:
                config = yaml.load(ymlfile)
    return config

if __name__ == '__main__':
    tf = config['start']['bool']
    i = 0
    while True:
        while tf == 1:
            testingCiclos(i)
            time.sleep(1)
            config = startStop()
            tf = config['start']['bool']
            if tf == 0:
                break
            i+=1
        config = startStop()
        tf = config['start']['bool']
    #print(tf)