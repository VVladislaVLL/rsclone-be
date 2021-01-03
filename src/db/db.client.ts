import { connect, connection } from 'mongoose';
import { MONGO_CONNECTION_STRING } from '../common/config';

const connectToDB = (cb: () => void) => {
  connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', async () => {
    console.log("We're connected");
    cb();
  });
};

export { connectToDB };
