<script lang="ts">
<<<<<<< HEAD
    import Log from "./form.svelte";
</script>
<h1>Login page</h1>

<Log />
=======
    import Form from "./form.svelte";
    let name: string = "";
    async function getName() {
        const response = await fetch("/api/login")
        name = await response.json();
    }

    const list = [1, 2, 3 , 4 ,5];
</script>
<h1>Login page</h1>

<Form />

<button on:click={getName}>Update name</button>
<h1>{name}</h1>



<ul>
    {#each list as listElement}
        <li>{listElement}</li>
        
    {/each}
</ul>


>>>>>>> 7458ac5f93d4ccab6ea4cf6ff1010a88eb02c2f4
