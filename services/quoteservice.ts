import { Quote } from "../models/quotemodel.ts";
import { IQuote } from "../interfaces/quote.ts";
import { readJSON } from "../utils/jsonhelper.ts";

class QuoteService {
    quotes: Array<IQuote> = [];
    constructor() {
        this.loadData();
    }

    loadData = () => {
        const quoteJSON = readJSON("./data/quotes.json");
        const quotes = Quote.fromJSON(quoteJSON);
        
        this.quotes = Object.values(quotes);
    };
    
    fetchQuotes = () => {
        return this.quotes;
    };

      
    fetchQuote = (id: string) =>
    this.quotes.find(((quote) => quote.id === id));  
    
    
    createQuote = (quote: IQuote) => {
    const newQuote = Object.values(quote);
    const [first] = newQuote;
    this.quotes.push(first);
            
    };

    updateQuote = (quote: IQuote, id: string) => {
        const updatedQuote: {
        id: string;
        quote: string;
        author: string;
        } = quote;
        
        this.quotes = this.quotes.map((quote) =>
        quote.id === id ? { ...quote, ...updatedQuote } : quote
        );

        return true;
    };

    deleteQuote = (id: string) => {
        this.quotes = this.quotes.filter((quote) =>
          quote.id !== id
        );
        return this.quotes;
      };
}

export default new QuoteService();