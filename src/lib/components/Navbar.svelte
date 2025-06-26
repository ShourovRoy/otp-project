<script lang="ts">
    import { enhance } from "$app/forms";


  let {user} = $props()

  

</script>


<nav uk-sticky class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="/">Cord Red</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav ms-auto">
        <a class="nav-link active" aria-current="page" href="#home">Home</a>
        <a class="nav-link" href="#about">About</a>
        
        {#if user }
        
        <form action="/logout?/logout" class="py-1" method="post" use:enhance>
          <button type="submit" class="btn btn-sm btn-info">Logout</button>
        </form>
        
        {:else}
        
          <a class="nav-link" href="/signup">Signup</a>
          <a class="nav-link" href="/login">Login</a>

        {/if}


      </div>
    </div>
  </div>
</nav>