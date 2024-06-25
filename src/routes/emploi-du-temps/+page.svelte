<svelte:head>
    <link rel="stylesheet" type="text/css" href="/edt.css">
</svelte:head>
<script lang="ts">
	import Navbar from "../navbar.svelte";
    import Edtteacher from "../edtteacher.svelte";
    import Edtstudent from "../edtstudent.svelte";
    
    export let data;
    let pageContent;

    if (data.role === "teacher"){
        pageContent = Edtteacher;
    }else if(data.role === "student"){
        pageContent = Edtstudent;
    }
</script>
<div class="global-section">
    <Navbar />
    <main>
        <h1>Emploi du temps</h1>
        <div class="widget-cont">
            {#if pageContent}
                <svelte:component this={pageContent} />
            {/if}
        </div>
    </main>
</div>