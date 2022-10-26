<template>
  <div class="dataMinuman">
    <button
      style="height: auto; width: auto"
      class="btn btn-primary add"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#collapseExample5"
      aria-expanded="false"
      aria-controls="collapseExample"
    >
      Button
    </button>
    <div class="collapse" id="collapseExample5">
      <div class="card card-body">
        <form @submit.prevent="addsembako">
          <input type="hidden" v-model="formSembako.id" />
          <label>Nama Sembako</label>
          <input
            placeholder="Masukan Nama Sembako.."
            class="input"
            type="text"
            v-model="formSembako.nama"
            required
          />
          <label>Deskripsi</label>
          <input
            placeholder="Masukan Deskripsinya.."
            class="input"
            type="text"
            v-model="formSembako.deskripsi"
            required
          />
          <label>Gambar</label>
          <input
            placeholder="Masukan Gambar.."
            class="input"
            type="text"
            v-model="formSembako.image"
            required
          />
          <label class="bb">Expired</label>
          <input
            placeholder="Masukan Expirednya.."
            class="input"
            type="text"
            v-model="formSembako.expired"
            required
          />
          <label class="jenis">Harga</label>
          <input
            placeholder="Masukan Harganya.."
            class="input"
            type="text"
            v-model="formSembako.harga"
            required
          />
          <button data-bs-toggle="collapse" data-bs-target="#collapseExample5">
            Close
          </button>
          <button
            class="btn btn-primary button_add"
            type="submit"
            v-show="!updateSubmitSembako"
          >
            ADD
          </button>
          <button
            class="btn btn-primary button_add"
            type="button"
            v-show="updateSubmitSembako"
            @click="update5(formSembako)"
          >
            Update
          </button>
        </form>
      </div>
    </div>
    <table
      v-show="!updateSubmitSembako"
      id="table-1"
      class="table"
      border="1"
      style="width: 100%"
    >
      <tr class="tr">
        <th>NO</th>
        <th>Nama Sembako</th>
        <th>Deskripsi</th>
        <th>Contoh</th>
        <th>Expired</th>
        <th>Harga</th>
        <th>Action</th>
      </tr>
      <tr class="tr" v-for="(sembako, index4) in sembakos" :key="index4">
        <td>
          {{ index4 + 1 }}
        </td>
        <td>
          {{ sembako.nama }}
        </td>
        <td style="width: 400px">
          {{ sembako.deskripsi }}
        </td>
        <td>
          <img
            style="height: 120px"
            :src="sembako.image"
            alt=""
            width="100px"
          />
        </td>
        <td>
          {{ sembako.expired }}
        </td>
        <td>{{ sembako.harga }}</td>
        <td>
          <button
            data-bs-toggle="collapse"
            data-bs-target="#collapseExample5"
            class="btn btn-primary edit"
            @click="edit5(sembako)"
          >
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
          <button class="btn btn-danger del" @click="del5(sembako)">
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
  name: "DataSembako",
  mounted(){
       this.loadsembako();
  },
  data() {
    return {
      formSembako: {
        nama: "",
        deskripsi: "",
        image: "",
        expired: "",
        harga: "",
      },
      sembakos: "",
      updateSubmitSembako: false,
    };
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
    addsembako() {
      const payload = {
        ...this.formSembako,
        harga: Number(this.formSembako.harga),
      };
      axios.post("http://localhost:3000/sembakos/", payload).then(() => {
        this.loadsembako();
        this.formSembako.nama = "";
        this.formSembako.deskripsi = "";
        this.formSembako.image = "";
        this.formSembako.expired = "";
        this.formSembako.harga = "";
        Swal.fire("Success", "Data Anda Berhasil Ditambahkan", "success");
      });
    },
    edit5(sembako) {
      this.updateSubmitSembako = true;
      this.formSembako.id = sembako.id;
      this.formSembako.nama = sembako.nama;
      this.formSembako.deskripsi = sembako.deskripsi;
      this.formSembako.image = sembako.image;
      this.formSembako.expired = sembako.expired;
      this.formSembako.harga = sembako.harga;
    },
    update5() {
      return axios
        .put("http://localhost:3000/sembakos/" + this.formSembako.id, {
          nama: this.formSembako.nama,
          deskripsi: this.formSembako.deskripsi,
          image: this.formSembako.image,
          expired: this.formSembako.expired,
          harga: this.formSembako.harga,
        })
        .then(() => {
          this.loadsembako();
          this.formSembako.id = "";
          this.formSembako.nama = "";
          this.formSembako.deskripsi = "";
          this.formSembako.image = "";
          this.formSembako.expired = "";
          this.formSembako.harga = "";
          this.updateSubmitSembako = false;
          Swal.fire("Success", "Data Anda Berhasil Diupdate", "success");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    del5(sembako) {
      axios.delete("http://localhost:3000/sembakos/" + sembako.id).then(() => {
        this.loadobat();
        let index = this.sembakos.indexOf(this.formSembako.nama);
        this.sembakos.splice(index, 1);
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

