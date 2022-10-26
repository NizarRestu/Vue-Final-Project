<template>
  <div>
    <!-- <Bagian Corousel -->
    <nav class="navbar navbar-expand-lg bg-light">
      <div class="container-fluid">
        <img
          src="../assets/toko.png"
          alt=""
          width="90px"
        />
        <h3 style="margin-left: 10px; color: white">Warung Binusa</h3>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <div class="block">
              <li class="nav-item">
                <router-link to="/" style="color: white; display: flex"
                  ><i style="margin: 3px 3px" class="fas fa-home"></i
                  >Home</router-link
                >
              </li>
            </div>
            <div class="block1">
              <li class="nav-item">
                <router-link to="/menu" style="color: white; display: flex"
                  ><i style="margin: 4px 4px" class="fas fa-bars"></i
                  >Menu</router-link
                >
              </li>
            </div>
            <div class="block4" v-if="Admin">
              <li class="nav-item">
                <router-link to="/data" style="color: white;display: flex"><i style="margin: 4px 4px" class="fas fa-database"></i>Data</router-link>
              </li>
            </div>
            <div class="block2" v-if="User">
              <li class="nav-item">
                <router-link to="/cart" style="color: white; display: flex"
                  ><i style="margin: 4px 4px" class="fas fa-cart-arrow-down"></i>Cart</router-link
                >
              </li>
            </div>
          </ul>
        </div>
        <form class="d-flex button" role="search">
          <button style="" class="btn btn-primary poll" v-if="!user" @click="login()">
            <i class="fas fa-sign-in-alt"></i>
            Login
          </button>
          <button
            style="display: flex"
            class="btn btn-danger poll"
            v-if="user"
            @click="out()"
          >
            <i style="margin: 5px 5px" class="fas fa-sign-out-alt"></i>
            Log out
          </button>
        </form>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "NavbarPage",
  computed: {
    user() {
      return sessionStorage.getItem("USER_DATA");
    },
    Admin() {
      return sessionStorage.getItem("role") === "admin";
    },
    User() {
      return sessionStorage.getItem("role") === "user";
    },
  },
  methods: {
    login() {
      this.$router.push("/login");
    },
    out() {
      sessionStorage.clear();
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>

.button {
  margin-right: -10px;
}
button {
  padding: 15px;
  height: 20%;
  border-radius: 10px;
  margin-left: 20px;
}
.block {
  border: 1px solid white;
  margin-left: 55%;
  padding: 15px;
  border-radius: 10px;
  cursor: default;
  transition: 1s;
  height: 20%;
  background-color: rgb(3, 54, 71);
  width: 200px;
}
a {
  text-decoration: none;
  color: black;
}
.block:hover {
  background-color: dodgerblue;
  border: 1px solid white;
  box-shadow: 3px 4px 4px rgb(56, 54, 54);
  color: white;
}
.block1 {
  border: 1px solid white;
  height: 20%;
  margin-left: 5%;
  padding: 15px;
  border-radius: 10px;
  transition: 1s;
  background-color: rgb(3, 54, 71);
}
.block1:hover {
  background-color: dodgerblue;
  border: 1px solid white;
  box-shadow: 3px 4px 4px rgb(56, 54, 54);
  color: dodgerblue;
}
.block2 {
  border: 1px solid white;
 margin-left: 100%;
  height: 20%;
  padding: 15px;
  border-radius: 10px;
  transition: 1s;
  background-color: rgb(3, 54, 71);
}
.block2:hover {
  background-color: dodgerblue;
  border: 1px solid white;
  box-shadow: 3px 4px 4px rgb(56, 54, 54);
}

.block3 {
  border: 1px solid white;
  margin-left: 5%;
  height: 20%;
  padding: 15px;
  border-radius: 10px;
  transition: 1s;
  background-color: rgb(3, 54, 71);
}
.block3:hover {
  background-color: dodgerblue;
  border: 1px solid white;
  box-shadow: 3px 4px 4px rgb(56, 54, 54);
  color: white;
}
.block4 {
  border: 1px solid white;
  margin-left: 5%;
  height: 20%;
  padding: 15px;
  border-radius: 10px;
  transition: 1s;
  background-color: rgb(3, 54, 71);
}
.block4:hover {
  background-color: dodgerblue;
  border: 1px solid white;
  box-shadow: 3px 4px 4px rgb(56, 54, 54);
  color: white;
}
.block5 {
  border: 1px solid white;
  margin-left: 5%;
  height: 20%;
  padding: 15px;
  border-radius: 10px;
  transition: 1s;
  background-color: rgb(3, 54, 71);
}
.block5:hover {
  background-color: dodgerblue;
  border: 1px solid white;
  box-shadow: 3px 4px 4px rgb(56, 54, 54);
  color: white;
}
.navbar-nav {
  cursor: default;
}
.container-fluid {
  background-color: #114a6d;
}
@media screen and (max-width: 930px) {
  nav ul {
    display: block;
    position: relative;
    background-color: unset;
    top: unset;
    bottom: unset;
    right: unset;
    width: 40%;
    flex-direction: row;
    font-size: 15px;
  }
  nav ul li:hover::after {
    content: "";
    display: block;
    width: 100%;
    height: 3px;
    transition: 0.3s;
    background-color: black;
    transform: translateY(20px);
  }

  .block,
  .block1,
  .block2,
  .block3,
  .block4,
  .block5 {
    width: 25%;
    display: block;
    justify-content: center;
  }
}
</style>
