<script>
  import { onMount } from 'svelte'
  import util from './mixinPrefs.js'
  export let name = ''
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
      util.setPrefsById(prefsId, isOpen, 'styleFolder')
    }
  }
</script>

<div>
  <div class="list-item folder" on:click={ toggle }>
    <div class="fold-icon">{ (isOpen) ? '–' : '+' }</div>
    <span>{name}</span>
  </div>
  <div class="indent {isOpen ? '' : 'isClosed'}">

    <slot />

  </div>
</div>

<style>
  .list-item {
    padding: 2px;
    display: flex;
  }
  .isClosed {
    display: none;
  }
  .fold-icon {
    width: 10px;
    margin-right: 2px;
    text-align: center;
  }
  .indent {
    margin-left: 12px;
  }
</style>