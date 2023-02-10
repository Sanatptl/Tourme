const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');

//environment variable :- is the global var that defined the environment in which a node app is running(there's many environment but development and production env are the two which are most imp)
console.log(app.get('env')); //by default express sets to development env
// console.log(process.env);

//////////////connect to database with mongoose/////////////

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((connection) => console.log('connected to database'));

app.listen(8000, '127.0.0.1', () =>
  console.log('server is up and running on port:8000')
);
