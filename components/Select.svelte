<script>
  import { onMount, createEventDispatcher } from 'svelte'  
  import util from './mixinPrefs.js'
  export let items = [
    'one', 'two', 'three'
  ]
  export let label = ''
  export let active = 0
  export let width = 100
  export let prefsId = null

  const dispatch = createEventDispatcher();

  $: open = false
  $: activeIndex = 0
  $: menuHeight = 0
  $: scrimTop = 0

  const makeActive = (item, i) => {
    if (activeIndex != i)
      dispatch('change', { index: i, text: items[i] })

    activeIndex = i

    if (prefsId) {
      util.setPrefsById(prefsId, activeIndex, 'select')
    }
  }

  const calcScrimTop = (evt) => {
    const top = evt.target.offsetParent.offsetTop + evt.target.offsetParent.offsetHeight
    scrimTop = top
  }

  onMount(() => {
    if (active !== undefined)
      activeIndex = active

    if (prefsId?.length) {
      util.checkLocalPrefs();
      let lastState = util.checkPrefsFor(prefsId, 'select');
      if (lastState !== null) {
        activeIndex = lastState.value;
      }
    } else {
      activeIndex = activeIndex
    }
  })
</script>

{#if open}
  <div 
    class="scrim" 
    style={ `height: max(${ scrimTop + menuHeight }px, 100%)` }
    on:click={ () => open = false } />
{/if}
<div
  class="dropdown-wrapper"
  on:click={ (evt) => {calcScrimTop(evt); open = !open} }
>

  {#if label}
  <div class="dropdown-label">
    { label }
  </div>
  {/if}

  <div class="dropdown-container"
    style={ `width: ${width}px` }
  >
    <div class="dropdown-active">{ items[activeIndex] }</div>

    <div>
      <svg viewBox="0 0 24 24">
        <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
      </svg>
    </div>

    {#if open}
    <ul class="dropdown-menu" 
      bind:offsetHeight={ menuHeight }

      >
      {#each items as item, i}
      {#if item == '-'}
        <li class="dropdown-menu-line" />
      {:else}
        <li 
          class="dropdown-menu-item"
          class:active={ activeIndex == i }
          on:click={ (item) => makeActive(item, i) }
          >
          <span 
            class="dropdown-menu-item-indicator"
            class:active={ activeIndex == i }
            >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
          </span>
          <span>
            { item }
          </span>
          </li>
      {/if}
      {/each}
      <!-- <li
        v-for="(item, i) in menu"
        :key="i"
        :ref="i"
        @click="makeActive(item)"
        @mouseenter="mouseOver(item)"
        @mouseleave="item.hover = false"
        class="dropdown-menu-item"
        :style="getMenuItemStyle(item)"
      >
        <span class="dropdown-menu-item-label">
          {{ item.label || item.value }}
        </span>
        <span class="dropdown-menu-item-indicator" v-show="item.active" />
      </li> -->
    </ul>
    {/if}
  </div>
</div>

<style>
.dropdown-wrapper {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  /* margin: 6px auto; */
}
svg {
  fill: var(--color-icon);
  width: 15px;
  pointer-events: none;
}
.dropdown-label {
  /* width: 100%; */
  margin-bottom: 4px;
  cursor: default;
  user-select: none;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  /* font-size: 9px; */
  color: var(--color-icon);
  padding-right: 4px;
  padding-top: 3px;
}
.dropdown-active {
  user-select: none;
  cursor: default;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.dropdown-container {
  box-sizing: border-box;
  position: relative;
  /* width: 100%; */
  min-width: 60px;
  height: 20px;
  padding: 0px 2px 0 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  background: var(--color-dropdown);
  color: var(--color-btn-pill-border);
  border-radius: 2px;
  border: 1px solid var(--fold-border);
}
.dropdown-container:hover {
  background: var(--color-dropdown-hover);
}
.dropdown-menu {
  box-sizing: border-box;
  position: absolute;
  top: 12px;
  left: -1px;
  z-index: 1;
  /* width: calc(100% + 2px); */
  width: max-content;
  user-select: none;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: var(--color-dropdown);
  color: var(--color-btn-pill-border);
  border: 1px solid var(--fold-border);
  text-align: left;
  font-weight: 400;
  margin: 6px auto;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.12), 0 2px 2px rgba(0, 0, 0, 0.12),
  0 4px 8px rgba(0, 0, 0, 0.12);
}
.dropdown-menu-item {
  padding: 4px 10px 4px 6px;
  cursor: default;
  list-style-type: none;
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
}
.dropdown-menu-item:hover {
  background-color: var(--color-dropdown-hover);
}
.dropdown-menu-item.active {
  font-weight: 550;
  color: var(--color-selection);
}

.dropdown-menu-line {
  height: 4px;
  margin: 0 3px 4px;
  border-bottom: 1px solid var(--fold-border);
}

/* .dropdown-menu-item:not(:last-child) {
  border-bottom: 1px solid var(--dropdown-menu-border);
} */
.dropdown-menu-item-label {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.dropdown-active {
  /* padding: 0px 3px; */
  padding: 0 6px 0 0;
}
.dropdown-menu-item-indicator {
  float: right;
  padding: 4px 4px 4px 0;
  border-radius: 4px;
  opacity: 0;
  margin-bottom: -4px;
  /* margin-top: 3px; */
  /* background-color: var(--color-selection); */
}
.dropdown-menu-item-indicator.active {
  opacity: 1;
}
.dropdown-menu-item-indicator svg {
  width: 10px;
}
ul {
  padding-left: 0px;
}
/*
  Scrollbar style
*/
.dropdown-menu::-webkit-scrollbar {
  background-color: var(--dropdown-scrollbar-bg);
  width: var(--width-scrollbar-track);
}
.dropdown-menu::-webkit-scrollbar-thumb {
  width: var(--width-scrollbar-track);
  background: var(--dropdown-scrollbar-thumb);
  border-radius: 0px;
}
.dropdown-menu::-webkit-scrollbar-thumb:hover {
  background: var(--dropdown-scrollbar-thumb-hover);
}
.dropdown-menu::-webkit-scrollbar-resizer {
  display: none;
  width: 0px;
  background-color: transparent;
}
.dropdown-menu::-webkit-scrollbar-button {
  height: 0px;
}
.dropdown-menu::-webkit-scrollbar-corner {
  display: none;
}

.scrim {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 120%;
  z-index: 1;
  text-align: left;
  /* background: rgba(0,0,0,0.5); */
}
</style>