<script>
    import { scaleLinear, scaleTime } from "d3-scale";
    import { max, extent } from "d3-array";
    import { utcParse } from "d3-time-format";
    import { fade } from "svelte/transition";

    import BarChartAxisY from "$lib/components/BarChartAxisY.svelte";
    import BarChartAxisX from "$lib/components/BarChartAxisX.svelte";
    import BarChartTooltip from "$lib/components/BarChartTooltip.svelte";

    export let width;
    export let data;
    let dailySteps = data[0];
    let sportTypes = data[1];

    let hoverSteps;
    let hoverSportTypes;
    let focused;

    let margins = {
        top: 50,
        right: 15,
        bottom: 50,
        left: 15
    };

    let height = 250;
    let innerHeight = height - margins.top - margins.bottom;
    $: innerWidth = width - margins.left - margins.right;

    let parseTime = utcParse("%Y-%m-%dT%H:%M:%S");
    let extentTime = extent(dailySteps, (d) => parseTime(d.ts));

    let activityDates = sportTypes.map((d) => d.ts);

    $: xScale = scaleTime()
        .domain(extentTime)
        .range([0, innerWidth - 10]);
    let yScale = scaleLinear()
        .domain([0, max(dailySteps.map(d => d.steps))])
        .range([innerHeight, 0]);
</script>

<div class="chart-container" role="img" on:mouseleave={() => { hoverSteps = null; focused = false; hoverSportTypes = null; }} on:mouseenter={() => { focused = true; }}>
    <svg class="fill-current stroke-current text-current" {width} {height}>
        <g class="inner-chart" transform="translate({margins.left} {margins.top})">
            {#each dailySteps as d}
                {#if activityDates.includes(d.ts)}
                <rect transition:fade={{ duration: 300 }}
                    role="img"
                    x={xScale(parseTime(d.ts))}
                    y={yScale(d.steps)}
                    height={innerHeight - yScale(d.steps)}
                    width={innerWidth / dailySteps.length}
                    opacity={hoverSteps ? (hoverSteps === d ? 1 : 0.75) : 1}
                    fill={focused ? "#fc4c02" : "#fc4c02"}
                    on:mouseover={() => { hoverSteps = d; hoverSportTypes = sportTypes.find((s) => s.ts === d.ts).sport_type ;}}
                    on:focus={() => { hoverSteps = d; }}
                />   
                {:else}
                    <rect
                        role="img"
                        x={xScale(parseTime(d.ts))}
                        y={yScale(d.steps)}
                        height={innerHeight - yScale(d.steps)}
                        width={innerWidth / dailySteps.length}
                        opacity={hoverSteps ? (hoverSteps === d ? 1 : 0.75) : 1}
                        on:mouseover={() => { hoverSteps = d; hoverSportTypes = null; }}
                        on:focus={() => { hoverSteps = d; }}
                    />
                {/if}
            {/each}
            <BarChartAxisX {xScale} height={innerHeight} />
            {#if focused}
                <BarChartAxisY {yScale} width={innerWidth} />
            {/if}
        </g>
    </svg>
    {#if hoverSteps}
        <BarChartTooltip steps={hoverSteps} sportTypes={hoverSportTypes} width={innerWidth} {xScale} {yScale} />
    {/if}
</div>

<style>
    .chart-container {
        position: relative;
    }
    rect {
        transition: opacity 300ms ease;
        }
</style>
