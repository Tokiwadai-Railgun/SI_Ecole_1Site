<script lang="ts">
  async function testAddAPI() {
    const response = await fetch("http://localhost:5173/api/homeworks", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({title: "testHomework", endDate: "2024-06-26", description: "JustATestHomework", classId: 1}),
    });

    console.log(response)

    if (!response.ok) console.log(response)
  }
</script>
<button on:click={testAddAPI}>Add course API</button>
 
