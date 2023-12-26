<script>
    import { scaleLinear, scaleTime } from "d3-scale";
    import { max, extent } from "d3-array";
    import { utcParse } from "d3-time-format";
    import { ProgressBar } from '@skeletonlabs/skeleton';

    import BarChartAxisY from "$lib/components/BarChartAxisY.svelte";
    import BarChartAxisX from "$lib/components/BarChartAxisX.svelte";
    import BarChartTooltip from "$lib/components/BarChartTooltip.svelte";

    export let width;
    export let data;

    let hoverData;
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
    let extentTime = extent(data, (d) => parseTime(d.ts));

    $: xScale = scaleTime()
        .domain(extentTime)
        .range([0, innerWidth - 10]);
    let yScale = scaleLinear()
        .domain([0, max(data.map(d => d.steps))])
        .range([innerHeight, 0]);

</script>

<div class="chart-container" role="img" on:mouseleave={() => { hoverData = null; focused = false; }} on:mouseenter={() => { focused = true; }}>
    <svg class="fill-current stroke-current text-current" {width} {height}>
        <g class="inner-chart" transform="translate({margins.left} {margins.top})">
            {#each data as d}
                <rect
                    role="img"
                    x={xScale(parseTime(d.ts))}
                    y={yScale(d.steps)}
                    height={innerHeight - yScale(d.steps)}
                    width={innerWidth / data.length}
                    opacity={hoverData ? (hoverData === d ? 1 : 0.75) : 1}
                    on:mouseover={() => { hoverData = d; }}
                    on:focus={() => { hoverData = d; }}
                />
            {/each}
            <BarChartAxisX {xScale} height={innerHeight} />
            {#if focused}
                <BarChartAxisY {yScale} width={innerWidth} />
            {/if}
        </g>
    </svg>
    {#if hoverData}
        <BarChartTooltip data={hoverData} width={innerWidth} {xScale} {yScale} />
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
