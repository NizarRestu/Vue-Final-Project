<template>
  <div class="up">
    <form @submit="login" class="kotak_login">
      <h4 class="tulisan_login">Login</h4>
      <label for="">Username</label>
      <input
        type="text"
        name="username"
        v-model="form.username"
        required
        class="form_login"
        placeholder="Masukkan Username atau email .."
      />
      <label for="">Password</label>
      <input
        type="password"
        name="password"
        v-model="form.password"
        required
        class="form_login"
        placeholder="Masukkan Password Anda.."
      />
      <label for="">Pin</label>
      <input
        type="password"
        name="pin"
        v-model="form.pin"
        required
        class="form_login"
        placeholder="Masukan Pin Anda.."
      />
      <button type="submit" class="btn btn-primary poll">Login</button
      ><br /><br />
      <center>
        <a class="registerdonk" href="/register">Register </a>
        <span>Jika belum memiliki akun</span>
      </center>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import Swal from 'sweetalert2';
export default {
  name: "LoginPage",
  data() {
    return {
      form: {
        username: "",
        password: "",
        pin: "",
        useres: {},
      },
      akuns: {},
    };
  },
  methods: {
    async getUser() {
      const user = await axios.get("http://localhost:3000/akuns");
      this.akuns = user.data;
    },

    login(e) {
      e.preventDefault();
      const login = this.akuns.find(
        (data) =>
          data.username === this.form.username &&
          data.password === this.form.password &&
          data.pin === Number(this.form.pin)
      );
      // kondisi akun benar akan langsung masuk ke page home kalo salah muncul alert
      if (login === undefined) {
        Swal.fire({
  icon: 'error',
  title: 'Opps...',
  text: 'Username Password Or Pin Not Found'
})
      } else {
        var convertToString = JSON.stringify(login);
        sessionStorage.setItem("USER_DATA", convertToString);
        sessionStorage.setItem("role", login.role);
        if (sessionStorage.getItem("role") === "admin") {
          this.$router.push("/");
          window.location.reload();
        } else {
          this.$router.push("/");
          window.location.reload();
        }
      }
    },
  },
  mounted() {
    this.getUser();
    this.$emit("toggleBar");
  },
};
</script>
<style scoped>
h1 {
  text-align: center;
  /*ketebalan font*/
  font-weight: 300;
}
.tulisan_login {
  text-align: center;
  /*membuat semua huruf menjadi kapital*/
  text-transform: uppercase;
}
label {
  font-size: 11pt;
}
.kotak_login {
  border: 1px solid #232323;
  border-radius: 5%;
  width: 350px;
  background-color: white;
  /*meletakkan form ke tengah*/
  margin: 80px auto;
  padding: 30px 20px;
  overflow: hidden;
  /* height: 60vh; */
}
.form_login {
  /*membuat lebar form penuh*/
  box-sizing: border-box;
  width: 100%;
  padding: 10px;
  font-size: 11pt;
  margin-bottom: 20px;
}
.link {
  color: #232323;
  text-decoration: none;
  font-size: 10pt;
}
.aa {
  border: 1px solid black;
  border-radius: 10px;
  background-color: aliceblue;
  margin-left: 50px;
  margin-right: 50px;
  padding: 5px;
  text-align: center;
}
.f00ter {
  text-align: end;
  margin-top: 20px;
  margin-bottom: -20px;
}
.f00ter a {
  text-decoration: none;
}
.registerdonk {
  text-decoration: none;
}
.registerdonk:hover {
  text-decoration: underline;
}
.poll {
  width: 100%;
}
.notReg {
  padding-left: 2px;
}
</style>
