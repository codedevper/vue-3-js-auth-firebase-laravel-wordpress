<template>
  <div
    class="modal modal-tour position-static d-block bg-body py-5"
    tabindex="-1"
    role="dialog"
    id="modalTour"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content rounded-0 shadow">
        <div class="modal-body p-5">
          <h2 class="fw-bold mb-0">Hello {{ displayName }}</h2>

          <ul class="d-grid gap-4 my-5 list-unstyled">
            <li class="d-flex gap-4">
              <svg class="bi text-muted flex-shrink-0" width="48" height="48">
                <use xlink:href="#grid-fill" />
              </svg>
              <div>
                <h5 class="mb-0">uid</h5>
                {{ uid }}
              </div>
            </li>
            <li class="d-flex gap-4">
              <svg class="bi text-warning flex-shrink-0" width="48" height="48">
                <use xlink:href="#bookmark-star" />
              </svg>
              <div>
                <h5 class="mb-0">email</h5>
                {{ email }}
              </div>
            </li>
            <li class="d-flex gap-4">
              <svg class="bi text-primary flex-shrink-0" width="48" height="48">
                <use xlink:href="#film" />
              </svg>
              <div>
                <h5 class="mb-0">isLoggedIn</h5>
                {{ isLoggedIn }}
              </div>
            </li>
          </ul>
          <button
            type="button"
            class="btn btn-lg btn-danger mt-5 w-100 rounded-0"
            @click="logOut"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import "bootstrap";
import { ref, watchEffect } from "vue";
import auth from "@/hooks/auth-laravel";

const isLoggedIn = ref(true);
const uid = ref("");
const displayName = ref("");
const email = ref("");

watchEffect(async () => {
  await auth
    .user()
    .then((response) => {
      isLoggedIn.value = true;
      uid.value = response.data.id;
      displayName.value = response.data.name;
      email.value = response.data.email;
      console.log(response.data);
    })
    .catch((error) => {
      isLoggedIn.value = false;
      localStorage.removeItem("loggedIn");
      console.log(error);
      window.location.href = "/login-with-laravel";
      console.log("Unauthenticated");
    });
});

const logOut = () => {
  auth
    .logout()
    .then(() => {
      localStorage.removeItem("loggedIn");
      alert("Successfully logged out!");
      window.location.href = "/login-with-laravel";
    })
    .catch((error) => {
      alert(error);
    });
};
</script>

<style lang="scss" scoped></style>
