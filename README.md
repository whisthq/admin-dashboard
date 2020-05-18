# Fractal Admin Dashboard

This repository contains the code for the Fractal dashboard used to deliver support and monitor the Fractal cloud infrastructure and our users.

The dashboard webpage is hosted on Netlify at: https://fractal-dashboard.netlify.app/

The username to access the dashboard: `fractal-admin`

The password to access the dasbhoard: `!!fractal-admin-password!!123`

The Fractal dashboard can be used for:
- Seeing the list of Users
- Seeing the list of VMs
- Monitoring the status of the VMs
- Fetching the protocol logs of user sessions to troubleshoot and debug errors
- Accessing other important Fractal links, including GitHub, Slack, Notion and Google Drive

## Development

The admin dashboard is developed using the `npm` package manager. You can start developing by running `npm install`, and can launch into a localhost via `npm start`.

If you need to update dependencies, you can run `npm upgrade`, followed by `npm prune` to remove unnecessary dependencies.
