import axios from 'axios';
import * as cheerio from 'cheerio';
import { DateTime } from 'luxon';
import dotenv from 'dotenv';
import https from 'https';

dotenv.config();

// Leer la URL desde .env
const url = process.env.BCV_URL;

export const getBcvRate = async (req, res) => {
    try {
        const response = await axios.get(url, {
            httpsAgent: new https.Agent({
                rejectUnauthorized: false,
            }),
        });

        if (response && response.data) {
            const $ = cheerio.load(response.data);

            // Extraer tasa y fecha
            const rateText = $('#dolar strong').text();
            const rate = Number(rateText.replace(',', '.'));
            const dateContent = $('.date-display-single').attr('content');
            const formattedDate = dateContent
                ? DateTime.fromISO(dateContent).toFormat("EEEE, dd MMMM yyyy", { locale: 'en' })
                : 'No disponible';

            res.json({ success: true, bcvRate: rate, valueDate: formattedDate });
        } else {
            res.status(404).json({ success: false, message: 'Data not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error', details: error.message });
    }
};
