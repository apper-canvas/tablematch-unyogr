import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

const NotFound = () => {
  const MapIcon = getIcon('Map');
  const HomeIcon = getIcon('Home');

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-[70vh] flex flex-col items-center justify-center text-center p-4"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="bg-surface-100 dark:bg-surface-800 w-20 h-20 rounded-full flex items-center justify-center mb-6"
      >
        <MapIcon className="w-10 h-10 text-primary" />
      </motion.div>
      
      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-4xl md:text-5xl font-bold mb-4"
      >
        404
      </motion.h1>
      
      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-2xl md:text-3xl font-semibold mb-4"
      >
        Table Not Found
      </motion.h2>
      
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="text-surface-600 dark:text-surface-300 max-w-md mb-8"
      >
        It seems the table you're looking for has been reserved by someone else. Let's find you another great spot to dine.
      </motion.p>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <Link 
          to="/" 
          className="btn btn-primary flex items-center justify-center gap-2"
        >
          <HomeIcon className="w-5 h-5" />
          Back to Home
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default NotFound;