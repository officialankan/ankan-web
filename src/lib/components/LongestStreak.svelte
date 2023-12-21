<script>
    import { RangeSlider, ProgressRadial } from '@skeletonlabs/skeleton';
    let threshold = 10000;
    
    $: streak = (async function getStreak(threshold) {
        const url = `api/streak/?threshold=${threshold}`; 
        const res = await fetch(url);
        console.log(url);
        const data = await res.json();
        return data;
    })(threshold)
</script>


<div class="grid grid-cols-2 gap-4">
    <div class="px-2 text-center">
        <h4 class="h4">check out my streaks by adjusting the slider!</h4>
    </div>
    <div class="px-2">
        <RangeSlider name="range-slider" bind:value={threshold} min={10000} max={40000} step={1000} />
        {#await streak}
            <ProgressRadial width="w-6"/>
        {:then longestStreak} 
            <p>my longest streak with {threshold} steps is <strong>{longestStreak} {longestStreak == 1 ? "day" : "days"}!</strong></p>
        {:catch error}
        <p>{error.message}</p>
        {/await}
    </div>
</div>
