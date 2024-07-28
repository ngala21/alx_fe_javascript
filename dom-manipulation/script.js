document.addEventListener('DOMContentLoaded',function(){
  const quotes = [
      "The only way to do great work is to love what you do. - Encouragemnt",
      "Life is what happens when you're busy making other plans. - Lesson",
      "Get busy living or get busy dying. - Lesson",
      "You have within you right now, everything you need to deal with whatever the world can throw at you. - happines",
      "Believe you can and you're halfway there. - Encouragment"
  ];

  function displayRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    const quoteElement = document.createElement('div');
    quoteElement.innerHTML = randomQuote;
    document.getElementById('quoteDisplay').appendChild(quoteElement);
  }
  function addQuote() {
    const createAddQuoteForm = document.createElement('createAddQuoteForm')
    const newQuoteText = document.createElement('label');
    newQuoteText.textContent = 'Enter a new quote';
    createAddQuoteForm.appendChild(newQuoteText);
  }

});

