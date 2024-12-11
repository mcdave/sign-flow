# Sign flow

This project is a simple sign flow using Next.js, TypeScript, Jest, and Playwright.

## Technologies

- **Next.js**: A React framework with hybrid static & server rendering, and route pre-fetching, etc.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **Jest**: A delightful JavaScript Testing Framework with a focus on simplicity.
- **Playwright**: A Node.js library to automate the Chromium, WebKit, and Firefox browsers with a single API.
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs.

## Features

SignFlow is a simple document management system designed to streamline the digital signature process. Below are its core features:

### Document Upload

Allows users to upload documents (e.g., PDF, DOCX).
Stores document metadata, such as the filename, upload date, and current status.
Automatically assigns a status of Pending upon upload.

### Signature Request

Users can input email addresses of signers for a specific document.
Enables multiple signers to be added to a single document.
Tracks the signature request for each signer.

### Tracking Signature Status

Displays a list of uploaded documents with their current status:
Shows individual signer statuses (e.g., Pending, Signed, or Declined).

### Simulated Notifications

Notifies users of signature updates through simulated logs:
When a document is signed.
When a signer declines a request.

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Unit testing

To run unit tests, run the following command:

```bash
npm run test
```

To run unit tests in watch mode, run the following command:

```bash
npm run test:watch
```

## E2E testing

To run E2E tests, run the following command:

```bash
npm run test:e2e
```

To run E2E tests in UI mode, run the following command:

```bash
npm run test:ui
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
