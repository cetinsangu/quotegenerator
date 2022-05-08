const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const copyButton = document.getElementById('copy');
const speechButton = document.getElementById('speech');
const twitterButton = document.getElementById('twitter');
const whatsappButton = document.getElementById('whatsapp');
const newQuoteButton = document.getElementById('new-quote');
const loader = document.getElementById('loader');
const hideIcon = document.querySelector('.hide-icon');
const copied = document.querySelector('.copied');
const synth = speechSynthesis;

let quoteData = [];

function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function finish() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

function randomQuote() {
  const randomQuote = quoteData[Math.floor(Math.random() * quoteData.length)];
  if (randomQuote.text.length > 200) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }
  quoteText.textContent = randomQuote.text;

  authorText.textContent = !randomQuote.author ? 'Unknown' : randomQuote.author;
  copied.classList.add('copy-hidden');
}

function copyQuote() {
  navigator.clipboard.writeText(
    `${quoteText.textContent} - ${authorText.textContent} | Via. xxx`
  );
  copied.classList.remove('copy-hidden');
}

function textToSpeech() {
  let utterance = new SpeechSynthesisUtterance(
    `${quoteText.textContent} by ${authorText.textContent}`
  );
  synth.speak(utterance);
}

function shareTwitter() {
  const shareUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}%0a - Via. Cetin`;
  window.open(shareUrl, '_blank');
}

function shareWhatsapp() {
  const shareUrl = `https://api.whatsapp.com/send?text=${quoteText.textContent} - ${authorText.textContent}%0a | via. Cetin`;
  window.open(shareUrl, '_blank');
}

async function generateQuotes() {
  try {
    loading();
    const quoteUrl = 'https://type.fit/api/quotes';
    const response = await fetch(quoteUrl);
    quoteData = await response.json();
    randomQuote();
    finish();
  } catch (error) {
    console.error(error);
  }
}
generateQuotes();

newQuoteButton.addEventListener('click', randomQuote);
copyButton.addEventListener('click', copyQuote);
speechButton.addEventListener('click', textToSpeech);
twitterButton.addEventListener('click', shareTwitter);
whatsappButton.addEventListener('click', shareWhatsapp);
