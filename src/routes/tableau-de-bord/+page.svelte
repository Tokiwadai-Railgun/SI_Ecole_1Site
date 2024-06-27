<svelte:head>
    <link rel="stylesheet" type="text/css" href="/dashboard.css">
</svelte:head>
<script lang="ts">
    export let data;
	import Navbar from "$lib/modules/navbar.svelte";
// 	async function fetchData() {
//     try {
//         const response = await fetch('/src/routes/api/users/+server.ts');
//         if (!response.ok) {
//             throw new Error('Erreur lors de la récupération des données');
//         }
//         const data = await response.json();
//         console.log('Données récupérées:', data);
//         // Utilisez les données récupérées comme bon vous semble
//     } catch (error) {
//         console.error('Erreur:', error);
//     }
// }

// Appelez la fonction pour récupérer les données
// fetchData();


</script>
<div class="global-section">
    <Navbar />
    <main>
        <h1>Bienvenue sur le tableau de bord {data.first_name}</h1>
        <div class="widget-cont">
            <div>Cour du jour</div>
            <div>Devoir</div>
            <div>Note Récente</div>
            <div>Information</div>
        </div>
    </main>
</div>
