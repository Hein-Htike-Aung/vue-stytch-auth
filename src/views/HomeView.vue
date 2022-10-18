<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const logout = async () => {
  const res = await fetch("http://localhost:3333/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      session_token: localStorage.getItem("token"),
    }),
  }).then((res) => res.json());

  if (res.success) {
    localStorage.removeItem("token");
    router.push({ name: "login" });
  } else {
    alert(res.message);
  }
};
</script>

<template>
  <main>
    <h2>Hello</h2>

    <button @click="logout">Logout</button>
  </main>
</template>

<style scoped>
main {
  padding: 1.5rem;
}

h1 {
  margin-bottom: 1rem;
}
</style>
