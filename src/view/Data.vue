<template>
  <div class="data">
    <Navbar />
    <h2 class="header">Categori :</h2>
    <!-- Button Menu Kategori -->
    <div class="categori">
      <button @click="btn()" class="btn1">Makanan Ringan</button>
      <button @click="btn2()" class="btn2">Makanan Berat</button>
      <button @click="btn3()" class="btn3">Minuman</button>
      <button @click="btn4()" class="btn4">Obat</button>
      <button @click="btn5()" class="btn5">Sembako</button>
    </div>
    <div class="categori2">
      <button @click="btn6()" class="btn5">Kebutuhan Anak</button>
      <button @click="btn7()" class="btn4">Perlengkapan Sekolah</button>
      <button @click="btn8()" class="btn3">Kuota</button>
      <button @click="btn9()" class="btn2">Elektronic</button>
      <button @click="btn10()" class="btn1">Mainan</button>
    </div>
    <br />
    <!-- End Button Menu Kategori -->
    <!-- Data Makanan Ringan -->
    <div v-if="!ringan" class="ringan">
      <DataMRingan />
    </div>
    <!-- End data makanan Ringan -->

    <!--Data Makanan Berat -->
    <div v-if="!berat" class="berat">
      <DataMBerat />
    </div>
    <!-- End data Makanan Berat -->

    <!--Data Minuman -->
    <div v-if="!minuman" class="minuman">
      <DataMinuman />
    </div>
    <!--End data Minuman -->

    <!--Data Obat -->
    <div v-if="!obat" class="obat">
      <DataObat />
    </div>
    <!-- End data Obat -->

    <!-- Data Sembako -->
    <div v-if="!sembako" class="sembako">
      <DataSembako />
    </div>
    <!-- End data Sembako -->

    <!-- Data kebutuhan anak -->
    <div v-if="!anak" class="k-anak">
      <DataAnak />
    </div>
    <!-- End data kebutuhan anak -->

    <!-- Data perlengkapan sekolah -->
    <div v-if="!sekolah" class="sekolah">
      <DataSekolah />
    </div>
    <!-- End data perlengkapan sekolah -->

    <!-- Data Kuota -->
    <div v-if="!kuota" class="kuota">
      <DataKuota />
    </div>
    <!-- End data kuota -->

    <!-- Data elektronik -->
    <div v-if="!elektro" class="elektronik">
      <DataElektro />
    </div>
    <!-- End data elektronik -->

    <!-- Data Mainan -->
    <div v-if="!mainan" class="mainan">
     <DataMainan />
    </div>
    <!-- End data Mainan -->
  </div>
</template>
<script>
import Navbar from "../components/Navbar.vue";
import DataMRingan from "../data/MakananRingan.vue";
import DataMBerat from "../data/MakananBerat.vue";
import DataMinuman from "../data/Minuman.vue";
import DataObat from "../data/Obat.vue";
import DataSembako from "../data/DataSembako.vue";
import DataAnak from "../data/DataKAnak.vue";
import DataSekolah from "../data/DataSekolah.vue";
import DataKuota from "../data/DataKuota.vue";
import DataElektro from "../data/DataElektronik.vue";
import DataMainan from "../data/DataMainan.vue";
export default {
  name: "DataAdmin",
  components: {
    Navbar,
    DataMRingan,
    DataMBerat,
    DataMinuman,
    DataObat,
    DataSembako,
    DataAnak,
    DataSekolah,
    DataKuota,
    DataElektro,
    DataMainan,
  },
  mounted() {
    if (!sessionStorage.getItem("USER_DATA")) {
      this.$router.push("/");
    }
  },
  data() {
    return {
      ringan: true,
      berat: true,
      minuman: true,
      obat: true,
      sembako: true,
      anak: true,
      sekolah: true,
      kuota: true,
      elektro: true,
      mainan: true,
    };
  },
  methods: {
    btn() {
      (this.ringan = false),
        (this.berat = true),
        (this.minuman = true),
        (this.obat = true),
        (this.sembako = true),
        (this.anak = true),
        (this.sekolah = true),
        (this.kuota = true),
        (this.elektro = true),
        (this.mainan = true);
    },
    btn2() {
      (this.ringan = true),
        (this.berat = false),
        (this.minuman = true),
        (this.obat = true),
        (this.sembako = true),
        (this.anak = true),
        (this.sekolah = true),
        (this.kuota = true),
        (this.elektro = true),
        (this.mainan = true);
    },
    btn3() {
      (this.ringan = true),
        (this.berat = true),
        (this.minuman = false),
        (this.obat = true),
        (this.sembako = true),
        (this.anak = true),
        (this.sekolah = true),
        (this.kuota = true),
        (this.elektro = true),
        (this.mainan = true);
    },
    btn4() {
      (this.ringan = true),
        (this.berat = true),
        (this.minuman = true),
        (this.obat = false),
        (this.sembako = true),
        (this.anak = true),
        (this.sekolah = true),
        (this.kuota = true),
        (this.elektro = true),
        (this.mainan = true);
    },
    btn5() {
      (this.ringan = true),
        (this.berat = true),
        (this.minuman = true),
        (this.obat = true),
        (this.sembako = false),
        (this.anak = true),
        (this.sekolah = true),
        (this.kuota = true),
        (this.elektro = true),
        (this.mainan = true);
    },
    btn6() {
      (this.ringan = true),
        (this.berat = true),
        (this.minuman = true),
        (this.obat = true),
        (this.sembako = true),
        (this.anak = false),
        (this.sekolah = true),
        (this.kuota = true),
        (this.elektro = true),
        (this.mainan = true);
    },
    btn7() {
      (this.ringan = true),
        (this.berat = true),
        (this.minuman = true),
        (this.obat = true),
        (this.sembako = true),
        (this.anak = true),
        (this.sekolah = false),
        (this.kuota = true),
        (this.elektro = true),
        (this.mainan = true);
    },
    btn8() {
      (this.ringan = true),
        (this.berat = true),
        (this.minuman = true),
        (this.obat = true),
        (this.sembako = true),
        (this.anak = true),
        (this.sekolah = true),
        (this.kuota = false),
        (this.elektro = true),
        (this.mainan = true);
    },
    btn9() {
      (this.ringan = true),
        (this.berat = true),
        (this.minuman = true),
        (this.obat = true),
        (this.sembako = true),
        (this.anak = true),
        (this.sekolah = true),
        (this.kuota = true),
        (this.elektro = false),
        (this.mainan = true);
    },
    btn10() {
      (this.ringan = true),
        (this.berat = true),
        (this.minuman = true),
        (this.obat = true),
        (this.sembako = true),
        (this.anak = true),
        (this.sekolah = true),
        (this.kuota = true),
        (this.elektro = true),
        (this.mainan = false);
    },
  },
};
</script>
<style scoped>
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
</style>
