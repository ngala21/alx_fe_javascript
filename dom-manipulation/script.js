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
  createAddQuoteForm.appendChild(newQuoteText)

  const input = document.createElement('input');
  input.type = 'text';
  input.name='newQuote'
  createAddQuoteForm.appendChild(input)

  const newCategory = document.createElement('label');
  newCategory.textContent = 'Enter quote category:';
  createAddQuoteForm.appendChild(newCategory)


  const categoryInput = document.createElement('input');
   categoryInput.type = 'text';
  categoryInput.name = 'quoteCategory';
  createAddQuoteForm.appendChild(categoryInput)
  
      const submitButton = document.createElement('button');
      submitButton.type = 'submit';
      submitButton.textContent = 'Add Quote';
      createAddQuoteForm.appendChild(submitButton);

      
      const exportQuotesButton = document.getElementById('exportQuotesButton');
    
      
      
      
      function exportQuotes(){
      const json= JSON.stringify(quotes,null, 2);
      const blob = newBlob([json],{ type: 'application/json'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'quotes.json';
      a.click();
      console.log(url)
      }
      
      createAddQuoteForm.addEventListener('submit', function(event) {
          event.preventDefault();
          const newQuote = input.value.trim();
          if (newQuote) {
              quotes.push(newQuote);
              addQuoteToDOM(newQuote);
              input.value = '';
          }
          localStorage.setItemItem("quotes",quotes)
          localStorage.getItem('quotes')
      });
      
      document.body.appendChild(createAddQuoteForm);
  }
  
  
  function addQuoteToDOM(quote) {
      const quoteElement = document.createElement('div');
      quoteElement.innerText =quote;
      document.getElementById('quoteDisplay').appendChild(quoteElement);  
      
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
         const intervalid = setInterval(displayRandomQuote, 5000)
   }
  addQuote();
  displayRandomQuote();
  
  })