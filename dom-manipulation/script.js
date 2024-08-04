/* 
** A Totally Real Project by a total "Software Engineer" 
** @author: Ngala21
*/

// Project => Dynamic Quote Generator

// Project Focus => DOM Manipulation, Web Storage and working with JSON data

// Manage an array  of quote objects where each quote has a text and a category
const quotes = [
  {
    text: "Find a group of people who challenge and inspire you; spend a lot of time with them, and it will change your life.",
    category: "Friendship"
  },
  {
    text: "I always wanted to be somebody, but now I realize I should have been more specific.",
    category: "Funny"
  },
  {
    text: "Your life only gets better when you get better.",
    category: "Motivational"
  },
  {
    text: "Believe you can and you're halfway there.",
    category: "Encouragememt"
  },
  {
    text: "Innovation distinguishes between a leader and a follower.",
    category: "Leadership"
  }
];

// Display new quote
function addQuoteToDOM(quote) {
  const quoteDisplay = document.getElementById('quoteDisplay');
  quoteDisplay.textContent = quote.text;
}

document.addEventListener('DOMContentLoaded', ()=> {
  // Display random quote   
  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.textContent = randomQuote.text;
  }

// Add New Quote
function addedQuote() {
  const createAddQuoteForm = document.createElement ('form');
  createAddQuoteForm.setAttribute("id", "createQuoteForm");

  const newQuoteText = document.createElement('label');
  newQuoteText.textContent = 'Enter a new quote';
  createAddQuoteForm.appendChild(newQuoteText)

  const quoteTextInput = document.createElement('input');
  quoteTextInput.setAttribute("id", "newQuote") 
  quoteTextInput.type = 'text';
  quoteTextInput.name='newQuote'
  createAddQuoteForm.appendChild(quoteTextInput);

  const newCategory = document.createElement('label');
  newCategory.textContent = 'Enter quote category:';
  createAddQuoteForm.appendChild(newCategory);


  const categoryInput = document.createElement('input');
  categoryInput.setAttribute("id", "quoteCategory");
  categoryInput.type = 'text';
  categoryInput.name = 'quoteCategory';
  createAddQuoteForm.appendChild(categoryInput);

  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Add Quote';
  createAddQuoteForm.appendChild(submitButton);
  // const exportQuotesButton = document.getElementById('exportQuotesButton');
  
  function exportQuotes(){
  const json= JSON.stringify(quotes,null, 2);
  const blob = newBlob([json],{ type: 'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'quotes.json';
  a.click();
  console.log(url);
  };
    
  document.body.appendChild(createAddQuoteForm);
}


function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes);
      saveQuotes();
      alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
    console.log(fileReader)
    console.log(importedQuotes)
  }

  function updateQuoteDisplay() {
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = '';
  } 
  
    function populateCategories() {
        const categoryFilter = document.getElementById('categoryFilter');
        const categories = quotes.map(quote => quote.category); 
        const uniqueCategories = [...new Set(categories)]; 
    
        categoryFilter.innerHTML = '<option value="all">All Categories</option>'; 
        uniqueCategories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categoryFilter.appendChild(option);
        });
    }
    
    function filterQuotes() {
        const selectedCategory = document.getElementById('categoryFilter').value;
        const filteredQuotes = selectedCategory === 'all'
            ? quotes
            : quotes.filter(quote => quote.category === selectedCategory);
        
        const quoteContainer = document.getElementById('quoteContainer');
        quoteContainer.innerHTML = '';
    
  }

   async function fetchQuotesFromServer(){
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts',{
            method: 'POST',
              headers:{
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(exampleData)
            })
              if (!response.ok){
                throw new Error('Network response was not ok')
              }
              const data = await response.json();
              console.log('Quotes synced with server!', data);
              quotes= data.slice(0,10).map(post=> ({
                text: post.body,
              }))
              saveQuotes();
        } catch (error) {
            
        }
   }
 function syncQuotes(){
       const intervalid = setInterval(showRandomQuote, 5000)
 }
// addQuote();
// showRandomQuote();

const randomQuoteBtn = document.getElementById('newQuote');
randomQuoteBtn.addEventListener('click', showRandomQuote);

  // if (newQuote) {
  //     quotes.push(newQuote);
  //     addQuoteToDOM(newQuote);
  //     input.value = '';
  // }
  localStorage.setItemItem("quotes",quotes);
  localStorage.getItem('quotes')
});

function addQuote(){
// Add New Quote => Event Listener

  const quoteTextInput = document.getElementById("newQuoteText");
  const newQuoteText = quoteTextInput.value.trim();


  const categoryInput = document.getElementById("newQuoteCategory");
  const newQuoteCategory = categoryInput.value.trim();

  const newQuote = {
    text: newQuoteText,
    category: newQuoteCategory
  }

  quotes.push(newQuote);
  addQuoteToDOM(newQuote);

}
