
import quoteService  from "../services/QuoteService.ts";

import { Status } from "../dependences.ts";

/**
 * @desc  Returns all list quotes
 * @route   GET /api/v1/quotes
 * @returns list quotes
 */

export const getQuotes = async ({response}: { response: any }) => {
    response.body = {
        data: await quoteService.getQuotes(),
    };
};

/**
 * @desc  get single quote by id
 * @route GET /api/v1/quote/:id
 * @param id - The parameter url
 * @returns quote
 */

export const getQuote = async (
    {params, response}: { params: { id: string }; response: any },
) => {
    const quote = await quoteService.getQuote(
        Number(params.id),
    );

    if (quote.length) {
        response.status = Status.OK;
        response.body = {data: quote};
        return;
    }
    response.status = Status.BadRequest;
    response.body = {message: `Quote with id: ${params.id} not found`};
};

/**
 * @desc  add quote
 * @route   POST /api/v1/quotes
 * @param {"quote":"value","author":"value"}
 * @returns data new quote
 */

export const addQuote = async (
    {request, response}: { request: any; response: any },
) => {

    if (request.body()){
        const data = await request.body().value;
        if (data.quote && data.author){
            const quote = await quoteService.createQuote( data );

            response.status = Status.OK;
            response.body = {
                success: true,
                data: quote,
            };
            return;
        }
    }

    response.status = Status.BadRequest;
    response.body = {
        success: false,
        message: "The request must have the citation and author.",
    };
};

/**
 * @desc  update quote
 * @route   PUT /api/v1/quotes/:id
 * @param id - The parameter url
 * @param request.body {"quote":"value", "author":"value"} OR {"quote":"value"}  OR "author":"value" 
 * @returns quote updated or message quote not found
 */

export const updateQuote = async (
    {params, request, response}: {
        params: { id: string };
        request: any;
        response: any;
    },
) => {
    const currentQuote = await quoteService.getQuote(
        Number(params.id),
    );

    if (currentQuote.length){
        const data = await request.body().value;

        if (data.quote || data.author) {
            const updatedQuote = await quoteService.updateQuote(
                Number(params.id),
                {"id":Number(params.id,), 
                "quote":data.quote,"author":data.author },
            );
            if (updatedQuote) {
                response.status = Status.OK;
                response.body = {
                    success: true,
                    message: `Update for quote with id ${params.id} was successful`,
                };
                return;
            }

            response.status = Status.InternalServerError;
            response.body = {
                success: true,
                message: `Update for quote with id ${params.id} failed`,
            };
            return; 
        }
        response.status = Status.BadRequest;
        response.body = {
            success: false,
            message: "The request must have the citation or author.",
        };
        return;
    }
    response.status = Status.NotFound;
    response.body = {
        success: false,
        message: `Quote with id: ${params.id} not found`,
    };
};

/**
 * @desc  delete quote
 * @route   DELETE /api/v1/quotes/:id
 * @param id - The parameter url
 * @returns confirm quote deleted OR message  quote not found
 */

export const deleteQuote = async (
    {params, response}: { params: { id: string }; response: any },
) => {
    const quote = await quoteService.deleteQuote(
        Number(params.id),
    );

    let message = !quote.length?"Quote not found":"Quote removed";
    
    response.body = {
        success: quote.length !== 0,
        message: message,
        data: quote,
    };
    
};