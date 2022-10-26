<template>
  <div id="app">  
    <router-view :cart="cart" :setCart="setCart"/>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
  return{
    cart: []
  };
 },
 methods: {
  setCart(cartBaru){
    this.cart = cartBaru
  }
 }
}
</script>

