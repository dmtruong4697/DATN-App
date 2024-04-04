import axios from "axios";

const api = 'https://api.exchangerate-api.com/v4/latest/USD';

export async function convert(
    amount: number,
    baseCurrency: string,
    convertCurrency: string,
) {
    try{
        const responce = await axios.get(api);
        const result = (responce.data.rates[convertCurrency] / responce.data.rates[baseCurrency])*amount;
        // console.log(responce.data);
        return result;
    } catch (error) {
        console.log(error);
    }
}