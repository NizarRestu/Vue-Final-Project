<template>
  <div>
    <Sidebar />
    <!-- Button trigger modal -->

    <div class="induk">
      <!-- Modal -->
      <div
        class="modal fade"
        id="elektronik"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Detail {{ formelektronik.nama }}
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
                  style="height: auto"
                  :src="formelektronik.image"
                  alt=""
                  width="100px"
                />
                <br />
                <br />

                <h3 class="modalelektronik">
                  <div>Nama: {{ formelektronik.nama }}</div>
                  <div>Keterangan: {{ formelektronik.expired }}</div>
                  <div>Harga: Rp{{ formelektronik.harga }}</div>
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
      <!-- Makanan elektronik -->
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

        <tr
          class="tr"
          v-for="(elektronik, index) in elektroniks"
          :key="elektronik.id"
        >
          <td>
            <span class="bb"> {{ index + 1 }}</span>
          </td>
          <td>
            <span class="bb"> {{ elektronik.nama }}</span>
          </td>
          <td>
            <span class="bb">{{ elektronik.deskripsi }}</span>
          </td>
          <td>
            <span
              ><img
                style="height: auto"
                :src="elektronik.image"
                alt=""
                width="100px"
            /></span>
          </td>
          <td style="display: flex">
            <button v-if="!akun"
              data-bs-toggle="modal"
              data-bs-target="#elektronik"
              type="button"
              @click="elektronikDetail(elektronik)"
            >
              Detail
            </button>
              <button v-if="akun"
              data-bs-toggle="modal"
              data-bs-target="#elektronik"
              type="button"
              @click="elektronikDetail(elektronik)"
            >
              Detail
            </button>
            <button v-if="akun" @click="belielektronik(elektronik)" type="button">
              beli
            </button>
          </td>
        </tr>
      </table>
      <!-- end makanan elektronik -->
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import axios from "axios";
import Sidebar from "../components/Sidebar.vue";
export default {
  name: "Makananelektronik",
  components: {
    Sidebar,
  },
  computed: {
    akun() {
      return sessionStorage.getItem("USER_DATA");
    },
  },
  props: {
    cart: Array,
    setCart: Function,
  },
  data() {
    return {
      formelektronik: {
        nama: "",
        deskripsi: "",
        image: "",
        expired: "",
        id: 1,
      },
      elektroniks: "",
      updateSubmitelektronik: false,
    };
  },
  mounted() {
    this.loadelektronik();
    this.loadbali();
  },
  methods: {
    loadelektronik() {
      axios
        .get("http://localhost:3000/elektroniks")

        .then((res) => {
          this.elektroniks = res.data; //respon dari rest api dimasukan ke users
        })
        .catch((err) => {
          console.log(err);
        });
    },
    belielektronik(elektronik) {
      this.setCart([...this.cart, elektronik]);
    },
    elektronikDetail(elektronik) {
      this.formelektronik.id = elektronik.id;
      this.formelektronik.nama = elektronik.nama;
      this.formelektronik.expired = elektronik.expired;
      this.formelektronik.image = elektronik.image;
      this.formelektronik.harga = elektronik.harga;
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
.modalelektronik {
  text-align: left;
}
</style>
