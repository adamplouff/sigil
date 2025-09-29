<!--
@component

### Fold

@props
- `label` - Label of the fold
- `open` - The initial state of the fold
- `removeBorder` - Remove the border of the fold
- `prefsId` - Local storage ID to save the state of the fold

 -->

<script lang="ts">
  import { onMount } from 'svelte'
  import util from '../lib/mixinPrefs'
  import Icon from './Icon.svelte'

	export let label = 'fold'
	export let open = true
	export let removeBorder = false
	export let lofi = false
  export let prefsId

  let isOpen

  onMount(() => {
    if (prefsId?.length) {
      util.checkLocalPrefs();
      let lastState = util.checkPrefsFor(prefsId, 'fold');
      if (lastState === null) {
        isOpen = open
      } else {
        isOpen = lastState.value;
      }
    } else {
      isOpen = open
    }
  })

  const toggle = () => {
    isOpen = !isOpen

    if (prefsId) {
      util.setPrefsById(prefsId, isOpen, 'fold')
    }
  }

</script>

<div class="fold" class:removeBorder>
  <div class="fold-label" on:click={toggle}>
	<div class="fold-label-text">{ label }</div>
  {#if lofi}
    {#if isOpen}
    <svg class="fold-icon" width="18" height="18" viewBox="0 0 24 24">
      <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
    </svg>
    {:else}
    <svg class="fold-icon" width="18" height="18" viewBox="0 0 24 24">
      <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
    </svg>
    {/if}
  {:else}
		<div class="fold-icon" class:isOpen>
      <svg width="18" height="18" viewBox="0 0 24 24">
        <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
        <path d="M0 0h24v24H0z" fill="none" />
			</svg>
		</div>
    {/if}
	</div>

  <div class="fold-content {isOpen ? '' : 'isClosed'}">
    <slot/>
  </div>
</div>

<style>
.fold {
  border-top: solid var(--fold-border-width) var(--fold-border);
  width: 100%;
  cursor: default;
  padding-bottom: 0;
  margin-bottom: 0 !important;
  cursor: default;
  user-select: none;
}

.fold-content > .isOpen {
  padding-bottom: 100px;
  width: calc(100% - 10px);
  padding-left: 10px;
}
.fold-label {
  padding: 7px 0 3px;
  display: flex;
  flex-wrap: none;
  justify-content: space-between;
}
.fold-label-text {
  text-transform: uppercase;
  letter-spacing: 0.25ch;
  user-select: none;
}
.fold-icon {
  float: right;
  margin-top: -2px;
  fill: var(--color-icon);
  height: 18px;
  transform-origin: 50% 50%;
  transition: all 0.15s cubic-bezier(0, 0, 0.2, 1);
  transform: rotate(-90deg);
}
.fold-icon.isOpen {
  transform: rotate(0);
}
.fold-content {
  padding-bottom: 8px;
}
.removeBorder {
	border-top: none;
  padding-top: 0;
}
.removeBorder > .fold-label {
  padding-top: 0;
}
.isClosed {
  display: none;
}
</style>
