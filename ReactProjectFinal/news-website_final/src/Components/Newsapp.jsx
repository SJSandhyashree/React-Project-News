import React, { useEffect, useState } from 'react';
import Card from './Card';

const Newsapp = () => {
    const [search, setSearch] = useState("india");
    const [newsData, setNewsData] = useState(null);
    const [dateFilter, setDateFilter] = useState("2024-10-10");
    const [selectedSource, setSelectedSource] = useState("guardianapis");
    const [error, setError] = useState(null);

    const apiKeys = {
        NewsAPI: '69139d0d610248a6b7e7b6dc63752eb9',
        guardianapis: '3095a7e8-ff3b-45de-bbcb-35801c547c25',
        NewsDataIO: 'pub_56396fe0af2a3fb2ec4b13e342743cea28d2c',
    };

    const fetchNewsData = async (source, searchQuery, apiKeys) => {
        console.log(dateFilter);
        const newsSources = {
            NewsAPI: `https://newsapi.org/v2/everything?q=${encodeURIComponent(search)}&from=${dateFilter}&apiKey=${apiKeys.NewsAPI}`,
            guardianapis: `https://content.guardianapis.com/search?q=${encodeURIComponent(search)}&from-date=${dateFilter}&api-key=${apiKeys.guardianapis}&show-fields=thumbnail,headline,trailText`,
            NewsDataIO: `https://newsdata.io/api/1/latest?apikey=${apiKeys.NewsDataIO}&q=${encodeURIComponent(search)}`,
        };

        try {
            const response = await fetch(newsSources[source]);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const jsonData = await response.json();
            let transformedData;

            switch (source) {
                case "NewsAPI":
                    transformedData = jsonData.articles.slice(0, 10);
                    break;
                case "guardianapis":
                    transformedData = transformGuardianToNewsApi(jsonData.response.results.slice(0, 10));
                    break;
                case "NewsDataIO":
                    transformedData = transformNewsDataIoToNewsApi(jsonData.results.slice(0, 10));
                    console.log('hello world', transformedData);
                    break;
                default:
                    throw new Error("Unknown news source");
            }

            return transformedData;
        } catch (err) {
            console.error("Failed to fetch news data:", err);
            throw err;
        }
    };

    function transformGuardianToNewsApi(results) {
        return results.map(item => ({
            source: {
                id: item.sectionId || null,
                name: item.sectionName || "[Removed]",
            },
            author: item.byline ? item.byline.replace("By ", "") : null,
            title: item.webTitle || "[Removed]",
            description: item.fields.trailText || item.fields.headline || "[No description available]",
            url: item.webUrl || "https://removed.com",
            urlToImage: item.fields?.thumbnail || null,
            publishedAt: item.webPublicationDate || "2024-09-18T14:05:48Z",
            content: item.blocks?.body?.map(block => block.bodyText || "").join("\n") || "[Removed]",
        }));
    }

    function transformNewsDataIoToNewsApi(results) {
        return results.map(item => ({
            source: {
                id: item.country || null,
                name: item.source || "[Removed]",
            },
            author: item.creator ? item.creator[0] : null,
            title: item.title || "[Removed]",
            description: item.description || "[No description available]",
            url: item.link || "https://removed.com",
            urlToImage: item.image_url || null,
            publishedAt: item.pubDate || "2024-09-18T14:05:48Z",
            content: item.content || "[No content available]",
        }));
    }

    const getData = async () => {
        try {
            const data = await fetchNewsData(selectedSource, search, apiKeys);
            setNewsData(data);
            setError(null);
        } catch (err) {
            setError("Failed to load news data. Please try again later.");
        }
    };

    useEffect(() => {
        getData();
    }, [selectedSource, search, dateFilter]);

    const searchDate = (event) => {
        setDateFilter(event.target.value);
    };

    const userInput = (event) => {
        setSearch(event.target.value);
    };

    const handleInput = (e) => {
        setSearch(e.target.value);
    };

    const handleSearchClick = () => {
        getData();
    };

    const handleSourceChange = (event) => {
        setSelectedSource(event.target.value);
    };

    return (
        <div>
            <nav>
                <h1>InsightWorld.net</h1>
            </nav>
            <div className="marquee">
                <div className="marquee-content">
                    <a href="https://www.ijprems.com/uploadedfiles/paper//issue_6_june_2024/35281/final/fin_ijprems1719824627.pdf"> The Rise of AI in Everyday Life </a>
                    <a href="https://en.wikipedia.org/wiki/List_of_official_County_Championship_winners">Local Team Wins Championship Title </a>
                    <a href="https://www.nhs.uk/live-well/eat-well/how-to-eat-a-balanced-diet/eight-tips-for-healthy-eating/">New Guidelines for Healthy Living </a>
                    <a href="https://in.bookmyshow.com/explore/upcoming-movies"> Upcoming Movies to Watch </a>
                    <a href="https://www.thehindubusinessline.com/economy/policy/">Major Policies news </a>
                    <a href="https://www.lonelyplanet.com/best-in-travel"> Top Destinations to Visit in 2024 </a>
                </div>
            </div>
            <nav className='navteam'>
                <div className='categoryBtn'>
                    <button onClick={userInput} value="sports">Sports</button>
                    <button onClick={userInput} value="politics">Politics</button>
                    <button onClick={userInput} value="entertainment">Entertainment</button>
                    <button onClick={userInput} value="health">Health</button>
                    <button onClick={userInput} value="fitness">Fitness</button>
                </div>

                <div className="searchBar">
                    <input
                        type="text"
                        placeholder="Search News"
                        value={search}
                        onChange={handleInput}
                    />
                    <input onChange={searchDate} type="date" id="Date" name="Date"></input>
                    <button onClick={getData}>Search</button>
                </div>

                <div className="source">
                    <label
                        style={{
                            fontSize: "23px",
                            fontWeight: "600",
                            marginRight: "15px",
                            color: "#333",
                            fontFamily: "'Georgia', serif",
                            lineHeight: "1.5",
                        }}
                    >
                        Select your news source:
                    </label>

                    <select
                        onChange={handleSourceChange}
                        value={selectedSource}
                        className="source-dropdown"
                    >
                        <option value="NewsAPI">NewsAPI</option>
                        <option value="guardianapis">Guardian APIs</option>
                        <option value="NewsDataIO">NewsDataIO</option>
                    </select>
                </div>
            </nav>
            <div>
                {newsData ? <Card data={newsData} /> : null}
            </div>
            <footer id="footer">
                <div class="container">
                    <h3>InsightWorld.net</h3>
                    <p>Stay informed with the latest breaking news, in-depth analysis, and real-time updates from around the globe, all in one place.</p>
                    <div class="social-links">
                        <a href="https://www.youtube.com/live/jdJoOhqCipA?si=r46gK0SbWItaLuu6" class="Youtube" aria-label="Youtube"><i class="bx bxl-youtube"></i></a>
                        <a href="https://m.facebook.com/Tv9Kannada/" class="facebook" aria-label="Facebook"><i class="bx bxl-facebook"></i></a>
                        <a href="https://www.instagram.com/tv9_kannada_official?igsh=azQ4aTRvaGFmZGto" class="instagram" aria-label="Instagram"><i class="bx bxl-instagram"></i></a>
                        <a href="https://www.linkedin.com/in/tv9kannada?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" class="linkedin" aria-label="LinkedIn"><i class="bx bxl-linkedin"></i></a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Newsapp;
