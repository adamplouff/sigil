<!--
@component

### Toggle

@props
- `label` - Toggle label
- `state` - Initial toggle the toggle state
- `disabled` - Disable the toggle
- `readOnly` - Make the toggle read only
- `tooltip` - Set the toggle tooltip
- `prefsId` - Local storage ID to save the toggle state

### Events
- `change` - Dispatched when the toggle state changes

 -->

<script lang="ts">
	import { fade } from 'svelte/transition';
	import { onMount, createEventDispatcher } from 'svelte'
  import util from '../lib/mixinPrefs'

	const dispatch = createEventDispatcher();

	export let disabled = false
	export let centered = false
	export let custom = false
	export let readOnly = false
	export let label = ''
	export let state = true
	export let tooltip = ''
	export let prefsId: string|null = null
  export let lofi = false

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
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	on:mouseenter={() => hover = true}
	on:mouseleave={() => hover = false}
	class:disabled
	class:centered
	class:custom
	class:readOnly
	class="toggle-item"
	use:popperRef
>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class="toggle-contents" on:click={ updateState }>
		<div class="outer" >
		</div>
		<div class="{isEnabled ? 'enabled' : ''}" />
		<span class="label">{ label }</span>
	</div>
</div>

<!-- {#if tooltip && hover}
<div id="tooltip" in:fade="{{ duration: 100, delay: 400 }}" out:fade="{{duration: 100}}" class:hover use:popperContent={extraOpts}>
	{ @html tooltip }
	<div id="arrow" data-popper-arrow />
</div>
{/if} -->


<style>
.toggle-item {
	--box-size: 1.4em;
	--enable-inset: 3px;
	--enable-size: calc(var(--box-size) - calc(var(--enable-inset) * 2));

	position: relative;
	box-sizing: border-box;
  /* width: fit-content; */
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  overflow: hidden;
  color: var(--color-icon);
	white-space: nowrap;
  max-width: fit-content;
}
.toggle-contents {
  display: flex;
  justify-content: flex-start;
  flex-wrap: nowrap;
  align-items: center;
	margin: 4px 0;
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
	margin-right: 6px;
	text-align: left;
}
.custom .label {
  margin-top: 2px;
}
.outer {
	border: 1px solid var(--color-icon);
	border-radius: 1px;
	box-sizing: border-box;
	width: var(--box-size);
	min-width: var(--box-size);
	max-width: var(--box-size);
	height: var(--box-size);
	padding: 0 !important;
}
.enabled {
	background-color: var(--color-icon);
	position: absolute;
	border: 1px solid transparent;
	box-sizing: border-box;
	margin-left: var(--enable-inset);
	width: var(--enable-size);
	height: var(--enable-size);
}
</style>
