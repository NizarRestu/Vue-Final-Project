<template>
  <div>
    <Sidebar />
    <!-- Button trigger modal -->

    <div class="induk">
      <!-- Modal -->
      <div
        class="modal fade"
        id="anak"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Detail {{ anak.nama }}
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
                  :src="formanak.image"
                  alt=""
                  width="100px"
                />
                <br />
                <br />

                <h3 class="modalanak">
                  <div>Nama: {{ formanak.nama }}</div>
                  <div>Keterangan: {{ formanak.expired }}</div>
                  <div>Harga: Rp{{ formanak.harga }}</div>
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
      <!-- Makanan anak -->
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

        <tr class="tr" v-for="(anak, index) in anaks" :key="anak.id">
          <td>
            <span class="bb"> {{ index + 1 }}</span>
          </td>
          <td>
            <span class="bb"> {{ anak.nama }}</span>
          </td>
          <td>
            <span class="bb">{{ anak.deskripsi }}</span>
          </td>
          <td>
            <span
              ><img
                style="height: 120px"
                :src="anak.image"
                alt=""
                width="100px"
            /></span>
          </td>
          <td style="display: flex">
             <button v-if="!akun"
              data-bs-toggle="modal"
              data-bs-target="#anak"
              type="button"
              @click="anakDetail(anak)"
            >
              Detail
            </button>
            <button v-if="akun"
              data-bs-toggle="modal"
              data-bs-target="#anak"
              type="button"
              @click="anakDetail(anak)"
            >
              Detail
            </button>
            <button v-if="akun" @click="belianak(anak)" type="button">
              beli
            </button>
          </td>
        </tr>
      </table>
      <!-- end makanan anak -->
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import axios from "axios";
import Sidebar from "../components/Sidebar.vue";
export default {
  name: "KebutuhanAnak",
  components: {
    Sidebar,
  },
  props: {
    cart: Array,
    setCart: Function,
  },
  data() {
    return {
      formanak: {
        nama: "",
        deskripsi: "",
        image: "",
        expired: "",
        id: 1,
      },
      anaks: "",
      updateSubmitanak: false,
    };
  },
  computed: {
    akun() {
      return sessionStorage.getItem("USER_DATA");
    },
  },
  mounted() {
    this.loadanak();
  },
  methods: {
    loadanak() {
      axios
        .get("http://localhost:3000/anaks")

        .then((res) => {
          this.anaks = res.data; //respon dari rest api dimasukan ke users
        })
        .catch((err) => {
          console.log(err);
        });
    },
    belianak(anak) {
      this.setCart([...this.cart, anak]);
    },
    anakDetail(anak) {
      this.formanak.id = anak.id;
      this.formanak.nama = anak.nama;
      this.formanak.expired = anak.expired;
      this.formanak.image = anak.image;
      this.formanak.harga = anak.harga;
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
.modalanak {
  text-align: left;
}
</style>
