/* eslint-disable @typescript-eslint/no-var-requires */
const { mongoose } = require('mongoose');
const { faker } = require('@faker-js/faker');

const ProductSchema = new mongoose.Schema({
  type: { type: String, required: true },
  description: { type: String, required: true },
  brand: { type: String, required: true },
  color: { type: String, required: true },
  lostTime: { type: Date, required: true },
});

const Product = mongoose.model('Product', ProductSchema);

async function seedProducts() {
  for (let i = 0; i < 250; i++) {
    const product = new Product({
      type: faker.commerce.product().toLowerCase(),
      description: faker.lorem.sentences(),
      brand: faker.company.name().toLowerCase(),
      color: faker.color.human().toLowerCase(),
      lostTime: faker.date.past(),
    });

    await product.save();
  }

  console.log('Seeding completed');
  mongoose.connection.close();
}

mongoose
  .connect('mongodb://localhost:27017/airportai', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
    seedProducts();
  })
  .catch((err) => console.error('Connection error', err));
