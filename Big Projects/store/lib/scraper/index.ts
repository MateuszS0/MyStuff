import axios from "axios";
import * as cheerio from "cheerio";
import { extractPrice } from "../utils";

export async function scrapeAmazonProduct(url: string) {
    if(!url) return;


    //BD 
    const username = String(process.env.BRIGHT_DATA_USERNAME);
    const password = String(process.env.BRIGHT_DATA_PASSWORD);
    const port = 22225
    const session_id = (1000000 * Math.random() | 0)
    
    const options = {
    auth: {
        username: `${username}-session-${session_id}`,
        password

    },
    host: 'brd.superproxy.io',
    port,
    rejectUnauthorized: false
    }

    try {
        const response = await axios.get(url, options);
        const $ = cheerio.load(response.data);
        
        const title = $('#productTitle').text().trim();
        const currentPrice = extractPrice(
            $('.priceToPay span.a-price-whole'),
            $('.size.base.a-color-price'),
            $('.a-button-selected .a-color-base'),
            $('.a-price.a-text-price'),
        );

        const originalPrice = extractPrice(
            $('#priceblock_ourprice'),
            $('span.a-offscreen .a-price.a-text-price'),
            $('.a-price a-text-price'),
            $('.a-size-base.a-color-price'),
            $('span.a-price-whole'),
        ); 
        const outOfStock = $('#availability span').text().trim() === 'Out of stock';
        const image = $('#imgBlkFront').attr('data-a-dynamic-image') ||
        $('#landingImage').attr('data-a-dynamic-image') 
        
        console.log("title: " +title, "\ncurrent Price: "+currentPrice, "\noriginal Price: "+originalPrice, 
        "\nout of stock: "+outOfStock, "\nimage: " + image);

    } catch (error: any) {
        throw new Error(`Failed to scrape product: ${error.message}`)
    }
}