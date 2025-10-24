(() => {
    'use strict';
    document.addEventListener('DOMContentLoaded', () => {
        // get the engine options
        const engine_options = document.querySelector('#engine-options') ?? console.error("No engine options found!");

        // get the search bar
        const search_bar = document.querySelector('#search-bar') ?? console.error("No search bar found!");

        let engine_url;
        let search_query;
        let final_url;

        let debounce_bar = false; // used to debounce the search bar
        
        // add an event listener to the search bar
        search_bar.addEventListener('keydown', (e) => {
            if (debounce_bar) return; // exit the function while debouncing
            // debounce the search bar
            debounce_bar = true;

            // enter check
            if (e.key === "Enter") {
                // handle search engine choice
                switch (engine_options.value) {
                    case "bing":
                        engine_url = "https://bing.com/search";
                        break;
                    case "brave":
                        engine_url = "https://search.brave.com/search";
                        break;
                    case "google":
                        engine_url = "https://google.com/search";
                        break;
                    case "mojeek":
                        engine_url = "https://mojeek.com/search";
                        break;
                    default:
                        console.warn("Unknown search engine!");
                        engine_url = null;
                        break;
                }

                // assign the search query
                search_query = search_bar.value.trim();

                // make sure search query isn't empty
                if (search_query) {
                    // get the search url using google
                    final_url = `${engine_url}?q=${encodeURIComponent(search_query)}&utm_source=yasua006`;
                }

                // make sure the search url exists
                if (final_url) {
                    let msg = prompt(`Do you want to redirect to ${engine_options.value}?`).toLowerCase()

                    // handle message
                    if (msg === "yes") {
                        // redirect to google
                        window.location.href = final_url;
                    } else {
                        alert("OK! Refreshing!");
                        return;
                    }
                }
            }

            // debounce delay
            setTimeout(() => {
                debounce_bar = false;
            }, 500)
        });
    });
})();