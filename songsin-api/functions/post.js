Object.assign(global, require('ffp-js'))
const { POOL } = require('/opt/libs/postgresql-lib')
const { QUERY, VALUES } = POOL
const { success, failure } = require('/opt/libs/response-lib')
const { convertEvent2Data } = require('/opt/libs/request-lib')


exports.createNotice = async (event, context) => {
  try {
    const data = convertEvent2Data(event)

    return !data
      ? go(
        {
          status: false,
          message: 'Error params'
        },
        failure
      )
      : go(
        data,
        data => QUERY`INSERT INTO NOTICE ${VALUES(data)} RETURNING *`,
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

exports.createBirth = async (event, context) => {
  try {
    const data = convertEvent2Data(event)
    return !data
      ? go(
        {
          status: false,
          message: 'Error params'
        },
        failure
      )
      : go(
        data,
        mapC(data => QUERY`INSERT INTO birth ${VALUES(data)}`),
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
