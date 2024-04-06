<script lang="ts">
	import Navbar from "../navbar.svelte";
	async function fetchData() {
    try {
        const response = await fetch('/src/routes/api/users/+server.ts');
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données');
        }
        const data = await response.json();
        console.log('Données récupérées:', data);
        // Utilisez les données récupérées comme bon vous semble
    } catch (error) {
        console.error('Erreur:', error);
    }
}

// Appelez la fonction pour récupérer les données
fetchData();
</script>

<Navbar />