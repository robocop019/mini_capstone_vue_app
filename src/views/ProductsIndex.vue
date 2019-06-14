<template>
    <div class="products-index">
      <div class="container">
        <h1>All Products</h1>

        <div>
          <label for="name-search">Search by Name: </label>
          <input id="name-search" class="form-control mr-sm-2" type="search" v-model="nameFilter" placeholder="Search">
        </div>

        <div>
          <button class="btn btn-dark m-2" v-on:click="setSortAttribute('name')">
            {{isAscending('name')}}
            Sort By Name
          </button>
          <button class="btn btn-dark m-2" v-on:click="setSortAttribute('price')">
            {{isAscending('price')}}
            Sort by Price
          </button>
        </div>
        
        <transition-group class="row" appear enter-active-class="animated flipInX slower" leave-active-class="animated flipOutX faster">
          <div v-for="product in orderBy(filterBy(products, nameFilter, 'name'), sortAttribute, sortAscending)" v-bind:key="product.id">
            <h2><router-link v-bind:to="'/products/' + product.id"> {{product.name}} </router-link></h2>
            <router-link v-bind:to="'/products/' + product.id"><img class="index-img" v-bind:src="product.image_url" v-bind:alt="product.name"></router-link>
          </div>
        </transition-group class="row">
      </div>
    </div>
</template>

<style>
  .index-img {
    max-width: 550px;
    max-height: 400px;
  }

  h2 a {
    text-decoration: none;
    color: dimgrey;
  }

  h2 a:hover {
    color: #42b983;
    text-decoration: none;
  }

  button {
    width: 150px;
    height: 35px;
    border-radius: 15px;
    margin: 15px;
    font-size: 14px;
  }

  .deletebutton {
    background-color: maroon;
    color: white;
  }

  .updatebutton {
    background-color: cornflowerblue;
    color: white;
  }

  button:hover {
    color: black;
    background: white;
  }
</style>

<script>
import Vue2Filters from 'vue2-filters';
var axios = require('axios');

export default {
  data: function() {
    return {
      products: [],
      nameFilter: "",
      sortAttribute: "name",
      sortAscending: 1
    };
  },
  created: function() {
    axios.get("/api/products").then(response => {
      this.products = response.data;  
    });
  },
  methods: {
    setSortAttribute: function(inputAttribute) {
      if (this.sortAttribute === inputAttribute) {
        this.sortAscending *= -1;
      } else {
        this.sortAttribute = inputAttribute;
        this.sortAscending = 1;
      }
    },

    isAscending: function(inputAttribute) {
      if (this.sortAttribute === inputAttribute) {
        if (this.sortAscending === 1) {
          return '⬆️';
        } else {
          return '⬇️';
        }
      }
    }
  },
  mixins: [Vue2Filters.mixin]
};
</script>