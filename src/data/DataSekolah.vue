<template>
  <div>
    <button
      style="height: auto; width: auto"
      class="btn btn-primary add"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#collapseExample7"
      aria-expanded="false"
      aria-controls="collapseExample"
    >
      Button
    </button>
    <div class="collapse" id="collapseExample7">
      <div class="card card-body">
        <form @submit.prevent="addperlengkapan">
          <input type="hidden" v-model="formPerlengkapan.id" />
          <label>Nama Perlengkapan Sekolah</label>
          <input
            placeholder="Masukan Nama Perlengkapan Sekolah.."
            class="input"
            type="text"
            v-model="formPerlengkapan.nama"
            required
          />
          <label>Deskripsi</label>
          <input
            placeholder="Masukan Deskripsinya.."
            class="input"
            type="text"
            v-model="formPerlengkapan.deskripsi"
            required
          />
          <label>Gambar</label>
          <input
            placeholder="Masukan Gambar.."
            class="input"
            type="text"
            v-model="formPerlengkapan.image"
            required
          />
          <label class="bb">Expired</label>
          <input
            placeholder="Masukan Expirednya.."
            class="input"
            type="text"
            v-model="formPerlengkapan.expired"
            required
          />
          <label class="jenis">Harga</label>
          <input
            placeholder="Masukan Harganya.."
            class="input"
            type="text"
            v-model="formPerlengkapan.harga"
            required
          />
          <button data-bs-toggle="collapse" data-bs-target="#collapseExample7">
            Close
          </button>
          <button
            class="btn btn-primary button_add"
            type="submit"
            v-show="!updateSubmitPerlengkapan"
          >
            ADD
          </button>
          <button
            class="btn btn-primary button_add"
            type="button"
            v-show="updateSubmitPerlengkapan"
            @click="update7(formPerlengkapan)"
          >
            Update
          </button>
        </form>
      </div>
    </div>
    <table
      v-show="!updateSubmitPerlengkapan"
      id="table-1"
      class="table"
      border="1"
      style="width: 100%"
    >
      <tr class="tr">
        <th>NO</th>
        <th>Nama Perlengkapan Sekolah</th>
        <th>Deskripsi</th>
        <th>Contoh</th>
        <th>Expired</th>
        <th>Harga</th>
        <th>Action</th>
      </tr>

      <tr
        class="tr"
        v-for="(perlengkapan, index6) in perlengkapans"
        :key="index6"
      >
        <td>
          {{ index6 + 1 }}
        </td>
        <td>
          {{ perlengkapan.nama }}
        </td>
        <td style="width: 400px">
          {{ perlengkapan.deskripsi }}
        </td>
        <td>
          <img
            style="height: 120px"
            :src="perlengkapan.image"
            alt=""
            width="100px"
          />
        </td>
        <td>
          {{ perlengkapan.expired }}
        </td>
        <td>{{ perlengkapan.harga }}</td>
        <td>
          <button
            data-bs-toggle="collapse"
            data-bs-target="#collapseExample7"
            class="btn btn-primary edit"
            @click="edit7(perlengkapan)"
          >
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
          <button class="btn btn-danger del" @click="del7(perlengkapan)">
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
  name: "DataSekolah",
  mounted() {
    this.loadperlengkapan();
  },
  data() {
    return {
      // Form Perlengkapan Sekolah
      formPerlengkapan: {
        nama: "",
        deskripsi: "",
        image: "",
        expired: "",
        harga: "",
      },
      perlengkapans: "",
      updateSubmitPerlengkapan: false,
      // End Form Perlengkapan Sekolah
    };
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
    addperlengkapan() {
      const payload = {
        ...this.formPerlengkapan,
        harga: Number(this.formPerlengkapan.harga),
      };
      axios.post("http://localhost:3000/perlengkapans/", payload).then(() => {
        this.loadperlengkapan();
        this.formPerlengkapan.nama = "";
        this.formPerlengkapan.deskripsi = "";
        this.formPerlengkapan.image = "";
        this.formPerlengkapan.expired = "";
        this.formPerlengkapan.harga = "";
        Swal.fire("Success", "Data Anda Berhasil Ditambahkan", "success");
      });
    },
    edit7(perlengkapan) {
      this.updateSubmitPerlengkapan = true;
      this.formPerlengkapan.id = perlengkapan.id;
      this.formPerlengkapan.nama = perlengkapan.nama;
      this.formPerlengkapan.deskripsi = perlengkapan.deskripsi;
      this.formPerlengkapan.image = perlengkapan.image;
      this.formPerlengkapan.expired = perlengkapan.expired;
      this.formPerlengkapan.harga = perlengkapan.harga;
    },
    update7() {
      return axios
        .put(
          "http://localhost:3000/perlengkapans/" + this.formPerlengkapan.id,
          {
            nama: this.formPerlengkapan.nama,
            deskripsi: this.formPerlengkapan.deskripsi,
            image: this.formPerlengkapan.image,
            expired: this.formPerlengkapan.expired,
            harga: this.formPerlengkapan.harga,
          }
        )
        .then(() => {
          this.loadperlengkapan();
          this.formPerlengkapan.id = "";
          this.formPerlengkapan.nama = "";
          this.formPerlengkapan.deskripsi = "";
          this.formPerlengkapan.image = "";
          this.formPerlengkapan.expired = "";
          this.formPerlengkapan.harga = "";
          this.updateSubmitPerlengkapan = false;
          Swal.fire("Success", "Data Anda Berhasil Diupdate", "success");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    del7(perlengkapan) {
      axios
        .delete("http://localhost:3000/perlengkapans/" + perlengkapan.id)
        .then(() => {
          this.loadperlengkapan();
          let index = this.perlengkapans.indexOf(this.formPerlengkapan.nama);
          this.perlengkapans.splice(index, 1);
          Swal.fire("Success", "Data Anda Berhasil Dihapus", "success");
        });
    },
    // End Perlengkapan Sekolah
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
