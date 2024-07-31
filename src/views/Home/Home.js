import React, {useEffect, useState} from 'react'
import axios from 'axios'
import "./Home.css"
import NewsArticle from '../../components/NewsArticle/NewsArticle'

function Home() {
    const [news, setNews] = useState([])
    // const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")

    // const [searchResults, setSearchResults] = useState([])

    const loadnews = async () =>{
        try{
        const response = await axios.get(`https://newsapi.org/v2/everything?q=${searchQuery}&from=2024-07-17&to=2024-07-17&sortBy=popularity&apiKey=${process.env.REACT_APP_API_KEY}`);
        setNews(response.data.articles)
        }

        catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        loadnews()
    },[])

    useEffect(() => {
        loadnews()
    },[searchQuery])

    return (
        <div>
            <h1 className='news-app-heading'>News App</h1>  

             <input
                type="text"
                className='search-input'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
             />

            <div className='news-container'>  
            {
              news.map((newsArticle, index) => {
                    const {author, title, description, url, urlToImage, publishedAt} = newsArticle
                  
                    return(<NewsArticle author={author} title={title} description={description} url={url} urlToImage={urlToImage}
                     publishedAt={publishedAt}   key={index} />)                    
                })
            } 
            </div>          
           </div>
         )
     }
export default Home