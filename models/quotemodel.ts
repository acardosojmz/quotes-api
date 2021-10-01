import { IQuote } from "../interfaces/quote.ts";

class Quote implements IQuote {
  id: string;
  quote: string;
  author: string;

  constructor({id, quote, author}: {
                    id: string,
                    quote: string,
                    author: string
                }
  ) {
  
        this.id = id;
        this.quote = quote;
        this.author = author;
  }

    toJSON(): IQuote {
        return Object.assign({}, this);
    }
    
    static fromJSON(json: IQuote | string): Quote {
       if (typeof json === "string") {
                return JSON.parse(json, Quote.reviver);
       }
       let quote = Object.create(Quote.prototype);
       return Object.assign(quote, json);
    }
    
    static reviver(key: string, value: any): any {
        return key === "" ? Quote.fromJSON(value) : value;
    }

}

export { Quote };




