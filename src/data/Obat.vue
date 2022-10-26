<template>
  <div class="dataObat">
    <button
      style="height: auto; width: auto"
      class="btn btn-primary add"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#collapseExample4"
      aria-expanded="false"
      aria-controls="collapseExample"
    >
      Button
    </button>
    <div class="collapse" id="collapseExample4">
      <div class="card card-body">
        <form @submit.prevent="addobat">
          <input type="hidden" v-model="formObat.id" />
          <label>Nama Obat</label>
          <input
            placeholder="Masukan Nama Obat.."
            class="input"
            type="text"
            v-model="formObat.nama"
            required
          />
          <label>Deskripsi</label>
          <input
            placeholder="Masukan Deskripsinya.."
            class="input"
            type="text"
            v-model="formObat.deskripsi"
            required
          />
          <label>Gambar</label>
          <input
            placeholder="Masukan Gambar.."
            class="input"
            type="text"
            v-model="formObat.image"
            required
          />
          <label class="bb">Expired</label>
          <input
            placeholder="Masukan Expirednya.."
            class="input"
            type="text"
            v-model="formObat.expired"
            required
          />
          <label class="jenis">Harga</label>
          <input
            placeholder="Masukan Harganya.."
            class="input"
            type="text"
            v-model="formObat.harga"
            required
          />
          <button data-bs-toggle="collapse" data-bs-target="#collapseExample4">
            Close
          </button>
          <button
            class="btn btn-primary button_add"
            type="submit"
            v-show="!updateSubmitObat"
          >
            ADD
          </button>
          <button
            class="btn btn-primary button_add"
            type="button"
            v-show="updateSubmitObat"
            @click="update4(formObat)"
          >
            Update
          </button>
        </form>
      </div>
    </div>
    <table
      v-show="!updateSubmitObat"
      id="table-1"
      class="table"
      border="1"
      style="width: 100%"
    >
      <tr class="tr">
        <th>NO</th>
        <th>Nama Obat</th>
        <th>Deskripsi</th>
        <th>Contoh</th>
        <th>Expired</th>
        <th>Harga</th>
        <th>Action</th>
      </tr>

      <tr class="tr" v-for="(obat, index3) in obats" :key="index3">
        <td>
          {{ index3 + 1 }}
        </td>
        <td>
          {{ obat.nama }}
        </td>
        <td style="width: 400px">
          {{ obat.deskripsi }}
        </td>
        <td>
          <img style="height: 120px" :src="obat.image" alt="" width="100px" />
        </td>
        <td>
          {{ obat.expired }}
        </td>
        <td>{{ obat.harga }}</td>
        <td>
          <button
            data-bs-toggle="collapse"
            data-bs-target="#collapseExample4"
            class="btn btn-primary edit"
            @click="edit4(obat)"
          >
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
          <button class="btn btn-danger del" @click="del4(obat)">
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
  name: "DataObat",
  data() {
    return {
      formObat: {
        nama: "",
        deskripsi: "",
        image: "",
        expired: "",
        harga: "",
      },
      obats: "",
      updateSubmitObat: false,
    };
  },
  mounted() {
    if (!sessionStorage.getItem("USER_DATA")) {
      this.$router.push("/");
    }
    this.loadobat();
  },
  methods: {
    loadobat() {
      axios
        .get("http://localhost:3000/obats")

        .then((res) => {
          this.obats = res.data; //respon dari rest api dimasukan ke users
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addobat() {
      const payload = {
        ...this.formObat,
        harga: Number(this.formObat.harga),
      };
      axios.post("http://localhost:3000/obats/", payload).then(() => {
        this.loadobat();
        this.formObat.nama = "";
        this.formObat.deskripsi = "";
        this.formObat.image = "";
        this.formObat.expired = "";
        this.formObat.harga = "";
        Swal.fire("Success", "Data Anda Berhasil Ditambahkan", "success");
      });
    },
    edit4(obat) {
      this.updateSubmitObat = true;
      this.formObat.id = obat.id;
      this.formObat.nama = obat.nama;
      this.formObat.deskripsi = obat.deskripsi;
      this.formObat.image = obat.image;
      this.formObat.expired = obat.expired;
      this.formObat.harga = obat.harga;
    },
    update4() {
      return axios
        .put("http://localhost:3000/obats/" + this.formObat.id, {
          nama: this.formObat.nama,
          deskripsi: this.formObat.deskripsi,
          image: this.formObat.image,
          expired: this.formObat.expired,
          harga: this.formObat.harga,
        })
        .then(() => {
          this.loadobat();
          this.formObat.id = "";
          this.formObat.nama = "";
          this.formObat.deskripsi = "";
          this.formObat.image = "";
          this.formObat.expired = "";
          this.formObat.harga = "";
          this.updateSubmitObat = false;
          Swal.fire("Success", "Data Anda Berhasil Diupdate", "success");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    del4(obat) {
      axios.delete("http://localhost:3000/obats/" + obat.id).then(() => {
        this.loadobat();
        let index = this.obats.indexOf(this.formObat.nama);
        this.obats.splice(index, 1);
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
