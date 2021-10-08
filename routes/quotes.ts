import { Router } from "../dependences.ts";
import {
  addQuote,
  deleteQuote,
  getQuote,
  getQuotes,
  updateQuote,
} from "../controllers/QuoteController.ts";

import { authMiddleware } from "../middleware/auth.ts";

const router = new Router();

router.get("/api/v1/quotes", getQuotes)
  .get("/api/v1/quotes/:id", authMiddleware, getQuote)
  .post("/api/v1/quotes", authMiddleware, addQuote)
  .put("/api/v1/quotes/:id", updateQuote)
  .delete("/api/v1/quotes/:id", deleteQuote);

export default router;

