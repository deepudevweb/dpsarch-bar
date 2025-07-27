import axios from 'axios';

const ACCESS_KEY = '8O50V7bNzfKdVixwS9W9nZVdr0VnrCv9gmeimfdvp6Y';

// Existing searchImages function
export const searchImages = async (term, page = 1, perPage = 30) => {
  const response = await axios.get('https://api.unsplash.com/search/photos', {
    headers: {
      Authorization: `Client-ID ${ACCESS_KEY}`,
    },
    params: {
      query: term,
      page: page,
      per_page: perPage,
    },
  });
  return response.data;
};

// Get latest images
export const getLatestImages = async (page = 1, perPage = 30) => {
  const response = await axios.get('https://api.unsplash.com/photos', {
    headers: {
      Authorization: `Client-ID ${ACCESS_KEY}`,
    },
    params: {
      page: page,
      per_page: perPage,
      order_by: 'latest',
    },
  });
  
  const totalItems = parseInt(response.headers['x-total'], 10) || 1000;
  const totalPages = Math.ceil(totalItems / perPage);

  return {
    results: response.data,
    total_pages: totalPages,
    total: totalItems
  };
};

// Get popular/featured images
export const getFeaturedImages = async (page = 1, perPage = 30) => {
  const response = await axios.get('https://api.unsplash.com/photos', {
    headers: {
      Authorization: `Client-ID ${ACCESS_KEY}`,
    },
    params: {
      page: page,
      per_page: perPage,
      order_by: 'popular',
    },
  });
  
  const totalItems = parseInt(response.headers['x-total'], 10) || 1000;
  const totalPages = Math.ceil(totalItems / perPage);

  return {
    results: response.data,
    total_pages: totalPages,
    total: totalItems
  };
};

// Get random images for carousel
export const getRandomImages = async (count = 10, featured = true) => {
  const response = await axios.get('https://api.unsplash.com/photos/random', {
    headers: {
      Authorization: `Client-ID ${ACCESS_KEY}`,
    },
    params: {
      count: count,
      featured: featured,
      orientation: 'landscape'
    },
  });
  return response.data;
};

// Get images by category with high quality
export const getCategoryImages = async (category, page = 1, perPage = 30) => {
  const response = await axios.get('https://api.unsplash.com/search/photos', {
    headers: {
      Authorization: `Client-ID ${ACCESS_KEY}`,
    },
    params: {
      query: `${category} wallpaper`,
      page: page,
      per_page: perPage,
      orientation: 'landscape',
      order_by: 'relevant'
    },
  });
  return response.data;
};

// Get collections
export const getCollections = async (page = 1) => {
  const response = await axios.get('https://api.unsplash.com/collections', {
    headers: {
      Authorization: `Client-ID ${ACCESS_KEY}`,
    },
    params: {
      page: page,
      per_page: 10,
    },
  });
  return response.data;
};

// Download image (trigger download)
export const downloadImage = async (imageUrl, filename) => {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Download failed:', error);
    throw error;
  }
};

// Wallpaper categories list
export const wallpaperCategories = [
  'Nature',
  'Abstract',
  'Animals',
  'Architecture',
  'Art',
  'Cars',
  'City',
  'Dark',
  'Fantasy',
  'Flowers',
  'Food',
  'Landscape',
  'Minimalist',
  'Mountains',
  'Ocean',
  'People',
  'Space',
  'Sports',
  'Technology',
  'Travel',
  'Vintage',
  'Wildlife'
];
