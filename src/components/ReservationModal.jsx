import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import getIcon from '../utils/iconUtils';

const ReservationModal = ({ isOpen, onClose, restaurant }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [partySize, setPartySize] = useState(2);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

  // Get icons
  const CalendarIcon = getIcon('Calendar');
  const UsersIcon = getIcon('Users');
  const ClockIcon = getIcon('Clock');
  const XIcon = getIcon('X');

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setDate('');
      setTime('');
      setPartySize(2);
      setName('');
      setEmail('');
      setPhone('');
      setSpecialRequests('');
      setAvailableTimeSlots([]);
    }
  }, [isOpen]);

  // Generate available time slots when date changes
  useEffect(() => {
    if (date) {
      setIsLoading(true);
      // Simulate API call for available time slots
      setTimeout(() => {
        const mockTimeSlots = ['17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'];
        setAvailableTimeSlots(mockTimeSlots);
        setIsLoading(false);
      }, 800);
    }
  }, [date]);

  const handleDateChange = (e) => {
    setDate(e.target.value);
    setTime(''); // Reset time when date changes
  };

  const handleTimeSelect = (selectedTime) => {
    setTime(selectedTime);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!date || !time || !partySize || !name || !email || !phone) {
      toast.error('Please fill in all required fields');
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
      onClose();
      toast.success(`Reservation confirmed at ${restaurant.name}! A confirmation has been sent to your email.`);
    }, 1500);
  };

  // Get today's date in YYYY-MM-DD format for min date in date picker
  const today = new Date().toISOString().split('T')[0];

  return (
    <AnimatePresence>
      {isOpen && restaurant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-white dark:bg-surface-800 rounded-xl shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Reserve a Table at {restaurant.name}</h3>
                <button 
                  onClick={onClose}
                  className="text-surface-500 hover:text-surface-700 dark:hover:text-surface-300"
                >
                  <XIcon className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label htmlFor="date" className="label flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4" /> Select Date*
                    </label>
                    <input
                      type="date"
                      id="date"
                      min={today}
                      value={date}
                      onChange={handleDateChange}
                      className="input"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="party-size" className="label flex items-center gap-2">
                      <UsersIcon className="w-4 h-4" /> Party Size*
                    </label>
                    <select
                      id="party-size"
                      value={partySize}
                      onChange={(e) => setPartySize(Number(e.target.value))}
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
                    <ClockIcon className="w-4 h-4" /> Select Time*
                  </label>
                  
                  {date ? (
                    isLoading ? (
                      <div className="flex justify-center py-6">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                      </div>
                    ) : availableTimeSlots.length > 0 ? (
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {availableTimeSlots.map(timeSlot => (
                          <button
                            type="button"
                            key={timeSlot}
                            onClick={() => handleTimeSelect(timeSlot)}
                            className={`py-2 px-3 rounded-lg text-center transition-colors ${
                              time === timeSlot
                                ? 'bg-primary text-white'
                                : 'bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600'
                            }`}
                          >
                            {timeSlot}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <p className="text-surface-500 dark:text-surface-400 py-2">
                        No available time slots for this date.
                      </p>
                    )
                  ) : (
                    <p className="text-surface-500 dark:text-surface-400 py-2">
                      Please select a date first to see available times.
                    </p>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="name" className="label">Full Name*</label>
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="input" required />
                  </div>
                  <div>
                    <label htmlFor="phone" className="label">Phone Number*</label>
                    <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="input" required />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="email" className="label">Email Address*</label>
                  <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input" required />
                </div>
                
                <button type="submit" className="btn btn-primary w-full" disabled={!date || !time || isLoading}>
                  {isLoading ? 'Processing...' : 'Complete Reservation'}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ReservationModal;