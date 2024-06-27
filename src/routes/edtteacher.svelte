<script>
    export let filteredCourses = [];
    export let currentDate;

    const cours1 = (filteredCourses.length > 0 && filteredCourses.find(course => course.period === 'matin')?.cours) || "Pas de cours";
    const cours2 = (filteredCourses.length > 0 && filteredCourses.find(course => course.period === 'midi')?.cours) || "Pas de cours";
    const classe1 = (filteredCourses.length > 0 && filteredCourses.find(course => course.period === 'matin')?.className) || "Pas de classe";
    const classe2 = (filteredCourses.length > 0 && filteredCourses.find(course => course.period === 'midi')?.className) || "Pas de classe";
</script>

<div class="calendar">
    <h2>Date du jour: {currentDate.toDateString()}</h2>
    <div class="period">
        <p class="heading">Matin</p>
        <p>{cours1}</p>
        <p>{classe1}</p>
    </div>
    <div class="period">
        <p class="heading">Après-midi</p>
        <p>{cours2}</p>
        <p>{classe2}</p>
    </div>
</div>
