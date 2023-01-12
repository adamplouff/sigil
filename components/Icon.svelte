<script>
  import Icomoon from "svelte-icomoon";

  import iconSet from "../assets/huntress/selection.json";

  export let name;
  export let title = null;
  export let color = null;
  export let size = 16;
  export let disableFill = false;
  export let removeInitialStyle = false;
  export const style = {};

  const props = { name, title, color, size, disableFill, removeInitialStyle };
</script>

<Icomoon {...props} iconSet="{iconSet}" />