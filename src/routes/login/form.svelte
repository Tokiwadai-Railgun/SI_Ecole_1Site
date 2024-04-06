<script>
    let username = "";
    let password = "";
    async function submitHandler(event) {
        const formData = await event.request.formData();
    }
</script>

<form action="" on:submit={submitHandler}>
    <input type="text" placeholder="username" bind:value={username}>
    <input type="password" placeholder="password" bind:value={password}>
    <button type="submit">Submit</button>
</form>
