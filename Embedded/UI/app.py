from PyQt5.QtWidgets import *
from PyQt5.uic import * 
from PyQt5.QtCore import * 
from PyQt5 import QtSql
from PyQt5 import QtCore

from PyQt5.QtMultimedia import *
from PyQt5.QtMultimedia import QSound
from PyQt5.QtMultimediaWidgets import *
from PyQt5.QtTest import *
from PyQt5.QtGui import *

import time
import cv2
import sys
import os
import subprocess


import random

from smbus2 import SMBus

#image upload to firebase
import firebase_admin
from firebase_admin import credentials
from firebase_admin import storage
from uuid import uuid4

import requests
import json


#######default setting


global img_list
global url_list
global emo_list

img_list = []
url_list = []
emo_list = []


global test
test = False

PROJECT_ID = "kiosk-69866"

cred = credentials.Certificate("./key/ServiceAccountKey.json")
default_app = firebase_admin.initialize_app(cred, {
    'storageBucket': f"{PROJECT_ID}.appspot.com"    
})

bucket = storage.bucket()

f = []
file_list = []

def init():
    kioskId = open("/etc/kiosk/kioskId").read()
    kioskId = int(kioskId)
    print(kioskId)
    db = QtSql.QSqlDatabase.addDatabase('QMYSQL') 
    db.setHostName("<IP>") 
    db.setDatabaseName("project1") 
    db.setUserName("admin") 
    db.setPassword("<PASSWD>")
    db.setPort(3306)
    ok = db.open()
    print(ok)
    query = QtSql.QSqlQuery("select surveyId, userId, kioskId, video, videoPath from survey where kioskId = %d"%(kioskId))
    while (query.next()): 
        record = query.record()
        # getData = "%d | %d | %d | %s | %s" % (record.value(0), record.value(1), record.value(2), record.value(3), record.value(4))
        # print(getData)
        row = []
        for i in range(5):
            row.append(record.value(i))
        sid = record.value(0)
        print(row)
        global file_list
        file_list.append(row)
        
        
        # url = 'http://i3a103.p.ssafy.io:7070/api/download/' + str(sid)
        # r = requests.get(url, allow_redirects=True)
        # downloadPath = '/home/pi/test/down/%s.jpg'%(str(sid)
        # global video_list
        # video_list.append(downloadPath)
        # open(downloadPath), 'wb').write(r.content)


def captureFileUpload(file):
    global url_list
    
    blob = bucket.blob(file)
    new_token = uuid4()
    metadata = {"firebaseStorageDownloadTokens": new_token}
    blob.metadata = metadata

    #upload file
    blob.upload_from_filename(filename='./img/upload/'+file, content_type='image/jpeg')
    img_url = 'https://firebasestorage.googleapis.com/v0/b/' + PROJECT_ID + '.appspot.com/o/' + file + '?alt=media&token=' + str(new_token)
    url_list.append(img_url)
    #print(blob.public_url)



subscription_key = "<SUBSCRIPTION KEY>"
face_api_url = 'https://leesj.cognitiveservices.azure.com//face/v1.0/detect'

def getEmotionData():
    global url_list
    global emo_list
    headers = {'Ocp-Apim-Subscription-Key': subscription_key}
    
    params = {
        'returnFaceId': 'true',
        'returnFaceLandmarks': 'false',
        #'returnFaceAttributes': 'age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise',
        'returnFaceAttributes' : 'emotion',
    }    
    
    for img_url in url_list:
        response = requests.post(face_api_url, params=params, headers=headers, json={"url": img_url})
        #print(img_url)
        emo_result = json.dumps(response.json())
        emo_result = emo_result[emo_result.find("emotion"):]
        emo_result = emo_result[emo_result.find("{"):]
        emo_result = emo_result[:emo_result.find("}")+1]
        print(emo_result)
        emo_list.append(emo_result)
        
        
        
def sendingQuery():
        global emo_list
        db = QtSql.QSqlDatabase.addDatabase('QMYSQL') 
        db.setHostName("<IP>") 
        db.setDatabaseName("project1") 
        db.setUserName("admin") 
        db.setPassword("<PASSWD>")
        db.setPort(3306)
        ok = db.open()
        print(ok)
        query = QtSql.QSqlQuery("select * from answer");
        ramd_surveyId = random.randrange(1,1000)
        ramd_userID = random.randrange(1,1000)
        ramd_customerId = -1
        idx = 1
        
        now = time.localtime()
        str_time = ("%04d-%02d-%02d %02d:%02d:%02d"%(now.tm_year, now.tm_mon, now.tm_mday, now.tm_hour, now.tm_min, now.tm_sec))
        str_time = str(str_time)
        
        for str_emotion in emo_list : 
            query.prepare("INSERT INTO answer (surveyId, userID, customerId, emotions, createdAt, timeIndex) VALUES(:surveyId, :userID, :customerId, :emotions, :createdAt, :timeIndex)")
            query.bindValue(":surveyId", ramd_surveyId) 
            query.bindValue(":userID", ramd_userID) 
            query.bindValue(":customerId", ramd_customerId) 
            query.bindValue(":emotions", str_emotion)
            query.bindValue(":createdAt", str_time) 
            
            query.bindValue(":timeIndex", idx) 
            idx = idx+1
            
            
            str_time =  QDateTime().currentDateTime()
            #print(str_time)

            query.exec_()
            print("sending query complement")
            
            

#####################################################################################################
############################################## Threads ##############################################
#####################################################################################################

class surveyFinishThread(QThread):
    def __init__(self):
        super().__init__()
    def run(self):
        for img in img_list : 
            captureFileUpload(img)
        captureFileUpload()
        sendingQuery()
        

global timeThreadLoop
timeThreadLoop = True
class timeThread1(QThread):
    timeSignal = pyqtSignal(str)
    def __init__(self):
        super().__init__()
        print("timeThread1 start")
        global timeThreadLoop
        timeThreadLoop = True
        
    def run(self):
        print("timeThread1 loop")
        while True:
            if timeThreadLoop == True:
                
                now = time.localtime()
                self.str_time = ("%02d:%02d:%02d"%(now.tm_hour, now.tm_min, now.tm_sec))
                self.printTime(self.str_time)
                QTest.qWait(100)
            else :
                print("timeThreadLoop exit1")
                break;
        
    def printTime(self, str_time):
        self.timeSignal.emit(self.str_time) 
        
        
        
class timeThread2(QThread):
    timeSignal = pyqtSignal(str)
    def __init__(self):
        super().__init__()
        print("timeThread2 start")
        global timeThreadLoop
        timeThreadLoop = True
        
    def run(self):
        print("timeThread2 loop")
        while True:
            if timeThreadLoop == True:
                
                now = time.localtime()
                self.str_time = ("%02d:%02d:%02d"%(now.tm_hour, now.tm_min, now.tm_sec))
                self.printTime(self.str_time)
                QTest.qWait(100)
            else :
                print("timeThreadLoop exit2")
                break;
        
    def printTime(self, str_time):
        self.timeSignal.emit(self.str_time) 


        
class dataThread(QThread):
    dataSignal = pyqtSignal(str)
    def __init__(self):
        super().__init__()
        self.i2c = SMBus(1)
        self.addr = 0x08
        self.numb = 1

        #print("Sending Data : {}".format(self.numb))
        self.str_data = ""
        self.i2c.write_byte(self.addr, self.numb)
    def run(self):
        while True:
            self.numb = self.numb + 1
            try:
                b = self.i2c.read_i2c_block_data(self.addr, 0, 30)
            except :
                print("Traback")
            else:
                self.str_data = ""
                for i in range(0,30):
                    if b[i] != 0:
                        self.str_data = self.str_data+ chr(b[i])
                #print(b)
                #print(self.str_data)
                self.printData(self.str_data)    
            QTest.qWait(100)
        
    def printData(self, str_data):
        self.dataSignal.emit(self.str_data)
        


class faceCheckThread(QThread):
    faceSignal = pyqtSignal(str)
    def __init__(self):
        super().__init__()
        self.detect(self.str_face_path)
    def detect(self, str_face_path):
        face_cascade = cv2.CascadeClassifier('/home/pi/.local/lib/python3.7/site-packages/cv2/data/haarcascade_frontalcatface.xml')
        eye_cascade = cv2.CascadeClassifier('/home/pi/.local/lib/python3.7/site-packages/cv2/data/haarcascade_eye.xml')
        face_classifier = cv2.CascadeClassifier('/home/pi/.local/lib/python3.7/site-packages/cv2/data/haarcascade_frontalface_default.xml')
        
        src = cv2.imread(str_face_path)
        src_gray = cv2.cvtColor(src, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(src_gray,1.3,3)
        
        for x, y, w, h in faces:
            cv2.rectangle(src, (x, y), (x + w, y + h), (255, 0, 0), 2)
            face = src[y: y + h, x: x + w]
            face_gray = src_gray[y: y + h, x: x + w]
            eyes = eye_cascade.detectMultiScale(face_gray)
            for (ex, ey, ew, eh) in eyes:
                cv2.rectangle(face, (ex, ey), (ex + ew, ey + eh), (0, 255, 0), 2)

        cv2.imwrite('/home/pi/qt/img/output.jpg', src)

        isface = face_classifier.detectMultiScale(src_gray, 1.3, 5)

        if isface is():
            print ("None")
        else :
            print ("Face On")
            

        
class imageUploadThraed(QThread):
    def __init__(self):
        super().__init__()
        pass



class videoStateThread(QThread):
    stateSignal = pyqtSignal()
    def __init__(self):
        super().__init__()
    def run(self):
        while True:
            self.printStatus()
            QTest.qWait(1000)
    def printStatus(self):
        self.stateSignal.emit()


cameraThreadLoop = True
class cameraThread(QThread):
    def __init__(self):
        super().__init__()
        self.cam = cv2.VideoCapture(0)
        self.cam.set(3, 480)
        self.cam.set(4, 320)


    def run(self):
        now = time.localtime()
        idx = 0
        bef = 0
        self.flag = False
        self.sec = now.tm_sec

        global cameraThreadLoop
        while True:
            ret, self.img = self.cam.read()
            
            if int(idx / 5) != int(bef / 5) :  
                self.flag = True
            else :
                self.flag = False
            self.printImage(self.img, int(idx/5), self.flag)
            now = time.localtime()
            if self.sec != now.tm_sec :
                idx = 0
                self.sec = now.tm_sec
            bef = idx
            idx = idx +1    
            
            QTest.qWait(10)
            if cameraThreadLoop == False :
                break;
            

    def printImage(self, imgBGR, idx, flag):
        global img_list
        now = time.localtime()
        self.str_file = ("%04d%02d%02d%02d%02d%02d%02d.jpg"%(now.tm_year, now.tm_mon, now.tm_mday, now.tm_hour, now.tm_min, now.tm_sec, idx))
        #print(self.str_file)
        imgRGB = cv2.cvtColor(imgBGR, cv2.COLOR_BGR2RGB)
        h, w, byte = imgRGB.shape
        img = QImage(imgRGB, w, h, byte * w, QImage.Format_RGB888)
        img = QPixmap(img.scaled(240, 160))
        #img = cv2.rectangle(img, (100,60), (140,100),(0,0,255), 2)

        if flag == True :
            cv2.imwrite("./img/" + self.str_file, imgRGB)
            if idx == 1 :
                upload_file_path  = "./img/upload/" + self.str_file
                cv2.imwrite(upload_file_path, imgRGB)
                img_list.append(self.str_file)




global setLocationCameraThreadLoop 
setLocationCameraThreadLoop =  True

class setLocationCameraThread(QThread):
    mySignal = pyqtSignal(QPixmap)
    
    def __init__(self):
        super().__init__()
        print("setLocationCameraThread init")
        print(1)
        self.cam = cv2.VideoCapture(0)
        print(2)
        self.cam.set(3, 960)
        print(3)
        self.cam.set(4, 640)
        print(4)
        global setLocationCameraThreadLoop
        setLocationCameraThreadLoop =  True
        #print(setLocationCameraThreadLoop)



    def run(self):
        global setLocationCameraThreadLoop
        print("setLocationCameraThread run")
        while True:
            #print("setLocationCameraThreadLoop : %s"%(setLocationCameraThreadLoop))
            if setLocationCameraThreadLoop == True:
                ret, self.img = self.cam.read()
                self.printImage(self.img)
                QTest.qWait(10)
            else :
                break

    def printImage(self, imgBGR):
        now = time.localtime()
        imgRGB = cv2.cvtColor(imgBGR, cv2.COLOR_BGR2RGB)
        h, w, byte = imgRGB.shape
        img = QImage(imgRGB, w, h, byte * w, QImage.Format_RGB888)
        img = QPixmap(img.scaled(960, 640))
        #img = cv2.rectangle(img, (100,60), (140,100),(0,0,255), 2)             
        self.mySignal.emit(img)
        
        
        
class timeWaitThread(QThread):
    timeWaitSignal = pyqtSignal()
    def __init__(self, wait_sec):
        super().__init__()
        self.wait_sec = wait_sec
        print("timecheck start")
    def run(self):
        QTest.qWait(self.wait_sec)
        self.timeWaitSignal.emit()
        
        
class soundPlayThread(QThread):
    def __init__(self, soundFile):
        super().__init__()
        self.soundFile = soundFile
    def run(self):
        QSound(self.soundFile).play()
        
    

#####################################################################################################

#####################################################################################################
########################################### Main Widgets ############################################
#####################################################################################################

class VideoPlayer(QWidget):
    closeSignal = pyqtSignal()
    def __init__(self, parent=None) :
        super(VideoPlayer, self).__init__(parent)
        self.setAttribute(Qt.WA_DeleteOnClose)
        self.setGeometry(0,0,1024,768)
        self.mediaPlayer = QMediaPlayer(None, QMediaPlayer.VideoSurface) 
        videoWidget = QVideoWidget()
        top = QHBoxLayout()
        emptybox1 = QLabel("", self)
        emptybox2 = QLabel("", self)
        emptybox3 = QLabel("", self)
        emptybox4 = QLabel("", self)
        self.nowTimeLabel = QLabel("", self)
        self.playTimeLabel = QLabel("PlayTime", self)
        self.tempLabel = QLabel("Temp", self)
        self.humiLabel = QLabel("Humi", self)
                
        # emptybox1.setStyleSheet("background: url(untacto.png) no-repeat center;"
                            # "background-size: contain;")
        # self.nowTimeLabel.setStyleSheet("color: #212529;" 
                            # "font-weight:900;" 
                            # "font-size:1rem;" 
                            # "font-family: 'Nanum Gothic', sans-serif")
        # self.playTimeLabel.setStyleSheet("color: #212529;" 
                            # "font-weight:900;" 
                            # "font-size:1rem;" 
                            # "font-family: 'Nanum Gothic', sans-serif")

        # self.tempLabel.setStyleSheet("color: #212529;" 
                            # "font-weight:900;" 
                            # "font-size:1rem;" 
                            # "font-family: 'Nanum Gothic', sans-serif")                
        # self.humiLabel.setStyleSheet("color: #212529;" 
                            # "font-weight:900;" 
                            # "font-size:1rem;" 
                            # "font-family: 'Nanum Gothic', sans-serif")       

        top.addWidget(emptybox1)
        top.addWidget(self.nowTimeLabel)
        top.addWidget(self.playTimeLabel)
        top.addWidget(self.tempLabel)
        top.addWidget(self.humiLabel)
        top.addWidget(emptybox3)

        layout = QVBoxLayout()
        layout.addLayout(top)
        layout.addWidget(videoWidget)
        self.setLayout(layout)
        self.mediaPlayer.setVideoOutput(videoWidget)
        self.playVideo()
        
        self.main()
        

    def main(self):
        self.th2 = timeThread1()
        self.th2.timeSignal.connect(self.setTime)
        self.th2.start()
        
        #self.th3 = dataThread()
        #self.th3.dataSignal.connect(self.setData)
        #self.th3.start()
        
        self.th4 = videoStateThread()
        self.th4.stateSignal.connect(self.printVideoState)
        self.th4.start()
        
        #self.th5 = soundPlayThread("/home/pi/qt/video/test7.aac")
        #self.th5.start()

    
    
    def setTime(self, str_time) :
        self.nowTimeLabel.setText("현재 시간  " + str_time)

        
    def setData(self, str_data) :
        try:
            gtnData = str_data.split()
            self.playTimeLabel.setText("진행 시간  " + gtnData[0])
            self.tempLabel.setText("현재 온도  " + gtnData[1] + "°C")
            self.humiLabel.setText("현재 습도  " + gtnData[2] + "%")
        except:
            pass
            #print("RECEIVE DATA : {}".format(str_data))


    def playVideo(self):
        fileName = "/home/pi/qt/video/output.h264"
        self.mediaPlayer.setMedia(QMediaContent(QUrl.fromLocalFile(fileName)))
        self.mediaPlayer.setVolume(50)
        self.mediaPlayer.play()
        

    def play(self):
        if self.mediaPlayer.state() == QMediaPlayer.PlayingState:
            self.mediaPlayer.pause()
        else:
            self.mediaPlayer.play()
         
         
    #if screen touched start vote
    def mousePressEvent(self, e): # e ; QMouseEvent 
        global timeThreadLoop
        timeThreadLoop = False
        self.th2.exit()
        self.th4.exit()

        self.closeSignal.emit()
        
    def printVideoState(self):
        if self.mediaPlayer.state() == QMediaPlayer.StoppedState :
            self.playVideo()
            
    # def closeEvent(self, e):
        # self.th2.exit()
        # #self.th3.exit()
        # self.th4.exit()
        # print("VideoPlayer close")
        # self.closeSignal.emit()
    

class Guide(QWidget):
    closeSignal = pyqtSignal()
    def __init__(self) :
        super().__init__()
        self.setAttribute(Qt.WA_DeleteOnClose)
        self.main()
        
    def main(self):
        self.guide = QLabel("화면안에 얼굴을 고정시켜 주세요", self)
        self.guide.setGeometry(230, 0, 564, 100)
        self.guide.setStyleSheet("font-size:30pt;")
        self.guide.setAlignment(Qt.AlignCenter)
        self.pic = QLabel("", self)
        self.pic.setGeometry(32, 108, 960, 640)
        
        self.th1 = setLocationCameraThread()
        self.th1.mySignal.connect(self.setImage)
        self.th1.start()
        
        self.th2 = timeWaitThread(10000)
        self.th2.timeWaitSignal.connect(self.getAlram)
        self.th2.start()

        
        #QTest.qWait(3000)
    def getAlram(self):
        global setLocationCameraThreadLoop
        setLocationCameraThreadLoop = False
        self.closeSignal.emit()

    def setImage(self, img):
        self.pic.setPixmap(img)
        
    def closeEvent(self, e):
        self.th1.cam.release()
        self.th1.exit()
        self.th2.exit()
        

class SurveyVideo(QWidget):
    closeSignal = pyqtSignal()
    def __init__(self, parent=None) :
        super(SurveyVideo, self).__init__(parent)
        self.setGeometry(0,0,1024,768)
        self.mediaPlayer = QMediaPlayer(None, QMediaPlayer.VideoSurface) 
        videoWidget = QVideoWidget()
        top = QHBoxLayout()
        emptybox1 = QLabel("", self)
        emptybox2 = QLabel("", self)
        emptybox3 = QLabel("", self)
        emptybox4 = QLabel("", self)
        self.nowTimeLabel = QLabel("", self)
        self.playTimeLabel = QLabel("PlayTime", self)
        self.tempLabel = QLabel("Temp", self)
        self.humiLabel = QLabel("Humi", self)
        self.overlap_signal_cancle = False
        

        emptybox1.setStyleSheet("background: url(untacto.png) no-repeat center;"
                            "background-size: contain;")
        self.nowTimeLabel.setStyleSheet("color: #212529;" 
                            "font-weight:900;" 
                            "font-size:1rem;" 
                            "font-family: 'Nanum Gothic', sans-serif")
        self.playTimeLabel.setStyleSheet("color: #212529;" 
                            "font-weight:900;" 
                            "font-size:1rem;" 
                            "font-family: 'Nanum Gothic', sans-serif")

        self.tempLabel.setStyleSheet("color: #212529;" 
                            "font-weight:900;" 
                            "font-size:1rem;" 
                            "font-family: 'Nanum Gothic', sans-serif")                
        self.humiLabel.setStyleSheet("color: #212529;" 
                            "font-weight:900;" 
                            "font-size:1rem;" 
                            "font-family: 'Nanum Gothic', sans-serif")

                            
        top.addWidget(emptybox1)
        top.addWidget(self.nowTimeLabel)
        top.addWidget(self.playTimeLabel)
        top.addWidget(self.tempLabel)
        top.addWidget(self.humiLabel)
        top.addWidget(emptybox3)

        layout = QVBoxLayout()
        layout.addLayout(top)
        layout.addWidget(videoWidget)
        self.setLayout(layout)
        self.mediaPlayer.setVideoOutput(videoWidget)
        self.playVideo()
        
        self.main()
        

    def main(self):
        self.th1 = cameraThread()
        self.th1.start()
    
        self.th2 = timeThread2()
        self.th2.timeSignal.connect(self.setTime)
        self.th2.start()
        
        #self.th3 = dataThread()
        #self.th3.dataSignal.connect(self.setData)
        #self.th3.start()
        
        self.th4 = videoStateThread()
        self.th4.stateSignal.connect(self.checkVideoState)
        self.th4.start()

    def checkVideoState(self):
        if self.overlap_signal_cancle == False :
            if self.mediaPlayer.state() == QMediaPlayer.StoppedState :
                self.overlap_signal_cancle = True
                global timeThreadLoop
                global cameraThreadLoop
                timeThreadLoop = False
                cameraThreadLoop = False
                
                self.closeSignal.emit()

    
    def setTime(self, str_time) :
        self.nowTimeLabel.setText("현재 시간  " + str_time)

        
    def setData(self, str_data) :
        try:
            gtnData = str_data.split()
            self.playTimeLabel.setText("진행 시간  " + gtnData[0])
            self.tempLabel.setText("현재 온도  " + gtnData[1] + "°C")
            self.humiLabel.setText("현재 습도  " + gtnData[2] + "%")
        except:
            pass



    def playVideo(self):
        fileName = "/home/pi/qt/video/output.h264"
        self.mediaPlayer.setMedia(QMediaContent(QUrl.fromLocalFile(fileName)))
        self.mediaPlayer.setVolume(50)
        self.mediaPlayer.play()
        
    def closeEvent(self, e):
        self.th1.cam.release()
        self.th1.exit()
        self.th2.exit()
        #self.th3.exit()
        self.th4.exit()
        
class GetInfo(QWidget):
    
    closeSignal = pyqtSignal()
    proc = 0
    def __init__(self) :
        super().__init__()
        self.setAttribute(Qt.WA_DeleteOnClose)
        self.th1 = timeWaitThread(7000)
        self.th1.timeWaitSignal.connect(self.timeOut)
        self.th2 = surveyFinishThread()

        #self.proc = subprocess.Popen(["chromium-browser", "--start-maxximized", "--kiosk", "http://i3a103.p.ssafy.io:3100/customerlogin"])
        self.proc = subprocess.Popen(["chromium-browser", "--start-maxximized", "--kiosk", "https://www.naver.com"])
        self.th1.start()
        self.th2.start()
        
    def timeOut(self):
        self.th1.exit()
        self.th2.exit()
        self.proc.kill()
        self.closeSignal.emit()
        
class MainWindow(QMainWindow):
    def __init__(self) :
        super().__init__()
        print("window init")
        self.setGeometry(QRect(0,0,1024, 768))

        self.label = QLabel("잠시만 기다려주세요")
        self.setCentralWidget(self.label)
        self.label.setStyleSheet("font-size:80pt")
        self.label.setGeometry(0,30, 1000,80)
        self.advPlay()

    def main(self):
        print("start main")
        self.advPlay()
        
    def advPlay(self):
        self.player = VideoPlayer(self)
        self.player.setGeometry(QRect(0,0,1024,768))
        self.player.showFullScreen()
        print("VideoPlayer")
        self.player.closeSignal.connect(self.guideCameraLine)
        
    def guideCameraLine(self):
        self.player.close()
        print("VideoPlayer close")
        self.guide = Guide()
        self.guide.setGeometry(QRect(0,0,1024,768))
        self.guide.showFullScreen()
        print("Guide")
        self.guide.closeSignal.connect(self.surveyStart)
        
    def surveyStart(self):
        self.guide.close()
        print("Guide close")
        self.survey = SurveyVideo(self)
        print("SurveyVideo")
        self.survey.setGeometry(QRect(0,0,1024,768))
        self.survey.showFullScreen()
        self.survey.closeSignal.connect(self.getCustomerInfo)
    
    def getCustomerInfo(self):
        self.survey.close()
        print("SurveyVideo close")
        self.getinfo = GetInfo()
        print("GetInfo")
        self.getinfo.closeSignal.connect(self.restart)
        
    def restart(self):
        self.getinfo.close()
        self.getinfo.destroy()
        self.advPlay()        
        
     


        
   
#####################################################################################################        
        
#####################################################################################################
##############################################TEST AREA##############################################
#####################################################################################################

#####################################################################################################

def main():
    print("start main()")
    #init()
    app = QApplication([]) 
    app.setStyleSheet("background-color:black;")  
    win = MainWindow()
    win.setWindowTitle("KIOSK")
    win.setStyleSheet("background-color:white;")
    win.setGeometry(0,0,1024,768)
    win.showFullScreen()
    app.exec()
    


if __name__ == "__main__":
    # execute only if run as a script
    print("main start")
    main()


