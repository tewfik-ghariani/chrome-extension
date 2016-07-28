# -*- coding: utf-8 -*-

import tornado.httpserver
import tornado.web
import tornado.ioloop
import json
import codecs
import requests as req

from guess_language import guess_language
from textblob import TextBlob as tb

def analyse(phrase):
    global scowrod

    scoword =0
    if "😅" in phrase:
    	phrase = phrase.replace("😅","")
    	scoword += 0.2
    if "<span class=\"accessible_elem\">smile emoticon</span><span title=\":-)\" class=\"emoticon emoticon_smile\"></span>" in phrase:
    	phrase =  phrase.replace("<span class=\"accessible_elem\">smile emoticon</span><span title=\":-)\" class=\"emoticon emoticon_smile\"></span>","")
    	scoword += 0.3
    if "<span class=\"accessible_elem\">grin emoticon</span><span title=\":D\" class=\"emoticon emoticon_grin\"></span>" in phrase:
    	phrase =  phrase.replace("<span class=\"accessible_elem\">grin emoticon</span><span title=\":D\" class=\"emoticon emoticon_grin\"></span>" ,"")
    	scoword += 0.4
    #if "<i class=\"_3kkw\" style=\"background-image: url(&quot;https://z-1-static.xx.fbcdn.net/images/emoji.php/v2/ufc/1/16/1f44d.png&quot;);\"><span class=\"accessible_elem\">👍</span>" in phrase:
    #	phrase =  phrase.replace( "<i class=\"_3kkw\" style=\"background-image: url(&quot;https://z-1-static.xx.fbcdn.net/images/emoji.php/v2/ufc/1/16/1f44d.png&quot;);\"><span class=\"accessible_elem\">👍</span>","")
    #	scoword += 0.1

    if "hard work" in phrase:
    	scoword+= 0.4
    if "Well done" in phrase:
    	scoword+= 0.2



    phrase = tb(phrase)
  #  phrase = phrase.correct()
    print (phrase)

    wordo = phrase.words
    lon = len(wordo)
    

    if phrase.detect_language() != 'en' :
    	phrase = phrase.translate(to='en')
    for word in phrase.words :
        scoword = scoword + tb(word).sentiment.polarity
    result = scoword
    print(result)    
    score = str(result)  
     
      
    return score



class MainHandler(tornado.web.RequestHandler):
	def post(self):
        	self.set_header('Access-Control-Allow-Origin', '*')
        	self.set_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
                self.set_header('Content-type', 'application/json')

		print('_____________________Request________________________________')
		print self.request
		s = self.request.body
		print('_______________________response.body_________________________________')
		print(s)
		print('___________________________sans crochets______________________________')
		s = s.lstrip('[').rstrip(']')
		print s
		print ('___________________________________________________________________________________________')
	#	print('___________________________first comment______________________________')
	#	print s.split('"')[1].split('"')[0]
		i = 1
		j = 1
		#rep = []
		dico = {}
		
		s=str(s)
                if "<span class=\"accessible_elem\">smile emoticon</span><span title=\":-)\" class=\"emoticon emoticon_smile\"></span>" in s :
    			s=s.replace("<span class=\"accessible_elem\">smile emoticon</span><span title=\":-)\" class=\"emoticon emoticon_smile\"></span>","")
                if "emoticon_grin" in s :
			print ("bouhaaaa")
			s=s.replace("<span class=\"accessible_elem\">grin emoticon</span><span title=\":D\" class=\"emoticon emoticon_grin\"></span>" ,"")
		
                comments = s.split('"')
		while  i <  len(comments) - 1 :
			phrase = comments[i]
			
			if phrase!=',' :

				if phrase ==',null,':
					dico[j] = "fail"					
					#rep.append(0)				
				else:
					print phrase	
					score = analyse (phrase)
					print('>>>>>>>>>>>>>>>>>>>>', score , '<<<<<<<<<<<<<<<')
					dico[j]= score				
					#rep.append(1)
				j = j + 1
			i = i + 1


		print dico
		toul=len(dico)


		#self.finish(json.dumps('{"msg": dico }'))
		self.finish (json.dumps(dico))
		#self.write(json.dumps(rep))
		

#	def get(self):
#		self.write('msg')
	#	done='GJ'






application= tornado.web.Application([(r"/",MainHandler) ])
application.listen(8005)
tornado.ioloop.IOLoop.current().start()
