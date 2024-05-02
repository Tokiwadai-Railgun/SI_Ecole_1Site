<script lang="ts">
	import { onMount } from "svelte";

    async function getData() {
        const response = await fetch("http://localhost:5173/api/users")
        const data = await response.json();
        return data;
    }

    let data: Array<object>;
    onMount(async() => {
        data = await getData();
    })
  let firstName = '';
  let lastName = '';
  let email = '';

  function handleSubmit() {
    // Here you can perform validation and submission logic
    console.log("First Name:", firstName);
    console.log("Last Name:", lastName);
    console.log("Email:", email);
  }

  let tabs = [
    {tabname: "Home", path:"/"},
    {tabname: "Devoirs", path:"/devoirs"},
    {tabname: "EDT", path:"/edt"},
    {tabname: "Notes", path:"/notes"},
    {tabname: "bulletin", path:"/bulletin"},

  ]
</script>
<ul>
  {#each tabs as tab}
    <li><a href={tab.path}>{tab.tabname}</a></li>

     <!-- content here -->
  {/each}

</ul>

<style>
  form {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f0f4f8;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  label {
    display: block;
    margin-bottom: 10px;
    color: #333;
  }

  input[type="text"],
  input[type="email"] {
    width: calc(100% - 20px);
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
    margin-bottom: 15px;
  }

  button {
    background-color: #6c5ce7;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #4834d4;
  }
</style>

<form on:submit|preventDefault={handleSubmit}>
  <label>
    First Name:
    <input type="text" bind:value={firstName} required />
  </label>
  <label>
    Last Name:
    <input type="text" bind:value={lastName} required />
  </label>
  <label>
    Email:
    <input type="email" bind:value={email} required />
  </label>
  <button type="submit">Submit</button>
</form>
{#if data != null}
    {#each data as user, i}
        <h3>User number : {i}</h3>
        <ul>
            <li>Name : {user.first_name} {user.last_name}</li>
            <li>Email : {user.email}</li>
            <li>Phone : {user.phone_number}</li>
        </ul>
        
    {/each}
{/if}
