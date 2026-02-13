const API_URL = 'http://localhost:8000/index.php?rest_route=/wp/v2';

// Types
export interface Book {
  id: number;
  title: string;
  slug: string;
  content: string;
  featured_media?: number;
  meta?: {
    hg_author?: string;
    hg_illustrator?: string;
    hg_age_range?: string;
    hg_theme?: string;
    hg_features?: string[];
  };
}

export interface Coffee {
  id: number;
  title: string;
  slug: string;
  content: string;
  featured_media?: number;
  meta?: {
    hg_location?: string;
    hg_specialty?: string;
    hg_featured?: string;
  };
}

export interface MonthlyBox {
  id: number;
  title: string;
  slug: string;
  content: string;
  featured_media?: number;
  meta?: {
    hg_month?: string;
    hg_theme?: string;
    hg_book_id?: number;
    hg_coffee_id?: number;
    hg_fact_card?: string;
    hg_activity?: string;
  };
}

// API Functions
export const wordpressAPI = {
  // Books
  getBooks: async (): Promise<Book[]> => {
    try {
      const response = await fetch(`${API_URL}/books?per_page=100&_fields=id,title,slug,content,featured_media,meta`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Error fetching books:', error);
      return [];
    }
  },

  getBook: async (id: number): Promise<Book | null> => {
    try {
      const response = await fetch(`${API_URL}/books/${id}?_fields=id,title,slug,content,featured_media,meta`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    } catch (error) {
      console.error('Error fetching book:', error);
      return null;
    }
  },

  // Coffee
  getCoffee: async (): Promise<Coffee[]> => {
    try {
      const response = await fetch(`${API_URL}/coffee?per_page=100&_fields=id,title,slug,content,featured_media,meta`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Error fetching coffee:', error);
      return [];
    }
  },

  getCoffeeById: async (id: number): Promise<Coffee | null> => {
    try {
      const response = await fetch(`${API_URL}/coffee/${id}?_fields=id,title,slug,content,featured_media,meta`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    } catch (error) {
      console.error('Error fetching coffee:', error);
      return null;
    }
  },

  // Monthly Boxes
  getMonthlyBoxes: async (): Promise<MonthlyBox[]> => {
    try {
      const response = await fetch(`${API_URL}/monthly-boxes?per_page=100&_fields=id,title,slug,content,featured_media,meta`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Error fetching monthly boxes:', error);
      return [];
    }
  },

  getMonthlyBox: async (id: number): Promise<MonthlyBox | null> => {
    try {
      const response = await fetch(`${API_URL}/monthly-boxes/${id}?_fields=id,title,slug,content,featured_media,meta`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    } catch (error) {
      console.error('Error fetching monthly box:', error);
      return null;
    }
  },

  // Helper function to extract meta fields
  extractMeta: (item: any) => item.meta || {},
};
