<template>
  <div>
    <Sidebar />
    <!-- Button trigger modal -->

    <div class="induk">
      <!-- Modal -->
      <div
        class="modal fade"
        id="exampleModal1"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Detail {{ formberat.nama }}
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="data-modal">
                <img
                  style="height: 120px"
                  :src="formberat.image"
                  alt=""
                  width="100px"
                />
                <br />
                <br />
                <div>
                  <h5 class="modalberat">
                    <div>Nama: {{ formberat.nama }}</div>
                    <br />
                    <div>Keterangan: {{ formberat.expired }}</div>
                    <br />
                    <div>Harga: Rp{{ formberat.harga }}</div>
                  </h5>
                </div>
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
      <!-- Makanan berat -->
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

        <tr class="tr" v-for="(berat, index) in berats" :key="berat.id">
          <td>
            <span class="bb"> {{ index + 1 }}</span>
          </td>
          <td>
            <span class="bb"> {{ berat.nama }}</span>
          </td>
          <td>
            <span class="bb">{{ berat.deskripsi }}</span>
          </td>
          <td>
            <span
              ><img
                style="height: 120px"
                :src="berat.image"
                alt=""
                width="100px"
            /></span>
          </td>
          <td style="display: flex">
            <button v-if="!akun"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal1"
              type="button"
              @click="BeratDetail(berat)"
            >
              Detail
            </button>
            <button v-if="akun"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal1"
              type="button"
              @click="BeratDetail(berat)"
            >
              Detail
            </button>
            <button v-if="akun" @click="beliberat(berat)" type="button">beli</button>
          </td>
        </tr>
      </table>
      <!-- end makanan berat -->
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import axios from "axios";
import Sidebar from "../components/Sidebar.vue";
export default {
  name: "MakananBerat",
  components: {
    Sidebar,
  },
  props: {
    cart: Array,
    setCart: Function,
  },
  data() {
    return {
      formberat: {
        nama: "",
        deskripsi: "",
        image: "",
        expired: "",
        id: 1,
      },
      berats: "",
      updateSubmitberat: false,
    };
  },
  computed: {
    akun() {
      return sessionStorage.getItem("USER_DATA");
    },
  },
  mounted() {
    this.loadberat();
  },
  methods: {
    loadberat() {
      axios
        .get("http://localhost:3000/berats")

        .then((res) => {
          this.berats = res.data; //respon dari rest api dimasukan ke users
        })
        .catch((err) => {
          console.log(err);
        });
    },
    beliberat(berat) {
      this.setCart([...this.cart, berat]);
    },
    BeratDetail(berat) {
      this.formberat.id = berat.id;
      this.formberat.nama = berat.nama;
      this.formberat.expired = berat.expired;
      this.formberat.image = berat.image;
      this.formberat.harga = berat.harga;
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
.modalberat {
  text-align: left;
}
.data-modal {
  display: flex;
  padding: 25px;
}
img {
  margin-right: 15px;
}
</style>
