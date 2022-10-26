<template>
  <div>
    <Sidebar />
    <!-- Button trigger modal -->

    <div class="induk">
      <!-- Modal -->
      <div
        class="modal fade"
        id="exampleModal3"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Detail {{ formminuman.nama }}
              </h1>
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
                  :src="formminuman.image"
                  alt=""
                  width="100px"
                />
                <br />
                <br />

                <h3 class="modalminuman">
                  <div>Nama: {{ formminuman.nama }}</div>
                  <div>Keterangan: {{ formminuman.expired }}</div>
                  <div>Harga: Rp{{ formminuman.harga }}</div>
                </h3>
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
      <!-- Makanan minuman -->
      <table
        v-show="!updateSubmit"
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

        <tr class="tr" v-for="(minuman, index) in minumans" :key="minuman.id">
          <td>
            <span class="bb"> {{ index + 1 }}</span>
          </td>
          <td>
            <span class="bb"> {{ minuman.nama }}</span>
          </td>
          <td>
            <span class="bb">{{ minuman.deskripsi }}</span>
          </td>
          <td>
            <span
              ><img
                style="height: 120px"
                :src="minuman.image"
                alt=""
                width="100px"
            /></span>
          </td>
          <td style="display: flex">
             <button v-if="!akun"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal3"
              type="button"
              @click="minumanDetail(minuman)"
            >
              Detail
            </button>
            <button v-if="akun"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal3"
              type="button"
              @click="minumanDetail(minuman)"
            >
              Detail
            </button>
            <button v-if="akun" @click="beliminuman(minuman)" type="button">
              beli
            </button>
          </td>
        </tr>
      </table>
      <!-- end makanan minuman -->
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import axios from "axios";
import Sidebar from "../components/Sidebar.vue";
export default {
  name: "MinumanPage",
  components: {
    Sidebar,
  },
  props: {
    cart: Array,
    setCart: Function,
  },
  data() {
    return {
      formminuman: {
        nama: "",
        deskripsi: "",
        image: "",
        expired: "",
        id: 1,
      },
      minumans: "",
      updateSubmitminuman: false,
    };
  },
  computed: {
    akun() {
      return sessionStorage.getItem("USER_DATA");
    },
  },
    mounted() {
    this.loadminuman();
  },
  methods: {
    loadminuman() {
      axios
        .get("http://localhost:3000/minumans")

        .then((res) => {
          this.minumans = res.data; //respon dari rest api dimasukan ke users
        })
        .catch((err) => {
          console.log(err);
        });
    },
    beliminuman(minuman) {
      this.setCart([...this.cart, minuman]);
    },
    minumanDetail(minuman) {
      this.formminuman.id = minuman.id;
      this.formminuman.nama = minuman.nama;
      this.formminuman.expired = minuman.expired;
      this.formminuman.image = minuman.image;
      this.formminuman.harga = minuman.harga;
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
.modalminuman {
  text-align: left;
}
</style>
