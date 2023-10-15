import axios from "axios";
import * as cheerio from "cheerio";
import { extractCurrency, extractDescription, extractPrice } from "../utils";

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

        let originalPrice = extractPrice(
            $('#priceblock_ourprice'),
            $('.a-price.a-text-price span.a-offscreen'),
            $('#listPrice'),
            $('#priceblock_dealprice'),
            $('.a-size-base.a-color-price')
          );
          
        const outOfStock = $('#availability span').text().trim() === 'Out of stock';
        const images = $('#imgBlkFront').attr('data-a-dynamic-image') ||
        $('#landingImage').attr('data-a-dynamic-image') || 
        '{}'
        const imageUrls = Object.keys(JSON.parse(images));
        const currency = extractCurrency($('.a-price-symbol'));
        let discountRate = $('.savingsPercentage').text().replace(/[-%]/g, "");
        const description = extractDescription($)

        if (1==1) { //change this later
            originalPrice = parseInt(originalPrice); 
            let currentPriceNumeric = parseInt(currentPrice); 
            let discountRateNumeric = parseInt(discountRate.trim());
            
            originalPrice = (currentPriceNumeric / (100 - discountRateNumeric)) *100 
          }
          const data = {
            url,
            currency: currency || '$',
            image: imageUrls[0],
            currentPrice: Number(currentPrice).toFixed(2) || Number(originalPrice).toFixed(2),
            originalPrice: Number(originalPrice).toFixed(2) || Number(currentPrice).toFixed(2),
            PriceHistory: [],
            discountRate: Number(discountRate),
            category: 'category',
            stars:4.5,
            outOfStock: outOfStock,
            description: description,
            lowestPrice: Number(currentPrice) || Number(originalPrice),
            highestPrice: Number(originalPrice) || Number(currentPrice),
            average: Number(currentPrice) || Number(originalPrice),
          }
          
          return data;
          
        // console.log("title: " +title, "\ncurrent Price: "+currentPrice, "\noriginal Price: "+originalPrice, 
        // "\nout of stock: "+outOfStock, "\nimages: " + imageUrls, "\nCurrency: "+ currency, "\nDiscount Rate: "+ discountRate);
    } catch (error: any) {
        throw new Error(`Failed to scrape product: ${error.message}`)
    }
}