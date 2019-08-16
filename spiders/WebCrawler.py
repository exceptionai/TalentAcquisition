# -*- coding: utf-8 -*-
import scrapy

class WebcrawlerSpider(scrapy.Spider):
    name = 'WebCrawler'
    allowed_domains = ['webcrawler']
    start_urls = ['https://pt.wikipedia.org/wiki/Programador']

    def parse(self, response):
        descricao = response.css(".mw-parser-output p").get()

