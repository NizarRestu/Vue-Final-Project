<template>
  <div class="sidebar">
    <div class="wrapper">
      <!-- Sidebar -->
      <nav v-if="!sidebar" id="sidebar">
        <div class="sidebar-header">
          <h4>Warung Binusa</h4>
          <Center><i class="fa-solid fa-shop"></i></Center>
        </div>

        <ul class="list-unstyled components">
          <li> <a href="/cart"><i class="fa-solid fa-cart-shopping"></i>Keranjang</a></li>
          <li class="active">
            <a href="/menu"
              ><i class="fa-solid fa-cookie-bite"></i> Makanan Ringan</a
            >
          </li>

          <li>
            <a href="/makananberat"><i class="fa-solid fa-utensils"></i> Makanan Berat</a>
          </li>
          <li>
            <a href="/minuman"
              ><i class="fa-solid fa-mug-hot"></i> Minuman</a
            >
          </li>
          <li>
            <a href="/obat"><i class="fa-solid fa-tablets"></i> Obat</a>
          </li>
          <li>
            <a href="/sembako"><i class="fa-solid fa-bowl-rice"></i> Sembako</a>
          </li>
          <li>
            <a href="/keperluan"><i class="fa-solid fa-baby"></i> Kebutuhan Anak</a>
          </li>
          <li>
            <a href="/perlengkapan"><i class="fa-solid fa-pen"></i> Perlengkapan Sekolah</a>
          </li>
          <li>
            <a href="/kuota"><i class="fa-solid fa-signal"></i> Kuota</a>
          </li>
          <li>
            <a href="/elektronik"><i class="fa-solid fa-plug"></i> Elektronik</a>
          </li>
          <li>
            <a href="/mainan"><i class="fa-solid fa-truck"></i> Mainan</a>
          </li>
         
          <li>    
              <button
                class="btn btn-primary poll"
                v-if="!user"
                @click="login()"
              >
                Login
              </button>
            <button class="btn btn-danger poll" v-if="user" @click="out()">
              Log out
            </button>
          </li>
        </ul>
      </nav>
      <div id="content">
        <nav class="navbar navbar-expand-lg">
          <div class="container-fluid">
            <button
              v-if="!sidebar"
              @click="btn0()"
              type="button"
              id="sidebarCollapse"
              class="btn btn-info"
            >
              <i class="fa-solid fa-xmark"></i>
            </button>
            <button
              v-if="sidebar"
              @click="btn1()"
              type="button"
              id="sidebarCollapse"
              class="btn btn-info"
            >
              <i class="fa-solid fa-bars"></i>
            </button>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "SideBar",
  data() {
    return {
      sidebar: true,
    };
  },
  computed: {
    user() {
      return sessionStorage.getItem("USER_DATA");
    },
  },
  methods: {
    btn0() {
      this.sidebar = true;
    },
    btn1() {
      this.sidebar = false;
    },
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
.wrapper {
  position: fixed;
  width: 100%;
  align-items: stretch;
}
.wrapper {
  display: flex;
  align-items: stretch;
}

#sidebar {
  min-width: 180px;
  max-width: 180px;
  min-height: 100vh;
}

#sidebar.active {
  margin-left: -250px;
}
.sidebar {
  font-family: "Poppins", sans-serif;
}
a,
a:hover,
a:focus {
  color: inherit;
  text-decoration: none;
  transition: all 0.3s;
}

#sidebar {
  background: #7386d5;
  color: #fff;
  transition: all 0.3s;
}

#sidebar .sidebar-header {
  padding: 5px;
  background: #6d7fcc;
}

#sidebar ul.components {
  padding: 5px 0;
  border-bottom: 1px solid #47748b;
}

#sidebar ul p {
  color: #fff;
  padding: 10px;
}

#sidebar ul li a {
  padding: 10px;
  font-size: 1.1em;
  display: block;
}
#sidebar ul li a:hover {
  color: #7386d5;
  background: #fff;
}
ul ul a {
  font-size: 0.9em !important;
  padding-left: 30px !important;
  background: #6d7fcc;
}
button{
    width: 100%;
}
</style>
