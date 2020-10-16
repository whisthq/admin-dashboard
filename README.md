# Fractal Admin Dashboard

![Node.js CI](https://github.com/fractalcomputers/admin-dashboard/workflows/Node.js%20CI/badge.svg)
[![Netlify Status](https://api.netlify.com/api/v1/badges/cafdd643-2338-419f-b542-b1c2ab933938/deploy-status)](https://app.netlify.com/sites/fractal-dashboard/deploys)

This repository contains the code for the Fractal administrator dashboard, which is an internal tool we use to deliver support and monitor the Fractal cloud infrastructure and user base. 

The dashboard webpage is hosted on Netlify [here](https://fractal-dashboard.netlify.app/). You can find the login information in the [Notion Home workspace](https://www.notion.so/fractalcomputers/Home-f9ca1ed7adad48798302754c5fb19f8b).

The Fractal dashboard can be used for:

- Seeing the list of Users and of VMs/Containers, alongside their state and relevant information
- Monitoring the status of the VMs/Containers, and setting basic parameters like protocol branch, STUN server use, etc.
- Fetching the protocol logs of user sessions, to troubleshoot and debug errors
- Accessing other important Fractal links, including AWS, GitHub, Heroku, Datadog, Sentry, Notion, Google Drive, and so on

## Development

The admin dashboard is developed using the `yarn` package manager. You can start developing by running `yarn`, and can launch into a localhost via `yarn start`. If you need to update dependencies, you can run `yarn upgrade`, followed by `yarn autoclean --init && yarn autoclean --force` to remove unnecessary files.

The `master` branch autopublishes to [https://fractal-dashboard.netlify.app](https://fractal-dashboard.netlify.app) via Netlify, which is our internal production URL, and should only be merged in via pull requests when code has been thoroughly tested.

Basic continuous integration is set up for this project. For every push or PR, basic NodeJS tests will be compiled and run within GitHub Actions. This will also attempt to format the code via Prettier and inform you if your code is not properly formatted. You should make sure that every pull request to `master` passes the build in GitHub Actions, and that you pre-formatted the code via Prettier beforehand. 

To minimize the risk of bugs, we enforce that all PR's be warning-free. You can see warnings in the terminal where the website is running locally; if a PR has warnings, the CI will fail. Note that the Netlify deploys will fail due to warnings, to enforce this design philosophy.

## Testing

We use Jest and Enzyme for testing. With `yarn` you should be able to install all the dependencies and `yarn test` should run the tests. If it fails you may need the Jest CLI globally installed. Unit tests are included as `.spec.tsx` files next to the files they test for easy development. Tests of functions are called "test" and tests of React components are called "it" (though these two are actually aliases of each other). CSS Styling properties are not rigorously tested.

If you wish to do integration testing consider setting up a folder called `__tests__`. You can also change the regex matcher in the `jest.config.js` file so that it can match `filename.test.tsx` additionally to `filename.spec.tsx`. This is preferable since we'd like whitebox tests (and integration tests) seperate from blackbox unit tests unless there are very few and it's obvious what is what.

The snapshots tests allow us to basically track how stuff changes visually and check that everything renders properly. They are usually in a `__snapshots__` folder and per Jest docs should be committed alongside modified files. These help us track visual tests + changes.

## Styling

To ensure that code formatting is standardized, and to minimize clutter in the commits, you should set up styling with [Prettier](https://prettier.io/) before making any PRs. We have [pre-commit hooks](https://pre-commit.com/) with Prettier support installed on this project, which you can initialize by first installing pre-commit via `pip install pre-commit` and then running `pre-commit install` to instantiate the hooks for Prettier.

You can always run Prettier directly from a terminal by typing `yarn format`, or you can install it directly within your IDE by via the following instructions:

### [VSCode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

Launch VS Code Quick Open (Ctrl+P/Cmd+P), paste the following command, and press enter.

```
ext install esbenp.prettier-vscode
```

To ensure that this extension is used over other extensions you may have installed, be sure to set it as the default formatter in your VS Code settings. This setting can be set for all languages or by a specific language.

```
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```
