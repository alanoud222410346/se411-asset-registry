# Architecture

## Tech stack

| Part | Technology |
|---|---|
| UI library | React 19 |
| Build tool | Vite |
| Routing | react-router-dom |
| State | React Context + useState |
| Tests | Vitest, React Testing Library |
| Styling | Plain CSS (black and white) |
| Data | In-memory array |

## Features

- List all computers in a table.
- Add a computer with form validation.
- Edit a computer using the same form.
- Delete a computer with a confirmation message.
- Navigation menu on every page.
- About page with the team members.

## Folder structure

```
src/
  main.jsx                   starts the app, adds Router and Provider
  App.jsx                    navigation bar and routes
  index.css                  all styles
  data/assets.js             starting data and status options
  context/AssetContext.jsx   state and functions for assets
  components/NavBar.jsx      menu
  pages/AssetList.jsx        table page
  pages/AssetForm.jsx        add and edit form
  pages/About.jsx            team page
  test/                      tests
```

## Component tree

```
BrowserRouter
  AssetProvider
    App
      NavBar
      Routes
        AssetList    (/)
        AssetForm    (/add)
        AssetForm    (/edit/:id)
        About        (/about)
```

## State management

All asset data lives in `AssetProvider` (`src/context/AssetContext.jsx`) in one `useState` array. It starts from `initialAssets` in `src/data/assets.js`.

The provider gives these to every component through `useAssets()`:

| Name | What it does |
|---|---|
| assets | The current array |
| addAsset(asset) | Adds an asset and gives it a new id |
| updateAsset(id, changes) | Changes an asset |
| deleteAsset(id) | Removes an asset |
| getAsset(id) | Returns one asset by id |

Because the data is only in memory, it resets when the page is refreshed. In Part 2 these functions will call the backend instead.

## How the form works

`AssetForm` is used for both add and edit. If the URL has an `id` it is in edit mode and the form starts with that asset's values. On submit it checks the required fields, shows errors if needed, then calls `addAsset` or `updateAsset` and goes back to the list.

## Tests

Tests are in `src/test/`. They cover the list (display, edit link, delete with confirm and cancel, empty list) and the form (validation, add, edit, not found). Run them with `npm run test`.
