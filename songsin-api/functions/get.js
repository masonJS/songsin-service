Object.assign(global, require('ffp-js'))
const axios = require('axios')
const cheerio = require('cheerio')
const { POOL } = require('/opt/libs/postgresql-lib')
const { QUERY } = POOL
const { success, failure } = require('/opt/libs/response-lib')
const { convertEvent2Data } = require('/opt/libs/request-lib')
const { MOMENT } = require('./utils')

exports.getUser = async (event, context) => {
  try {
    const data = convertEvent2Data(event)

    return (!data)
      ? go(
        {
          status: false,
          message: 'Error params'
        },
        failure
        )
      : go(
        data,
        data => QUERY `SELECT * FROM users WHERE id = ${data.id} AND pw = ${data.pw}`,
        success
      )
  } catch (e) {
    return go({
        status: false,
        message: e.message
      },
      failure
    )
  }
}

exports.getDust = async (event, context) => {

  const data = convertEvent2Data(event)
  const dust = axios.create({
    baseURL: 'http://openapi.airkorea.or.kr',
    timeout: 100000,
  })
  try {
    return go(
      data,
      ({
         stationName,
         dataTerm,
         pageNo,
         numOfRows,
         ver,
         ServiceKey
      }) => dust.get('/openapi/services/rest/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty', { params: { stationName, dataTerm, pageNo, numOfRows, ver, ServiceKey, _returnType: 'json' }}),
      ({ data: { list: [{ pm10Grade, pm10Value, pm25Grade, pm25Value }]}}) => ({ pm10Grade, pm10Value, pm25Grade, pm25Value }),
      success
    )
  } catch (e) {
    return go(
      {
        status: false,
        message: e.message
      },
      failure
    )
  }
}

exports.getNotice = async (event, context) => {
  try {
    return go(
      QUERY `SELECT * FROM notice ORDER BY id DESC`,
      head,
      success
    )
  } catch (e) {
    return go({
        status: false,
        message: e.message
      },
      failure
    )
  }
}

exports.getNewsTopic = async(event, context) => {
  try {
    return go(
      axios.get('https://www.yna.co.kr/news'),
      html => {
        const $ = cheerio.load(html.data)
        // const $list = $('div.major-news01 ul').children('li')
        const $list = $('div.list-type038 ul').children('li')
        const list = []
        $list.each(function(i){
          list[i] = {
            img: $(this).find('img').attr('src'),
            title: $(this).find('strong.tit-news').text(),
            description: $(this).find('p.lead').text()
          }
        })
        return list
      },
      filter(data => data.title),
      map(data => ({
        img: `http:${data.img}`,
        title : data.title.replace("\n", ''),
        description : data.description.replace("\n", '')
      })),
      success
    )
  } catch (e) {
    return go(
      {
        status: false,
        message: e.message
      },
      failure
    )
  }
}


exports.getBirth = async (event, context) => {
  try {
    return go(
      QUERY `SELECT * FROM birth WHERE month = ${MOMENT.getMonth} AND day BETWEEN ${MOMENT.startWeek} AND ${MOMENT.endWeek} ORDER BY grade DESC`,
      success
    )
  } catch (e) {
    return go({
        status: false,
        message: e.message
      },
      failure
    )
  }
}
