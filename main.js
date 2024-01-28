class Movie {
    constructor(title, genre, releaseYear) {
      Object.assign(this, { title, genre, releaseYear, isAvailable: true });
    }
  }
  
  class Customer {
    constructor(name, email) {
      Object.assign(this, { name, email, rentals: [] });
    }
  }
  
  class Rental {
    constructor(movie, customer, rentalDate) {
      Object.assign(this, { movie, customer, rentalDate, returnDate: null });
    }
  
    returnMovie(returnDate) {
      this.returnDate = returnDate;
      this.movie.isAvailable = true;
    }
  }
  
  class MovieRentingAPI {
    constructor() {
      Object.assign(this, { movies: [], customers: [], rentals: [] });
    }
  
    addMovie(title, genre, releaseYear) {
      const movie = new Movie(title, genre, releaseYear);
      this.movies.push(movie);
      return movie;
    }
  
    addCustomer(name, email) {
      const customer = new Customer(name, email);
      this.customers.push(customer);
      return customer;
    }
  
    rentMovie(movie, customer, rentalDate) {
      if (!movie.isAvailable) {
        console.log('Movie is not available for rent.');
        return null;
      }
  
      const rental = new Rental(movie, customer, rentalDate);
      this.rentals.push(rental);
      movie.isAvailable = false;
      customer.rentals.push(rental);
  
      return rental;
    }
  
    listAvailableMovies() {
      return this.movies.filter((movie) => movie.isAvailable);
    }
  
    listCustomerRentals(customer) {
      return customer.rentals;
    }
  }
  
  // Example Usage:
  
  const movieRentingAPI = new MovieRentingAPI();
  
  // Add movies
  const movie1 = movieRentingAPI.addMovie('Inception', 'Sci-Fi', 2010);
  const movie2 = movieRentingAPI.addMovie('The Shawshank Redemption', 'Drama', 1994);
  
  // Add customers
  const customer1 = movieRentingAPI.addCustomer('John Doe', 'john@example.com');
  const customer2 = movieRentingAPI.addCustomer('Jane Doe', 'jane@example.com');
  
  // Rent movies
  const rental1 = movieRentingAPI.rentMovie(movie1, customer1, new Date('2024-01-20'));
  const rental2 = movieRentingAPI.rentMovie(movie2, customer2, new Date('2024-01-22'));
  
  // Return a rented movie
  rental1.returnMovie(new Date('2024-01-25'));
  
  // List available movies
  const availableMovies = movieRentingAPI.listAvailableMovies();
  console.log('Available Movies:', availableMovies.map((movie) => movie.title));
  
  // List customer rentals
  const customer1Rentals = movieRentingAPI.listCustomerRentals(customer1);
  console.log('Customer 1 Rentals:', customer1Rentals.map((rental) => rental.movie.title));
  