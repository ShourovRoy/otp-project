<script lang="ts">
    import type { PageProps } from "./$types";


    let {data}: PageProps = $props()


</script>


<section id="home" class="h-screen bg-cover bg-center flex items-center justify-center text-white bg-no-repeat"
  style="background-image: url('/pictures/hero_page.jpg');">
      <div class="header-content">
        <h2>Welcome to Cord Red</h2>
       <div class="line"></div>
        <h1>Empowering the Next Generation of Coders</h1>
        {#if data.userName }

            <button class="btn">All Ready Signed In</button>

        {:else}
            <a href="/signup" class="btn">Get Started</a>

        {/if}
        </div>
   </section>
   <style>
	#home {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		text-align: center;
		flex-direction: column;
    background-size: cover;
    
	}
  .btn {
    background: linear-gradient(to right, #667eea, #764ba2);
    color: white;
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }
  .about-section {
    background: linear-gradient(to right, #f8fafc, #e2e8f0);
    padding: 80px 20px;
    display: flex;
    justify-content: center;
  }

  .text-box {
    max-width: 800px;
    text-align: center;
  }

  .text-box h2 {
    font-size: 2.8rem;
    color: #2d3748;
    margin-bottom: 0.5rem;
  }

  .text-box h3 {
    font-size: 1.4rem;
    color: #718096;
    margin-bottom: 1.5rem;
  }

  .text-box p {
    font-size: 1.1rem;
    color: #4a5568;
    line-height: 1.8;
  }

  @media (max-width: 768px) {
    .text-box h2 {
      font-size: 2rem;
    }
    .text-box h3 {
      font-size: 1.2rem;
    }
    .text-box p {
      font-size: 1rem;
    }
  }
</style>

<section id="about" class="about-section">
  <div class="text-box">
    <h2>About Us</h2>
    <h3>Who we are & what we do</h3>
    <p> We are a passionate team of developers and designers, focused on building elegant,
    responsive, and user-friendly websites. With a deep understanding of both technology
    and creativity, we deliver solutions that not only look good but also perform excellently.</p>
  </div>
</section>
