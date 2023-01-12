<script>
  import { onMount, createEventDispatcher } from 'svelte'  
  import { fade } from 'svelte/transition';
  import util from './mixinPrefs.js'

  const dispatch = createEventDispatcher();

  export let value
  export let label = ''
  export let placeholder = ''
  export let readOnly = false
  export let disabled = false
  export let flat = false
  export let filled = false
  export let prefix = false
  export let truncate = false
  export let uppercase = false
  export let width = null
  // export let margin = ''
  export let autoSelect = false
  export let autoFocus = false
  export let tooltip = ''
  export let type = 'text'
  export let prefsId = null

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
    if (prefsId) {
      util.setPrefsById(prefsId, value, 'input')
    }
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
  const blur = (evt) => {
    hasFocus = false
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

  ///// autofocust input
  function inputFocus(el){
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
</script>


<div 
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
        <span>{ prefix }</span>
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
          use:inputFocus
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
          on:keydown={ handleKeypress }
          />
          {/if}
      </div>
    </div>
  </div>

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
  height: 3px;
  top: -4px;
}
.input-container:not(.noLabel) {
  margin: 6px 0px 10px 0px;
}
.input-container {
  /* padding: 1px 4px; */
  /* width: calc(100% - 8px); */
  font-size: 12px;
  font-family: "Open Sans", sans-serif;
  color: var(--color-icon);
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
  background-color: var(--color-dropdown);
  border: 1px solid var(--color-dropdown-border);
  border-radius: 2px;
  margin: 0px;
  padding: 2px 0px 2px 6px;
  overflow: visible;
  background: transparent;
  outline: none;
  border: none !important;
  border-style: solid;
  width: 100%;
  color: var(--color-btn-pill-border);
  /* color: var(--color-input-text); */
  border-radius: 2px 2px 0px 0px;
}
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
  border: 1px solid var(--color-dropdown-border);
  border-radius: 3px;
}
.input-inside.active:not(.flat) {
  background: var(--color-input-focus);
  /* color: var(--color-input-text); */
}
/* .input-inside.filled.idle {
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
  transition: all 200ms var(--quad) 20ms;
  width: 100%;
  height: 1px;
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
} */

#tooltip {
  padding: 2px 4px;
  background-color: var(--tooltip-bg);
  color: var(--tooltip-color);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
  z-index: 1;
}

</style>