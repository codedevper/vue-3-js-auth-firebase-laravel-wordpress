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
            v-if="errMsg"
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
              {{ errMsg }}
            </div>
          </div>
          <form class="">
            <div class="form-floating mb-3">
              <input
                v-model="email"
                type="email"
                class="form-control rounded-0"
                id="floatingInput"
                placeholder="name@example.com"
              />
              <label for="floatingInput">Email address</label>
            </div>
            <div class="form-floating mb-3">
              <input
                v-model="password"
                type="password"
                class="form-control rounded-0"
                id="floatingPassword"
                placeholder="Password"
              />
              <label for="floatingPassword">Password</label>
            </div>
            <small class="text-muted"
              >By clicking Sign up, you agree to the terms of use.</small
            >
            <button
              class="w-100 mt-2 btn btn-lg rounded-0 btn-primary"
              type="button"
              @click="emailSignUp"
              :disabled="!email || !password"
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
              @click="googleSignIn"
            >
              <svg class="bi me-1" width="16" height="16">
                <use xlink:href="#google" />
              </svg>
              Sign up with Google
            </button>
            <button
              class="w-100 py-2 mb-2 btn btn-outline-primary rounded-0"
              type="button"
              @click="facebookSignIn"
            >
              <svg class="bi me-1" width="16" height="16">
                <use xlink:href="#facebook" />
              </svg>
              Sign up with Facebook
            </button>
            <button
              class="w-100 py-2 mb-2 btn btn-outline-dark rounded-0"
              type="button"
              @click="githubSignIn"
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
import { useRouter } from "vue-router";
import "@/hooks/FirebaseApp";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
} from "@firebase/auth";

const router = useRouter();

const auth = getAuth();

const email = ref("");
const password = ref("");
const errMsg = ref();
const loading = ref(false);

const emailSignUp = () => {
  loading.value = !loading.value;
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("loggedIn", true);
      console.log(user);
      alert("Successfully register!");
      window.location.href = "/user-with-firebase";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      loading.value = !loading.value;
      switch (error.code) {
        case "auth/invalid-email":
          errMsg.value = "Invalid email";
          break;
        case "auth/email-already-in-use":
          errMsg.value = "Email already in use";
          break;
        case "auth/internal-error":
          errMsg.value = "Incorrect password";
          break;
        case "auth/weak-password":
          errMsg.value = "Weak password";
          break;
        default:
          errMsg.value = "Email or password was incorrect";
          break;
      }
    });
};

const googleSignIn = () => {
  let provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((data) => {
      console.log(data.user);
      alert("Successfully logged in!");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      switch (error.code) {
        case "auth/invalid-email":
          errMsg.value = "Invalid email";
          break;
        default:
          errMsg.value = "Email or password was incorrect";
          break;
      }
    });
};

const facebookSignIn = () => {
  let provider = new FacebookAuthProvider();
  signInWithPopup(auth, provider)
    .then((data) => {
      console.log(data.user);
      alert("Successfully logged in!");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      switch (error.code) {
        case "auth/invalid-email":
          errMsg.value = "Invalid email";
          break;
        default:
          errMsg.value = "Email or password was incorrect";
          break;
      }
    });
};

const githubSignIn = () => {
  let provider = new GithubAuthProvider();
  signInWithPopup(auth, provider)
    .then((data) => {
      console.log(data.user);
      alert("Successfully logged in!");
      router.push("/user-with-firebase");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      switch (error.code) {
        case "auth/invalid-email":
          errMsg.value = "Invalid email";
          break;
        default:
          errMsg.value = "Email or password was incorrect";
          break;
      }
    });
};
</script>

<style lang="scss" scoped></style>
