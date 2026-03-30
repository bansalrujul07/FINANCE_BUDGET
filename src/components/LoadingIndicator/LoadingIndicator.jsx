import { motion } from 'framer-motion';

function LoadingIndicator({ text = 'Loading...' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="loading-state"
    >
      <span className="spinner" />
      <span>{text}</span>
    </motion.div>
  );
}

export default LoadingIndicator;
