const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://mahadmasood85_db_user:mmKBhDmCOafNXfCb@cluster0.csyuwkd.mongodb.net/?appName=Cluster0')
  .then(async () => {
    const Product = require('./models/Product');
    const res = await Product.updateMany({ image: { $regex: '^/uploads/' } }, { $set: { image: '/hero/hero1.jpg' } });
    console.log('Fixed:', res);
    process.exit(0);
  })
  .catch(console.error);
