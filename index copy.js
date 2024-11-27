import express from 'express';
import axios from 'axios';
import * as cheerio from 'cheerio';
import https from 'https';
import { DateTime } from 'luxon';

const app = express();
const port = 3000;

const url = 'https://www.bcv.org.ve/';

//BASE_URL

export const getBcvRate = async (req, res) => {
    try {
        const response = await axios.get(url, {
            httpsAgent: new https.Agent({
                rejectUnauthorized: false,
            }),
        });

            // Extraer la tasa de cambio
        if (response && response.data) {
            const $ = cheerio.load(response.data);

            const data = $('#dolar strong').text();
            const rateFormatted = Number(data.replace(',', '.'));

            // Extraer la fecha valor
            const dateContent = $('.date-display-single').attr('content');
	    let formattedDate =  'No disponible';

            if (dateContent) {
                // Formatear la fecha usando Luxon
                formattedDate = DateTime.fromISO(dateContent).toFormat("EEEE, dd MMMM yyyy", { locale: 'en' });
            }

            // Enviar la respuesta
            res.json({ success: true, bcvRate: rateFormatted, valueDate: formattedDate  });
            console.log(`BCV Rate: ${rateFormatted}, Value Date: ${formattedDate}`);
        } else {
            console.error('La respuesta de Axios es nula o no tiene datos.');
            res.json({ success: false, message: 'Error en la respuesta de la solicitud' });
        }
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

app.get('/bcv', async (req, res) => {
    await getBcvRate(req, res);
});

app.listen(port, () => {
    console.log(`Servidor en ejecución en http://localhost:${port}`);
});
