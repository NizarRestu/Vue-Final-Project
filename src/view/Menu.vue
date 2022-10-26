<template>
  <div>
    <Navbar />
    <Sidebar />
    <!-- Button trigger modal -->

    <div class="induk">
      <!-- Modal -->
      <div
        class="modal fade"
        id="exampleModal2"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Makanan</h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div>
                <img
                  style="height: 120px"
                  :src="formringan.image"
                  alt=""
                  width="100px"
                />
                <br />
                <br />

                <h5 class="modalringan">
                  <div>Nama: {{ formringan.nama }}</div>
                  <div>Keterangan: {{ formringan.expired }}</div>
                  <div>Harga: Rp{{ formringan.harga }}</div>
                </h5>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- Makanan ringan -->
      <table
        v-show="!updateSubmitRingan"
        id="table-1"
        class="table"
        border="1"
        style="width: 93%"
      >
        <tr class="tr">
          <th>NO</th>
          <th>Nama Makanan</th>
          <th>Deskripsi</th>
          <th>Contoh</th>
          <th>Action</th>
        </tr>

        <tr class="tr" v-for="(ringan, index) in ringans" :key="ringan.id">
          <td>
            <span class="bb"> {{ index + 1 }}</span>
          </td>
          <td>
            <span class="bb"> {{ ringan.nama }}</span>
          </td>
          <td>
            <span class="bb">{{ ringan.deskripsi }}</span>
          </td>
          <td>
            <span
              ><img
                style="height: 120px"
                :src="ringan.image"
                alt=""
                width="100px"
            /></span>
          </td>
          <td>
            <button v-if="!akun"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal2"
              type="button"
              @click="ringanDetail(ringan)"
            >
              Detail
            </button>
             <button v-if="akun"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal2"
              type="button"
              @click="ringanDetail(ringan)"
            >
              Detail
            </button>
            <button v-if=" akun" @click="beliringan(ringan)" type="button">
              beli
            </button>
          </td>
        </tr>
      </table>
      <!-- end makanan ringan -->
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import axios from "axios";
import Sidebar from "../components/Sidebar.vue";
import Navbar from "../components/Navbar.vue";
export default {
  name: "Makananringan",
  components: {
    Sidebar,
    Navbar
  },
  props: {
    cart: Array,
    setCart: Function,
  },
  computed: {
    akun() {
      return sessionStorage.getItem("USER_DATA")
    }

  },
  data() {
    return {
      formringan: {
        nama: "",
        deskripsi: "",
        image: "",
        expired: "",
        id: 1,
      },
      ringans: "",
      updateSubmitringan: false,
    };
  },
  mounted() {
    this.loadringan();
  },
  methods: {
    loadringan() {
      axios
        .get("http://localhost:3000/ringans")

        .then((res) => {
          this.ringans = res.data; //respon dari rest api dimasukan ke users
        })
        .catch((err) => {
          console.log(err);
        });
    },
    beliringan(ringan) {
      this.setCart([...this.cart,ringan]);
    },
    ringanDetail(ringan) {
      this.formringan.id = ringan.id;
      this.formringan.nama = ringan.nama;
      this.formringan.expired = ringan.expired;
      this.formringan.image = ringan.image;
      this.formringan.harga = ringan.harga;
    },
  },
};
</script>
<style scoped>
.table {
  margin-left: 70px;
}
.table th {
  border: 1px solid;
}
.table td {
  border: 1px solid;
}
.modalringan {
  text-align: left;
}
</style>
