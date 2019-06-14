<template>
  <div class="products-new">
    <div class="container">
      <h1>Create a New Product</h1>

      <ul>
        <li v-for="error in errors">
          {{ error }}
        </li>
      </ul>
      
      <form v-on:submit.prevent="submit()">
        
        <div>
          Name: <input class="input-group mb-3" v-model="newProductName"> 
        </div>

        <div>
          Image URL: <input class="input-group mb-3" v-model="newProductImageUrl"> 
        </div>

        <div>
          Description: <input class="input-group mb-3" v-model="newProductDescription"> 
        </div>

        <div>
          Price: <input class="input-group mb-3" v-model="newProductPrice"> 
        </div>

        <div>
          <input class="createbutton" type="submit" value="Create Product">
        </div>
      </form>
    </div>
  </div>
</template>

<style>
  input {
    background: lightgray;
    /*float: left;*/
    /*margin: 0px 400px 0px 0px;*/
  }

  .createbutton {
    width: 150px;
    height: 35px;
    border-radius: 15px;
    color: white;
    background: slategray;
    margin: 15px;
    font-size: 14px;

  }

  .createbutton:hover {
    color: black;
    background: white;
  }
</style>

<script>
var axios = require('axios');

export default {
  data: function() {
    return {
      newProductName: "",
      newProductImageUrl: "",
      newProductDescription: "",
      newProductPrice: "",
      errors: []
    };
  },
  created: function() {},
  methods: {
            submit: function() {

            var params = {
                          name: this.newProductName,
                          image_url: this.newProductImageUrl,
                          description: this.newProductDescription,
                          price: this.newProductPrice
                          };
            axios.post('/api/products', params).then(response => {
              this.$router.push('/');
            }).catch(error => {
              this.errors = error.response.data.errors;
            }); 

            }
  }
};
</script>