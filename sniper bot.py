from time import sleep
from requests_html import HTMLSession
from selenium import webdriver
from selenium.common.excepcions import NOSuchElementException
from selenium.webdriver.common.by import by


url_amazon= "https://www.amazon.com/ZOTAC-Graphics-IceStorm\n" \
            "-Advanced-ZT-D40810J-10P/dp/B0BKK371SB/ref=sr_\n" \
            "1_1?crid=1I7HMA6HDM8A3&keywords\n" \
            "=4080&qid=1675399033&sprefix=4080%2Caps%2C217&sr=8-1"

session = HTMLSession()

product_page = session.get(url_amazon)
found = product_page.html.find("#main-buy")

if len (found) > 0:
    driver = webdriver.Firefox()
    driver.get(url_amazon)
    driver.find_element_by_name("buy-now-button")


