import { Router } from "./dependences.ts";
import {
  addQuote,
  deleteQuote,
  getQuote,
  getQuotes,
  updateQuote,
} from "./controllers/quotecontroller.ts";

const router = new Router();

router.get("/api/v1/quotes", getQuotes)
  .get("/api/v1/quotes/:id", getQuote)
  .post("/api/v1/quotes", addQuote)
  .put("/api/v1/quotes/:id", updateQuote)
  .delete("/api/v1/quotes/:id", deleteQuote);

export default router;

