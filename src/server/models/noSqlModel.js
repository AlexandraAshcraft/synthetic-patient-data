import { mongo, mongoose } from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'axle-interview',
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));

const Schema = mongoose.Schema;

const examplesSchema = new Schema({});

export const Example = mongoose.model('example', examplesSchema);
