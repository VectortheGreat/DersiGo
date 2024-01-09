# Dersigo

This is a Next.Js task prepared for OpakYazılım. The Task aims to use Dummyapi service with Next.Js

- [Demo](https://dersigo.vercel.app/)

## Features:

- **All User Requests**
- **All Post Requests**
- **Pagination**
- **Searching Users and Posts**

## Important:

- Since there is no searching support in the backend side, I fetch the searched value with a loop. This is the only thing I can do from the frontend side so the search result takes a while. But there is no problem with searching tag because there is backend support for it.
- Since no specific design was specified with Figma, etc., I used a simple design. The project was a JS-oriented project rather than CSS.

## Usage:

1. Clone or Install the project and Open your terminal and run:

   ```bash
   npm install

   ```

2. Create a .env file in your project and get API key from [Dummy Api](https://dummyapi.io/) :

   ```bash
   NEXT_PUBLIC_PUBLICAPI_KEY=your_api_key

   ```

3. Once your .env file is set up, run the project with:

   ```bash
   npm run dev
   ```

Explore and enjoy the Dersigo experience! Feel free to contribute and make this project even better.
