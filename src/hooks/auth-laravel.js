import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
});

const csrf = () => http.get("/sanctum/csrf-cookie");

class auth {
  async register(credentials) {
    await csrf();
    return http.post("/register", credentials);
  }

  async login(credentials) {
    await csrf();
    return http.post("/login", credentials);
  }

  user() {
    return http.get("/api/user");
  }

  logout() {
    return http.post("/logout");
  }
}

export default new auth();
