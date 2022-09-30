<script>
  import { onMount } from 'svelte'

  import { csi } from '../lib/utils'
  export let refresh = false
  export let menuItems = []

  if (window.__adobe_cep__) {

    const refreshPage = () => {
        location.reload()
    }
  
    let contextMenu = {
      menu: [ ]
    }
    
  
    const callback = (event) => {
      let clickedItem
      contextMenu.menu.forEach(menuItem => {
        if (menuItem.id == event) {
          clickedItem = menuItem
        }
      })
      clickedItem.callback()
    }

    const buildContextMenu = () => {
      if (refresh) { contextMenu.menu.push({
          id: 'refresh',
          label: 'Refresh panel',
          enabled: true,
          checkable: false,
          checked: false,
          callback: refreshPage,
        })
      }

      contextMenu.menu.push({ label: '---' })

      if (menuItems.length > 0) {
        menuItems.forEach(item => {
            contextMenu.menu.push({
            id: item.label.replace(' ', '_'),
            label: item.label,
            enabled: item.enabled || true,
            checkable: item.checkable || false,
            checked: item.checked || false,
            callback: item.callback,
          })
        })
      }
    }
    const buildFlyoutMenuItemInXML = (item) => {
      let str = ``;
      if (item.id) {
        str += `<MenuItem Id="${item.id}" Label="${item.label}" Enabled="${
          item.enabled || "true"
        }" Checkable="${item.checkable || "false"}" Checked="${
          item.checked || "false"
        }"`;
        if (item.menu && item.menu.length) {
          str += ">";
          item.menu.forEach((child) => {
            str += buildFlyoutMenuItemInXML(child);
          });
          str += "</MenuItem>";
        } else str += "/>";
      } else str += `<MenuItem Label="---" />`;
      return str;
    }
    const buildFlyoutMenuInXML = () =>  {
      let str = `<Menu>`;
      contextMenu.menu.forEach((item, i) => {
        str += buildFlyoutMenuItemInXML(item, i);
      });
      return (str += `</Menu>`);
    }
  
    onMount(() => {
      buildContextMenu()

      csi.setContextMenuByJSON(JSON.stringify(contextMenu), callback)
      csi.setPanelFlyoutMenu(buildFlyoutMenuInXML(contextMenu), callback)
    })
  }

</script>

<div v-if="isAdobe" class="menu"></div>