import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import getIcon from '../utils/iconUtils';

const MainFeature = () => {
  // Selected restaurant state
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [showReservationForm, setShowReservationForm] = useState(false);
  
  // Reservation form state initialized with today's date
  const today = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState(today);
  const [time, setTime] = useState('');
  const [partySize, setPartySize] = useState(2);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  
  // Get icons
  const CalendarIcon = getIcon('Calendar');
  const UsersIcon = getIcon('Users');
  const ClockIcon = getIcon('Clock');
  const ChevronRightIcon = getIcon('ChevronRight');
  const ChevronLeftIcon = getIcon('ChevronLeft');
  const CheckCircleIcon = getIcon('CheckCircle');
  const XIcon = getIcon('X');

  // Mock restaurant data
  const featuredRestaurant = {
    id: '123',
    name: 'Riverside Grill',
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Upscale dining with waterfront views, specializing in premium steaks and fresh seafood.',
    cuisine: 'Steakhouse',
    address: '789 Riverside Dr, Waterfront District',
    rating: 4.8,
    priceRange: '$$$',
    openHours: '17:00 - 23:00'
  };

  useEffect(() => {
    // Set featured restaurant after component mounts
    setTimeout(() => {
      setSelectedRestaurant(featuredRestaurant);
    }, 300);
  }, []);

  useEffect(() => {
    // Generate available time slots when date changes
    if (date) {
      setIsLoading(true);
      // Simulate API call for available time slots
      setTimeout(() => {
        // Organized time slots by meal period
        const mockTimeSlots = {
          lunch: ['11:30', '12:00', '12:30', '13:00', '13:30', '14:00'],
          afternoon: ['14:30', '15:00', '15:30', '16:00', '16:30'],
          dinner: ['17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'],
          lateNight: ['22:00', '22:30']
        };
        
        // Filter available slots based on current time if date is today
        if (date === today) {
          // For demo purposes, just showing all slots
        }
        
        setAvailableTimeSlots(mockTimeSlots);
        setIsLoading(false);
      }, 800);
    }
  }, [date]);

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    if (selectedDate) {
      setDate(selectedDate);
      setTime(''); // Reset time when date changes
    }
  };

  const handleTimeSelect = (selectedTime) => {
    setTime(selectedTime);
  };

  const handlePartySizeChange = (e) => {
    setPartySize(Number(e.target.value));
  };

  const handleNextStep = () => {
    if (step === 1) {
      // Validate step 1
      if (!date || !time || !partySize) {
        toast.error('Please complete all fields to continue');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      // Validate step 2
      if (!name || !email || !phone) {
        toast.error('Please provide your contact information');
        return;
      }
      
      if (!email.includes('@') || !email.includes('.')) {
        toast.error('Please enter a valid email address');
        return;
      }
      
      // Submit reservation
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        setStep(3); // Success step
        toast.success('Your reservation has been confirmed!');
      }, 1500);
    }
  };

  const handleBackStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleStartOver = () => {
    setDate('');
    setTime(today);
    setPartySize(2);
    setName('');
    setEmail('');
    setPhone('');
    setSpecialRequests('');
    setStep(1);
    setShowReservationForm(false);
  };

  return (
    <section className="mb-12">
      <div className="flex flex-col md:flex-row justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Make a Reservation</h2>
          <p className="text-surface-600 dark:text-surface-300 max-w-2xl">
            Reserve your table in just a few steps and receive instant confirmation
          </p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!showReservationForm ? (
          <motion.div
            key="restaurant-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {selectedRestaurant ? (
              <div className="card overflow-hidden">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="lg:w-1/3 h-48 md:h-auto rounded-xl overflow-hidden">
                    <img 
                      src={selectedRestaurant.image} 
                      alt={selectedRestaurant.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="lg:w-2/3 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                        <h3 className="text-xl md:text-2xl font-bold">{selectedRestaurant.name}</h3>
                        <div className="flex items-center bg-surface-100 dark:bg-surface-700 px-3 py-1 rounded-full">
                          <span className="text-yellow-500 mr-1">★</span>
                          <span className="font-medium">{selectedRestaurant.rating}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-x-4 gap-y-2 mb-3 text-sm text-surface-600 dark:text-surface-300">
                        <div>{selectedRestaurant.cuisine}</div>
                        <div>{selectedRestaurant.priceRange}</div>
                        <div>{selectedRestaurant.openHours}</div>
                      </div>
                      
                      <p className="text-surface-700 dark:text-surface-200 mb-4 line-clamp-2 md:line-clamp-3">
                        {selectedRestaurant.description}
                      </p>
                      
                      <div className="text-sm text-surface-500 mb-6">
                        <div className="flex items-start">
                          <div className="mt-0.5 mr-2">📍</div>
                          <div>{selectedRestaurant.address}</div>
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => setShowReservationForm(true)}
                      className="btn btn-primary w-full md:w-auto"
                    >
                      Book a Table
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="card h-64 flex items-center justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="reservation-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="card"
          >
            {step === 1 && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">Reservation Details</h3>
                  <button 
                    onClick={() => setShowReservationForm(false)}
                    className="text-surface-500 hover:text-surface-700 dark:hover:text-surface-300"
                  >
                    <XIcon className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="date" className="label flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4" /> Select Date
                    </label>
                    <input
                      type="date"
                      id="date"
                      min={today}
                      max={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                      value={date}
                      onChange={handleDateChange}
                      className="input"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="party-size" className="label flex items-center gap-2">
                      <UsersIcon className="w-4 h-4" /> Party Size
                    </label>
                    <select
                      id="party-size"
                      value={partySize}
                      onChange={handlePartySizeChange}
                      className="select"
                      required
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(size => (
                        <option key={size} value={size}>
                          {size} {size === 1 ? 'person' : 'people'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="label flex items-center gap-2 mb-3">
                    <ClockIcon className="w-4 h-4" /> Select Time
                  </label>
                  
                  {!date && <p className="text-red-500">Please select a date first</p>}
                  {isLoading ? (
                      <div className="flex justify-center py-6">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                      </div>
                    ) : availableTimeSlots && Object.keys(availableTimeSlots).length > 0 ? (
                      <div className="space-y-6">
                        {/* Lunch time slots */}
                        {availableTimeSlots.lunch && availableTimeSlots.lunch.length > 0 && (
                          <div className="mb-4">
                            <h4 className="text-sm font-medium mb-2 text-surface-600 dark:text-surface-300 flex items-center">
                              <span className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 p-1 rounded mr-2">
                                🍽️
                              </span>
                              Lunch
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {availableTimeSlots.lunch.map(timeSlot => (
                                <button
                                  key={timeSlot}
                                  type="button"
                                  onClick={() => handleTimeSelect(timeSlot)}
                                  className={`py-2 px-3.5 rounded-lg text-center transition-all duration-200 ${
                                    time === timeSlot
                                      ? 'bg-primary text-white shadow-md scale-105 font-medium'
                                      : 'bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 hover:scale-105'
                                  }`}
                                >
                                  {timeSlot}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {/* Afternoon time slots */}
                        {availableTimeSlots.afternoon && availableTimeSlots.afternoon.length > 0 && (
                          <div className="mb-4">
                            <h4 className="text-sm font-medium mb-2 text-surface-600 dark:text-surface-300 flex items-center">
                              <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 p-1 rounded mr-2">
                                ☕
                              </span>
                              Afternoon
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {availableTimeSlots.afternoon.map(timeSlot => (
                                <button
                                  key={timeSlot}
                                  type="button"
                                  onClick={() => handleTimeSelect(timeSlot)}
                                  className={`py-2 px-3.5 rounded-lg text-center transition-all duration-200 ${
                                    time === timeSlot
                                      ? 'bg-primary text-white shadow-md scale-105 font-medium'
                                      : 'bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 hover:scale-105'
                                  }`}
                                >
                                  {timeSlot}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {/* Dinner time slots */}
                        {availableTimeSlots.dinner && availableTimeSlots.dinner.length > 0 && (
                          <div className="mb-4">
                            <h4 className="text-sm font-medium mb-2 text-surface-600 dark:text-surface-300 flex items-center">
                              <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 p-1 rounded mr-2">
                                🍷
                              </span>
                              Dinner
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {availableTimeSlots.dinner.map(timeSlot => (
                                <button
                                  key={timeSlot}
                                  type="button"
                                  onClick={() => handleTimeSelect(timeSlot)}
                                  className={`py-2 px-3.5 rounded-lg text-center transition-all duration-200 ${
                                    time === timeSlot
                                      ? 'bg-primary text-white shadow-md scale-105 font-medium'
                                      : 'bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 hover:scale-105'
                                  }`}
                                >
                                  {timeSlot}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {/* Late Night time slots */}
                        {availableTimeSlots.lateNight && availableTimeSlots.lateNight.length > 0 && (
                          <div>
                            <h4 className="text-sm font-medium mb-2 text-surface-600 dark:text-surface-300 flex items-center">
                              <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 p-1 rounded mr-2">
                                🌙
                              </span>
                              Late Night
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {availableTimeSlots.lateNight.map(timeSlot => (
                                <button
                                  key={timeSlot}
                                  type="button"
                                  onClick={() => handleTimeSelect(timeSlot)}
                                  className={`py-2 px-3.5 rounded-lg text-center transition-all duration-200 ${
                                    time === timeSlot
                                      ? 'bg-primary text-white shadow-md scale-105 font-medium'
                                      : 'bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 hover:scale-105'
                                  }`}
                                >
                                  {timeSlot}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-surface-500 dark:text-surface-400 py-2 text">
                  )}
                </div>
                
                <div className="flex justify-end">
                  <button
                    onClick={handleNextStep}
                    className="btn btn-primary flex items-center gap-2"
                    disabled={!date || !time || !partySize}
                  >
                    Continue <ChevronRightIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
            
            {step === 2 && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">Contact Information</h3>
                  <button 
                    onClick={() => setShowReservationForm(false)}
                    className="text-surface-500 hover:text-surface-700 dark:hover:text-surface-300"
                  >
                    <XIcon className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="mb-4 p-3 bg-surface-50 dark:bg-surface-800 rounded-lg">
                  <p className="text-sm font-medium text-surface-700 dark:text-surface-300">
                    Reservation Summary:
                  </p>
                  <p className="text-sm text-surface-600 dark:text-surface-400">
                    {selectedRestaurant.name} • {format(new Date(date), 'EEEE, MMMM d, yyyy')} • {time} • {partySize} {partySize === 1 ? 'person' : 'people'}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="name" className="label">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="input"
                      placeholder="John Smith"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="label">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="input"
                      placeholder="(555) 123-4567"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="email" className="label">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="special-requests" className="label">Special Requests (Optional)</label>
                  <textarea
                    id="special-requests"
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="input min-h-[80px]"
                    placeholder="Any dietary restrictions, accessibility needs, or special occasions?"
                  ></textarea>
                </div>
                
                <div className="flex justify-between">
                  <button
                    onClick={handleBackStep}
                    className="btn btn-outline flex items-center gap-2"
                  >
                    <ChevronLeftIcon className="w-5 h-5" /> Back
                  </button>
                  
                  <button
                    onClick={handleNextStep}
                    className="btn btn-primary flex items-center gap-2"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                        Processing
                      </>
                    ) : (
                      <>
                        Complete Reservation <ChevronRightIcon className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
            
            {step === 3 && (
              <div className="text-center py-6">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                    <CheckCircleIcon className="w-10 h-10 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold mb-2">Reservation Confirmed!</h3>
                <p className="text-surface-600 dark:text-surface-300 mb-6 max-w-md mx-auto">
                  Your table at {selectedRestaurant.name} has been reserved for {format(new Date(date), 'EEEE, MMMM d')} at {time}. A confirmation email has been sent to {email}.
                </p>
                
                <div className="mb-8 p-4 bg-surface-50 dark:bg-surface-800 rounded-lg max-w-md mx-auto">
                  <div className="mb-3 text-left">
                    <h4 className="font-medium text-lg mb-2">Reservation Details</h4>
                    <div className="grid grid-cols-[100px_1fr] gap-1 text-sm">
                      <div className="text-surface-500">Restaurant:</div>
                      <div className="font-medium">{selectedRestaurant.name}</div>
                      
                      <div className="text-surface-500">Date:</div>
                      <div className="font-medium">{format(new Date(date), 'EEEE, MMMM d, yyyy')}</div>
                      
                      <div className="text-surface-500">Time:</div>
                      <div className="font-medium">{time}</div>
                      
                      <div className="text-surface-500">Party Size:</div>
                      <div className="font-medium">{partySize} {partySize === 1 ? 'person' : 'people'}</div>
                      
                      <div className="text-surface-500">Confirmation #:</div>
                      <div className="font-medium">TM{Math.floor(Math.random() * 900000) + 100000}</div>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={handleStartOver}
                  className="btn btn-primary"
                >
                  Make Another Reservation
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default MainFeature;