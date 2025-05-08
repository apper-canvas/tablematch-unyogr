import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';
import MainFeature from '../components/MainFeature';
import ReservationModal from '../components/ReservationModal';

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCuisine, setSelectedCuisine] = useState('all');
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const MapPinIcon = getIcon('MapPin');
  const SearchIcon = getIcon('Search');
  const FilterIcon = getIcon('Filter');

  // Mock data for restaurants
  const mockRestaurants = [
    {
      id: '1',
      name: 'La Petite Bistro',
      cuisine: 'French',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      address: '123 Gourmet Lane, Downtown',
      rating: 4.7,
      priceRange: '$$$',
      availableTables: 3,
      nextAvailable: '19:00'
    },
    {
      id: '2',
      name: 'Sakura Sushi',
      cuisine: 'Japanese',
      image: 'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      address: '45 Ocean Drive, Waterfront',
      rating: 4.5,
      priceRange: '$$',
      availableTables: 5,
      nextAvailable: '18:30'
    },
    {
      id: '3',
      name: 'Trattoria Bella',
      cuisine: 'Italian',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      address: '789 Pasta Road, Little Italy',
      rating: 4.8,
      priceRange: '$$$',
      availableTables: 2,
      nextAvailable: '20:15'
    },
    {
      id: '4',
      name: 'Spice Garden',
      cuisine: 'Indian',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      address: '42 Curry Avenue, Spice District',
      rating: 4.3,
      priceRange: '$$',
      availableTables: 7,
      nextAvailable: '18:00'
    },
    {
      id: '5',
      name: 'The Grill House',
      cuisine: 'American',
      image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      address: '101 Steakhouse Blvd, Uptown',
      rating: 4.6,
      priceRange: '$$$',
      availableTables: 4,
      nextAvailable: '19:30'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setRestaurants(mockRestaurants);
      setLoading(false);
      toast.info("Showing restaurants near your location");
    }, 1500);
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCuisineChange = (e) => {
    setSelectedCuisine(e.target.value);
  };

  const handleReserveTable = (restaurant) => {
    setSelectedRestaurant(restaurant);
    toast.info(`Preparing reservation for ${restaurant.name}`);
  };

  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         restaurant.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCuisine = selectedCuisine === 'all' || restaurant.cuisine === selectedCuisine;
    return matchesSearch && matchesCuisine;
  });

  const uniqueCuisines = ['all', ...new Set(restaurants.map(r => r.cuisine))];

  return (
    <div className="space-y-8">
      <section className="mb-8">
        <div className="relative rounded-2xl overflow-hidden h-48 md:h-64 lg:h-80 bg-gradient-to-r from-secondary to-secondary-light">
          <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-center text-white p-4 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4"
            >
              Find Your Perfect Table
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl max-w-lg"
            >
              Discover and reserve tables at the best restaurants near you
            </motion.p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search restaurants or locations..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="input pl-10"
            />
          </div>
          <div className="relative md:w-48">
            <FilterIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400 w-5 h-5" />
            <select
              value={selectedCuisine}
              onChange={handleCuisineChange}
              className="select pl-10"
            >
              {uniqueCuisines.map(cuisine => (
                <option key={cuisine} value={cuisine}>
                  {cuisine === 'all' ? 'All Cuisines' : cuisine}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : filteredRestaurants.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map(restaurant => (
              <motion.div
                key={restaurant.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="card group hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <div className="relative h-48 -mx-4 -mt-4 mb-4 overflow-hidden">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 bg-white dark:bg-surface-800 rounded-full px-2 py-1 text-xs font-bold">
                    {restaurant.priceRange}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                    <span className="inline-block bg-accent text-secondary-dark text-xs font-semibold rounded px-2 py-1">
                      {restaurant.availableTables} tables available
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg md:text-xl font-bold mb-1">{restaurant.name}</h3>
                  <div className="flex items-center mb-2">
                    <span className="text-sm text-surface-600 dark:text-surface-300">{restaurant.cuisine}</span>
                    <span className="mx-2 text-surface-300">•</span>
                    <div className="flex items-center">
                      <span className="text-yellow-500">★</span>
                      <span className="ml-1 text-sm">{restaurant.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-surface-500 text-sm mb-4">
                    <MapPinIcon className="w-4 h-4 mr-1 flex-shrink-0" />
                    <span className="truncate">{restaurant.address}</span>
                  </div>
                  
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-surface-600 dark:text-surface-400">
                      Next available: <span className="font-semibold">{restaurant.nextAvailable}</span>
                    </span>
                    <button 
                      onClick={() => {
                        handleReserveTable(restaurant);
                      }}
                      className="btn btn-primary"
                    >
                      Reserve Table
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-surface-100 dark:bg-surface-800 rounded-xl">
            <h3 className="text-xl font-medium mb-2">No restaurants found</h3>
            <p className="text-surface-500">Try adjusting your search criteria</p>
          </div>
        )}
      </section>

      <MainFeature />
      
      <ReservationModal 
        isOpen={!!selectedRestaurant} 
        onClose={() => setSelectedRestaurant(null)} 
        restaurant={selectedRestaurant}
      />
    </div>
  );
};

export default Home;