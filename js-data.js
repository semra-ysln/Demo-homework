/**
 * BookStore Data Management Module
 * Handles LocalStorage operations, CRUD, and Golden Data reset
 * 
 * Usage:
 *   bookStore.init()                    - Initialize with golden data
 *   bookStore.getBooks()                - Get all books
 *   bookStore.addBook(bookData)         - Add new book
 *   bookStore.updateBook(id, data)      - Update existing book
 *   bookStore.deleteBook(id)            - Delete book by ID
 *   bookStore.resetData()               - Reset to golden state
 */

class BookStore {
  constructor() {
    this.storageKey = 'bookstore_books';
    this.goldenDataUrl = './golden-data.json';
    this.books = [];
  }

  /**
   * Initialize BookStore with golden data if localStorage is empty
   * Called once when app starts
   */
  async init() {
    try {
      // Check if data exists in localStorage
      const storedData = localStorage.getItem(this.storageKey);
      
      if (storedData) {
        // Load from localStorage
        this.books = JSON.parse(storedData);
        console.log(`✅ Loaded ${this.books.length} books from localStorage`);
      } else {
        // Load from golden data file
        console.log('📥 Loading golden data...');
        await this.loadGoldenData();
      }
    } catch (error) {
      console.error('❌ Error during init:', error);
      // Fallback: Try to load golden data
      await this.loadGoldenData();
    }
  }

  /**
   * Load golden data from JSON file
   * @private
   */
  async loadGoldenData() {
    try {
      const response = await fetch(this.goldenDataUrl);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch golden data: ${response.statusText}`);
      }
      
      this.books = await response.json();
      this.saveToStorage();
      console.log(`✅ Golden data loaded: ${this.books.length} books`);
    } catch (error) {
      console.error('❌ Error loading golden data:', error);
      this.books = [];
    }
  }

  /**
   * Get all books from current state
   * @returns {Array} Array of book objects
   */
  getBooks() {
    return this.books;
  }

  /**
   * Add new book to collection
   * @param {Object} bookData - Book object (title, author, price, category, cover, sales)
   * @throws {Error} If validation fails
   */
  addBook(bookData) {
    try {
      // Validation
      const errors = this.validateBook(bookData);
      if (errors.length > 0) {
        throw new Error(`Validation failed: ${errors.join(', ')}`);
      }

      // Generate new ID
      const newId = this.books.length > 0 
        ? Math.max(...this.books.map(b => b.id)) + 1 
        : 1;

      // Create book object
      const newBook = {
        id: newId,
        title: bookData.title.trim(),
        author: bookData.author.trim(),
        price: parseFloat(bookData.price),
        category: bookData.category,
        cover: bookData.cover.trim(),
        sales: bookData.sales || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      };

      // Add to collection
      this.books.push(newBook);

      // Save to localStorage
      this.saveToStorage();

      console.log(`✅ Book added: "${newBook.title}" (ID: ${newBook.id})`);
      return newBook;
    } catch (error) {
      console.error('❌ Error adding book:', error.message);
      throw error;
    }
  }

  /**
   * Update existing book
   * @param {Number} id - Book ID
   * @param {Object} updateData - Fields to update
   * @throws {Error} If book not found or validation fails
   */
  updateBook(id, updateData) {
    try {
      // Find book
      const bookIndex = this.books.findIndex(b => b.id === id);
      if (bookIndex === -1) {
        throw new Error(`Book with ID ${id} not found`);
      }

      const book = this.books[bookIndex];

      // Merge update data
      const updatedBook = {
        ...book,
        ...updateData,
        id: book.id // Prevent ID change
      };

      // Validate updated book
      const errors = this.validateBook(updatedBook);
      if (errors.length > 0) {
        throw new Error(`Validation failed: ${errors.join(', ')}`);
      }

      // Update
      this.books[bookIndex] = updatedBook;

      // Save to localStorage
      this.saveToStorage();

      console.log(`✅ Book updated: "${updatedBook.title}"`);
      return updatedBook;
    } catch (error) {
      console.error('❌ Error updating book:', error.message);
      throw error;
    }
  }

  /**
   * Delete book by ID
   * @param {Number} id - Book ID
   * @throws {Error} If book not found
   */
  deleteBook(id) {
    try {
      const bookIndex = this.books.findIndex(b => b.id === id);
      
      if (bookIndex === -1) {
        throw new Error(`Book with ID ${id} not found`);
      }

      const deletedBook = this.books[bookIndex];
      
      // Remove from array
      this.books.splice(bookIndex, 1);

      // Save to localStorage
      this.saveToStorage();

      console.log(`✅ Book deleted: "${deletedBook.title}"`);
      return deletedBook;
    } catch (error) {
      console.error('❌ Error deleting book:', error.message);
      throw error;
    }
  }

  /**
   * Reset to golden state (initial 20 books)
   * Clears localStorage and reloads from golden-data.json
   */
  async resetData() {
    try {
      console.log('🔄 Resetting to golden state...');
      
      // Clear localStorage
      localStorage.removeItem(this.storageKey);
      
      // Reload golden data
      await this.loadGoldenData();
      
      console.log('✅ System reset to golden state');
      return this.books;
    } catch (error) {
      console.error('❌ Error resetting data:', error.message);
      throw error;
    }
  }

  /**
   * Validate book object before add/update
   * @private
   * @param {Object} book - Book object to validate
   * @returns {Array} Array of error messages (empty if valid)
   */
  validateBook(book) {
    const errors = [];

    // Title validation
    if (!book.title || typeof book.title !== 'string') {
      errors.push('Title is required');
    } else if (book.title.trim().length < 3) {
      errors.push('Title must be at least 3 characters');
    } else if (book.title.trim().length > 100) {
      errors.push('Title must not exceed 100 characters');
    }

    // Author validation
    if (!book.author || typeof book.author !== 'string') {
      errors.push('Author is required');
    } else if (book.author.trim().length < 2) {
      errors.push('Author name must be at least 2 characters');
    }

    // Price validation
    if (book.price === undefined || book.price === null) {
      errors.push('Price is required');
    } else if (typeof book.price !== 'number' && isNaN(parseFloat(book.price))) {
      errors.push('Price must be a number');
    } else if (parseFloat(book.price) <= 0) {
      errors.push('Price must be greater than 0');
    } else if (parseFloat(book.price) > 999.99) {
      errors.push('Price must not exceed 999.99');
    }

    // Category validation
    const validCategories = [
      'Roman', 'Bilim Kurgu', 'Tarih', 'Biyografi', 'Aşçılık',
      'Bilim', 'Çocuk', 'Şiir', 'Öykü', 'İş/Ekonomi'
    ];
    if (!book.category || !validCategories.includes(book.category)) {
      errors.push(`Category must be one of: ${validCategories.join(', ')}`);
    }

    // Cover URL validation
    if (!book.cover || typeof book.cover !== 'string') {
      errors.push('Cover image URL is required');
    } else if (!this.isValidUrl(book.cover)) {
      errors.push('Cover image URL is not valid');
    }

    return errors;
  }

  /**
   * Check if string is valid URL
   * @private
   * @param {String} string - URL string
   * @returns {Boolean}
   */
  isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  }

  /**
   * Save books array to localStorage as JSON
   * @private
   */
  saveToStorage() {
    try {
      const jsonData = JSON.stringify(this.books);
      localStorage.setItem(this.storageKey, jsonData);
      console.log(`💾 Saved ${this.books.length} books to localStorage`);
    } catch (error) {
      console.error('❌ Error saving to localStorage:', error);
      throw error;
    }
  }

  /**
   * Export books data as JSON string (for debugging)
   * @returns {String} JSON representation of books
   */
  exportData() {
    return JSON.stringify(this.books, null, 2);
  }

  /**
   * Get statistics about current books
   * @returns {Object} Statistics object
   */
  getStatistics() {
    if (this.books.length === 0) {
      return {
        totalBooks: 0,
        totalRevenue: 0,
        averagePrice: 0,
        totalSales: 0,
        categories: {}
      };
    }

    const totalRevenue = this.books.reduce((sum, book) => {
      const bookRevenue = book.sales.reduce((a, b) => a + b, 0) * book.price;
      return sum + bookRevenue;
    }, 0);

    const totalSales = this.books.reduce((sum, book) => {
      return sum + book.sales.reduce((a, b) => a + b, 0);
    }, 0);

    const averagePrice = this.books.reduce((sum, book) => sum + book.price, 0) / this.books.length;

    const categories = {};
    this.books.forEach(book => {
      if (!categories[book.category]) {
        categories[book.category] = 0;
      }
      categories[book.category]++;
    });

    return {
      totalBooks: this.books.length,
      totalRevenue: totalRevenue.toFixed(2),
      averagePrice: averagePrice.toFixed(2),
      totalSales,
      categories
    };
  }

  /**
   * Get monthly revenue array (for Chart.js)
   * @returns {Array} 12-month revenue array
   */
  getMonthlyRevenue() {
    const monthlyData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    this.books.forEach(book => {
      book.sales.forEach((sales, month) => {
        monthlyData[month] += sales * book.price;
      });
    });

    return monthlyData.map(rev => parseFloat(rev.toFixed(2)));
  }
}

// Create global instance
const bookStore = new BookStore();
