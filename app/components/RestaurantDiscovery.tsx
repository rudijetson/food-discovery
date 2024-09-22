'use client';

// Imports
import { useState, useEffect } from 'react'
import { Search, MapPin, Star, ExternalLink, Clock, Phone, Heart } from 'lucide-react'
import Image from 'next/image';

// Expanded mock data for restaurants
const restaurants = [
    {
      id: 1,
      name: "Ollie's Trolley",
      cuisine: "American",
      rating: 4.5,
      priceRange: "$$",
      address: "1607 Central Ave, Cincinnati, OH 45214",
      phoneNumber: "(513) 381-6100",
      website: "https://www.facebook.com/ollies.trolley.9",
      hours: "Mon-Sat: 10:30AM-8PM, Sun: Closed",
      popularDishes: ["Ollie Burger", "Seasoned Fries", "Fish Sandwich"],
      reviews: [
        { source: "Google", text: "Best burgers in Cincinnati! The Ollie burger is a must-try.", rating: 5 },
        { source: "Yelp", text: "Great food and friendly service. A true Cincinnati gem.", rating: 4 },
      ],
      instagramPosts: ["/placeholder.svg?height=150&width=150", "/placeholder.svg?height=150&width=150"],
      tiktokVideos: ["/placeholder.svg?height=200&width=150"],
    },
    {
      id: 2,
      name: "Jazzy Sweeties",
      cuisine: "Soul Food",
      rating: 4.3,
      priceRange: "$$$",
      address: "1105 St Gregory St, Cincinnati, OH 45202",
      phoneNumber: "(513) 407-6973",
      website: "https://www.jazzysweeties.com",
      hours: "Tue-Thu: 11AM-8PM, Fri-Sat: 11AM-10PM, Sun-Mon: Closed",
      popularDishes: ["Shrimp and Grits", "Chicken and Waffles", "Sweet Potato Pie"],
      reviews: [
        { source: "Google", text: "Amazing soul food with a modern twist. The atmosphere is fantastic!", rating: 4 },
        { source: "Yelp", text: "Delicious food and great jazz music. Perfect for a night out.", rating: 5 },
      ],
      instagramPosts: ["/placeholder.svg?height=150&width=150", "/placeholder.svg?height=150&width=150"],
      tiktokVideos: ["/placeholder.svg?height=200&width=150"],
    },
    {
      id: 3,
      name: "Island Frydays",
      cuisine: "Caribbean",
      rating: 4.6,
      priceRange: "$$",
      address: "2826 Short Vine St, Cincinnati, OH 45219",
      phoneNumber: "(513) 498-0680",
      website: "http://www.islandfrydays.com",
      hours: "Mon-Sat: 11AM-9PM, Sun: Closed",
      popularDishes: ["Jerk Chicken", "Oxtail", "Plantains"],
      reviews: [
        { source: "Google", text: "Authentic Caribbean flavors that transport you to the islands!", rating: 5 },
        { source: "Yelp", text: "The jerk chicken is out of this world. Great portion sizes too!", rating: 4 },
      ],
      instagramPosts: ["/placeholder.svg?height=150&width=150", "/placeholder.svg?height=150&width=150"],
      tiktokVideos: ["/placeholder.svg?height=200&width=150"],
    },
    {
      id: 4,
      name: "Conscious Kitchen",
      cuisine: "Vegan",
      rating: 4.4,
      priceRange: "$$",
      address: "6810 Vine St, Cincinnati, OH 45216",
      phoneNumber: "(513) 834-7163",
      website: "https://www.consciouskitchencincinnati.com",
      hours: "Tue-Sat: 11AM-7PM, Sun-Mon: Closed",
      popularDishes: ["Vegan BBQ Sandwich", "Kale Salad", "Sweet Potato Fries"],
      reviews: [
        { source: "Google", text: "Delicious vegan food that even non-vegans will love!", rating: 4 },
        { source: "Yelp", text: "Healthy, flavorful, and satisfying. A great addition to Cincinnati's food scene.", rating: 5 },
      ],
      instagramPosts: ["/placeholder.svg?height=150&width=150", "/placeholder.svg?height=150&width=150"],
      tiktokVideos: ["/placeholder.svg?height=200&width=150"],
    },
    {
      id: 5,
      name: "Cream + Sugar Coffeehouse",
      cuisine: "Cafe",
      rating: 4.7,
      priceRange: "$",
      address: "3546 Montgomery Rd, Cincinnati, OH 45207",
      phoneNumber: "(513) 206-7291",
      website: "https://www.creamsugarcoffee.com",
      hours: "Mon-Fri: 7AM-7PM, Sat-Sun: 8AM-6PM",
      popularDishes: ["Lavender Latte", "Avocado Toast", "Cinnamon Roll"],
      reviews: [
        { source: "Google", text: "Cozy atmosphere and fantastic coffee. A great place to work or meet friends.", rating: 5 },
        { source: "Yelp", text: "The pastries are to die for, and the staff is always friendly.", rating: 4 },
      ],
      instagramPosts: ["/placeholder.svg?height=150&width=150", "/placeholder.svg?height=150&width=150"],
      tiktokVideos: ["/placeholder.svg?height=200&width=150"],
    },
  ]

// Main Component
// Define the Restaurant type
type Restaurant = {
  id: number;
  name: string;
  cuisine: string;
  rating: number;
  priceRange: string;
  address: string;
  phoneNumber: string;
  website: string;
  hours: string;
  popularDishes: string[];
  reviews: { source: string; text: string; rating: number; }[];
  instagramPosts: string[];
  tiktokVideos: string[];
};

export default function RestaurantDiscovery() {
  // State Declarations
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants)
  const [favorites, setFavorites] = useState<number[]>([])
  const [showFavorites, setShowFavorites] = useState(false)
  const [filters, setFilters] = useState({
    cuisine: "",
    priceRange: "",
    rating: 0,
  })

  // Effect for Filtering Restaurants
  useEffect(() => {
    const results = restaurants.filter(restaurant =>
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.popularDishes.some(dish => dish.toLowerCase().includes(searchTerm.toLowerCase()))
    ).filter(restaurant =>
      (filters.cuisine === "" || restaurant.cuisine === filters.cuisine) &&
      (filters.priceRange === "" || restaurant.priceRange === filters.priceRange) &&
      (filters.rating === 0 || restaurant.rating >= filters.rating)
    )
    setFilteredRestaurants(results)
  }, [searchTerm, filters])

  // Helper Functions
  const toggleFavorite = (restaurantId: number) => {
    setFavorites(prevFavorites =>
      prevFavorites.includes(restaurantId)
        ? prevFavorites.filter(id => id !== restaurantId)
        : [...prevFavorites, restaurantId]
    )
  }

  const cuisines = Array.from(new Set(restaurants.map(r => r.cuisine)))
  const priceRanges = Array.from(new Set(restaurants.map(r => r.priceRange)))

  // JSX Structure
  return (
    <div className="flex flex-col h-screen bg-amber-50">
      {/* Header */}
      <header className="bg-amber-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Black-Owned Restaurants in Cincinnati</h1>
        <button
          onClick={() => setShowFavorites(!showFavorites)}
          className="bg-amber-700 hover:bg-amber-800 text-white font-bold py-2 px-4 rounded"
        >
          {showFavorites ? "Show All" : "Show Favorites"}
        </button>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Restaurant List */}
        <div className="w-1/3 p-4 bg-white overflow-y-auto border-r border-amber-200">
          {/* Search Bar */}
          <div className="mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search restaurants..."
                className="w-full p-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
          </div>

          {/* Filters */}
          <div className="mb-4">
            <h3 className="font-bold text-lg mb-2">Filters</h3>
            <div className="space-y-2">
              <select
                className="w-full p-2 border rounded-md"
                value={filters.cuisine}
                onChange={(e) => setFilters({...filters, cuisine: e.target.value})}
              >
                <option value="">All Cuisines</option>
                {cuisines.map(cuisine => (
                  <option key={cuisine} value={cuisine}>{cuisine}</option>
                ))}
              </select>
              <select
                className="w-full p-2 border rounded-md"
                value={filters.priceRange}
                onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
              >
                <option value="">All Price Ranges</option>
                {priceRanges.map(price => (
                  <option key={price} value={price}>{price}</option>
                ))}
              </select>
              <select
                className="w-full p-2 border rounded-md"
                value={filters.rating}
                onChange={(e) => setFilters({...filters, rating: Number(e.target.value)})}
              >
                <option value={0}>All Ratings</option>
                <option value={3}>3+ Stars</option>
                <option value={4}>4+ Stars</option>
                <option value={4.5}>4.5+ Stars</option>
              </select>
            </div>
          </div>

          {/* Restaurant List Items */}
          {filteredRestaurants
            .filter(restaurant => !showFavorites || favorites.includes(restaurant.id))
            .map((restaurant) => (
            <div
              key={restaurant.id}
              className="p-4 mb-2 bg-amber-100 rounded-md cursor-pointer hover:bg-amber-200 transition duration-200 relative"
              onClick={() => setSelectedRestaurant(restaurant)}
            >
              <h3 className="font-bold text-amber-900">{restaurant.name}</h3>
              <p className="text-sm text-amber-700">{restaurant.cuisine}</p>
              <div className="flex items-center mt-1">
                <Star className="text-amber-500 mr-1" size={16} />
                <p className="text-sm text-amber-700">{restaurant.rating}</p>
                <p className="text-sm text-amber-700 ml-2">{restaurant.priceRange}</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(restaurant.id);
                }}
                className="absolute top-2 right-2"
              >
                <Heart
                  size={20}
                  className={favorites.includes(restaurant.id) ? "text-red-500 fill-current" : "text-gray-400"}
                />
              </button>
            </div>
          ))}
        </div>

        {/* Restaurant Details */}
        <div className="w-2/3 p-4 bg-white overflow-y-auto">
          {selectedRestaurant ? (
            <div>
              <h2 className="text-3xl font-bold mb-2 text-amber-900">{selectedRestaurant.name}</h2>
              <p className="text-amber-700 mb-2">{selectedRestaurant.cuisine}</p>
              <div className="flex items-center text-amber-700 mb-2">
                <MapPin size={16} className="mr-1" /> 
                <p>{selectedRestaurant.address}</p>
              </div>
              <div className="flex items-center text-amber-700 mb-2">
                <Phone size={16} className="mr-1" />
                <p>{selectedRestaurant.phoneNumber}</p>
              </div>
              <div className="flex items-center text-amber-700 mb-2">
                <Clock size={16} className="mr-1" />
                <p>{selectedRestaurant.hours}</p>
              </div>
              <a 
                href={selectedRestaurant.website} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-amber-600 hover:text-amber-800 flex items-center mb-4"
              >
                Visit Website <ExternalLink size={16} className="ml-1" />
              </a>
              <div className="mb-6">
                <h3 className="font-bold text-xl mb-2 text-amber-900">Popular Dishes</h3>
                <ul className="list-disc list-inside text-amber-700">
                  {selectedRestaurant.popularDishes.map((dish, index) => (
                    <li key={index}>{dish}</li>
                  ))}
                </ul>
              </div>
              <div className="mb-6">
                <h3 className="font-bold text-xl mb-2 text-amber-900">Reviews</h3>
                {selectedRestaurant.reviews.map((review, index) => (
                  <div key={index} className="mb-2 p-3 bg-amber-100 rounded-md">
                    <p className="font-semibold text-amber-800">{review.source} - {review.rating}/5</p>
                    <p className="text-amber-700">{review.text}</p>
                  </div>
                ))}
              </div>
              <div className="mb-6">
                <h3 className="font-bold text-xl mb-2 text-amber-900">Instagram Posts</h3>
                <div className="flex space-x-2">
                  {selectedRestaurant.instagramPosts.map((post, index) => (
                    <Image 
                      key={index} 
                      src={post} 
                      alt="Instagram post" 
                      width={128} 
                      height={128} 
                      className="object-cover rounded-md" 
                    />
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2 text-amber-900">TikTok Videos</h3>
                <div className="flex space-x-2">
                  {selectedRestaurant.tiktokVideos.map((video, index) => (
                    <div key={index} className="w-36 h-48 bg-amber-200 rounded-md flex items-center justify-center">
                      <span className="text-amber-700">TikTok Video</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-amber-600">
              Select a restaurant to view details
            </div>
          )}
        </div>
      </div>
    </div>
  )
}