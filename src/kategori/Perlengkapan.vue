<template>
  <div>
    <Sidebar />
    <!-- Button trigger modal -->

    <div class="induk">
      <!-- Modal -->
      <div
        class="modal fade"
        id="perlengkapan"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Detail {{ formperlengkapan.nama }}
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
                  :src="formperlengkapan.image"
                  alt=""
                  width="100px"
                />
                <br />
                <br />

                <h3 class="modalperlengkapan">
                  <div>Nama: {{ formperlengkapan.nama }}</div>
                  <div>Keterangan: {{ formperlengkapan.expired }}</div>
                  <div>Harga: Rp{{ formperlengkapan.harga }}</div>
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
      <!-- Makanan perlengkapan -->
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
          v-for="(perlengkapan, index) in perlengkapans"
          :key="perlengkapan.id"
        >
          <td>
            <span class="bb"> {{ index + 1 }}</span>
          </td>
          <td>
            <span class="bb"> {{ perlengkapan.nama }}</span>
          </td>
          <td>
            <span class="bb">{{ perlengkapan.deskripsi }}</span>
          </td>
          <td>
            <span
              ><img
                style="height: 120px"
                :src="perlengkapan.image"
                alt=""
                width="100px"
            /></span>
          </td>
          <td style="display: flex">
             <button
            v-if="!akun"
              data-bs-toggle="modal"
              data-bs-target="#perlengkapan"
              type="button"
              @click="perlengkapanDetail(perlengkapan)"
            >
              Detail
            </button>
            <button
            v-if="akun"
              data-bs-toggle="modal"
              data-bs-target="#perlengkapan"
              type="button"
              @click="perlengkapanDetail(perlengkapan)"
            >
              Detail
            </button>
            <button
              v-if="akun"
              @click="beliperlengkapan(perlengkapan)"
              type="button"
            >
              beli
            </button>
          </td>
        </tr>
      </table>
      <!-- end makanan perlengkapan -->
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import axios from "axios";
import Sidebar from "../components/Sidebar.vue";
export default {
  name: "Makananperlengkapan",
  components: {
    Sidebar,
  },
  props: {
    cart: Array,
    setCart: Function,
  },
  data() {
    return {
      formperlengkapan: {
        nama: "",
        deskripsi: "",
        image: "",
        expired: "",
        id: 1,
      },
      perlengkapans: "",
      updateSubmitperlengkapan: false,
    };
  },
  mounted() {
    this.loadperlengkapan();
  },
  computed: {
    akun() {
      return sessionStorage.getItem("USER_DATA");
    },
  },
  methods: {
    loadperlengkapan() {
      axios
        .get("http://localhost:3000/perlengkapans")

        .then((res) => {
          this.perlengkapans = res.data; //respon dari rest api dimasukan ke users
        })
        .catch((err) => {
          console.log(err);
        });
    },
    beliperlengkapan(perlengkapan) {
      this.setCart([...this.cart, perlengkapan]);
    },
    perlengkapanDetail(perlengkapan) {
      this.formperlengkapan.id = perlengkapan.id;
      this.formperlengkapan.nama = perlengkapan.nama;
      this.formperlengkapan.expired = perlengkapan.expired;
      this.formperlengkapan.image = perlengkapan.image;
      this.formperlengkapan.harga = perlengkapan.harga;
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
.modalperlengkapan {
  text-align: left;
}
</style>
