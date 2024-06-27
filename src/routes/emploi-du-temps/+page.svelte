<svelte:head>
    <link rel="stylesheet" type="text/css" href="/edt.css">
</svelte:head>

<script lang="ts">
    import Navbar from "../navbar.svelte";
    import Edtteacher from "../edtteacher.svelte";
    import Edtstudent from "../edtstudent.svelte";
    
    export let data;
    let pageContent;
    let currentDate = new Date();
    let currentDayIndex = 0;

    // Déterminez quel composant utiliser en fonction du rôle
    if (data.role === "teacher") {
        pageContent = Edtteacher;
    } else if (data.role === "student") {
        pageContent = Edtstudent;
    }

    const nextDay = () => {
        if (currentDayIndex < 6) {
            currentDayIndex++;
            currentDate.setDate(currentDate.getDate() + 1);
        }
    };

    const prevDay = () => {
        if (currentDayIndex > 0) {
            currentDayIndex--;
            currentDate.setDate(currentDate.getDate() - 1);
        }
    };

    $: filteredCourses = data.edt.filter(course => new Date(course.date).toISOString().split('T')[0] === currentDate.toISOString().split('T')[0]);

    console.log(data);
</script>

<div class="global-section">
    <Navbar />
    <main>
        <h1>Emploi du temps</h1>
        <div class="widget-cont">
            <div class="navigation-buttons">
                <button on:click={prevDay} disabled={currentDayIndex === 0}>Jour précédent</button>
                <button on:click={nextDay} disabled={currentDayIndex === 6}>Jour suivant</button>
            </div>
            {#if pageContent}
                <svelte:component this={pageContent}
                    {filteredCourses}
                    {currentDate} 
                />
            {/if}
        </div>
    </main>
</div>
