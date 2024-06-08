import axios from "axios";

function authHeader() {
  let user = JSON.parse(localStorage.getItem("user"));
  if (user && user.token) {
    console.log(user.token);
    return { Authorization: "Bearer " + user.token };
  } else {
    return {};
  }
}

const wp = axios.create({
  baseURL: "https://localhost/wp-json",
  headers: authHeader(),
});

class auth {
  register(credentials) {
    //await csrf();
    return wp.post("/users", credentials);
  }

  login(credentials) {
    //await csrf();
    return wp.post("/jwt-auth/v1/token", credentials);
  }

  user() {
    return wp.post("/jwt-auth/v1/token/validate");
  }

  logout() {
    return wp.post("/logout");
  }
}

export default new auth();
