<template>
  <div
    class="modal modal-auth position-static d-block bg-body py-5"
    tabindex="-1"
    role="dialog"
    id="modalAuth"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content rounded-0 shadow">
        <div class="modal-header p-5 pb-4 border-bottom-0">
          <!-- <h5 class="modal-title">Modal title</h5> -->
          <h2 class="fw-bold mb-0">Sign in now</h2>
          <a type="button" class="btn-close" href="/"></a>
        </div>

        <div class="modal-body p-5 pt-0">
          <div
            v-if="errorMessage"
            class="alert alert-danger d-flex align-items-center"
            role="alert"
          >
            <svg
              class="bi flex-shrink-0 me-2"
              width="24"
              height="24"
              role="img"
              aria-label="Danger:"
            >
              <use xlink:href="#exclamation-triangle-fill" />
            </svg>
            <div>
              {{ errorMessage }}
            </div>
          </div>
          <form class="">
            <div class="form-floating mb-3">
              <input
                v-model="credentials.username"
                type="text"
                class="form-control rounded-0"
                :class="errors.username ? 'is-invalid' : ''"
                id="username"
                placeholder="name@example.com"
              />
              <label for="username">Username</label>
              <div
                v-if="errors.username"
                id="username"
                class="invalid-feedback"
              >
                {{ errors.username.toString() }}
              </div>
            </div>
            <div class="form-floating mb-3">
              <input
                v-model="credentials.password"
                type="password"
                class="form-control rounded-0"
                :class="errors.password ? 'is-invalid' : ''"
                id="password"
                placeholder="Password"
              />
              <label for="password">Password</label>
              <div
                v-if="errors.password"
                id="password"
                class="invalid-feedback"
              >
                {{ errors.password.toString() }}
              </div>
            </div>
            <small class="text-muted"
              >By clicking Sign up, you agree to the terms of use.</small
            >
            <button
              class="w-100 mt-2 btn btn-lg rounded-0 btn-primary"
              type="button"
              @click="userSignIn"
              :disabled="!credentials.username || !credentials.password"
            >
              <div
                v-if="loading"
                class="spinner-border mx-3 spinner-border-sm"
                role="status"
              >
                <span class="visually-hidden">Loading...</span>
              </div>
              <span v-else>Sign in</span>
            </button>
            <hr class="my-4" />
            <h2 class="fs-5 fw-bold mb-3 text-center">Or use a third-party</h2>
            <button
              class="w-100 py-2 mb-2 btn btn-outline-danger rounded-0"
              type="button"
            >
              <svg class="bi me-1" width="16" height="16">
                <use xlink:href="#google" />
              </svg>
              Sign up with Google
            </button>
            <button
              class="w-100 py-2 mb-2 btn btn-outline-primary rounded-0"
              type="button"
            >
              <svg class="bi me-1" width="16" height="16">
                <use xlink:href="#facebook" />
              </svg>
              Sign up with Facebook
            </button>
            <button
              class="w-100 py-2 mb-2 btn btn-outline-dark rounded-0"
              type="button"
            >
              <svg class="bi me-1" width="16" height="16">
                <use xlink:href="#github" />
              </svg>
              Sign up with GitHub
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import "bootstrap";
import { ref } from "vue";
import auth from "@/hooks/auth-wp";

const credentials = ref({});
const errorMessage = ref();
const errors = ref({});
const loading = ref(false);

const userSignIn = () => {
  loading.value = !loading.value;

  auth
    .login(credentials.value)
    .then((response) => {
      console.log(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      localStorage.setItem("loggedIn", true);
      window.location.href = "/user-with-wordpress";
    })
    .catch((error) => {
      errorMessage.value = JSON.stringify(error.response.data.message);
      console.log(JSON.stringify(error.response.data));
      loading.value = !loading.value;
    });
};
</script>

<style lang="scss" scoped></style>
