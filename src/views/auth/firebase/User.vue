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
                <h5 class="mb-0">refreshToken</h5>
                {{ refreshToken }}
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
import { ref } from "vue";
import "@/hooks/FirebaseApp";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const auth = getAuth();

const isLoggedIn = ref(true);
const uid = ref("");
const displayName = ref("");
const email = ref("");
const photoURL = ref("");
const emailVerified = ref(true);
const refreshToken = ref("");

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    uid.value = user.uid;
    displayName.value = user.displayName;
    email.value = user.email;
    photoURL.value = user.photoURL;
    emailVerified.value = user.emailVerified;
    refreshToken.value = user.stsTokenManager.refreshToken;
    isLoggedIn.value = true;
    console.log(user);
  } else {
    // User is signed out
    isLoggedIn.value = false;
    localStorage.removeItem("user");
    localStorage.removeItem("loggedIn");
    window.location.href = "/login-with-firebase";
    console.log("Unauthenticated");
  }
});

const logOut = () => {
  signOut(auth)
    .then(() => {
      localStorage.removeItem("user");
      localStorage.removeItem("loggedIn");
      alert("Successfully logged out!");
      window.location.href = "/login-with-firebase";
    })
    .catch((error) => {
      alert(error);
    });
};
</script>

<style lang="scss" scoped></style>
