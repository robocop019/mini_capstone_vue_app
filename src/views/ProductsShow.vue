<template>
  <div class="products-show">
    <div class="container">
      <div class="row">
        <div class="col-md-6 cols">
          <h2> {{product.name}} </h2>
          <p> {{product.description}} </p>
          <p> {{product.formatted.price}} </p>
          <router-link v-bind:to="'/products/' + product.id + '/edit'"><button class="btn btn-info">Edit Product</button></router-link>
          <button class="btn btn-danger" v-on:click="destroyProduct()">Delete Product</button>
        </div>
        <div class="col-md-6 cols">
          <img class="show-image" v-bind:src="product.image_url" v-bind:alt="product.name">
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  .cols {
    text-align: center;
  }
  .show-image {
    max-width: 550px;
    max-height: 650px;
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
               }
    };
  },
  created: function() {
    axios.get('/api/products/' + this.$route.params.id).then(response => {
      this.product = response.data;
    });
  },
  methods: {
            updateProduct: function(inputProduct) {
              var params = {
                            name: inputProduct.name,
                            image_url: inputProduct.image_url,
                            description: inputProduct.description,
                            price: inputProduct.price
                            };

              axios.patch('/api/products/' + inputProduct.id, params).then(response => {

                console.log("Success", response.data);
              });
            },

            destroyProduct: function() {
              axios.delete("/api/products/" + this.product.id).then(response => {
                this.$router.push('/');
              });
            }
  }
};
</script>