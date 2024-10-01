# Kadince Personal Task Manager

This is a React Task List Assignment project, created as part of the evaluation for a Fullstack Software Engineer position at Kadince. The project includes Jest and Tailwind CSS as dependencies.

## Project Structure

```
Kadince Personal Task Manager
├── package.json
├── public
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src
│   ├── __tests__
│   │   ├── App.test.tsx
│   │   ├── setupTests.ts
│   │   └── TodoItem.test.tsx
│   ├── components
│   │   ├── FilterButtons.tsx
│   │   ├── Header.tsx
│   │   ├── KadinceLogo.tsx
│   │   ├── Modal.tsx
│   │   ├── TodoForm.tsx
│   │   ├── TodoItem.tsx
│   │   └── TodoListItems.tsx
│   ├── custom.d.ts
│   ├── index.css
│   ├── index.tsx
│   ├── lib
│   │   ├── helpers.ts
│   │   └── types.ts
│   ├── pages
│   │   └── TodoList.tsx
│   ├── react-app-env.d.ts
│   └── App.tsx
├── tailwind.config.js
└── tsconfig.json
```

## Most Relevant Scripts

In the project directory, you can run:

### [`npm start`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fhome%2Flucascq%2FLucas%2FProjects%2Ftodo-kadince%2Fpublic%2Findex.html%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A38%2C%22character%22%3A37%7D%7D%5D%2C%22bde5e623-799b-4586-b7c3-ee579bf8d7f2%22%5D "Go to definition")

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### [`npm test`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fhome%2Flucascq%2FLucas%2FProjects%2Ftodo-kadince%2Fsrc%2F__tests__%2FApp.test.tsx%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A109%2C%22character%22%3A1%7D%7D%5D%2C%22bde5e623-799b-4586-b7c3-ee579bf8d7f2%22%5D "Go to definition")

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.


## Basic Functions of the App

### Add a Todo

To add a new to-do item, enter the title and, optionally, the description in the input fields and click the "Create" button. The new to-do item will be added to the list.

### Edit a Todo

To edit an existing to-do item, click the edit button (✎) next to the to-do item. A modal will appear with the current title and description. Make the necessary changes and click the "Save" button to update the to-do item.

### Delete a Todo

To delete a to-do item, click the delete button (✕) next to the to-do item. A confirmation modal will appear. Click the "Confirm" button to delete the to-do item.

### Toggle Complete

To mark a to-do item as complete or incomplete, click on the check button (✔) of the to-do item. The item will be toggled between Complete and Pending states.

### Filter Todos

To filter the to-do items, use the filter buttons ("All", "Pending", "Completed") to view all items, only pending items, or only completed items, respectively.

## End

Thank you for your time reading this document.
