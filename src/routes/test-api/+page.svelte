<script lang="ts">
  async function testAddAPI() {
    const response = await fetch("http://localhost:5173/api/edt", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({courseId: 1, date: "2024-06-26"}),
    });

    console.log(response)

    if (!response.ok) console.log(response)
  }
</script>
<button on:click={testAddAPI}>Add course API</button>
 
