document.addEventListener('DOMContentLoaded', fetchQuotes);

const quoteForm = document.getElementById('quote-form');
const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const quotesList = document.getElementById('quotes-list');

// Fetch and display all quotes
async function fetchQuotes() {
    const res = await fetch('http://localhost:5000/api/quotes');
    const quotes = await res.json();
    quotesList.innerHTML = quotes.map(quote => `
        <li>
            <span>"${quote.text}" - ${quote.author}</span>
            <button class="delete" onclick="deleteQuote('${quote._id}')">Delete</button>
        </li>
    `).join('');
}

// Add a new quote
quoteForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const newQuote = {
        text: quoteText.value,
        author: quoteAuthor.value
    };

    await fetch('http://localhost:5000/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newQuote)
    });

    quoteText.value = '';
    quoteAuthor.value = '';
    fetchQuotes();
});

// Delete a quote
async function deleteQuote(id) {
    await fetch(`http://localhost:5000/api/quotes/${id}`, {
        method: 'DELETE'
    });
    fetchQuotes();
}
