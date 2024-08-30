<!--
@component

### Input

@props
- `value` - Input value
- `label` - Input label
- `placeholder` - Input placeholder
- `inputFirst` - Label before input
- `readOnly` - Make the input read only
- `disabled` - Disable the input
- `flat` - Make the input flat
- `filled` - Make the input filled
- `prefix` - Input prefix
- `suffix` - Input suffix
- `truncate` - Truncate the input text
- `uppercase` - Uppercase the input text
- `totalWdth` - Total width of the input
- `width` - Width of the input
- `autoSelect` - Auto select the input text
- `autoFocus` - Auto focus the input
- `tooltip` - Input tooltip
- `type` - Input type
- `prefsId` - Local storage ID to save the input state

 -->
<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte'
  import { fade } from 'svelte/transition';
  import util from '../lib/mixinPrefs.js'

  import NumberSpinner from './NumberSpinner.svelte';

  const dispatch = createEventDispatcher();

  export let value
  export let label = ''
  export let placeholder = ''
  export let inputFirst = false
  export let readOnly = false
  export let disabled = false
  export let flat = false
  export let filled = false
  export let prefix: string|boolean = false
  export let suffix: string|boolean = false
  export let truncate = false
  export let uppercase = false
  export let totalWdth = null
  export let width: string|null = null
  // export let margin = ''
  export let autoSelect = false
  export let autoFocus = false
  export let tooltip = ''
  export let type = 'text'
  export let prefsId: string|null = null

  onMount(() => {
    if (prefsId?.length) {
      util.checkLocalPrefs();
      let lastState = util.checkPrefsFor(prefsId, 'input');
      if (lastState !== null) {
        value = lastState.value;
      }
    } else {
      value = value
    }
  })

  const changeValue = (evt) => {
    // console.log('change', evt);
    if (prefsId) {
      util.setPrefsById(prefsId, value, 'input')
    }
    dispatch('change', value)
  }

  $: hover = false
  let hasFocus
  $: active = hasFocus
  $: indicatorColor = hasFocus ? 'var(--text-accent)' : 'var(--color-default)'

  const focus = (evt) => {
    hasFocus = true

    if (autoSelect && type == 'text') {
      evt.target.selectionStart = 0
      evt.target.selectionEnd = 0
      evt.target.select()
    }
  }
  const focusNumber = (evt) => {
    // console.log(evt);
    hasFocus = true
    // console.log('focusNumber', evt);
    // if (autoSelect && type == 'text') {
    //   evt.target.selectionStart = 0
    //   evt.target.selectionEnd = 0
      // evt.target.select()
    // }
  }
  const blur = (evt) => {
    hasFocus = false
  }
  const numberBlur = (evt) => {
    hasFocus = false
    dispatch('change', value)
  }
  const handleKeypress = (evt) => {
    if (evt.key == 'Enter') {
      dispatch('submit')
    }
    if (evt.key == 'Escape') {
      console.log('esc');
      dispatch('cancel')
    }
  }


  ///// autofocus input
  function inputFocus(el){
    // console.log('input focus');
    if (autoFocus) {
      el.focus()
      hasFocus = true

      if (autoSelect)
        el.select()
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

  // number options
  export let min = 0
  export let max = 1000
  export let step = 1
  export let decimals = 0

  const numberOptions = {
    min,
    max,
    step,
    decimals,
  }
</script>


<div
  class="input-container"
  class:disabled
  class:inputFirst
  style="width: { totalWdth }"
  on:click={() => { if (!disabled) dispatch('click') }}
  use:popperRef
  >
  {#if label && !inputFirst}
  <span class="input-label">{ label }</span>
  {/if}

  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="input-wrapper"
    class:flat class:filled class:readOnly
    style="width: { width }"
    on:mouseenter={() => hover = true}
    on:mouseleave={() => hover = false}>
    <div class="input-contents" class:hover>
      {#if prefix}
      <span class="input-label suffix">{ prefix }</span>
      {/if}
      <div class="input-inside"
        class:spinner={type == 'number'}
        class:active
        class:filled
        class:flat
        >

        {#if type == 'number'}
        <!-- <input
          type="number"
          class="input-value"
          bind:value={value}
          class:truncate
          class:uppercase
          class:active
          class:flat class:filled

          on:change={ changeValue }
          on:focus={ focus }
          on:blur={ blur }
          /> -->
          <!-- mainStyle={`width: ${ width }`} -->
          <NumberSpinner
            class="spinner-input"
            bind:value
            options={ numberOptions }
            on:focus={ focusNumber }
            on:blur={ numberBlur }
            on:dragend={ numberBlur }
            />
            <!-- on:input={ changeValue } -->
        {:else}
        <input
        use:inputFocus
          class="input-value"
          bind:value={value}
          class:truncate
          class:uppercase
          class:active
          class:flat
          class:filled
          placeholder={ placeholder }

          on:input={ changeValue }
          on:focus={ focus }
          on:blur={ blur }
          on:keydown={ handleKeypress }
          />
          {/if}

        </div>

        {#if suffix}
        <span class="input-label suffix">{ suffix }</span>
        {/if}
    </div>
  </div>

  {#if label && inputFirst}
  <span class="input-label">{ label }</span>
  {/if}
  <!-- <div class="input-indicator-wrapper" >
    {#if !filled}
    <div
      class="input-indicator"
      class:hasFocus
      class:hover
      style="background: {indicatorColor}"
      />
    {/if}
  </div> -->
  <!-- <div v-if="error" class="input-error-message">{{ error }}</div> -->
</div>

{#if tooltip && hover}
  <div id="tooltip" in:fade="{{ duration: 100, delay: 400 }}" out:fade="{{duration: 100}}" class:hover use:popperContent={extraOpts}>
    {tooltip}
    <div id="arrow" data-popper-arrow />
  </div>
{/if}

<style>

:root {
  --text-accent: #5fa5ef;
  /* --text-accent: white; */
}
.input-container {
  /* padding: 1px 4px; */
  /* width: calc(100% - 8px); */
  font-size: 12px;
  font-family: "Open Sans", sans-serif;
  color: var(--color-icon);
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
}
.readOnly {
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
  height: auto;
  text-align: left;
  /* top: -4px; */
}
.suffix {
  padding: 0 3px;
}
.input-container:not(.noLabel) {
  /* margin: 6px 0px 10px 0px; */
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
  align-items: center;
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
.input-value, :global(.spinner-input) {
  background-color: var(--color-dropdown);
  border: 1px solid var(--color-dropdown-border);
  /* border-color: salmon; */
  border-radius: 2px;
  margin: 0px;
  padding: 2px 0px 2px 6px;
  overflow: visible;
  background: transparent;
  outline: none;
  /* border: none !important; */
  border-style: solid;
  width: 100%;
  color: var(--color-btn-pill-border);
  font-size: 12px;
  /* color: var(--color-input-text); */
  /* border-radius: 2px 2px 0px 0px; */
}
/* .input-value:focus, :global(.spinner-input:focus) { */
.input-value:focus {
  color: var(--color-input-focus-text);
}
.uppercase {
  text-transform: uppercase;
}
.input-inside:hover:not(.active) {
  color: var(--default-color) !important;
}
.input-inside {
  background: var(--color-dropdown);
  /* border: 1px solid var(--color-dropdown-border); */
  border-radius: 2px;
}
.input-inside.active:not(.flat):not(.spinner) {
  background: var(--color-input-focus);
  /* color: var(--color-input-text); */
  border-radius: 3px;
}
.flat {
  border-color: transparent;
  background: transparent;
}

:global(.spinner-input) {
  display: inline-block;
  box-sizing: border-box;
  font-variant-numeric: tabular-nums;
  /* background-color: var(--color-dropdown);
  color: var(--color-btn-pill-border); */
  width: 100%;
  height: 1.6em;
  margin: 0px;
  padding: 0.25em;
  padding-bottom: 0.1em;
  /* border: 0.075em solid #0004; */
  /* border-radius: 0.15em; */
  text-align: center;
  vertical-align: baseline;
  cursor: ew-resize;
  /* border-bottom: 1px solid transparent; */
}

/* input is active after dragging and may still be edited with arrows */
:global(.spinner-input:focus) {
  outline: none; /* removes the standard focus border */
  background-color: transparent !important;
  /* background: skyblue !important; */
  color: var(--text-accent);
}

:global(.spinner-input.fast) {
  border-top-width: 0.15em;
  padding-top: 0.175em;
}

:global(.spinner-input.slow) {
  border-bottom-width: 0.15em;
  padding-bottom: 0.175em;
}

/* currently dragging */
:global(.spinner-input.dragging) {
  /* border-color: #04c; */
  background-color: transparent !important;
  /* background: var(--color-bg) !important; */
  color: var(--text-accent);
  border-bottom: var(--text-accent) solid 1px !important;
}

/* clicked into the input to type */
:global(.spinner-input.editing) {
  background: var(--color-input-focus) !important;
  /* background: salmon !important; */
  color: var(--highlight-text);
  border-radius: 2px;
  cursor: initial;
}

#tooltip {
  padding: 2px 4px;
  background-color: var(--tooltip-bg);
  color: var(--tooltip-color);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
  z-index: 1;
}

</style>
