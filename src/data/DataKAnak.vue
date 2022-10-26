<template>
  <div class="dataKAnak">
    <button
      style="height: auto; width: auto"
      class="btn btn-primary add"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#collapseExample6"
      aria-expanded="false"
      aria-controls="collapseExample"
    >
      Button
    </button>
    <div class="collapse" id="collapseExample6">
      <div class="card card-body">
        <form @submit.prevent="addanak">
          <input type="hidden" v-model="formAnak.id" />
          <label>Nama Kebutuhan Anak</label>
          <input
            placeholder="Masukan Nama Kebutuhan Anak.."
            class="input"
            type="text"
            v-model="formAnak.nama"
            required
          />
          <label>Deskripsi</label>
          <input
            placeholder="Masukan Deskripsinya.."
            class="input"
            type="text"
            v-model="formAnak.deskripsi"
            required
          />
          <label>Gambar</label>
          <input
            placeholder="Masukan Gambar.."
            class="input"
            type="text"
            v-model="formAnak.image"
            required
          />
          <label class="bb">Expired</label>
          <input
            placeholder="Masukan Expirednya.."
            class="input"
            type="text"
            v-model="formAnak.expired"
            required
          />
          <label class="jenis">Harga</label>
          <input
            placeholder="Masukan Harganya.."
            class="input"
            type="text"
            v-model="formAnak.harga"
            required
          />
          <button data-bs-toggle="collapse" data-bs-target="#collapseExample6">
            Close
          </button>
          <button
            class="btn btn-primary button_add"
            type="submit"
            v-show="!updateSubmitAnak"
          >
            ADD
          </button>
          <button
            class="btn btn-primary button_add"
            type="button"
            v-show="updateSubmitAnak"
            @click="update6(formAnak)"
          >
            Update
          </button>
        </form>
      </div>
    </div>
    <table
      v-show="!updateSubmitAnak"
      id="table-1"
      class="table"
      border="1"
      style="width: 100%"
    >
      <tr class="tr">
        <th>NO</th>
        <th>Nama Kebutuhan Anak</th>
        <th>Deskripsi</th>
        <th>Contoh</th>
        <th>Expired</th>
        <th>Harga</th>
        <th>Action</th>
      </tr>

      <tr class="tr" v-for="(anak, index5) in anaks" :key="index5">
        <td>
          {{ index5 + 1 }}
        </td>
        <td>
          {{ anak.nama }}
        </td>
        <td style="width: 400px">
          {{ anak.deskripsi }}
        </td>
        <td>
          <img style="height: 120px" :src="anak.image" alt="" width="100px" />
        </td>
        <td>
          {{ anak.expired }}
        </td>
        <td>{{ anak.harga }}</td>
        <td>
          <button
            data-bs-toggle="collapse"
            data-bs-target="#collapseExample6"
            class="btn btn-primary edit"
            @click="edit6(anak)"
          >
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
          <button class="btn btn-danger del" @click="del6(anak)">
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
  name: "DataAnak",
  mounted() {
    if (!sessionStorage.getItem("USER_DATA")) {
      this.$router.push("/");
    }
    this.loadanak();
  },
  data() {
    return {
      formAnak: {
        nama: "",
        deskripsi: "",
        image: "",
        expired: "",
        harga: "",
      },
      anaks: "",
      updateSubmitAnak: false,
    };
  },
  methods: {
    loadanak() {
      axios
        .get("http://localhost:3000/anaks")

        .then((res) => {
          this.anaks = res.data; //respon dari rest api dimasukan ke users
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addanak() {
      const payload = {
        ...this.formAnak,
        harga: Number(this.formAnak.harga),
      };
      axios.post("http://localhost:3000/anaks/", payload).then(() => {
        this.loadobat();
        this.formAnak.nama = "";
        this.formAnak.deskripsi = "";
        this.formAnak.image = "";
        this.formAnak.expired = "";
        this.formAnak.harga = "";
        Swal.fire("Success", "Data Anda Berhasil Ditambahkan", "success");
      });
    },
    edit6(anak) {
      this.updateSubmitAnak = true;
      this.formAnak.id = anak.id;
      this.formAnak.nama = anak.nama;
      this.formAnak.deskripsi = anak.deskripsi;
      this.formAnak.image = anak.image;
      this.formAnak.expired = anak.expired;
      this.formAnak.harga = anak.harga;
    },
    update6() {
      return axios
        .put("http://localhost:3000/anaks/" + this.formAnak.id, {
          nama: this.formAnak.nama,
          deskripsi: this.formAnak.deskripsi,
          image: this.formAnak.image,
          expired: this.formAnak.expired,
          harga: this.formAnak.harga,
        })
        .then(() => {
          this.loadanak();
          this.formAnak.id = "";
          this.formAnak.nama = "";
          this.formAnak.deskripsi = "";
          this.formAnak.image = "";
          this.formAnak.expired = "";
          this.formAnak.harga = "";
          this.updateSubmitAnak = false;
          Swal.fire("Success", "Data Anda Berhasil Diupdate", "success");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    del6(anak) {
      axios.delete("http://localhost:3000/anaks/" + anak.id).then(() => {
        this.loadanak();
        let index = this.anaks.indexOf(this.formAnak.nama);
        this.anaks.splice(index, 1);
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

