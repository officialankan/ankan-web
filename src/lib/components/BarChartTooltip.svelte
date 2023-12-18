<script>
    import { fly } from "svelte/transition";
    import { utcParse } from "d3-time-format";
    export let data;
    export let xScale;
    export let yScale;
    export let width;

    let parseTime = utcParse("%Y-%m-%dT%H:%M:%S");
    let tooltipWidth;

    $: x = xScale(parseTime(data.ts));
    $: y = yScale(data.steps);
    $: formattedDate = new Date(data.ts).toLocaleDateString();
    $: xPosition = x + tooltipWidth > width ? x - tooltipWidth : x;
</script>

<div class="tooltip bg-gray-700 text-white text-s rounded py-1 px-2 shadow-md" 
     style="position: absolute; left: {xPosition}px; top: {y}px;" 
     transition:fly|global bind:clientWidth={tooltipWidth}>
    <span>{formattedDate}: <strong>{data.steps.toLocaleString()}</strong> steps</span>
</div>
<style>
    .tooltip {
        pointer-events: cursor;
        transition: top 300ms ease, left 300ms ease;
    }
</style>