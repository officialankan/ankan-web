<script>
    import { fly } from "svelte/transition";
    import { utcParse } from "d3-time-format";
    export let steps;
    export let sportTypes;
    export let xScale;
    export let yScale;
    export let width;

    let parseTime = utcParse("%Y-%m-%dT%H:%M:%S");
    let tooltipWidth;

    $: x = xScale(parseTime(steps.ts));
    $: y = yScale(steps.steps);
    $: formattedDate = new Date(steps.ts).toLocaleDateString();
    $: xPosition = x + tooltipWidth > width ? x - tooltipWidth : x;
    $: console.log(sportTypes);
</script>

<div class="tooltip bg-gray-700 text-white text-s rounded py-1 px-2 shadow-md" 
     style="position: absolute; left: {xPosition}px; top: {y}px;" 
     transition:fly bind:clientWidth={tooltipWidth}>
    <span>
        {formattedDate}: <strong>{steps.steps.toLocaleString()}</strong> steps
        {#if sportTypes}
            + {sportTypes.join(", ")}
        {/if}
    </span>
</div>
<style>
    .tooltip {
        pointer-events: cursor;
        transition: top 300ms ease, left 300ms ease;
    }
</style>