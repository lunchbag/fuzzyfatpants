import urllib2
from BeautifulSoup import BeautifulSoup

STORE_NUM = 1334 #One of many in the bay area
YEAR_NUM = 2014

result_json = {}

# for month in range(1,13)
month = 1
petco_url = construct_petco_url(STORE_NUM, month, YEAR_NUM)
soup = BeautifulSoup(urllib2.urlopen(PETCO_URL).read())
general_calendar = soup.findAll('div', {'class':'store-event-calendar-main'})[0]
store_address = soup.findAll('p', {'class':'store-loc-address'})
general_calendar_table = general_calendar.findAll('table', {'border':'0'})
#Cluster fuck

def construct_petco_url(store_num, month_num, year_num):
    PETCO_URL = "http://www.petco.com/content/StoreEventsCalendar.aspx?storeNum="+\
    str(store_num) + "&theMonth=" + str(month_num) + "&theYear=" + str(year_num)