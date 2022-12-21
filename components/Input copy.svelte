<script>
  import { onMount, createEventDispatcher } from 'svelte'
  import { fade } from 'svelte/transition';
  import util from './mixinPrefs.js'
  import NumberSpinner from "svelte-number-spinner";    // https://www.npmjs.com/package/svelte-number-spinner/v/0.7.9

  const dispatch = createEventDispatcher();

  export let value
  export let label = false
  export let row = false
  export let readOnly = false
  export let disabled = false
  // export let flat = false
  // export let filled = false
  export let outline = false
  export let prefix = false
  export let suffix = false
  export let truncate = false
  export let uppercase = false
  export let width = null
  export let margin = ''
  export let autoSelect = false
  export let tooltip = ''
  export let type = 'text'
  export let prefsId = null
  export let placeholder = ''

  // number options
  export let min = 0
  export let max = 1000
  export let step = 1

  const numberOptions = {
    min,
    max,
    step,
  }

  onMount(() => {
    if (prefsId?.length) {
      util.checkLocalPrefs();
      let lastState = util.checkPrefsFor(prefsId, 'input');
      if (lastState !== null) {
        value = lastState.value;
          
        dispatch('change', value)
      }
    } else {
      value = value
    }
  })

  const changeValue = () => {
    // console.log('change');
    if (prefsId) {
      util.setPrefsById(prefsId, value, 'input')
    }
    dispatch('change', value)
  }

  $: hover = false
  let hasFocus
  $: active = hasFocus
  $: indicatorColor = hasFocus ? 'var(--color-selection)' : 'var(--color-default)'

  const focus = (evt) => {
    hasFocus = true

    if (autoSelect)
      evt.target.select()
    
  }
  const blur = () => {
    hasFocus = false
  }
  const onKeyPress = (e) => {
    if (e.charCode === 13) {
      dispatch('submit')
    } else {
      dispatch('change', value)
    }   
  }

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
</script>


<!-- <div 
  class="input-container"
  class:readOnly
  class:disabled
  style="width: {width}"
  use:popperRef
  >
  {#if label}
  <span class="input-label">{label}</span>
  {/if}


  <div class="input-wrapper" 
    class:flat class:filled 
    on:mouseenter={() => hover = true}
    on:mouseleave={() => hover = false}>
    <div class="input-contents" class:hover>
      <div class="input-inside" class:active class:filled class:flat>
        {#if prefix}
        <div>{ prefix }</div>
        {/if}

        {#if type == 'number'}
        <input 
          type="number"
          class="input-value" 
          bind:value={value}
          class:truncate
          class:uppercase
          class:active
          class:flat class:filled
          
          on:input={ changeValue }
          on:focus={ focus }
          on:blur={ blur }
          />
          {:else}
          <input 
          class="input-value" 
          bind:value={value}
          class:truncate
          class:uppercase
          class:active
          class:flat class:filled
          placeholder={ placeholder }

          on:input={ changeValue }
          on:focus={ focus }
          on:blur={ blur }
          on:keypress={ onKeyPress }
          />
          {/if}

          {#if suffix}
          <div>{ suffix }</div>
          {/if}
      </div>
    </div>
  </div>

  <div class="input-indicator-wrapper" >
    {#if !filled}
    <div
      class="input-indicator"
      class:hasFocus
      class:hover
      style="background: {indicatorColor}"
      />
    {/if}
  </div>
</div> -->

<div
class="input-container"
class:readOnly
class:disabled
class:outline
class:row
use:popperRef
>
{#if label}
<div class="input-label">{ label }</div>
{/if}

{#if prefix}
<span>{ prefix }</span>
{/if}

<div
  on:mouseenter={() => hover = true}
  on:mouseleave={() => hover = false}
>
  {#if type == 'number'}
    <NumberSpinner 
      bind:value 
      mainStyle={`width: ${ width }`}
      class="number-spinner-custom"
      options={ numberOptions }
      on:input={ changeValue }
      on:focus={ focus }
    />
  {:else}

  {/if}

{#if suffix}
<span>{ suffix }</span>
{/if}
</div>

</div>

{#if tooltip && hover}
  <div id="tooltip" in:fade="{{ duration: 100, delay: 400 }}" out:fade="{{duration: 100}}" class:hover use:popperContent={extraOpts}>
    {tooltip}
    <div id="arrow" data-popper-arrow />
  </div>
{/if}

<style>

:global(.number-spinner-custom) {
  display: inline-block;
  box-sizing: border-box;
  font-variant-numeric: tabular-nums;
  width: 60px;
  height: 16px;
  margin: 0px;
  padding: 3px;
  background: none;
  color: var(--default-color);
  border-radius: 0px;
  border: none;
  text-align: right;
  cursor: initial;
  font-size: 11px;
}
.outline :global(.number-spinner-custom) {
  background: var(--color-dropdown);
  border: 1px solid var(--color-input-border);
  height: 18px;
  border-radius: 2px;
}
/* when dragging */
:global(.number-spinner-custom):focus {
  outline:none;
}
:global(.number-spinner-custom.editing) {
  background-color: var(--color-input-focus) !important;
  color: var(--color-input);
  border: 1px solid var(--color-input-focus-border);
  border-radius: 2px;
  outline:none;
}
:global(.number-spinner-custom.dragging) {
  color: var(--color-input-focus-border);
  border-bottom: 1px solid #4892cb;
}
:global(.number-spinner-custom)::selection {
  background: rgba(72, 146, 203, 0.25);
}

.input-container.readOnly {
  pointer-events: none;
}
.input-container.pseudo {
  margin-bottom: 0px;
}
.input-contents.pseudo {
  cursor: pointer !important;
}
.noPointerEvents {
  pointer-events: none;
}
.input-container.disabled {
  opacity: 0.4;
  pointer-events: none;
}
.input-label {
  font-size: 10px;
  position: relative;
  text-align: left;
  width: max-content;
  /* height: 3px; */
  /* top: -4px; */
}
/* .input-container:not(.noLabel) {
  margin: 6px 0px 10px 0px;
} */
.input-container {
  /* padding: 1px 4px; */
  width: calc(100% - 8px);
  font-size: 10px;
  font-family: "Open Sans", sans-serif;
  color: var(--color-icon);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.input-container.row {
  flex-direction: row;
}
.input-wrapper {
  display: flex;
  justify-content: center;
  align-items: baseline;
  position: relative;
  flex-wrap: wrap;
  width: 100%;
}
.input-contents,
.input-inside {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: baseline;
}
.input-value.pseudo {
  cursor: pointer !important;
}
.input-value::selection {
  background-color: var(--highlight-bg);
  color: var(--highlight-text);
}
.truncate {
  white-space: nowrap;
  text-overflow: ellipsis;
}
.input-value {
  margin: 0px;
  padding: 2px 0px 2px 4px;
  overflow: visible;
  background: transparent;
  outline: none;
  border: none !important;
  border-style: solid;
  width: 100%;
  color: var(--color-input-text);
  border-radius: 2px 2px 0px 0px;
}
.uppercase {
  text-transform: uppercase;
}
.input-inside:hover:not(.active) {
  color: var(--default-color) !important;
}
.input-inside.active:not(.filled):not(.flat) {
  background: var(--color-input-focus);
  color: var(--color-input-text);
}
.input-inside.filled.idle {
  background: var(--color-input);
  border: 1.5px solid var(--color-input-border) !important;
  color: var(--color-input-text) !important;
}
.input-inside.filled.active {
  background: var(--color-input-focus);
  border: 1.5px solid var(--color-input-focus-border) !important;
  color: var(--color-input-focus-text) !important;
}
.input-value.active:not(.flat):not(.filled) {
  background: var(--color-input-focus);
  color: var(--color-input);
}
.input-contents,
.input-inside {
  border-radius: 3px;
  display: flex;
  align-items: baseline;
}
.input-error-message {
  padding: 4px;
}
.input-indicator {
  /* background: var(--color-selection); */
  transition: all 200ms var(--quad) 20ms;
  width: 100%;
  height: 1px;
  /* position: absolute;
	bottom: 0px; */
}
.input-indicator-wrapper {
  width: 100%;
  display: flex;
  overflow: visible;
  height: 3px;
  align-items: flex-start;
}
.flat,
.toolbar {
  background: transparent;
}
.flat .input-indicator.hasFocus,
.default .input-indicator {
  width: 100%;
}
.flat .input-indicator:not(.hasFocus) {
  width: 0%;
}
.input-append-outer-icon,
.input-prepend-outer-icon {
  padding: 0px 5px;
  margin: 2px 0px 0px 0px;
  height: 100%;
}
.input-prepend-icon {
  padding-left: 5px;
}
.input-append-icon {
  padding-right: 5px;
}

#tooltip {
  padding: 2px 4px;
  background-color: var(--tooltip-bg);
  color: var(--tooltip-color);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
  z-index: 1;
}

</style>