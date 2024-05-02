<script lang="ts">
	import { redirect } from "@sveltejs/kit";

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
            throw redirect(303, "/")
        }
    }
</script>

<form on:submit={submitHandler}>
    <input type="text" placeholder="username" bind:value={username} name="username" required>
    <input type="password" placeholder="password" bind:value={password} name="password" required>
    <button type="submit">Submit</button>
</form>
