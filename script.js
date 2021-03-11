const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


let apiQuotes = [];

function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function complete(){
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// Show New Quote

function newQuote(){
    loading();
    // Pick a random quote from api quote array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    
    if(!quote.author){
        authorText.textContent = "Unknown";
    }

    else{
        authorText.textContent = quote.author;
    }

    // Quote length is too long
    if(quote.text.length > 120){
        quoteText.classList.add('long-quote');
    }

    else{
        quoteText.classList.remove('long-quote');
    }

    // Set Quote, hide Loader
    quoteText.textContent = quote.text;
    complete();
}

async function getQuotes() {
    loading();
    const apiURL = 'https://type.fit/api/quotes';
    try{
    const response = await fetch(apiURL);
    apiQuotes = await response.json();
    console.log(apiQuotes);
    newQuote();
    } catch(error){
        // Catch Error Here
    }

}

//Tweet Quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listener

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);


//On Load
getQuotes();
