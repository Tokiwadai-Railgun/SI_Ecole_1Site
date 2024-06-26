<script lang="ts">
  async function testAddAPI() {
    const response = await fetch("http://localhost:5173/api/edt?userId=1");
    console.log(response)

    if (!response.ok) console.log(response)
  }
</script>
<button on:click={testAddAPI}>Add course API</button>
 
