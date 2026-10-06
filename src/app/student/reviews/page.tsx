'use client';

import { Star, MessageCircle, ThumbsUp } from 'lucide-react';
import { PROPERTIES } from '@/lib/data';

export default function Reviews() {
  const reviews = [
    { id: 1, propertyId: 'p1', propertyName: 'Vardhman Empire Estate', rating: 5, date: 'Oct 2, 2026', author: 'Rahul M.', text: 'Amazing place, very close to campus. Landlord is responsive.' },
    { id: 2, propertyId: 'p3', propertyName: 'Samanvay Aasra', rating: 4, date: 'Sep 15, 2026', author: 'Priya S.', text: 'Good amenities, but the internet can be a bit slow sometimes.' }
  ];

  return (
    <div className="space-y-8 pb-12 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">My Reviews</h1>
        <p className="text-text-secondary">Your feedback on properties and landlords.</p>
      </div>

      <div className="space-y-4">
        {reviews.map(review => (
          <div key={review.id} className="bg-surface border border-border rounded-2xl p-6 hover:shadow-sm transition-shadow">
             <div className="flex justify-between items-start mb-4">
               <div>
                  <h3 className="font-bold text-foreground text-lg">{review.propertyName}</h3>
                  <div className="flex items-center mt-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star key={star} size={14} className={star <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} />
                    ))}
                    <span className="text-xs text-text-secondary ml-2">{review.date}</span>
                  </div>
               </div>
               <span className="text-sm font-medium text-text-secondary">{review.author}</span>
             </div>
             <p className="text-foreground text-sm">{review.text}</p>
             <div className="mt-4 flex gap-4 text-xs text-text-secondary font-medium">
               <button className="flex items-center hover:text-primary-green transition-colors"><ThumbsUp size={14} className="mr-1"/> Helpful (3)</button>
               <button className="flex items-center hover:text-primary-green transition-colors"><MessageCircle size={14} className="mr-1"/> Comment</button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
