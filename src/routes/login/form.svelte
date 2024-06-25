<script lang="ts">
  import { page } from "$app/stores"
	import { goto } from "$app/navigation";

  let username = "";
  let password = "";
  async function submitHandler() {
      const response = await fetch("/api/login", {
          method: "POST",
          headers: {
              'Content-Type': 'application/json'
          },

          body: JSON.stringify({ "username": username, "password": password})
      })

      if (response.ok) {
        const responseBody = await response.json()
        document.cookie = "accessToken="+responseBody+";";
        await goto("/tableau-de-bord")
      }
  }
</script>

<form on:submit|preventDefault={submitHandler}>
    <input type="text" placeholder="username" bind:value={username} name="username" required>
    <input type="password" placeholder="password" bind:value={password} name="password" required>
    <button type="submit">Submit</button>

  <pre>{JSON.stringify($page.params, null, 2)}</pre>
</form>
