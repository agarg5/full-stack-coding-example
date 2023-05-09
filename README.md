# Description
A search-as-you type autocomplete feature similar to Google Search. The backend simulates fetching search results and the minimal frontend displays these results.


# What I would work on if I were to spend more time on this project:

- use turbo repo to avoid having to simplify the setup instructions below
- use Typescript rather than Javascript
- throttle user input to limit API requests sent to backend
- change to headless UI component to have buttons such as "I'm feeling lucky"
- host app (on localhost for now. can host it on heroku for example, but would also then need to host backend if hosting FE)
- improve UI for search input to match GIF (e.g. border on input)
- separate FE into multiple files
- only show 10 results

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
