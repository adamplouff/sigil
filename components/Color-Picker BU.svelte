<script>
    import { createEventDispatcher } from 'svelte'
    import { fade } from 'svelte/transition';

    import ColorPicker from 'svelte-awesome-color-picker';
	let rgb; // or hsv or hex

    const dispatch = createEventDispatcher();

    export let color = ''
    export let label = ''
    // export let tooltip = ''

    $: isOpen = false

    import { createPopperActions } from 'svelte-popperjs';
    const [popperRef, popperContent] = createPopperActions({
        placement: 'bottom',
        strategy: 'fixed',
        applyStyles: true,
    });
    const extraOpts = {
        modifiers: [
            { name: 
                'offset', 
                options: { 
                    offset: [0, 4] ,
                } 
            }
        ],
    }

    const closeModal = () => {
        // dispatch('close')
        isOpen = false
    }
</script>

{#if isOpen}
<div class="scrim" on:click={ closeModal } in:fade={{duration:60}} out:fade={{duration:40}} />
{/if}

<!-- { isOpen } -->

<div on:click={ () => isOpen = true }>
    <ColorPicker 
        bind:rgb 
        label={ label } 
        hex={ color }
        isAlpha={ false } 
        canChangeMode={ false } 
    />
</div>

<!-- <div class="container" 
    on:mouseenter={ () => hover = true }
    on:mouseleave={ () => hover = false }
    on:click={ () => dispatch('click') }
>
    <div class="swatch">
        <div class="swatch-color" 
        style="background: {color}"/>
    </div>
    <span class="label">
        {label}
    </span>
</div>

{#if tooltip && hover}
  <div id="tooltip" in:fade="{{ duration: 100, delay: 400 }}" out:fade="{{duration: 100}}" class:hover use:popperContent={extraOpts}>
    {tooltip}
    <div id="arrow" data-popper-arrow />
  </div>
{/if} -->



<style>
.container {
    display: flex;
    width: 100%;
    align-items: center;
    gap: 6px;
    position: relative;
}
.swatch {
    width: 22px;
    height: 18px;
    border: 1px solid var(--color-btn-border);
}
.swatch-color {
    /* background: skyblue; */
    width: calc(100% - 2px);
    height: calc(100% - 2px);
    margin: 1px;
}
#tooltip {
    padding: 2px 4px;
    background-color: var(--tooltip-bg);
    color: var(--tooltip-color);
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
    z-index: 1;
    position: absolute;
    margin-top: 24px;
}
.scrim {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
}
:global(.color-picker) {
    margin-right: 8px;
}
:global(.color-picker>label) {
    margin: auto 0;
    border-radius: 0;
    background: none;
}
:global(.color-picker>label>div) {
    margin: auto 0;
    border-radius: 0;
    background: none;
    border: 1px solid purple;
    /* border: 1px solid var(--color-btn-border); */

    width: 22px;
    height: 18px;
    border: 1px solid var(--color-btn-border);
}
:global(.color-picker>label>div>input[type="color"]) {
    outline: none;
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;

    width: calc(100% - 2px);
    height: calc(100% - 2px);
    margin: 1px;
}

:global(::-webkit-color-swatch-wrapper) {
  padding: 0;
}

:global(::-webkit-color-swatch) {
  border: 0;
  border-radius: 0;
}

:global(::-moz-color-swatch,
::-moz-focus-inner) {
  border: 0;
}

:global(::-moz-focus-inner) {
  padding: 0;
}


:global(.color-picker>.wrapper) {
    background-color: var(--color-btn-icon-hover-border);
}

</style>