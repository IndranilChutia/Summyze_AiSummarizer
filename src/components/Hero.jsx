import { logo } from '../assets';

const Hero = () => {
  return (
    <header className='w-full flex justify-center items-center flex-col'>

    <nav className='flex justify-between items-center w-full mb-10 pt-3'>
      <img src={logo} alt='app_logo' className='w-44 object-contain'/>

      <button 
        type="button" 
        onClick={()=> window.open('https://github.com/IndranilChutia/Summyze_AiSummarizer')}
        className='black_btn'>

        Github
      </button>
    </nav>

    <h1 className='head_text'>Summarize Articles with <br className='max-md:hidden' /><span className='orange_gradient'>OpenAI GPT-4</span>
    </h1>
    <h2 className='desc'>Summarize your articles with our open-source article summarizer, that transforms lengthy articles into short summaries 
    </h2>
    
    </header>
  )
}

export default Hero