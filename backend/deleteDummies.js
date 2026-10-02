const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://mahadmasood85_db_user:mmKBhDmCOafNXfCb@cluster0.csyuwkd.mongodb.net/?appName=Cluster0')
  .then(async () => {
    const Product = require('./models/Product');
    // Delete all products where the image starts with /hero/
    const res = await Product.deleteMany({ image: { $regex: '^/hero/' } });
    console.log('Deleted dummy products:', res);
    process.exit(0);
  })
  .catch(console.error);
