<!-- 
@component

### Radio

@props
- `label` - Radio label
- `value` - Initial radio value
- `disabled` - Disable the radio
- `readOnly` - Make the radio read only
- `prefsId` - Local storage ID to save the radio state

### Events
- `change` - Dispatched when the radio state changes

 -->

<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte'
  import util from '../lib/mixinPrefs'

	const dispatch = createEventDispatcher();

	export let disabled = false
	export let centered = false
	export let custom = false
	export let readOnly = false
	export let label = ''
	export let value: string
	export let options: {label: string, value: string}[]
	export let prefsId: string|null = null

	$: hover = false
	let radioValue = ''

	$: {
		radioValue = value
	}

	onMount(() => {
    if (prefsId?.length) {
      util.checkLocalPrefs();
      let lastState = util.checkPrefsFor(prefsId, 'radio');
      if (lastState === null) {
        radioValue = value
      } else {
        radioValue = lastState.value;
      }
    } else {
      radioValue = value
    }
  })

	const updateState = (val) => {
		radioValue = val

		console.log('radioValue', radioValue);
		

		if (prefsId) {
      util.setPrefsById(prefsId, radioValue, 'radio')
    }

		dispatch('change', radioValue)
	}

</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	on:mouseenter={() => hover = true}
	on:mouseleave={() => hover = false}
	class:disabled
	class:centered
	class:custom
	class:readOnly
	class="radio-item"
>
<span class="radio-label">{ label }</span>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="radio-options">
	{#each options as option}
		<div class="radio-option" on:click={ () => updateState(option.value) }>
			<div class="outer"/>
			<div class="{(radioValue == option.value) ? 'enabled' : ''}" />
			<span class="label">{ option.label }</span>
		</div>
	{/each}
</div>
</div>


<style>
.radio-item {
	--box-size: 1.4em;
	--enable-inset: 3px;
	--enable-size: calc(var(--box-size) - calc(var(--enable-inset) * 2));
  
	box-sizing: border-box;
  width: fit-content;
  display: flex;
	flex-wrap: wrap;
  justify-content: flex-start;
  flex-direction: row;
  overflow: hidden;
  color: var(--color-icon);
	gap: 2px;
	margin: 4px 0;
}
.radio-options {
	display: flex;
	flex-wrap: wrap;
	flex-direction: row;
}
.radio-option {
  display: flex;
  justify-content: flex-start;
  flex-wrap: nowrap;
  align-items: center;
	margin: 2px 0;
}
.radio-item.readOnly {
  pointer-events: none;
}
.radio-item:not(.custom) {
  align-items: center;
}
.radio-item.custom {
  align-items: flex-start;
}
.disabled {
  opacity: 0.4;
  pointer-events: none;
}
.radio-label {
	margin-right: 8px;
}
.label {
  padding-left: 6px;
	margin-right: 12px;
	text-align: left;
}
.custom .label {
  margin-top: 2px;
}
.outer {
	border: 1px solid var(--color-icon);
	border-radius: var(--box-size);
	box-sizing: border-box;
	width: var(--box-size);
	height: var(--box-size);
	padding: 0 !important;
}
.enabled {
	background-color: var(--color-icon);
	border-radius: var(--box-size);
	position: absolute;
	border: 1px solid transparent;
	box-sizing: border-box;
	margin-left: var(--enable-inset);
	width: var(--enable-size);
	height: var(--enable-size);
}
</style>