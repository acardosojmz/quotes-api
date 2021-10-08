import { Quote } from "../interfaces/Quote.ts";

class QuoteModel implements Quote {
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

    toJSON(): Quote {
        return Object.assign({}, this);
    }
    
    static fromJSON(json: Quote | string): QuoteModel {
       if (typeof json === "string") {
                return JSON.parse(json, QuoteModel.reviver);
       }
       let quote = Object.create(QuoteModel.prototype);
       return Object.assign(quote, json);
    }
    
    static reviver(key: string, value: any): any {
        return key === "" ? QuoteModel.fromJSON(value) : value;
    }

}

export { QuoteModel };




