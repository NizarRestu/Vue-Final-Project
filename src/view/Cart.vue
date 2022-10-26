<template>
<div class="cart">
  <Navbar />
 <div class="container">
  <table class="table table">
       <tr>
        <th>No</th>
        <th>Nama</th>
        <th>Deskripsi</th>
        <th>Image</th>
        <th>Expired</th>
        <th>Harga</th>
        <th>Action</th>
        </tr> 
        <tr v-for="(kategori , index) in cart"
        :key="kategori.id"
        style="text-align: center;" >
        <td>{{ index + 1 }}</td>
        <td>{{ kategori.nama }}</td>
        <td>{{ kategori.deskripsi }}</td>
         <td><img :src="kategori.image" alt="" width="100"></td>
        <td>{{ kategori.expired }}</td>
        <td>{{ kategori.harga }}</td>
          <button @click="hapusCart(kategori)" class="btn btn-secondary">
              <i class="fas fa-trash-alt"></i>
            </button>
        </tr>
    </table>
    <p>Total Harga: 
        {{
        TotalHarga.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
          })}}</p>
    <button @click="checkout()" class="btn btn-success">
             <i class="fas fa-shopping-cart"></i>
            </button>
 </div>
   </div>
</template>

<script>
import Swal from 'sweetalert2'
import  Navbar  from "../components/Navbar.vue";
export default {
    name: "CartPage",
    components:{
        Navbar,
    },
    computed: {
      TotalHarga() {
        return this.cart.reduce((a, b)=>a + b.harga, 0);
      }
    },
    methods: {
        hapusCart(kategori){
            this.setCart(this.cart.filter((x) => x.id !== kategori.id))
        },
        checkout() {
          if(!this.TotalHarga) return Swal.fire( "Gagal!","Silahkan pilih produk terlebih dahulu" ,'error', 
)
         Swal.fire( 'Berhasil','Terima Kasih Silahkan Datang Kembali','success');
            this.$router.push("/cart");
            window.location.reload()    
        }
    },
    props: {
        cart: Array,
        setCart: Function,
    },
}
</script>
<style scoped>
</style>
