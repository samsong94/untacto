from PyQt5.QtWidgets import *
from PyQt5.uic import * 
from PyQt5.QtCore import * 
from PyQt5.QtWebEngineWidgets import QWebEngineView


class MyApp(QMainWindow) :
    def __init__(self):
        super().__init__()
        self.main()
        
    def main(self):
        self.widget  = QWebEngineView()
        self.widget.load(QUrl("https://www.naver.com"))


app = QApplication([]) 
win = MyApp() 
win.showFullScreen() 
app.exec()