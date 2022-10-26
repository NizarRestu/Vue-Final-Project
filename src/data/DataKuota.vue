<template>
    <div>
        
      <button
        style="height: auto; width: auto"
        class="btn btn-primary add"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapseExample8"
        aria-expanded="false"
        aria-controls="collapseExample"
      >
        Button
      </button>
      <div class="collapse" id="collapseExample8">
        <div class="card card-body">
          <form @submit.prevent="addkuota">
            <input type="hidden" v-model="formKuota.id" />
            <label>Nama Kuota</label>
            <input
              placeholder="Masukan Nama  Kuota.."
              class="input"
              type="text"
              v-model="formKuota.nama"
              required
            />
            <label>Deskripsi</label>
            <input
              placeholder="Masukan Deskripsinya.."
              class="input"
              type="text"
              v-model="formKuota.deskripsi"
              required
            />
            <label>Gambar</label>
            <input
              placeholder="Masukan Gambar.."
              class="input"
              type="text"
              v-model="formKuota.image"
              required
            />
            <label class="bb">Expired</label>
            <input
              placeholder="Masukan Expirednya.."
              class="input"
              type="text"
              v-model="formKuota.expired"
              required
            />
            <label class="jenis">Harga</label>
            <input
              placeholder="Masukan Harganya.."
              class="input"
              type="text"
              v-model="formKuota.harga"
              required
            />
            <button
              data-bs-toggle="collapse"
              data-bs-target="#collapseExample8"
            >
              Close
            </button>
            <button
              class="btn btn-primary button_add"
              type="submit"
              v-show="!updateSubmitKuota"
            >
              ADD
            </button>
            <button
              class="btn btn-primary button_add"
              type="button"
              v-show="updateSubmitKuota"
              @click="update8(formKuota)"
            >
              Update
            </button>
          </form>
        </div>
      </div>
      <table
        v-show="!updateSubmitKuota"
        id="table-1"
        class="table"
        border="1"
        style="width: 100%"
      >
        <tr class="tr">
          <th>NO</th>
          <th>Nama Kuota</th>
          <th>Deskripsi</th>
          <th>Contoh</th>
          <th>Expired</th>
          <th>Harga</th>
          <th>Action</th>
        </tr>

        <tr class="tr" v-for="(kuota, index7) in kuotas" :key="index7">
          <td>
            {{ index7 + 1 }}
          </td>
          <td>
            {{ kuota.nama }}
          </td>
          <td style="width: 400px">
            {{ kuota.deskripsi }}
          </td>
          <td>
            <img
              style="height: 120px"
              :src="kuota.image"
              alt=""
              width="100px"
            />
          </td>
          <td>
            {{ kuota.expired }}
          </td>
          <td>{{ kuota.harga }}</td>
          <td>
            <button
              data-bs-toggle="collapse"
              data-bs-target="#collapseExample8"
              class="btn btn-primary edit"
              @click="edit8(kuota)"
            >
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button class="btn btn-danger del" @click="del8(kuota)">
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
    name:"DataKuota",
     mounted(){
           if (!sessionStorage.getItem("USER_DATA")) {
      this.$router.push("/");
    }
    this.loadkuota();
  },
   data() {
    return {
      formKuota: {
        nama: "",
        deskripsi: "",
        image: "",
        expired: "",
        harga: "",
      },
      kuotas: "",
      updateSubmitKuota: false,
    };
  },
   methods: {
     loadkuota() {
      axios
        .get("http://localhost:3000/kuotas")

        .then((res) => {
          this.kuotas = res.data; //respon dari rest api dimasukan ke users
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addkuota() {
      const payload = {
        ...this.formKuota,
        harga: Number(this.formKuota.harga),
      };
      axios.post("http://localhost:3000/kuotas/", payload).then(() => {
        this.loadkuota();
        this.formKuota.nama = "";
        this.formKuota.deskripsi = "";
        this.formKuota.image = "";
        this.formKuota.expired = "";
        this.formKuota.harga = "";
        Swal.fire("Success", "Data Anda Berhasil Ditambahkan", "success");
      });
    },
    edit8(kuota) {
      this.updateSubmitKuota = true;
      this.formKuota.id = kuota.id;
      this.formKuota.nama = kuota.nama;
      this.formKuota.deskripsi = kuota.deskripsi;
      this.formKuota.image = kuota.image;
      this.formKuota.expired = kuota.expired;
      this.formKuota.harga = kuota.harga;
    },
    update8() {
      return axios
        .put("http://localhost:3000/kuotas/" + this.formKuota.id, {
          nama: this.formKuota.nama,
          deskripsi: this.formKuota.deskripsi,
          image: this.formKuota.image,
          expired: this.formKuota.expired,
          harga: this.formKuota.harga,
        })
        .then(() => {
          this.loadkuota();
          this.formKuota.id = "";
          this.formKuota.nama = "";
          this.formKuota.deskripsi = "";
          this.formKuota.image = "";
          this.formKuota.expired = "";
          this.formKuota.harga = "";
          this.updateSubmitKuota = false;
          Swal.fire("Success", "Data Anda Berhasil Diupdate", "success");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    del8(kuota) {
      axios.delete("http://localhost:3000/kuotas/" + kuota.id).then(() => {
        this.loadkuota();
        let index = this.kuotas.indexOf(this.formKuota.nama);
        this.kuotas.splice(index, 1);
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
