<script>
  export let name
  export let version
  export let releaseYear
  import { PanelInfo } from './PanelInfo.svelte'
  import { Button } from './Button.svelte'
  import { Toggle } from './Toggle.svelte'
  import { Row } from './Row.svelte'
  import { Modal } from './Modal.svelte'

  $: showFooterMessage = false

  let footerText    // local var to store 

  let footerTimeout
  $: if (footerMessage) {
    footerText = footerMessage
    clearTimeout(footerTimeout)

    showFooterMessage = false
    setTimeout(() => {
      showFooterMessage = true
    }, 200);


    footerTimeout = setTimeout(() => {
      showFooterMessage = false
    }, timeout);
  }
</script>

<!-- <div style="margin-bottom: 8px">
  <Toggle label={ lang.checkUpdates } bind:state={ prefs.checkUpdates } on:change={ evt => updatePref(evt, 'checkUpdates') } />
  <Toggle label={ lang.mysticMode} bind:state={ prefs.mysticMode } on:change={ evt => updatePref(evt, 'mysticMode') } />
</div>

<Modal 
  label={ lang.deauthMessage }
  confirm={{ 
    cancel: lang.cancel, 
    confirm: lang.deauthorize }} 
  show={ deauthModal } 
  on:close={() => deauthModal = false } 
  on:confirm={ deauthorizeKey } 
  >
</Modal>
<Row fill column={ !prefs.mysticMode && windowWidth < minWindowWidth}>
  <Button label={ lang.updateHoses } tooltip={ lang.updateHoses_tooltip }
    on:click={() => evalEsWithLoader('upgradeExpressions', prefs) } />
  
  <Button label={ lang.deauth } tooltip={ lang.deauth_tooltip }
    on:click={() => deauthModal = true}></Button>

  <Button label={ lang.learnStuff } tooltip={ lang.learnStuff_tooltip }
    on:click={event => learnStuff(event, 'https://link.battleaxe.co/rubberhose-manual') } 
  />
  <Button label={ lang.newsletter } tooltip={ lang.newsletter_tooltip }
    on:click={event => learnStuff(event, 'https://link.battleaxe.co/subscribe') } 
  />
</Row> -->
<PanelInfo name={ name } version={ version } releaseYear="2015" />

<style>

</style>