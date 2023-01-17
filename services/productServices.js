const faker = require('faker');
const boom = require('@hapi/boom');

class productService {

  constructor() {
    this.products = [];
    const limit = 100;
    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isblock: faker.datatype.boolean()
      })
    }
  }

  async create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.products.push(newProduct)
    return newProduct
  }

  find() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.products)
      }, 500);
    })
  }

  async findOne(id) {
    const product = this.products.find(item => item.id === id);
      if(!product){
        throw boom.notFound('Product not found');
      }else if(product.isblock){
        throw boom.conflict('Product is blocked');
      }
      return product
  }

  async update(id, changes) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('Product not found');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes
    };
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('Product not found');
    }
    this.products.splice(index, 1)
    return { id };
  }

}

module.exports = productService
