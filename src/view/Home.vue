<template>
  <div id="home">
    <Navbar />
    <div class="Home">
      <h3>Selamat Datang <span v-if="User"> Di Warung Binusa</span> <span v-if="Admin">Admin </span></h3>
      <div
        id="carouselExampleIndicators"
        class="carousel slide"
        data-bs-ride="true"
        style="width: 30%; margin-left: 35%; margin-top: 2%"
      >
        <div class="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            class="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img
              src="https://pondokislami.com/wp-content/uploads/2020/11/promo-buku-kmo-november-2020.jpg"
              class="d-block w-100"
              alt="..."
            />
          </div>
          <div class="carousel-item">
            <img
              src="https://www.syioknya.com/custom/picture/34851/syioknyaThumbnail_5fc06c2beb1d6.jpg"
              class="d-block w-100"
              alt="..."
            />
          </div>
          <div class="carousel-item">
            <img
              src="https://s3.giladiskon.com/images/deals/thumbnails/deals-es-teh-indonesia-promo-orang-ketiga-beli-2-gratis-1-1645072569.jpg"
              class="d-block w-100"
              alt="..."
            />
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden"></span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
      <!-- Bagian Footer -->
      <div class="footer">
        <div class="gambar">
          <p
            style="
              background-color: rgb(3, 54, 71);
              color: white;
              padding: 2%;
              border-radius: 20px;
              font-weight: bold;
              display: flex;
              width: 140px;
              border: 1px solid white;
            "
          >
            <i style="margin: 13px" class="fas fa-store-alt"></i> Warung Binusa
          </p>
          <img
            src="https://o.remove.bg/downloads/981e438c-31eb-4f9c-bf27-9035ea24f2e7/pngtree-shop-icon-png-image_921774-removebg-preview.png"
            alt=""
            width="120px"
          />
        </div>
        <div class="footer1" style="font-size: 15px">
          <p
            style="
              margin-top: -30px;
              background-color: rgb(3, 54, 71);
              color: white;
              border-radius: 20px;
              padding: 8px 10px;
              font-weight: bold;
              border: 1px solid white;
            "
          >
            <i class="far fa-bookmark"></i> About
          </p>
          <p>
            <router-link to="/"
              ><i style="margin: 4px 4px" class="fas fa-home"></i
              >Home</router-link
            >
          </p>
          <p>
            <router-link to="/menu"
              ><i style="margin: 4px 4px" class="fas fa-bars"></i
              >Menu</router-link
            >
          </p>
        </div>
        <div class="mediasosial">
          <p
            style="
              background-color: rgb(3, 54, 71);
              color: white;
              padding: 5px;
              border-radius: 20px;
              font-weight: bold;
              text-align: center;
              border: 1px solid white;
            "
          >
            <i class="fas fa-hashtag"></i> Media Sosial
          </p>
          <div class="icon">
            <div class="i">
              <a
                href="https://www.youtube.com/channel/UCw5YNITJ8UTpWB9N55saWhw"
                target="_blank"
                rel="noopener noreferrer"
                ><i
                  style="
                    color: red;
                    border: 1px solid red;
                    padding: 10px;
                    border-radius: 50%;
                    background-color: white;
                  "
                  class="fab fa-youtube"
                ></i
              ></a>
            </div>
            <div class="i1">
              <a
                href="https://binusasmg.sch.id/"
                target="_blank"
                rel="noopener noreferrer"
                ><i
                  style="
                    color: rgb(108, 250, 191);
                    border: 1px solid rgb(108, 250, 191);
                    padding: 10px;
                    border-radius: 50%;
                    background-color: green;
                  "
                  class="fab fa-wikipedia-w"
                ></i
              ></a>
            </div>
            <div class="i2">
              <a
                href="https://www.instagram.com/smkbinanusantara_smg/"
                target="_blank"
                rel="noopener noreferrer"
                ><i
                  style="
                    color: deeppink;
                    border: 1px solid deeppink;
                    border-radius: 50%;
                    padding: 10px;
                    background-color: white;
                  "
                  class="fab fa-instagram-square"
                ></i>
              </a>
            </div>
          </div>
        </div>
        <div class="peta">
          <p
            style="
              font-weight: bold;
              background-color: rgb(3, 54, 71);
              color: white;
              padding: 5px;
              border-radius: 20px;
              border: 1px solid white;
              text-align: center
            "
          >
            <i style="margin: 8px" class="fas fa-map-marker-alt"></i> Alamat
          </p>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.285919595247!2d110.2972210159392!3d-6.975553856462773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e705fdc0235654d%3A0x97b3afe1b2104e70!2sSMK%20Bina%20Nusantara%20Semarang!5e0!3m2!1sid!2sid!4v1666691032783!5m2!1sid!2sid" width="300" height="200" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
      <div style="color: white" class="copyright">
        <i style="margin: 3px 3px" class="far fa-copyright"></i>
        <p style="font-weight: bold">Copyright -- kelompok 4 --</p>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";

export default {
  name: "HomePage",
  components: {
    Navbar,
  },
  mounted() {
    if (!sessionStorage.getItem("USER_DATA")) {
      this.$router.push("/");
    }
  },
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
};
</script>

<style scoped>
.Home {
  background-image: linear-gradient(white, rgb(3, 54, 71));
}
.carousel-inner {
  border: 1px solid rgb(3, 54, 71);
}
h3 {
  text-align: center;
  margin-top: 1%;
  background-color: rgb(10, 87, 112);
  width: 50%;
  margin-left: 25%;
  border-radius: 20px;
  color: white;
  padding: 5px;
}
.footer {
  display: flex;
  justify-content: space-around;
  margin-top: 9%;
}
.icon {
  display: flex;
  justify-content: space-around;
  gap: 20px;
  font-size: 25px;
}

.copyright {
  display: flex;
  text-align: center;
  margin-left: 43%;
}
.footer1 {
  margin-top: 2%;
}
a {
  text-decoration: none;
  color: white;
}

iframe {
  margin-left: 20px;
}
p a:hover {
  color: blue;
}
.kosong {
  background-color: rgb(3, 54, 71);
}
</style>
