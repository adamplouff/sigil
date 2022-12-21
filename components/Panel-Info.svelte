<script>
  import {onMount} from 'svelte'
  export let name 
  export let version
  export let author = 'Battle Axe Inc'
  export let releaseYear

  const calcYears = (year) => {
    const currentYear = new Date().getFullYear().toString()
      if (!year) { return currentYear }

      let ccYear = year
      if (year != currentYear) {
          ccYear += `-${currentYear}`
      }

      return ccYear
  }
  
  let ccYear = calcYears(releaseYear)

</script>

<div class="panel-info">
  <p> 
    {#if name}
    {name}
    {/if}
    
    {#if name && version}
    - 
    {/if}
    {#if version}
    {version}
    {/if}
  </p>
  <p>© {ccYear} {author}</p>
</div>

<style>
.panel-info {
  text-align: left;
  margin-top: 16px;
}
.panel-info > p {
  margin: 3px 0;
}
</style>