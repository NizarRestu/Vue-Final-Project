<template>
    <div>
        
      <button
        style="height: auto; width: auto"
        class="btn btn-primary add"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapseExample9"
        aria-expanded="false"
        aria-controls="collapseExample"
      >
        Button
      </button>
      <div class="collapse" id="collapseExample9">
        <div class="card card-body">
          <form @submit.prevent="addelektro">
            <input type="hidden" v-model="formElektro.id" />
            <label>Nama Barang Elektronik</label>
            <input
              placeholder="Masukan Nama Barang.."
              class="input"
              type="text"
              v-model="formElektro.nama"
              required
            />
            <label>Deskripsi</label>
            <input
              placeholder="Masukan Deskripsinya.."
              class="input"
              type="text"
              v-model="formElektro.deskripsi"
              required
            />
            <label>Gambar</label>
            <input
              placeholder="Masukan Gambar.."
              class="input"
              type="text"
              v-model="formElektro.image"
              required
            />
            <label class="bb">Expired</label>
            <input
              placeholder="Masukan Expirednya.."
              class="input"
              type="text"
              v-model="formElektro.expired"
              required
            />
            <label class="jenis">Harga</label>
            <input
              placeholder="Masukan Harganya.."
              class="input"
              type="text"
              v-model="formElektro.harga"
              required
            />
            <button
              data-bs-toggle="collapse"
              data-bs-target="#collapseExample9"
            >
              Close
            </button>
            <button
              class="btn btn-primary button_add"
              type="submit"
              v-show="!updateSubmitElektro"
            >
              ADD
            </button>
            <button
              class="btn btn-primary button_add"
              type="button"
              v-show="updateSubmitElektro"
              @click="update9(formElektro)"
            >
              Update
            </button>
          </form>
        </div>
      </div>
      <table
        v-show="!updateSubmitElektro"
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

        <tr class="tr" v-for="(elektro, index8) in elektros" :key="index8">
          <td>
            {{ index8 + 1 }}
          </td>
          <td>
            {{ elektro.nama }}
          </td>
          <td style="width: 400px">
            {{ elektro.deskripsi }}
          </td>
          <td>
            <img
              style="height: 120px"
              :src="elektro.image"
              alt=""
              width="100px"
            />
          </td>
          <td>
            {{ elektro.expired }}
          </td>
          <td>{{ elektro.harga }}</td>
          <td>
            <button
              data-bs-toggle="collapse"
              data-bs-target="#collapseExample9"
              class="btn btn-primary edit"
              @click="edit9(elektro)"
            >
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button class="btn btn-danger del" @click="del9(elektro)">
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
     name: "DataElektonik",
      mounted() {
    if (!sessionStorage.getItem("USER_DATA")) {
      this.$router.push("/");
    }
   this.loadelektro();
  },
    data() {
    return {
        formElektro: {
        nama: "",
        deskripsi: "",
        image: "",
        expired: "",
        harga: "",
      },
      elektros: "",
      updateSubmitElektro: false,
    };
  },
  methods: {
      loadelektro() {
      axios
        .get("http://localhost:3000/elektroniks")

        .then((res) => {
          this.elektros = res.data; //respon dari rest api dimasukan ke users
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addelektro() {
      const payload = {
        ...this.formElektro,
        harga: Number(this.formElektro.harga),
      };
      axios.post("http://localhost:3000/elektroniks/", payload).then(() => {
        this.loadelektro();
        this.formElektro.nama = "";
        this.formElektro.deskripsi = "";
        this.formElektro.image = "";
        this.formElektro.expired = "";
        this.formElektro.harga = "";
        Swal.fire("Success", "Data Anda Berhasil Ditambahkan", "success");
      });
    },
    edit9() {
      this.updateSubmitElektro = true;
      this.formElektro.id = this.elektro.id;
      this.formElektro.nama = this.elektro.nama;
      this.formElektro.deskripsi = this.elektro.deskripsi;
      this.formElektro.image = this.elektro.image;
      this.formElektro.expired = this.elektro.expired;
      this.formElektro.harga = this.elektro.harga;
    },
    update9() {
      return axios
        .put("http://localhost:3000/elektroniks/" + this.formElektro.id, {
          nama: this.formElektro.nama,
          deskripsi: this.formElektro.deskripsi,
          image: this.formElektro.image,
          expired: this.formElektro.expired,
          harga: this.formElektro.harga,
        })
        .then(() => {
          this.loadelektro();
          this.formElektro.id = "";
          this.formElektro.nama = "";
          this.formElektro.deskripsi = "";
          this.formElektro.image = "";
          this.formElektro.expired = "";
          this.formElektro.harga = "";
          this.updateSubmitElektro = false;
          Swal.fire("Success", "Data Anda Berhasil Diupdate", "success");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    del9() {
      axios
        .delete("http://localhost:3000/elektroniks/" + this.elektro.id)
        .then(() => {
          this.loadelektro();
          let index = this.elektros.indexOf(this.formElektro.nama);
          this.elektros.splice(index, 1);
          Swal.fire("Success", "Data Anda Berhasil Dihapus", "success");
        });
    },
  }
}
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

