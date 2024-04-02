<script>
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