import axios from 'axios';

const ACCESS_KEY = '8O50V7bNzfKdVixwS9W9nZVdr0VnrCv9gmeimfdvp6Y'; // Centralize key

// Existing searchImages function (ensure it also uses the centralized ACCESS_KEY)
export const searchImages = async (term, page) => {
  const response = await axios.get('https://api.unsplash.com/search/photos', {
    headers: {
      Authorization: `Client-ID ${ACCESS_KEY}`,
    },
    params: {
      query: term,
      page: page,
      per_page: 30,
    },
  });
  return response.data;
};

// New function for latest images
export const getLatestImages = async (page) => {
  const response = await axios.get('https://api.unsplash.com/photos', {
    headers: {
      Authorization: `Client-ID ${ACCESS_KEY}`,
    },
    params: {
      page: page,
      per_page: 30,
      order_by: 'latest', // Explicitly order by latest, though it's default for /photos
    },
  });
  // The /photos endpoint returns an array directly, not an object with a 'results' property.
  // It also provides total count in X-Total header and links for pagination.
  // For consistency with searchImages, we might need to shape the response or handle it differently in App.js
  // For now, let's return what App.js's performSearch expects: an object with 'results' and 'total_pages'.
  // We'll need to get total_pages from headers if possible or make an assumption.
  // Unsplash API returns total items in 'X-Total' header for /photos.
  const totalItems = parseInt(response.headers['x-total'], 10);
  const totalPages = Math.ceil(totalItems / 30);

  return {
    results: response.data, // response.data is the array of photos
    total_pages: totalPages,
    total: totalItems // good to have total items as well
  };
};

// Default export might need to be removed or changed if using named exports primarily
// For now, keeping a default export might be fine if old imports expect it,
// but it's better to be consistent. Let's assume we'll switch to named imports for searchImages.
// export default searchImages; // Remove if all imports become named
