<template>
  <div class="dataMakanan">
    <button
      style="height: auto; width: auto"
      class="btn btn-primary add"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#collapseExample"
      aria-expanded="false"
      aria-controls="collapseExample"
    >
      Button
    </button>
    <!-- Form -->
    <div class="collapse" id="collapseExample">
      <div class="card card-body">
        <form @submit.prevent="addringan">
          <input type="hidden" v-model="formRingan.id" />
          <label>Nama Makanan</label>
          <input
            placeholder="Masukan Nama Makanan.."
            class="input"
            type="text"
            v-model="formRingan.nama"
            required
          />
          <label>Deskripsi</label>
          <input
            placeholder="Masukan Deskripsinya.."
            class="input"
            type="text"
            v-model="formRingan.deskripsi"
            required
          />
          <label>Gambar</label>
          <input
            placeholder="Masukan Gambar.."
            class="input"
            type="text"
            v-model="formRingan.image"
            required
          />
          <label class="bb">Expired</label>
          <input
            placeholder="Masukan Expirednya.."
            class="input"
            type="text"
            v-model="formRingan.expired"
            required
          />
          <label class="jenis">Harga</label>
          <input
            placeholder="Masukan Harganya.."
            class="input"
            type="text"
            v-model="formRingan.harga"
            required
          />
          <button data-bs-toggle="collapse" data-bs-target="#collapseExample">
            Close
          </button>
          <button
            class="btn btn-primary button_add"
            type="submit"
            v-show="!updateSubmitRingan"
          >
            ADD
          </button>
          <button
            class="btn btn-primary button_add"
            type="button"
            v-show="updateSubmitRingan"
            @click="update(formRingan)"
          >
            Update
          </button>
        </form>
      </div>
    </div>
    <!-- End Form -->

    <!-- Table Data -->
    <div>
      <table
        v-show="!updateSubmitRingan"
        id="table-1"
        class="table"
        border="1"
        style="width: 100%"
      >
        <tr class="tr">
          <th>NO</th>
          <th>Nama Makanan</th>
          <th>Deskripsi</th>
          <th>Contoh</th>
          <th>Expired</th>
          <th>Harga</th>
          <th>Action</th>
        </tr>

        <tr class="tr" v-for="(ringan, index) in ringans" :key="ringan.id">
          <td>
            {{ index + 1 }}
          </td>
          <td>
            {{ ringan.nama }}
          </td>
          <td>
            {{ ringan.deskripsi }}
          </td>
          <td>
            <img
              style="height: 120px"
              :src="ringan.image"
              alt=""
              width="100px"
            />
          </td>
          <td>
            {{ ringan.expired }}
          </td>
          <td>{{ ringan.harga }}</td>
          <td>
            <button
              data-bs-toggle="collapse"
              data-bs-target="#collapseExample"
              class="btn btn-primary edit"
              @click="edit(ringan)"
            >
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button class="btn btn-danger del" @click="del(ringan)">
              <i class="fa-solid fa-trash"></i>
            </button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
  name: "DataMakanan",
  mounted() {
    if (!sessionStorage.getItem("USER_DATA")) {
      this.$router.push("/");
    }
    this.loadringan();
  },
  data() {
    return {
      formRingan: {
        nama: "",
        deskripsi: "",
        image: "",
        expired: "",
        harga: "",
      },
      ringans: "",
      updateSubmitRingan: false,
    };
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
    addringan() {
      const payload = {
        ...this.formRingan,
        harga: Number(this.formRingan.harga),
      };
      axios.post("http://localhost:3000/ringans/", payload).then(() => {
        this.loadringan();
        this.formRingan.nama = "";
        this.formRingan.deskripsi = "";
        this.formRingan.image = "";
        this.formRingan.expired = "";
        this.formRingan.harga = "";
        Swal.fire("Success", "Data Anda Berhasil Ditambahkan", "success");
      });
    },
    edit(ringan) {
      this.updateSubmitRingan = true;
      this.formRingan.id = ringan.id;
      this.formRingan.nama = ringan.nama;
      this.formRingan.deskripsi = ringan.deskripsi;
      this.formRingan.image = ringan.image;
      this.formRingan.expired = ringan.expired;
      this.formRingan.harga = ringan.harga;
    },
    update(formRingan) {
      return axios
        .put("http://localhost:3000/ringans/" + formRingan.id, {
          nama: this.formRingan.nama,
          deskripsi: this.formRingan.deskripsi,
          image: this.formRingan.image,
          expired: this.formRingan.expired,
          harga: this.formRingan.harga,
        })
        .then(() => {
          this.loadringan();
          this.formRingan.id = "";
          this.formRingan.nama = "";
          this.formRingan.deskripsi = "";
          this.formRingan.image = "";
          this.formRingan.expired = "";
          this.formRingan.harga = "";
          this.updateSubmitRingan = false;
          Swal.fire("Success", "Data Anda Berhasil Diupdate", "success");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    del(ringan) {
      axios.delete("http://localhost:3000/ringans/" + ringan.id).then(() => {
        this.loadringan();
        let index = this.ringans.indexOf(this.formRingan.nama);
        this.ringans.splice(index, 1);
        Swal.fire("Success", "Data Anda Berhasil Dihapus", "success");
      });
    },
  },
};
</script>
<style scoped>
.edit {
  border: none;
  background-color: rgb(0, 89, 255);
  width: 70px;
}
.del {
  border: none;
  background-color: rgb(255, 0, 0);
  width: 70px;
}
.header {
  margin: 50px 100px;
}
.categori {
  margin-bottom: 50px;
}
button {
  margin-left: 50px;
  height: 50px;
  width: 200px;
}
.add {
  margin: 0 0 20px 30px;
}
.input {
  box-sizing: border-box;
  width: 100%;
  padding: 10px;
  font-size: 11pt;
  margin-bottom: 20px;
}
</style>
