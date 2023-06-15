import { useState, useEffect } from "react";

import { copy, linkIcon, loader, tick } from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";


const Demo = () => {

  // ------------------------ STATES ------------------------ 

  const [Article, setArticle] = useState({
    url: ' ',
    summary: ' ',
  });

  // State to hold all the articles searched
  const [allArticles, setAllArticles] = useState([]);

  const [copied, setCopied] = useState("second")



//  -------------------- END OF STATES -----------------------


  // function to get the summary, { error state, fetching state}
  const [getSummary, {error, isFetching}] = useLazyGetSummaryQuery();



  // useEffect hook runs on app loading or rerender
  useEffect(()=>{

    // retrieves articles from localstorage and stores it in a variable by parsing it to an object from string using JSON.parse() 
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem('articles')
    )

    // If articles are present in local storage, add them to the allArticles state

    if(articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage)
    }
  },[]);




  // ------------------------ FUNCTIONS ------------------------ 


  // Function to handle the submit request
  const handleSubmit = async (e) => {

    // Prevents page from reloading on submit
    e.preventDefault();

    // Gets the data by calling the getSummary function
    const {data} = await getSummary({articleUrl: Article.url});

    // If the data is returned, update the article state
    if(data?.summary){
      const newArticle = { ...Article, summary: data.summary};

      // Adds the new article to all searched articles list
      const updatedAllArticles = [newArticle, ...allArticles];

      setArticle(newArticle);
      setAllArticles(updatedAllArticles);

      // Adds articles (object --> string) to local storage
      localStorage.setItem('articles', JSON.stringify(updatedAllArticles));

      console.log(newArticle.summary);
    }
  }


  // Copy Button OnClick Function
  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    // Clipboard function
    navigator.clipboard.writeText(copyUrl)

    setTimeout(()=> setCopied(false), 3000)
  }


  // ------------------- END OF FUNCTIONS -------------------



  return (
    <section className="mt-16 w-full max-w-xl">
      {/* Search Bar */}
      <div className="flex flex-col w-full gap-2">
        <form 
          className="relative flex justify-center items-center "
          onSubmit={handleSubmit}>
            <img src={linkIcon} alt="link_icon" className="absolute left-0 my-2 ml-3 w-5"/>
            <input 
              type="url" 
              placeholder="Enter a URL"
              value={Article.url}
              onChange={(e)=>setArticle({ ...Article, url: e.target.value})}
              required
              className="url_input peer"/>

            <button 
             type="submit"
             className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700">
              🔍
            </button>
        </form>

        {/* Browse URL History */}
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticles.map((item, index)=>(
            <div 
              key={`link-${index}`}
              onClick={() => setArticle(item)}
              className="link_card">
                {/* Copy Button */}
                <div className="copy_btn" onClick={()=>{
                  handleCopy(item.url)
                }}>
                  <img 
                    src={copied === item.url ? tick : copy} 
                    alt="copy_icon"
                    className="w-[40%] h-[40%] object-contain" />
                </div>
                {/* Text URL Title */}
                <p className="flex-1 font-satoshi text-blue-600 opacity-80 font-medium text-sm truncate">
                  {item.url}
                </p>
            </div>
          ))}
        </div>

      </div>

      {/* Display Results */}
            <div className="my-10 max-w-full flex justify-center items-center">
              {isFetching ? (
                <img src={loader} alt="loader" className="w-20 h-20 object-contain"/>
              ) : error ? (
                <p className="font-item font-bold text-black text-center">
                  Opps😢 Something Went Wrong!
                  <br />
                  <span className="font-satoshi font-normal text-gray-700">
                    {error?.data?.error}
                    </span>
                  </p>
              ) : (
                Article.summary && (
                  <div className="flex flex-col gap-3">
                    <h2 className="font-satoshi font-bold text-gray-600 text-xl">Article
                      <span className="blue_gradient"> Summary</span>
                      </h2>
                      <div className="summary_box">
                        <p className="font-inter font-medium text-sm text-gray-700 whitespace-pre-line">{Article.summary}</p>
                      </div>
                  </div>
                )
              )}
            </div>

    </section>
  )
}

export default Demo