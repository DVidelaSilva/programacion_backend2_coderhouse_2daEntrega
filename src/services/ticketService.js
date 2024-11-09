import  transport  from '../config/nodemailerConfig.js'
import envConfig from '../config/envConfig.js'
import path from 'path'  // Importa el módulo 'path'

class TicketService {

    constructor() {
        this.transport = transport

    }

    ticketSendEmail = async (data) => {

            const {purchaser, created_at, amount} = data
                    // Usa import.meta.url para obtener la URL del archivo actual
             const __dirname = path.dirname(new URL(import.meta.url).pathname); 
             //const logoPath = path.join(__dirname, 'assets', 'images', 'logo.png');

             const logoPath = path.resolve('src/public/assets/images/logo.png');

            let result = await this.transport.sendMail({
                from: `DAVS TEST <${envConfig.gmail_user}>`,
                to: `<${purchaser}>`,
                subject: 'Correo de Prueba',
                html: `
                    <div>
                        <h1>Comprobante de Compra</h1>
                        <h3>Sr: ${purchaser}</h3>
                        <h3>Con Fecha: ${created_at}</h3>
                        <h3>Con Monto: ${amount}</h3>
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