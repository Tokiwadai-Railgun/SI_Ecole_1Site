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
</script>

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
