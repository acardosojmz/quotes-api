import { Quote } from "../interfaces/Quote.ts";
import { QuoteModel } from "../models/QuoteModel.ts";

class QuoteRepository { 

    async getQuotes(page: number, size: number)  { 
        //--- paginate
        const quotes = await QuoteModel.skip((page-1) * size)
                        .take(page*size).get();
        return  quotes; 
    } 
   
    async getQuoteByoid(oid: string) { 
        return await QuoteModel.find(oid); 
    } 
    
    async getQuote(id: number) { 
        return  await QuoteModel.where("id", id ).get();
    } 

    async searchQuoterManyCols(fields: any) {
        return await QuoteModel.where(fields).get()
    }

    async getQuoteSort(fields: any) { 
        return await QuoteModel.orderBy(fields).all(); 
    }

    async addQuote(quote: Quote) { 
        const newQuote = new QuoteModel(); 
        newQuote.id = quote.id;
        newQuote.quote= quote.quote;
        newQuote.author = quote.author;

        return await newQuote.save();
    }

    

    async updateQuote(id: number, quote: Quote) { 

        let quoteUpdated = await QuoteModel.where("id", id ).update(
            {
                id: quote.id, 
                quote: quote.quote,
                author: quote.author
            }
        );
        return quoteUpdated;
    }

    async deleteQuote(id: number) {    
        let quote= await this.getQuote(id) ;
        await QuoteModel.where("id", id ).delete();
        return quote;
    }

} 

export default new QuoteRepository();
