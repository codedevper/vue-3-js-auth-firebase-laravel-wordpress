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
          <h2 class="fw-bold mb-0">Sign up for free</h2>
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
                v-model="credentials.name"
                type="text"
                class="form-control rounded-0"
                :class="errors.name ? 'is-invalid' : ''"
                id="name"
                placeholder="Your name"
              />
              <label for="floatingInput">Your name</label>
              <div v-if="errors.name" id="name" class="invalid-feedback">
                {{ errors.name.toString() }}
              </div>
            </div>
            <div class="form-floating mb-3">
              <input
                v-model="credentials.email"
                type="email"
                class="form-control rounded-0"
                :class="errors.email ? 'is-invalid' : ''"
                id="email"
                placeholder="name@example.com"
              />
              <label for="email">Email address</label>
              <div v-if="errors.email" id="email" class="invalid-feedback">
                {{ errors.email.toString() }}
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
            <div class="form-floating mb-3">
              <input
                v-model="credentials.password_confirmation"
                type="password"
                class="form-control form-control-dark rounded-0"
                :class="errors.password_confirmation ? 'is-invalid' : ''"
                id="password_confirmation"
                placeholder="Confirm Password"
                :disabled="loading"
                required
              />
              <label for="password_confirmation">Confirm Password</label>
              <div
                v-if="errors.password_confirmation"
                id="password_confirmation"
                class="invalid-feedback"
              >
                {{ errors.password_confirmation.toString() }}
              </div>
            </div>
            <small class="text-muted"
              >By clicking Sign up, you agree to the terms of use.</small
            >
            <button
              class="w-100 mt-2 btn btn-lg rounded-0 btn-primary"
              type="button"
              @click="emailSignUp"
              :disabled="
                !credentials.name ||
                !credentials.email ||
                !credentials.password ||
                !credentials.password_confirmation
              "
            >
              <div
                v-if="loading"
                class="spinner-border mx-3 spinner-border-sm"
                role="status"
              >
                <span class="visually-hidden">Loading...</span>
              </div>
              <span v-else>Sign up</span>
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
import auth from "@/hooks/auth-laravel";

const credentials = ref({});
const errorMessage = ref();
const errors = ref({});
const loading = ref(false);

const emailSignUp = () => {
  loading.value = !loading.value;

  auth
    .register(credentials.value)
    .then((response) => {
      console.log(response.data.message);
      localStorage.setItem("loggedIn", true);
      window.location.href = "/user-with-laravel";
    })
    .catch((error) => {
      const errorCode = error.code;
      errorMessage.value = error.response.data.message;
      errors.value = error.response.data.errors;
      console.log(errorCode);
      console.log(errorMessage);
      console.log(errors);
      loading.value = !loading.value;
    });
};
</script>

<style lang="scss" scoped></style>
