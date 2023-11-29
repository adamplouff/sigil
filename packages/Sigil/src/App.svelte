<script lang="ts">
  import Panel from '../components/Panel.svelte'
  import Auth from '../components/Auth.svelte'
  import PanelInfo from '../components/PanelInfo.svelte'
  import Footer from '../components/Footer.svelte'
  import Button from '../components/Button.svelte'
  import Row from '../components/Row.svelte'
  import Fold from '../components/Fold.svelte'
  import Toggle from '../components/Toggle.svelte'
  import Input from '../components/Input.svelte'
  import ColorPicker from '../components/ColorPicker.svelte'
  import Icon from '../components/Icon.svelte'
  import Select from '../components/Select.svelte'
  import Modal from '../components/Modal.svelte'
  import Menus from '../components/Menus.svelte'


  const backgroundColor: string = "#202020";
  let checkForUpdate = false

  let footerMessage: string = '';
  const footerMessages = [
    'It does not do to dwell on dreams and forget to live.',
    'It is our choices, Harry, that show what we truly are, far more than our abilities.',
    'It takes a great deal of bravery to stand up to our enemies, but just as much to stand up to our friends.',
    'To the well-organized mind, death is but the next great adventure.',
    'It is the unknown we fear when we look upon death and darkness, nothing more.',
    'Fear of a name increases fear of the thing itself.',
    'It matters not what someone is born, but what they grow to be.',
    'Things we lose have a way of coming back to us in the end, if not always in the way we expect.',
    'It is the quality of one’s convictions that determines success, not the number of followers.',
    'We’ve all got both light and dark inside us. What matters is the part we choose to act on. That’s who we really are.',
  ]
  
  // auth simulation
  let authLock = true
  let authMessage = 'Please enter your Rubberhose 3 license key'
  const callAuthServer = () => {
    authMessage = 'Checking...'
    setTimeout(() => {
      authLock = false
    }, 500);
  }

  let deauthorizeModal = false

  const deauthorizeKey = () => {
    deauthorizeModal = false
    authLock = true
    authMessage = 'Please enter your Rubberhose 3 license key'
  }
</script>

<main>
  <Panel backgroundColor={ backgroundColor }>
    <Modal label="Are you sure you want to deauthorize this computer?" 
      show={ deauthorizeModal } 
      confirm={{ 
          cancel: 'No way!', 
          confirm: 'Hell yeah' }} 
      on:close={ () => deauthorizeModal = false } 
      on:confirm={ deauthorizeKey } />

    <Menus refresh />
    {#if checkForUpdate}
      <Update name="Rubberhose3" key="rubberrig" version="1.0.0" />
    {/if}

    <Footer footerMessage={ footerMessage } />
    <Auth message={ authMessage } locked={ authLock } on:submit={ () => callAuthServer() } />

    <Input label="Number slider" placeholder="Placeholder" value={4} type="number" />

    <ColorPicker label="Color Picker" color="#ff0000" />

    <Fold label="Fold" prefsId="main fold">
      <Row fill={ true }>

        <Button label="Footer message" on:click={ () => footerMessage = footerMessages[Math.floor(Math.random() * footerMessages.length)] } />
        <Button icon="rubberrig" />
        <Button label="Button" icon="anubis" tooltip="this is a button" />
      </Row>
    </Fold>

    <Fold label="System" prefsId="systemFold">
      <Toggle label="Check for update" state={ false } on:change={ evt => checkForUpdate = evt.detail } />

     <Button label="Deauthorize computer" block={ true } on:click={ () => deauthorizeModal = true } />

      <PanelInfo />
    </Fold>

    <Icon name="rubberhose" color="salmon" size={36} />

    <Select items={['one', 'two', 'three']} label="Select" />
  </Panel>
</main>

<style>
  :global(#app) {
    padding: 0;
  }
  main {
    width: 100vw;
    height: 100vw;
  }
</style>