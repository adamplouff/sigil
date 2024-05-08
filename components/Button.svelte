<!-- 
@component

### Button

@props
- `uppercase` - Uppercase the button text
- `block` - Make the button fill the width of its container
- `tall` - Make the button taller
- `left` - Align the button text to the left
- `right` - Align the button text to the right
- `primary` - Make the button primary
- `flat` - Make the button flat
- `filled` - Make the button filled
- `disabled` - Disable the button
- `nonclickable` - Make the button non-clickable
- `toolbar` - Make the button a toolbar button
- `bg` - Set the background color of the button
- `color` - Set the text color of the button
- `label` - Set the button text
- `tooltip` - Set the button tooltip
- `goto` - Set the button link
- `mini` - Make the button mini
- `center` - Center the button text
- `icon` - Set the button icon
- `iconSize` - Set the button icon size
- `height` - Set the button height
- `width` - Set the button width

#### Events
- `normalClick` - Click event
- `shiftClick` - Shift click event
- `altClick` - Alt click event
- `altShiftClick` - Alt + Shift click event

 -->

<script lang="ts">
    import { fade } from 'svelte/transition';
    import { createEventDispatcher } from 'svelte'
    import { openLinkInBrowser, } from "../lib/utils";

    const dispatch = createEventDispatcher();

    import Icon from './Icon.svelte';

    export let uppercase = false
    export let block = false
    export let tall = false
    export let left = false
    export let right = false
    export let primary = false
    export let outline = false
    export let flat = false
    export let filled = false
    export let disabled = false
    export let nonclickable = false
    export let toolbar = false
    export let bg = ''
    export let color = ''
    export let label = ''
    export let tooltip = ''
    export let goto = null
    export let mini = false
    export let center = false
    export let icon = ''
    export let iconSize: null | string = '18px'
    export let height: null | string = null
    export let width: null | string = null

    let colorHover = (bg !== '')

    $: hover = false

    import { createPopperActions } from 'svelte-popperjs';
    import { preprocess } from 'svelte/compiler';
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

    const handleClick = (event) => {
        if (goto) {
            openLinkInBrowser(goto)
        } else if (event.shiftKey) {
            dispatch('shiftClick')
        } else if (event.altKey) {
            dispatch('altClick')
        } else if (event.altKey && event.shiftKey) {
            dispatch('altShiftClick')
        } else {
            dispatch('normalClick')
        }
    }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div 
    class="button" 
    on:click
    class:uppercase
    class:block
    class:tall 
    class:right
    class:primary
    class:flat
    class:filled
    class:disabled
    class:nonclickable
    class:colorHover
    class:toolbar
    class:mini
    class:center
    class:outline
    class:icon-button={!label && icon}
    style={`background-color: ${bg}; color: ${color}; height: ${height}; width: ${width}; padding: ${!(width || height) ? '6px' : ''}`}
    on:mouseenter={() => hover = true}
    on:mouseleave={() => hover = false}
    on:click={ (event) => handleClick(event) }
    use:popperRef
>
    <div class="button-content" class:left>
        {#if icon}
            <Icon name="{ icon }" size="{ iconSize }" />
        {/if}

        {#if label}
            <span class="label">
                { label }
            </span>
        {/if}
        <slot />
    </div>
</div>

{#if tooltip && hover}
  <div id="tooltip" in:fade="{{ duration: 100, delay: 400 }}" out:fade="{{duration: 100}}" class:hover use:popperContent={extraOpts}>
    { @html tooltip }
    <div id="arrow" data-popper-arrow />
  </div>
{/if}



<style>
.button {
    position: relative;
    background: var(--button);
    color: var(--button-color);
    border: 1px solid transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 2px;
    white-space: nowrap;
    gap: 8px;
    max-width: -webkit-fill-available;
}
.button:hover {
    background: var(--button-hover);
}
.button-content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.button-content .label {
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 100%;
}
.uppercase {
    text-transform: uppercase;
}
.block {
    width: 100%;
    margin-right: 0;
}
.tall {
    height: 26px;
}
.left {
    justify-content: flex-start;
}
.right {
    justify-content: flex-end;
}
.primary {
    background: rgba(160, 160, 160, 0.3);
    /* border-color: var(--button-primary-border); */
    border-color: rgba(160, 160, 160, 0.5);
}
.primary:hover {
    background: rgba(160, 160, 160, 0.4);
}
.outline {
    background: transparent;
    border-color: rgba(160, 160, 160, 0.2);
}
.flat,
.toolbar {
    background: transparent;
}
.flat:hover,
.toolbar:hover {
    background: var(--button-flat-hover);
    border-color: var(--button-flat-hover-border);
}
.colorHover {
    opacity: 0.95;
}
.colorHover:hover {
    opacity: 1;
    border-color: rgba(255, 255, 255, 0.25);
}
.flat:active,
.toolbar:active {
    background: var(--button-flat-active);
    border-color: var(--button-flat-active-border);
}
.filled {
    background: var(--button-filled);
}
.filled:hover {
    background: var(--button-filled);
    border-color: var(--button-filled-hover-border);
}
.filled:active,
.filled.active {
    color: var(--color-bg);
    background: var(--button-filled-active);
}
.button.toolbar {
    width: 34px;
    height: 34px;
    margin: 0;
}
.button :global(*) {
    margin-bottom: 0 !important;
}
.button.toolbar :global(svg) {
    margin: auto;
    min-width: 22px;
    width: 22px;
    height: 22px;
}
.button:not(.custom) :global(svg) {
    min-width: 16px;
    width: 16px;
    height: 16px;
    /* margin-top: -1px;
    margin-bottom: -1px !important; */
    fill: var(--color-icon);
}
.button.custom :global(svg) {
    /* min-width: 24px; */
    width: 24px;
    height: 24px;
    margin-top: -1px;
    margin-bottom: -1px;
}
.disabled {
    opacity: 0.4;
    pointer-events: none;
}
.nonclickable {
    pointer-events: none;
}
.icon-button:not(.mini) {
    min-width: 32px;
}
.mini {
    width: fit-content;
    padding: 0 !important;
    height: 14px;
    width: 14px;
    margin: auto 0;
}
.center {
    margin: auto;
}
</style>