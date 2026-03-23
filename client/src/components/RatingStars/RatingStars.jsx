import React from 'react';
import { Star } from 'lucide-react';

const RatingStars = ({ rating, size = 16 }) => {
    return (
        <div className="flex items-center space-x-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    size={size}
                    className={`${rating >= star
                            ? 'text-yellow-400 fill-current'
                            : rating >= star - 0.5
                                ? 'text-yellow-400 fill-current' // Using full star for simplicity unless partial star logic is added
                                : 'text-navy/10'
                        }`}
                />
            ))}
            <span className="ml-2 text-xs font-bold text-navy/40">{rating}</span>
        </div>
    );
};

export default RatingStars;
