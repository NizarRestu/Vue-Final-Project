<template>
  <div>
    <Sidebar />
    <!-- Button trigger modal -->

    <div class="induk">
      <!-- Modal -->
      <div
        class="modal fade"
        id="mainan"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Detail {{ formmainan.nama }}
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
                  :src="formmainan.image"
                  alt=""
                  width="100px"
                />
                <br />
                <br />

                <h3 class="modalmainan">
                  <div>Nama: {{ formmainan.nama }}</div>
                  <div>Keterangan: {{ formmainan.expired }}</div>
                  <div>Harga: Rp{{ formmainan.harga }}</div>
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
      <!-- Makanan mainan -->
      <table
        v-show="!updateSubmit"
        id="table-1"
        class="table"
        border="1"
        style="width: 93%"
      >
        <tr class="tr">
          <th>NO</th>
          <th>Mainan</th>
          <th>Deskripsi</th>
          <th>Contoh</th>
          <th>Action</th>
        </tr>

        <tr class="tr" v-for="(mainan, index) in mainans" :key="mainan.id">
          <td>
            <span class="bb"> {{ index + 1 }}</span>
          </td>
          <td>
            <span class="bb"> {{ mainan.nama }}</span>
          </td>
          <td>
            <span class="bb">{{ mainan.deskripsi }}</span>
          </td>
          <td>
            <span
              ><img
                style="height: auto"
                :src="mainan.image"
                alt=""
                width="100px"
            /></span>
          </td>
          <td style="display: flex">
            <button v-if="!akun"
              data-bs-toggle="modal"
              data-bs-target="#mainan"
              type="button"
              @click="mainanDetail(mainan)"
            >
              Detail
            </button>
            <button v-if="akun"
              data-bs-toggle="modal"
              data-bs-target="#mainan"
              type="button"
              @click="mainanDetail(mainan)"
            >
              Detail
            </button>
            <button v-if="akun" @click="belimainan(mainan)" type="button">beli</button>
          </td>
        </tr>
      </table>
      <!-- end makanan mainan -->
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import axios from "axios";
import Sidebar from "../components/Sidebar.vue";
export default {
  name: "Makananmainan",
  components: {
    Sidebar,
  },
  props: {
    cart: Array,
    setCart: Function,
  },
  data() {
    return {
      formmainan: {
        nama: "",
        deskripsi: "",
        image: "",
        expired: "",
        id: 1,
      },
      mainans: "",
      updateSubmitmainan: false,
    };
  },
  computed: {
    akun() {
      return sessionStorage.getItem("USER_DATA");
    },
  },
  mounted() {
    this.loadmainan();
  },
  methods: {
    loadmainan() {
      axios
        .get("http://localhost:3000/mainans")

        .then((res) => {
          this.mainans = res.data; //respon dari rest api dimasukan ke users
        })
        .catch((err) => {
          console.log(err);
        });
    },
    belimainan(mainan) {
      this.setCart([...this.cart, mainan]);
    },
    mainanDetail(mainan) {
      this.formmainan.id = mainan.id;
      this.formmainan.nama = mainan.nama;
      this.formmainan.expired = mainan.expired;
      this.formmainan.image = mainan.image;
      this.formmainan.harga = mainan.harga;
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
.modalmainan {
  text-align: left;
}
</style>
