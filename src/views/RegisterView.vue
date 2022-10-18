<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const email = ref("");
const password = ref("");
const conf_password = ref("");

const register = async () => {
  if (!email.value || !password.value || !conf_password.value)
    return alert("Please fill in all fields");

  if (password.value !== conf_password.value)
    return alert("Passwords do not match");

  const res = await fetch("http://localhost:3333/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value,
    }),
  }).then((res) => res.json());

  if (res.success) {
    localStorage.setItem("token", res.token);
    router.push({ name: "home" });
  } else {
    alert(res.message);
  }
};
</script>

<template>
  <main>
    <header>
      <h1 class="logo">SECRET APP</h1>

      <h2>Register</h2>
      <p>Login or create an account to start using the super secret app</p>
    </header>

    <form @submit.prevent="register">
      <label>
        <span>Enter your email</span>
        <input type="email" v-model="email" placeholder="Email" />
      </label>

      <label>
        <span>Enter your password</span>
        <input type="password" v-model="password" placeholder="Password" />
      </label>

      <label>
        <span>Confirm your password</span>
        <input
          type="password"
          v-model="conf_password"
          placeholder="Confirm Password"
        />
      </label>

      <input type="submit" value="Register" />
    </form>

    <footer>
      <p>
        Already have an account?
        <router-link :to="{ name: 'login' }">Login</router-link>
      </p>
    </footer>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  height: 100vh;
  background-color: var(--primary);
  color: #fff;
}

header {
  padding: 1.5rem;
}

footer {
  background-color: #fff;
  width: 100%;
  color: var(--dark);
  text-align: center;
  padding: 1.5rem;
  padding-bottom: 3rem;
}

h2 {
  font-size: 2.125rem;
  margin-bottom: 1rem;
}

/* h2 and p are the same level */
h2 ~ p {
  font-weight: 500;
  font-size: 1rem;
}

form {
  /* scratch the whole page */
  flex: 1 1 0%;
  display: block;
  border-radius: 1.5rem 1.5rem 0 0;
  width: 100%;
  background-color: #fff;
  color: var(--dark);
  box-shadow: 0px -4px 12px 4px rgba(0, 0, 0, 0.16);
  padding: 4rem 1.5rem;
}

label {
  display: block;
  margin-bottom: 1.5rem;
}

label span {
  display: block;
  color: var(--gray);
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

/* except submit */
input:not([type="submit"]) {
  display: block;
  width: 100%;
  border: 1px solid var(--gray);
  border-radius: 0.5rem;
  padding: 1rem 1rem;
  font-size: 1.125rem;
  color: var(--dark);
  font-weight: 500;
  background-color: var(-light);
}

input:not([type="submit"])::placeholder {
  color: var(--gray);
  font-style: italic;
}

input[type="submit"] {
  display: block;
  width: fit-content;
  margin: 0 auto;
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  background-color: var(--primary);
  padding: 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: 0.2s ease;
}

input[type="submit"]:hover {
  background-color: var(--primary-dark);
}
</style>
