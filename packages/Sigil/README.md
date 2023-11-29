# Sigil

An ongoing Svelte UI component library for [Bolt](https://github.com/hyperbrew/bolt-cep). This is an internal [Battle Axe](https://www.battleaxe.co/) project and will be changing.

There will be no external support. Use at your own risk.

## Basic usage

1. Clone this repo
2. `cd` into the new folder
3. `yarn`
4. `yarn link`
5. `cd` into the [Bolt](https://github.com/hyperbrew/bolt-cep) project
6. `yarn link @battleaxe/sigil`

<img src="https://github.com/adamplouff/sigil/assets/8580225/be0a0697-7372-45ec-8365-ab9ec16c29f9" width="346">

```svelte
// main.svelte
<script lang="ts"> 
  import { onMount } from 'svelte'
  import { version } from "../../../package.json";
  import {
    csi,
    evalES,
    evalFile,
    openLinkInBrowser,
    subscribeBackgroundColor,
    evalTS,
  } from "../lib/utils/bolt";

  import "../index.scss";
  import "./main.scss";

  /// sigil
  import Panel from "@battleaxe/sigil/components/Panel.svelte";
  import Fold from "@battleaxe/sigil/components/Fold.svelte";
  import Button from "@battleaxe/sigil/components/Button.svelte";
  import Input from "@battleaxe/sigil/components/Input.svelte";
  import Row from "@battleaxe/sigil/components/Row.svelte";
  import PanelInfo from "@battleaxe/sigil/components/PanelInfo.svelte";
  import Footer from "@battleaxe/sigil/components/Footer.svelte";
  import Update from "@battleaxe/sigil/components/Update.svelte";
  import Menus from "@battleaxe/sigil/components/Menus.svelte";
  import ColorPicker from "@battleaxe/sigil/components/ColorPicker.svelte";
  import Toggle from "@battleaxe/sigil/components/Toggle.svelte";
  import Auth from "@battleaxe/sigil/components/Auth.svelte";
  import Modal from "@battleaxe/sigil/components/Modal.svelte";
  import Select from "@battleaxe/sigil/components/Select.svelte";

  const appLocale = csi.getHostEnvironment().appLocale?.split("_")[0]
  onMount(() => {
    if (window.cep) {
      subscribeBackgroundColor((c: string) => (backgroundColor = c));
    }
  })
  
  let backgroundColor: string = "#202020";
</script>


<div class="app">
  <Panel backgroundColor={ backgroundColor }>
    <Menus refresh locale={ appLocale } />

    <Row ></Row>
      
    <Row fill={ true }>
      <Button icon="rubberhose" label="Rubberhose" on:click={() => evalES(`alert('Rubberhose')`, true) } />
      <Button icon="path-tangent" label="Path to hose" on:click={() => evalES(`alert('Path to hose')`, true) } />
      <Button icon="rubberrig" label="RubberRig" on:click={() => evalES(`alert('RubberRig')`, true) } />
      <Button icon="rubberpin" label="Rubberpin" on:click={() => evalES(`alert('Rubberpin')`, true) } />

      </Row>
      <Toggle label="Toggle" on:change={(e) => console.log(e.detail) } />


    <!-- SYSTEM -->
    <Fold label="System" open={ false } prefsId={'foldSystem'}>

      <Button label="Learn stuff" on:click={() => openLinkInBrowser(`https://battleaxe.co`) } />

      <PanelInfo name="Overlord" version={ version } releaseYear="2017" />
    </Fold>
  </Panel>
</div>
```
