import { Application } from "./dependences.ts";
import router from "./routes.ts";

import NotFound from "./middleware/notfound.ts";
import errorHandler from "./middleware/errorhandler.ts";

const env = Deno.env.toObject()
const PORT = env.PORT || 3000;
const HOST = env.HOST || 'localhost';

const app = new Application();
app.use(errorHandler);
app.use(router.routes());
app.use(router.allowedMethods());
app.use(NotFound);

//--- `(alt + }) 
console.log(`Server running on port ${PORT}`  );
app.listen(`${HOST}:${PORT}`);



