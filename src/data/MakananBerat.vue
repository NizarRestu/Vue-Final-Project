<template>
  <div class="dataMBerat">
     <button
        style="height: auto; width: auto"
        class="btn btn-primary add"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapseExample2"
        aria-expanded="false"
        aria-controls="collapseExample"
      >
        Button
      </button>
      <div class="collapse" id="collapseExample2">
        <div class="card card-body">
          <form @submit.prevent="addberat">
            <input type="hidden" v-model="formBerat.id" />
            <label>Nama Makanan</label>
            <input
              placeholder="Masukan Nama Makanan.."
              class="input"
              type="text"
              v-model="formBerat.nama"
              required
            />
            <label>Deskripsi</label>
            <input
              placeholder="Masukan Deskripsinya.."
              class="input"
              type="text"
              v-model="formBerat.deskripsi"
              required
            />
            <label>Gambar</label>
            <input
              placeholder="Masukan Gambar.."
              class="input"
              type="text"
              v-model="formBerat.image"
              required
            />
            <label class="bb">Expired</label>
            <input
              placeholder="Masukan Expirednya.."
              class="input"
              type="text"
              v-model="formBerat.expired"
              required
            />
            <label class="jenis">Harga</label>
            <input
              placeholder="Masukan Harganya.."
              class="input"
              type="text"
              v-model="formBerat.harga"
              required
            />
            <button
              data-bs-toggle="collapse"
              data-bs-target="#collapseExample2"
            >
              Close
            </button>
            <button
              class="btn btn-primary button_add"
              type="submit"
              v-show="!updateSubmitBerat"
            >
              ADD
            </button>
            <button
              class="btn btn-primary button_add"
              type="button"
              v-show="updateSubmitBerat"
              @click="update2(formBerat)"
            >
              Update
            </button>
          </form>
        </div>
      </div>
      <table
        v-show="!updateSubmitBerat"
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

        <tr class="tr" v-for="(berat, index) in berats" :key="berat.id">
          <td>
            {{ index + 1 }}
          </td>
          <td>
            {{ berat.nama }}
          </td>
          <td>
            {{ berat.deskripsi }}
          </td>
          <td>
            <img
              style="height: 120px"
              :src="berat.image"
              alt=""
              width="100px"
            />
          </td>
          <td>
            {{ berat.expired }}
          </td>
          <td>{{ berat.harga }}</td>
          <td>
            <button
              data-bs-toggle="collapse"
              data-bs-target="#collapseExample2"
              class="btn btn-primary edit"
              @click="edit2(berat)"
            >
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button class="btn btn-danger del" @click="del2(berat)">
              <i class="fa-solid fa-trash"></i>
            </button>
          </td>
        </tr>
      </table>
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
    this.loadberat();
  },
  data() {
    return {
      formBerat: {
        nama: "",
        deskripsi: "",
        image: "",
        expired: "",
        harga: "",
      },
      berats: "",
      updateSubmitBerat: false,
    };
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
    addberat() {
      const payload = {
        ...this.formBerat,
        harga: Number(this.formBerat.harga),
      };
      axios.post("http://localhost:3000/berats/", payload).then(() => {
        this.loadringan();
        this.formBerat.nama = "";
        this.formBerat.deskripsi = "";
        this.formBerat.image = "";
        this.formBerat.expired = "";
        this.formBerat.harga = "";
        Swal.fire("Success", "Data Anda Berhasil Ditambahkan", "success");
      });
    },
    edit2(berat) {
      this.updateSubmitBerat = true;
      this.formBerat.id = berat.id;
      this.formBerat.nama = berat.nama;
      this.formBerat.deskripsi = berat.deskripsi;
      this.formBerat.image = berat.image;
      this.formBerat.expired = berat.expired;
      this.formBerat.harga = berat.harga;
    },
    update2(formBerat) {
      return axios
        .put("http://localhost:3000/berats/" + formBerat.id, {
          nama: this.formBerat.nama,
          deskripsi: this.formBerat.deskripsi,
          image: this.formBerat.image,
          expired: this.formBerat.expired,
          harga: this.formBerat.harga,
        })
        .then(() => {
          this.loadberat();
          this.formBerat.id = "";
          this.formBerat.nama = "";
          this.formBerat.deskripsi = "";
          this.formBerat.image = "";
          this.formBerat.expired = "";
          this.formBerat.harga = "";
          this.updateSubmitBerat = false;
          Swal.fire("Success", "Data Anda Berhasil Diupdate", "success");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    del2(berat) {
      axios.delete("http://localhost:3000/berats/" + berat.id).then(() => {
        this.loadberat();
        let index = this.ringans.indexOf(this.formBerat.nama);
        this.berats.splice(index, 1);
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
