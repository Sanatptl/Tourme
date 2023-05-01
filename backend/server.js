const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

//let's handle uncaught error(e.g. we're trying to access the varible that is not defined)
process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  process.exit(1);
});

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

const port = process.env.PORT || 3000;
const server = app.listen(port, '127.0.0.1', () =>
  console.log('server is up and running on port:8000')
);

//

//each time if that there's an unhandled error occure somewhere in our application,the proccess object will emits an event called unhandled rejection
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  //and then shutdown our application using .exit
  server.close(() => {
    process.exit(1); //0 standa for success and 1 for uncaught exception
  });
});

// console.log(y); //exaple for uncaught errro
