# Description
A search-as-you type autocomplete feature similar to Google Search. The backend simulates fetching search results and the minimal frontend displays these results.


# What I would work on if I were to spend more time on this project:

- use turbo repo to avoid having to simplify the setup instructions below
- use Typescript rather than Javascript
- throttle user input to limit API requests sent to backend
- separate FE into multiple files
- limit number of search results shown
- support additional styling options and UI around the search input


# How it works:

- uses Trie in backend to search
- highlights matched text in search results

# Issues:

- formatting of query data (`backend/queries.txt`). It should be a tsv file, but it doesn't actually have proper separation by tabs

# To get started:

In `frontend`:

- run `npm install`
- run `npm start`

In `backend`

- run `npm install`
- run `npm run dev`
