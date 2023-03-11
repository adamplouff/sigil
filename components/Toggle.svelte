<script>
	import { onMount, createEventDispatcher } from 'svelte'
  import util from './mixinPrefs.js'

	const dispatch = createEventDispatcher();

	export let disabled = false
	export let centered = false
	export let custom = false
	export let readOnly = false
	export let label = ''
	// export let color = ''
	export let state = true
	export let prefsId = null

	$: hover = false
	let isEnabled = false

	$: {
		isEnabled = state
	}

	onMount(() => {
    if (prefsId?.length) {
      util.checkLocalPrefs();
      let lastState = util.checkPrefsFor(prefsId, 'toggle');
      if (lastState === null) {
        isEnabled = state
      } else {
        isEnabled = lastState.value;
      }
    } else {
      isEnabled = state
    }
  })

	const updateState = () => {
		isEnabled = !isEnabled

		if (prefsId) {
      util.setPrefsById(prefsId, isEnabled, 'toggle')
    }

		dispatch('change', isEnabled)
	}

</script>
<div
	on:click={ updateState }
	on:mouseenter={() => hover = true}
	on:mouseleave={() => hover = false}
	class:disabled
	class:centered
	class:custom
	class:readOnly
	class="toggle-item"
>
	<div class="toggle-contents">
		<div class="outer" >
			<div class="{isEnabled ? 'enabled' : ''}" />
			<!-- <div class="{isEnabled ? 'enabled' : ''}" /> -->
		</div>
		<span class="label">{ label }</span>
	</div>
</div>


<style>
.toggle-contents {
  display: flex;
  justify-content: flex-start;
  flex-wrap: nowrap;
  align-items: center;
	margin: 4px auto;
	/* margin-bottom: 16px; */
}
.toggle-item {
  box-sizing: border-box;
  width: fit-content;
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  overflow: hidden;
  color: var(--color-icon);
}
.toggle-item.readOnly {
  pointer-events: none;
}
.toggle-item:not(.custom) {
  align-items: center;
}
.toggle-item.custom {
  align-items: flex-start;
}
.disabled {
  opacity: 0.4;
  pointer-events: none;
}
.label {
  padding-left: 6px;
	margin-right: 16px;
}
.custom .label {
  margin-top: 2px;
}
.outer {
	border: 1px solid var(--color-icon);
	border-radius: 1px;
	width: 10px;
	height: 10px;
}
.enabled {
	background-color: var(--color-icon);
	margin: 2px;
	width: 6px;
	height: 6px;
}
</style>