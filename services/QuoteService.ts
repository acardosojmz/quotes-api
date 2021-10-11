import { default as quoteRepository } 
    from "../repositories/QuoteRepository.ts";
import { Quote } from "../interfaces/Quote.ts";

class QuoteService {

    getQuotes = () => {
        return  quoteRepository.getQuotes();
    };

      
    getQuoteByoid =  (oid: string) =>{
       return quoteRepository.getQuoteByoid(oid);
    }
    
    getQuote = (id: number) => {
        return quoteRepository.getQuote(id);
    }
    
    createQuote = (quote: Quote) => {
        return quoteRepository.addQuote(quote);
            
    };

    updateQuote = (quote: Quote, id: number) => {
        const updatedQuote: {
            id: number;
            quote: string;
            author: string;
        } = quote;
        
        return  quoteRepository.updateQuote(id,updatedQuote);
    };

    deleteQuote = (id: number) => {
        return quoteRepository.deleteQuote(id);
    };
}

export default new QuoteService();