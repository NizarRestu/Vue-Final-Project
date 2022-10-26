<template>
  <div class="dataMinuman">
    <button
      style="height: auto; width: auto"
      class="btn btn-primary add"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#collapseExample3"
      aria-expanded="false"
      aria-controls="collapseExample"
    >
      Button
    </button>
    <div class="collapse" id="collapseExample3">
      <div class="card card-body">
        <form @submit.prevent="addminuman">
          <input type="hidden" v-model="formMinuman.id" />
          <label>Nama Minuman</label>
          <input
            placeholder="Masukan Nama Mimuman.."
            class="input"
            type="text"
            v-model="formMinuman.nama"
            required
          />
          <label>Deskripsi</label>
          <input
            placeholder="Masukan Deskripsinya.."
            class="input"
            type="text"
            v-model="formMinuman.deskripsi"
            required
          />
          <label>Gambar</label>
          <input
            placeholder="Masukan Gambar.."
            class="input"
            type="text"
            v-model="formMinuman.image"
            required
          />
          <label class="bb">Expired</label>
          <input
            placeholder="Masukan Expirednya.."
            class="input"
            type="text"
            v-model="formMinuman.expired"
            required
          />
          <label class="jenis">Harga</label>
          <input
            placeholder="Masukan Harganya.."
            class="input"
            type="text"
            v-model="formMinuman.harga"
            required
          />
          <button data-bs-toggle="collapse" data-bs-target="#collapseExample3">
            Close
          </button>
          <button
            class="btn btn-primary button_add"
            type="submit"
            v-show="!updateSubmitMinuman"
          >
            ADD
          </button>
          <button
            class="btn btn-primary button_add"
            type="button"
            v-show="updateSubmitMinuman"
            @click="update3(formMinuman)"
          >
            Update
          </button>
        </form>
      </div>
    </div>
    <table
      v-show="!updateSubmitMinuman"
      id="table-1"
      class="table"
      border="1"
      style="width: 100%"
    >
      <tr class="tr">
        <th>NO</th>
        <th>Nama Minuman</th>
        <th>Deskripsi</th>
        <th>Contoh</th>
        <th>Expired</th>
        <th>Harga</th>
        <th>Action</th>
      </tr>

      <tr class="tr" v-for="(minuman, index2) in minumans" :key="index2">
        <td>
          {{ index2 + 1 }}
        </td>
        <td>
          {{ minuman.nama }}
        </td>
        <td style="width: 400px">
          {{ minuman.deskripsi }}
        </td>
        <td>
          <img
            style="height: 120px"
            :src="minuman.image"
            alt=""
            width="100px"
          />
        </td>
        <td>
          {{ minuman.expired }}
        </td>
        <td>{{ minuman.harga }}</td>
        <td>
          <button
            data-bs-toggle="collapse"
            data-bs-target="#collapseExample3"
            class="btn btn-primary edit"
            @click="edit3(minuman)"
          >
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
          <button class="btn btn-danger del" @click="del3(minuman)">
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
  name: "DataMinuman",
  data() {
    return {
      formMinuman: {
        nama: "",
        deskripsi: "",
        image: "",
        expired: "",
        harga: "",
      },
      minumans: "",
      updateSubmitMinuman: false,
    };
  },
  mounted() {
    if (!sessionStorage.getItem("USER_DATA")) {
      this.$router.push("/");
    }
    this.loadminuman();
  },
  methods: {
    loadminuman() {
      axios
        .get("http://localhost:3000/minumans")

        .then((res) => {
          this.minumans = res.data; //respon dari rest api dimasukan ke users
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addminuman() {
      const payload = {
        ...this.formMinuman,
        harga: Number(this.formMinuman.harga),
      };
      axios.post("http://localhost:3000/minumans/", payload).then(() => {
        this.loadminuman();
        this.formMinuman.nama = "";
        this.formMinuman.deskripsi = "";
        this.formMinuman.image = "";
        this.formMinuman.expired = "";
        this.formMinuman.harga = "";
        Swal.fire("Success", "Data Anda Berhasil Ditambahkan", "success");
      });
    },
    edit3(minuman) {
      this.updateSubmitMinuman = true;
      this.formMinuman.id = minuman.id;
      this.formMinuman.nama = minuman.nama;
      this.formMinuman.deskripsi = minuman.deskripsi;
      this.formMinuman.image = minuman.image;
      this.formMinuman.expired = minuman.expired;
      this.formMinuman.harga = minuman.harga;
    },
    update3() {
      return axios
        .put("http://localhost:3000/minumans/" + this.formMinuman.id, {
          nama: this.formMinuman.nama,
          deskripsi: this.formMinuman.deskripsi,
          image: this.formMinuman.image,
          expired: this.formMinuman.expired,
          harga: this.formMinuman.harga,
        })
        .then(() => {
          this.loadringan();
          this.formMinuman.id = "";
          this.formMinuman.nama = "";
          this.formMinuman.deskripsi = "";
          this.formMinuman.image = "";
          this.formMinuman.expired = "";
          this.formMinuman.harga = "";
          this.updateSubmitMinuman = false;
          Swal.fire("Success", "Data Anda Berhasil Diupdate", "success");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    del3(minuman) {
      axios.delete("http://localhost:3000/minumans/" + minuman.id).then(() => {
        this.loadminuman();
        let index = this.minumans.indexOf(this.formMinuman.nama);
        this.minumans.splice(index, 1);
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
