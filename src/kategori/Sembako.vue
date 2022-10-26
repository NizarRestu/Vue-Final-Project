<template>
  <div>
    <Sidebar />
    <!-- Button trigger modal -->

    <div class="induk">
      <!-- Modal -->
      <div
        class="modal fade"
        id="sembako"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Detail {{ formsembako.nama }}
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
                  :src="formsembako.image"
                  alt=""
                  width="100px"
                />
                <br />
                <br />

                <h3 class="modalsembako">
                  <div>Nama: {{ formsembako.nama }}</div>
                  <div>Keterangan: {{ formsembako.expired }}</div>
                  <div>Harga: Rp{{ formsembako.harga }}</div>
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
      <!-- Makanan sembako -->
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

        <tr class="tr" v-for="(sembako, index) in sembakos" :key="sembako.id">
          <td>
            <span class="bb"> {{ index + 1 }}</span>
          </td>
          <td>
            <span class="bb"> {{ sembako.nama }}</span>
          </td>
          <td>
            <span class="bb">{{ sembako.deskripsi }}</span>
          </td>
          <td>
            <span
              ><img
                style="height: auto"
                :src="sembako.image"
                alt=""
                width="100px"
            /></span>
          </td>
          <td style="display: flex">
            <button v-if="!akun"
              data-bs-toggle="modal"
              data-bs-target="#sembako"
              type="button"
              @click="sembakoDetail(sembako)"
            >
              Detail
            </button>
            <button v-if="akun"
              data-bs-toggle="modal"
              data-bs-target="#sembako"
              type="button"
              @click="sembakoDetail(sembako)"
            >
              Detail
            </button>
            <button v-if="akun" @click="belisembako(sembako)" type="button">
              beli
            </button>
          </td>
        </tr>
      </table>
      <!-- end makanan sembako -->
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import axios from "axios";
import Sidebar from "@/components/Sidebar.vue";
export default {
  components: { Sidebar },
  name: "Makanansembako",

  props: {
    cart: Array,
    setCart: Function,
  },
  data() {
    return {
      formsembako: {
        nama: "",
        deskripsi: "",
        image: "",
        expired: "",
        id: 1,
      },
      sembakos: "",
      updateSubmitsembako: false,
    };
  },
  mounted() {
    this.loadsembako();
  },
  computed: {
    akun() {
      return sessionStorage.getItem("USER_DATA");
    },
  },
  methods: {
    loadsembako() {
      axios
        .get("http://localhost:3000/sembakos")

        .then((res) => {
          this.sembakos = res.data; //respon dari rest api dimasukan ke users
        })
        .catch((err) => {
          console.log(err);
        });
    },
    belisembako(sembako) {
      this.setCart([...this.cart, sembako]);
    },
    sembakoDetail(sembako) {
      this.formsembako.id = sembako.id;
      this.formsembako.nama = sembako.nama;
      this.formsembako.expired = sembako.expired;
      this.formsembako.image = sembako.image;
      this.formsembako.harga = sembako.harga;
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
.modalsembako {
  text-align: left;
}
</style>
