import  transport  from '../config/nodemailerConfig.js'
import envConfig from '../config/envConfig.js'
import path from 'path' 



class TicketService {

    constructor() {
        this.transport = transport
    }


    ticketSendEmail = async (data) => {

            const {purchaser, created_at, amount} = data
            const __dirname = path.dirname(new URL(import.meta.url).pathname)
            const logoPath = path.resolve('src/public/assets/images/logo.png')

            let result = await this.transport.sendMail({
                from: `Horror Book Store <${envConfig.gmail_user}>`,
                to: `<${purchaser}>`,
                subject: 'Comprobante de Compra',
                html: `
                    <div>
                        <h1>Comprobante de Compra Exitosa</h1>
                        <h3>Sr: ${purchaser}</h3>
                        <h3>Fecha: ${created_at}</h3>
                        <h3>Monto: ${amount}</h3>
                    </div>
                `,
                attachments:[{
                    filename: 'logo.png',
                    path: logoPath,
                    cid: 'logo'
                }]
            })
    }
}




export default TicketService