<!--
@component

### ButtonCombo

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
    import { onMount, createEventDispatcher } from 'svelte'
    import { openLinkInBrowser, } from "../lib/utils";
    import util from '../lib/mixinPrefs'

    const dispatch = createEventDispatcher();

    import Icon from './Icon.svelte';

    export let menu: {
      [key: string]: {
        icon: string,
        label: string,
        tooltip: string
      }
    } = {
    }
    export let active = 'paste'

    let activeItem = active

    let icon = menu[activeItem]?.icon || null

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
    export let goto = null
    export let mini = false
    export let center = false
    export let iconSize: null | string = '18px'
    export let height: null | string = null
    export let width: null | string = null
    export let prefsId: string | null = null

    let colorHover = (bg !== '')

    let longPress = false

    $: hover = false
    $: {
      icon = menu[active]?.icon || null
      activeItem = active
    }

    onMount(() => {
      if (prefsId?.length) {
        util.checkLocalPrefs();
        let lastState = util.checkPrefsFor(prefsId, 'radio');

        if (lastState === null) {
          activeItem = active
        } else {
          activeItem = lastState.value;
        }
      } else {
        activeItem = active
      }
    })

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

    const handleClick = (event: MouseEvent) => {
      const node = event.currentTarget as HTMLElement;

      const clickDuration = 300

      let start = Date.now();
      const timeout = setTimeout(() => {
        handleLongPress()
        return
      }, clickDuration);

      const cancel = () => {
        clearTimeout(timeout);
        node.removeEventListener('mouseup', cancel);

        if (Date.now() - start < clickDuration) {
          handleShortPress(event)
        }
      };

      node.addEventListener('mouseup', cancel);
    }
    const handleShortPress = (event: MouseEvent) => {
      console.log('short press');
      longPress = false
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
    const handleLongPress = () => {
      longPress = true
      console.log('long press');
    }



    function handleSwitch(key: string): any {
      activeItem = key
      longPress = false

      if (prefsId) {
        util.setPrefsById(prefsId, key, 'radio')
      }
      dispatch('change', key)
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
    on:mousedown={(event) => handleClick(event)}
    use:popperRef
>
    <div class="button-content" class:left>
        <!-- {#if icon} -->
         {#each Object.entries(menu) as [key, item]}
            {#if key === activeItem}
            <Icon name="{ item.icon }" size="{ iconSize }" />
            {/if}
          {/each}
        <!-- {/if} -->

        <!-- {#if label}
            <span class="label">
                { label }
            </span>
        {/if} -->
        <slot />
    </div>

    <div class="corner-arrow" />
</div>

{#if menu[activeItem].tooltip && hover}
  <div id="tooltip" in:fade="{{ duration: 100, delay: 400 }}" out:fade="{{duration: 100}}" class:hover use:popperContent={extraOpts}>
    { @html menu[activeItem].tooltip }
    <div id="arrow" data-popper-arrow />
  </div>
{/if}

{#if longPress}
  <div class="longpress">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="scrim" on:click={() => longPress = false} />
    <div class="menu">
      {#each Object.entries(menu) as [key, item]}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="menu-item" class:active={key === activeItem}
          on:click={() => handleSwitch(key)}
          on:mouseup={() => handleSwitch(key)}
        >
          <div class="check">
            {#if key === activeItem}
              <div class="mark" />
            {/if}
          </div>
          <Icon name={item.icon} size="17px" />
          <p>{ item.label }</p>
        </div>
      {/each}
    </div>
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
.button .corner-arrow {
  position: absolute;
  bottom: 1px;
  right: 1px;
  width: 0;
  height: 0;
  border-top: 3px solid transparent;
  border-left: 3px solid transparent;
  border-bottom: 3px solid var(--button-color);
  border-right: 3px solid var(--button-color);
  opacity: 0.7;
}
.button:hover {
    background: var(--button-hover);
}
.button:active {
    background: var(--button-active);
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

.longpress {
  margin-left: -4px;
}
.longpress .scrim {
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  /* background: rgba(0, 0, 0, 0.5); */
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}
.longpress .menu {
  position: fixed;
  background: var(--color-bg);
  border: 1px solid rgba(160, 160, 160, 0.1);
  color: var(--button-color);
  z-index: 20;
  /* drop shadow */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.4);
}
.longpress .menu-item {
  display: flex;
  justify-content: start;
  gap: 6px;
  align-items: center;
  padding: 4px 12px 4px 2px;
}
.longpress .menu-item:hover {
  background: rgba(160, 160, 160, 0.2);
}
.longpress .menu-item .check {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.longpress .menu-item p {
  margin: 0;
}
.longpress .menu-item.active {
  background: rgba(160, 160, 160, 0.1);
}
.longpress .menu-item.active .mark {
  background: var(--button-color);
  border-radius: 20px;
  width: 6px;
  height: 6px;
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
