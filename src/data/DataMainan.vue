<template>
<div class="dataMainan">
     <button
        style="height: auto; width: auto"
        class="btn btn-primary add"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapseExample10"
        aria-expanded="false"
        aria-controls="collapseExample"
      >
        Button
      </button>
      <div class="collapse" id="collapseExample10">
        <div class="card card-body">
          <form @submit.prevent="addmainan">
            <input type="hidden" v-model="formMainan.id" />
            <label>Nama Mainan</label>
            <input
              placeholder="Masukan Nama Barang.."
              class="input"
              type="text"
              v-model="formMainan.nama"
              required
            />
            <label>Deskripsi</label>
            <input
              placeholder="Masukan Deskripsinya.."
              class="input"
              type="text"
              v-model="formMainan.deskripsi"
              required
            />
            <label>Gambar</label>
            <input
              placeholder="Masukan Gambar.."
              class="input"
              type="text"
              v-model="formMainan.image"
              required
            />
            <label class="bb">Expired</label>
            <input
              placeholder="Masukan Expirednya.."
              class="input"
              type="text"
              v-model="formMainan.expired"
              required
            />
            <label class="jenis">Harga</label>
            <input
              placeholder="Masukan Harganya.."
              class="input"
              type="text"
              v-model="formMainan.harga"
              required
            />
            <button
              data-bs-toggle="collapse"
              data-bs-target="#collapseExample10"
            >
              Close
            </button>
            <button
              class="btn btn-primary button_add"
              type="submit"
              v-show="!updateSubmitMainan"
            >
              ADD
            </button>
            <button
              class="btn btn-primary button_add"
              type="button"
              v-show="updateSubmitMainan"
              @click="update10(formMainan)"
            >
              Update
            </button>
          </form>
        </div>
      </div>
      <table
        v-show="!updateSubmitMainan"
        id="table-1"
        class="table"
        border="1"
        style="width: 100%"
      >
        <tr class="tr">
          <th>NO</th>
          <th>Nama Barang</th>
          <th>Deskripsi</th>
          <th>Contoh</th>
          <th>Expired</th>
          <th>Harga</th>
          <th>Action</th>
        </tr>

        <tr class="tr" v-for="(mainan, index9) in mainans" :key="index9">
          <td>
            {{ index9 + 1 }}
          </td>
          <td>
            {{ mainan.nama }}
          </td>
          <td style="width: 400px">
            {{ mainan.deskripsi }}
          </td>
          <td>
            <img
              style="height: 120px"
              :src="mainan.image"
              alt=""
              width="100px"
            />
          </td>
          <td>
            {{ mainan.expired }}
          </td>
          <td>{{ mainan.harga }}</td>
          <td>
            <button
              data-bs-toggle="collapse"
              data-bs-target="#collapseExample9"
              class="btn btn-primary edit"
              @click="edit10(mainan)"
            >
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button class="btn btn-danger del" @click="del10(mainan)">
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
  name: "DataMainan",
  mounted() {
    if (!sessionStorage.getItem("USER_DATA")) {
      this.$router.push("/");
    }
    this.loadmainan();
  },
  data() {
    return {
      formMainan: {
        nama: "",
        deskripsi: "",
        image: "",
        expired: "",
        harga: "",
      },
      mainans: "",
      updateSubmitMainan: false,
    };
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
    addmainan() {
      const payload = {
        ...this.formMainan,
        harga: Number(this.formMainan.harga),
      };
      axios.post("http://localhost:3000/mainans/", payload).then(() => {
        this.loadmainan();
        this.formMainan.nama = "";
        this.formMainan.deskripsi = "";
        this.formMainan.image = "";
        this.formMainan.expired = "";
        this.formMainan.harga = "";
        Swal.fire("Success", "Data Anda Berhasil Ditambahkan", "success");
      });
    },
    edit10() {
      this.updateSubmitMainan = true;
      this.formMainan.id = this.mainan.id;
      this.formMainan.nama = this.mainan.nama;
      this.formMainan.deskripsi = this.mainan.deskripsi;
      this.formMainan.image = this.mainan.image;
      this.formMainan.expired = this.mainan.expired;
      this.formMainan.harga = this.mainan.harga;
    },
    update10() {
      return axios
        .put("http://localhost:3000/mainans/" + this.formMainan.id, {
          nama: this.formMainan.nama,
          deskripsi: this.formMainan.deskripsi,
          image: this.formMainan.image,
          expired: this.formMainan.expired,
          harga: this.formMainan.harga,
        })
        .then(() => {
          this.loadmainan();
          this.formMainan.id = "";
          this.formMainan.nama = "";
          this.formMainan.deskripsi = "";
          this.formMainan.image = "";
          this.formMainan.expired = "";
          this.formMainan.harga = "";
          this.updateSubmitMainan = false;
          Swal.fire("Success", "Data Anda Berhasil Diupdate", "success");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    del10() {
      axios
        .delete("http://localhost:3000/mainans/" + this.mainan.id)
        .then(() => {
          this.loadmainan();
          let index = this.mainans.indexOf(this.formMainan.nama);
          this.mainans.splice(index, 1);
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

