from PyQt5.QtWidgets import *
from PyQt5.uic import * 
from PyQt5.QtCore import * 
from PyQt5 import QtSql
from PyQt5 import QtCore

from PyQt5.QtMultimedia import *
from PyQt5.QtMultimediaWidgets import *
from PyQt5.QtTest import *
from PyQt5.QtGui import *

import time
import cv2
import sys
import os

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




PROJECT_ID = "kiosk-69866"

cred = credentials.Certificate("./key/ServiceAccountKey.json")
default_app = firebase_admin.initialize_app(cred, {
    'storageBucket': f"{PROJECT_ID}.appspot.com"    
})

bucket = storage.bucket()

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
        ramd_customerId = random.randrange(1,1000)
        idx = 1
        
        now = time.localtime()
        str_time = ("%04d-%02d-%02d %02d:%02d:%02d"%(now.tm_year, now.tm_mon, now.tm_mday, now.tm_hour, now.tm_min, now.tm_sec))
        
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

class timeThread(QThread):
    timeSignal = pyqtSignal(str)
    def __init__(self):
        super().__init__()
        
    def run(self):
        while True:
            now = time.localtime()
            self.str_time = ("%02d:%02d:%02d"%(now.tm_hour, now.tm_min, now.tm_sec))
            self.printTime(self.str_time)
            QTest.qWait(100)
        
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




class stateThread(QThread):
    stateSignal = pyqtSignal(int)
    def __init__(self):
        super
    def run(self):
        while True:
            QTest.qWait(100)
    def printStatus(self, status_num):
        self.stateSignal.emit(self.str_data)
            
        





class cameraThread(QThread):
    mySignal = pyqtSignal(QPixmap)
    def __init__(self):
        super().__init__()
        self.cam = cv2.VideoCapture(0)
        self.cam.set(3, 480)
        self.cam.set(4, 320)


    def run(self):
        now = time.localtime()
        idx = 110
        bef = 0
        self.flag = False
        self.sec = now.tm_sec
        while True:
            ret, self.img = self.cam.read()
            
            if int(idx / 5) != int(bef / 5) :  
                self.flag = True
            else :
                self.flag = False
            #print("idx : %d, bef : %d"%(idx, bef))
            #print(self.flag)
            self.printImage(self.img, int(idx/5), self.flag)
            now = time.localtime()
            #print ("%d, %d"%(self.sec, now.tm_sec))
            if self.sec != now.tm_sec :
                idx = 0
                self.sec = now.tm_sec
            bef = idx
            idx = idx +1    
            
            QTest.qWait(10)

    def printImage(self, imgBGR, idx, flag):
        global img_list
        now = time.localtime()
        self.str_file = ("%04d%02d%02d%02d%02d%02d%02d.jpg"%(now.tm_year, now.tm_mon, now.tm_mday, now.tm_hour, now.tm_min, now.tm_sec, idx))
        #print(self.str_file)
        imgRGB = cv2.cvtColor(imgBGR, cv2.COLOR_BGR2RGB)
        h, w, byte = imgRGB.shape
        img = QImage(imgRGB, w, h, byte * w, QImage.Format_RGB888)
        img = QPixmap(img.scaled(240, 160))

        if flag == True :
            cv2.imwrite("./img/" + self.str_file, imgRGB)
            if idx == 1 :
                upload_file_path  = "./img/upload/" + self.str_file
                cv2.imwrite(upload_file_path, imgRGB)
                img_list.append(self.str_file)
            
        self.mySignal.emit(img)



class videoThread(QThread):
    mySignal = pyqtSignal()
    def __init__(self):
        super().__init__()
        
    def run(self):
        self.lsj();
        
    def lsj(self):
        fileName = "/home/pi/qt/video/output.h264"
        self.mediaPlayer.setMedia(QMediaContent(QUrl.fromLocalFile(fileName)))
        self.mediaPlayer.setVolume(50)
        self.mediaPlayer.play()
        
    def play(self):
        if self.mediaPlayer.state() == QMediaPlayer.PlayingState:
            self.mediaPlayer.pause()
        else:
            self.mediaPlayer.play()


# class camera(QWidget):
    # def __init__(self):
        # super().__init__()
        # self.setGeometry(0, 0, 600, 400)
        # #loadUi("camera.ui", self)
        # self.pic = QLabel("hello", self)
        # self.pic.setGeometry(100, 10, 300, 200)
        # self.main()


    # def main(self):
        # self.th = cameraThread()
        # self.th.mySignal.connect(self.setImage)
        # self.th.start()

    # def getPicture(self):
        # self.th.start()


    # def setImage(self, img):
        # self.pic.setPixmap(img)


#####################################################################################################
########################################### Main Widgets ############################################
#####################################################################################################

#1. Nomal state -> Advertiment video play
class VideoPlayer(QWidget):

    def __init__(self, parent=None) :
        super(VideoPlayer, self).__init__(parent)
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
        self.lsj()
        
        #self.pic = QLabel("hello", self)
        #self.pic.setGeometry(750, 100, 240, 160)
        self.main()
        

    def main(self):
        # self.th1 = cameraThread()
        # self.th1.mySignal.connect(self.setImage)
        # self.th1.start()
        #self.lsj()
        
        self.th2 = timeThread()
        self.th2.timeSignal.connect(self.setTime)
        self.th2.start()
        
        #self.th3 = dataThread()
        #self.th3.dataSignal.connect(self.setData)
        #self.th3.start()
        
    
    def setImage(self, img):
        self.pic.setPixmap(img)
        
        
    
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


    def lsj(self):
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
        print('BUTTON PRESS') 
        self.votePage = VoteView()
        self.votePage.showFullScreen()
        
    def printVideoState(self, state_num):
        print("state : %d"%(state_num))
    
        


#2. After screen touched
##class VoteView(QWidget):
    
    
    
#####################################################################################################
##############################################TEST AREA##############################################
#####################################################################################################
class VoteVideo(QWidget):

    def __init__(self, parent=None) :
        super(VoteVideo, self).__init__(parent)
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
        self.lsj()
        
        self.pic = QLabel("hello", self)
        self.pic.setGeometry(750, 100, 240, 160)

        self.main()
        

    def main(self):
        self.th1 = cameraThread()
        self.th1.mySignal.connect(self.setImage)
        self.th1.start()
        
        self.th2 = timeThread()
        self.th2.timeSignal.connect(self.setTime)
        self.th2.start()
        
        #self.th3 = dataThread()
        #self.th3.dataSignal.connect(self.setData)
        #self.th3.start()
        
        self.lsj()
        
    
    def setImage(self, img):
        self.pic.setPixmap(img)
        
        
    
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


    def lsj(self):
        fileName = "/home/pi/qt/video/output.h264"
        self.mediaPlayer.setMedia(QMediaContent(QUrl.fromLocalFile(fileName)))
        self.mediaPlayer.setVolume(50)
        self.mediaPlayer.play()
        







class VoteView(QWidget):
    def __init__(self) :
        super().__init__()
        loadUi("voteView2.ui", self)
        self.stackedWidget.setCurrentIndex(0)
        self.showFullScreen()
        QTest.qWait(3000)
        self.main()
        #self.startButton.clicked.connect(self.pushedStartButton)
    # def mousePressEvent(self, e): # e ; QMouseEvent 
        # print('BUTTON PRESS') 
        # self.votePage = TestWindow()
        # self.votePage.showFullScreen()
    # def pushedStartButton(self):
        # self.stackedWidget.setCurrentIndex(1)
    def main(self):
        self.stackedWidget.setCurrentIndex(1)
        self.voteVideoWidget = VoteVideo()
        self.voteVideoWidget.setGeometry(QRect(0,0,1024,768))
        self.voteVideoWidget.show()
        
    def uploadEmotionToDb(self):
        self.voteVideoWidget.th1.quit()
        for img_file in img_list:
            captureFileUpload(img_file)
        getEmotionData()
        sendingQuery()
        
        



class MyApp(QMainWindow): 
    def __init__(self):
        super().__init__() 
        loadUi("showAdv.ui", self)
        self.player = VideoPlayer(self)
        #self.player.resize(300, 200)
        self.setCentralWidget(self.player)
        #self.videoLayout.addWidget(self.player)


class TestWindow(QMainWindow):
    def __init__(self) :
        super().__init__()
        loadUi("showAdv.ui", self)
        self.player = VideoPlayer(self)
        self.player.setGeometry(QRect(0,0,1024,768))

    # def mousePressEvent(self, e): # e ; QMouseEvent 
        # print('BUTTON PRESS') 
        # self.votePage = VoteView()
        # self.votePage.showFullScreen()

def testMain():
    app = QApplication([]) 
    app.setStyleSheet("background-color:black;")  
    win = TestWindow()
    win.showFullScreen()
    win.setStyleSheet("background-color:white;")
    app.exec()



#####################################################################################################


global test
test = True


def main():
    if test == True:
        testMain()
        return 0
        
    app = QApplication([])
    app.setStyleSheet("background-color:black;")               
    win = VideoPlayer()
    win_thread = QThread()
    win.setWindowTitle("Player")
    win.showFullScreen()
    app.exec()
    


if __name__ == "__main__":
    # execute only if run as a script
    main()


