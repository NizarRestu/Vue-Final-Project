<template>
  <div>
    <Sidebar />
    <!-- Button trigger modal -->

    <div class="induk">
      <!-- Modal -->
      <div
        class="modal fade"
        id="obat"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Detail {{ formobat.nama }}
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
                  :src="formobat.image"
                  alt=""
                  width="100px"
                />
                <br />
                <br />

                <h3 class="modalobat">
                  <div>Nama: {{ formobat.nama }}</div>
                  <div>Keterangan: {{ formobat.expired }}</div>
                  <div>Harga: Rp{{ formobat.harga }}</div>
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
      <!-- Makanan obat -->
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

        <tr class="tr" v-for="(obat, index) in obats" :key="obat.id">
          <td>
            <span class="bb"> {{ index + 1 }}</span>
          </td>
          <td>
            <span class="bb"> {{ obat.nama }}</span>
          </td>
          <td>
            <span class="bb">{{ obat.deskripsi }}</span>
          </td>
          <td>
            <span
              ><img
                style="height: 120px"
                :src="obat.image"
                alt=""
                width="100px"
            /></span>
          </td>
          <td style="display: flex">
            <button v-if="!akun"
              data-bs-toggle="modal"
              data-bs-target="#obat"
              type="button"
              @click="obatDetail(obat)"
            >
              Detail
            </button>
            <button v-if="akun"
              data-bs-toggle="modal"
              data-bs-target="#obat"
              type="button"
              @click="obatDetail(obat)"
            >
              Detail
            </button>
            <button v-if="akun" @click="beliobat(obat)" type="button">
              beli
            </button>
          </td>
        </tr>
      </table>
      <!-- end makanan obat -->
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import axios from "axios";
import Sidebar from "../components/Sidebar.vue";
export default {
  name: "Makananobat",
  components: {
    Sidebar,
  },
  props: {
    cart: Array,
    setCart: Function,
  },
  data() {
    return {
      formobat: {
        nama: "",
        deskripsi: "",
        image: "",
        expired: "",
        id: 1,
      },
      obats: "",
      updateSubmitobat: false,
    };
  },
  mounted() {
    this.loadobat();
  },
  computed: {
    akun() {
      return sessionStorage.getItem("USER_DATA");
    },
  },
  methods: {
    loadobat() {
      axios
        .get("http://localhost:3000/obats")

        .then((res) => {
          this.obats = res.data; //respon dari rest api dimasukan ke users
        })
        .catch((err) => {
          console.log(err);
        });
    },
    beliobat(obat) {
      this.setCart([...this.cart, obat]);
    },
    obatDetail(obat) {
      this.formobat.id = obat.id;
      this.formobat.nama = obat.nama;
      this.formobat.expired = obat.expired;
      this.formobat.image = obat.image;
      this.formobat.harga = obat.harga;
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
.modalobat {
  text-align: left;
}
</style>
