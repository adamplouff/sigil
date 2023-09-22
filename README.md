# Sigil

An ongoing Svelte UI component library for [Bolt](https://github.com/hyperbrew/bolt-cep). This is an internal [Battle Axe](https://www.battleaxe.co/) project and will be changing.

There will be no external support. Use at your own risk. 


## Basic usage

```svelte
// main.svelte
<script lang="ts">
  import { onMount } from "svelte";
  import { version } from "../../../package.json";
  import {
    csi,
    evalES,
    evalFile,
    subscribeBackgroundColor,
  } from "../lib/utils";

  import { Panel, Fold, Button, Input, Row, Divider, PanelInfo, Footer, Update, TreeView, Menus, Dropzone, ColorPicker, Toggle, Auth, Modal, Select, Icon } from '@battleaxe/sigil'
  let appLocale = csi.getHostEnvironment().appLocale?.split("_")[0]
  let backgroundColor: string = "#202020";

  onMount(() => {
    if (window.cep) {
      subscribeBackgroundColor((c: string) => (backgroundColor = c));
      }
  })
</script>


<div class="app">
  <Panel backgroundColor={ backgroundColor }>

  <Menus refresh locale={ appLocale } menuItems={[
    {
      label: lang.openStylesFolder,
      callback: () => evalES(`openStyleFolder()`),
    },
  ]}/>
  <Fold label={lang.fold_system} open={false} prefsId={'foldSystem'}>
    <Row fill column={ !prefs.mysticMode && windowWidth < minWindowWidth}>
      <Button label={ lang.updateHoses } tooltip={ lang.updateHoses_tooltip }
        on:click={() => evalEsWithLoader('upgradeExpressions', prefs) } />
      />
      <Button label={ lang.newsletter } tooltip={ lang.newsletter_tooltip }
        on:click={event => learnStuff(event, 'https://link.battleaxe.co/subscribe') } 
      />
    </Row>
    <PanelInfo name="Rubberhose" version={ version } releaseYear="2015" />
  </Fold>
</div>
```