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
  import { Panel, Fold, Button, PanelInfo, Menus, Row, Toggle } from '@battleaxe/sigil'  
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
      
    <Row fill={ true }>
      <Button icon="rubberhose" label="Rubberhose" on:click={() => evalES(`alert('Rubberhose')`, true) } />
      <Button icon="path-tangent" label="Path to hose" on:click={() => evalES(`alert('Path to hose')`, true) } />
      <Button icon="rubberrig" label="RubberRig" on:click={() => evalES(`alert('RubberRig')`, true) } />
      <Button icon="rubberpin" label="Rubberpin" on:click={() => evalES(`alert('Rubberpin')`, true) } />
    </Row>


    <!-- SYSTEM -->
    <Fold label="System" open={ false } prefsId={'foldSystem'}>

      <Button label="Learn stuff" on:click={() => openLinkInBrowser(`https://battleaxe.co`) } />

      <PanelInfo name="Overlord" version={ version } releaseYear="2017" />
    </Fold>
  </Panel>
</div>
```