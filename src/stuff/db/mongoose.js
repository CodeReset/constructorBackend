import mongoose from 'mongoose';
import { MONGO_CONNECT_URL } from '../../../config/agenda';

export const dbConnect = mongoose.connect(MONGO_CONNECT_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
export default mongoose;
