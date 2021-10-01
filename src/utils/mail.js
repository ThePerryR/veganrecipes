import { Client } from 'postmark'


async function mail (to, templateAlias, model = {}) {

  const client = new Client(process.env.POSTMARK_API_KEY)
  return client.sendEmailWithTemplate({
    From: 'perry@easyvgn.com',
    To: to,
    TemplateAlias: templateAlias,
    TemplateModel: model
  })
}

export default mail
