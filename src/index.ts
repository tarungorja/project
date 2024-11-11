import express from 'express';
import indexRouter from './routers';
import { checkDuplicateFields } from './middlewares';


const app = express();
const port = 3000;

// app.use(checkDuplicateFields);
app.use(express.json());

app.use("/", indexRouter);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
