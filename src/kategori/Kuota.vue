<template>
  <div>
    <Sidebar />
    <!-- Button trigger modal -->

    <div class="induk">
      <!-- Modal -->
      <div
        class="modal fade"
        id="kuota"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Detail {{ formkuota.nama }}
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
                  :src="formkuota.image"
                  alt=""
                  width="100px"
                />
                <br />
                <br />

                <h3 class="modalkuota">
                  <div>Nama: {{ formkuota.nama }}</div>
                  <div>Keterangan: {{ formkuota.expired }}</div>
                  <div>Harga: Rp{{ formkuota.harga }}</div>
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
      <!-- Makanan kuota -->
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

        <tr class="tr" v-for="(kuota, index) in kuotas" :key="kuota.id">
          <td>
            <span class="bb"> {{ index + 1 }}</span> &#160;
          </td>
          <td>
            <span class="bb"> {{ kuota.nama }}</span> &#160;
          </td>
          <td>
            <span class="bb">{{ kuota.deskripsi }}</span> &#160;
          </td>
          <td>
            <span
              ><img
                style="height: auto"
                :src="kuota.image"
                alt=""
                width="100px"
            /></span>
            &#160;
          </td>
          <td style="display: flex">
            <button
              v-if="!akun"
              data-bs-toggle="modal"
              data-bs-target="#kuota"
              type="button"
              @click="kuotaDetail(kuota)"
            >
              Detail
            </button>
            <button
              v-if="akun"
              data-bs-toggle="modal"
              data-bs-target="#kuota"
              type="button"
              @click="kuotaDetail(kuota)"
            >
              Detail
            </button>
            <button v-if="akun" @click="belikuota(kuota)" type="button">
              beli
            </button>
          </td>
        </tr>
      </table>
      <!-- end makanan kuota -->
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import axios from "axios";
import Sidebar from "../components/Sidebar.vue";
export default {
  name: "Makanankuota",
  components: {
    Sidebar,
  },
  props: {
    cart: Array,
    setCart: Function,
  },
  data() {
    return {
      formkuota: {
        nama: "",
        deskripsi: "",
        image: "",
        expired: "",
        id: 1,
      },
      kuotas: "",
      updateSubmitkuota: false,
    };
  },
  mounted() {
    this.loadkuota();
  },
  computed: {
    akun() {
      return sessionStorage.getItem("USER_DATA");
    },
  },
  methods: {
    loadkuota() {
      axios
        .get("http://localhost:3000/kuotas")

        .then((res) => {
          this.kuotas = res.data; //respon dari rest api dimasukan ke users
        })
        .catch((err) => {
          console.log(err);
        });
    },
    belikuota(kuota) {
      this.setCart([...this.cart, kuota]);
    },
    kuotaDetail(kuota) {
      this.formkuota.id = kuota.id;
      this.formkuota.nama = kuota.nama;
      this.formkuota.expired = kuota.expired;
      this.formkuota.image = kuota.image;
      this.formkuota.harga = kuota.harga;
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
.modalkuota {
  text-align: left;
}
</style>
