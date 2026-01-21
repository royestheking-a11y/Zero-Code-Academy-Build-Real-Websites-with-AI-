import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';

const MarketplaceLayout = () => {
    return (
        <div className="min-h-screen bg-background">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
            >
                <Outlet />
            </motion.div>
        </div>
    );
};

export default MarketplaceLayout;
