<script>
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
