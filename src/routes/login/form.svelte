<script>
<<<<<<< HEAD
    async function submitHandler(event) {
        const formData = await event.request.formData();
    }
    export let name ="";
</script>

<form action="" on:submit={submitHandler}>
    <input type="text" placeholder="username" bind:value={name}>
    <input type="password" placeholder="password">
    <button type="submit">submit</button>
</form>
=======
    export let username = "";
    export let password = "";

    export async function submitHandler() {
        const response = await fetch("/api/login") 

        console.log("Username : " + username)
        console.log("Password : " + password)
    }
</script>

<form action="" on:submit={submitHandler}>
    <input type="text" placeholder="username" bind:value={username}>
    <input type="password" placeholder="password" bind:value={password}>
    <button type="submit">Submit</button>
</form>
>>>>>>> 7458ac5f93d4ccab6ea4cf6ff1010a88eb02c2f4
