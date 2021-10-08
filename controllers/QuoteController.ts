import quoteService  from "../services/QuoteService.ts";

import { Status } from "../dependences.ts";

// @desc    Fetch all quotes
// @route   GET /api/v1/quotes
export const getQuotes = ({response}: { response: any }) => {
    response.body = {
        data: quoteService.fetchQuotes(),
    };
};

// @desc    Fetch single quote
// @route   GET /api/v1/quote/:id
export const getQuote = (
    {params, response}: { params: { id: string }; response: any },
) => {
    const quote = quoteService.fetchQuote(
        params.id,
    );

    if (quote === null) {
        response.status = Status.BadRequest;
        response.body = {message: `Quote with id: ${params.id} not found`};
        return;
    }

    response.status = Status.OK;
    response.body = {data: quote};
};

// @desc    Add  quote
// @route   POST /api/v1/quotes
export const addQuote = async (
    {request, response}: { request: any; response: any },
) => {

    if (!request.body()) {
        response.status = Status.BadRequest;
        response.body = {
            success: false,
            message: "The request must have a body",
        };
        return;
    }

    const data = await request.body().value;
    const quote = quoteService.createQuote( data );

    response.status = Status.OK;
    response.body = {
        success: true,
        data: quote,
    };
};

// @desc    Update quote
// @route   PUT /api/v1/quotes/:id
export const updateQuote = async (
    {params, request, response}: {
        params: { id: string };
        request: any;
        response: any;
    },
) => {
    const quote = quoteService.fetchQuote(
        params.id,
    );

    if (!quote) {
        response.status = Status.NotFound;
        response.body = {
            success: false,
            message: `Quote with id: ${params.id} not found`,
        };
        return;
    }

    const data = await request.body().value;
    const updatedQuote = quoteService.updateQuote(
        data,
        params.id,
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
};

// @desc    Delete quote
// @route   DELETE /api/v1/quotes/:id
export const deleteQuote = (
    {params, response}: { params: { id: string }; response: any },
) => {
    const quote = quoteService.deleteQuote(
        params.id,
    );
    response.body = {
        success: true,
        message: "Quote removed",
        data: quote,
    };
};