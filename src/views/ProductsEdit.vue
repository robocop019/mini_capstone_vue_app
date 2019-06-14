<template>
  <div class="products-edit">
    <h1 id="edittitle">Edit Product</h1>
      <div>
        <h3> {{product.name}} </h3>
        <img id="editpic" v-bind:src="product.image_url" alt="">
      </div>
      <div>
        <div>
          Name: <input class="input-group mb-3" v-model="product.name">
        </div>

        <div>
          Image URL: <input class="input-group mb-3" v-model="product.image_url">
        </div>

        <div>
          Description: <input class="input-group mb-3" v-model="product.description">
        </div>

        <div>
          Price: <input class="input-group mb-3" v-model="product.price">
        </div>

        <div>
          <button class="btn btn-dark" v-on:click="updateProduct(product)">Update Product</button>
        </div>
      </div>
  </div>
</template>

<style>
  #edittitle {
    color: seagreen;
  }

  #editpic {
    max-height: 300px;
    max-width: 300px
  }
</style>

<script>
var axios = require('axios');

export default {
  data: function() {
    return {
            product: {
                name: "",
                image_url: "",
                description: "",
                formatted: {
                            price: ""
                            }
               },
            errors: []
    };
  },
  created: function() {
    axios.get('/api/products/' + this.$route.params.id).then(response => {
      this.product = response.data;
    });
  },
  methods: {
            updateProduct: function() {
              var params = {
                            name: this.product.name,
                            image_url: this.product.image_url,
                            description: this.product.description,
                            price: this.product.price
                            };

              axios.patch('/api/products/' + this.product.id, params).then(response => { 
                this.$router.push('/products/' + this.product.id);
              });
            }
  }
};
</script>
