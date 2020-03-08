const axios = require('axios')
const cheerio = require('cheerio')
Object.assign(global, require('ffp-js'))

go(
  axios.get('https://news.joins.com/sports'),
  html => {
    const $ = cheerio.load(html.data)
    const $list = $('div.list_sectionhome ul').children('li')
    const list = []
    $list.each(function(i) {
      list[i] = {
        img: $(this).find('img').attr('src'),
        title: $(this).find('h2.headline').text(),
        description: $(this).find('span.lead').text()
      }
    })
    return list
  },
  filter(data => data.title),
  map(data => ({
    img: data.img,
    title : data.title.replace("\n", ''),
    description : data.description.replace("\n", '')
  })),
  log
)
