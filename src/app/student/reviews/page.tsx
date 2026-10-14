'use client';

import { Star, MessageCircle, ThumbsUp, MoreHorizontal, Home } from 'lucide-react';
import Link from 'next/link';

export default function Reviews() {
  const reviews = [
    { 
      id: 1, 
      propertyId: 'p7', 
      propertyName: 'Aasra Apartment (Samanvay Aasra)', 
      rating: 5, 
      date: 'Oct 13, 2026', 
      author: 'Saransh Jkluuu', 
      avatar: '/images/image%20copy.png',
      text: 'Aasra apartment is really good and spacious. Super convenient commute to campus, peaceful surroundings for study, 24/7 security, and prompt maintenance response. Perfect place for students.',
      images: [
        '/room/Aasra/image.png',
        '/room/Aasra/image%20copy.png',
        '/room/Aasra/image%20copy%202.png'
      ]
    },
    { 
      id: 2, 
      propertyId: 'p8', 
      propertyName: 'Samanvay The New Door', 
      rating: 5, 
      date: 'Oct 8, 2026', 
      author: 'Pratham', 
      avatar: 'https://res.cloudinary.com/eprhemvt/image/upload/v1787060387/sabrang-2026/tech-team-credit/Pratham.png',
      text: 'Lived in Samanvay The New Door at Mahindra Sez. The flat is extremely spacious, peaceful environment, and all fittings are top tier. Super easy commute to college and great society security.' 
    },
    { id: 3, propertyId: 'p1', propertyName: 'Vardhman Empire Estate', rating: 5, date: 'Oct 2, 2026', author: 'shivam k.', text: 'Amazing place, very close to campus. Landlord is highly responsive and the included amenities were exactly as described.' },
    { id: 4, propertyId: 'p7', propertyName: 'Samanvay Aasra', rating: 4, date: 'Sep 15, 2026', author: 'Priya S.', text: 'Good amenities, but the internet can be a bit slow sometimes during peak hours. Otherwise a great community to live in.' }
  ];

  return (
    <div className="space-y-8 pb-12 max-w-[1400px] mx-auto mt-4 px-4 md:px-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-primary-blue mb-2 tracking-tight">My Reviews</h1>
          <p className="text-text-secondary">Manage the feedback you've left on properties and landlords.</p>
        </div>
        <Link href="/student/explore" className="px-6 py-3 bg-primary-orange text-white font-bold rounded-xl shadow-md hover:bg-orange-600 transition-colors flex items-center w-fit text-sm">
           <Home size={16} className="mr-2" /> Write a New Review
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {reviews.map(review => (
          <div key={review.id} className="bg-white border-2 border-border rounded-[2rem] p-8 hover:shadow-xl transition-all flex flex-col group relative overflow-hidden">
             
             {/* Subtle Background Accent */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-light-orange rounded-bl-full opacity-50 -z-10 transition-transform group-hover:scale-110"></div>
             
             <div className="flex justify-between items-start mb-6">
               <div className="z-10">
                  <h3 className="font-extrabold text-primary-blue text-2xl mb-1.5 line-clamp-1">{review.propertyName}</h3>
                  <div className="flex items-center">
                    <div className="flex items-center bg-surface-light px-3 py-1.5 rounded-full border border-border">
                      {[1, 2, 3, 4, 5].map(star => (
                        <Star key={star} size={14} className={star <= review.rating ? 'text-yellow-400 fill-yellow-400 drop-shadow-sm' : 'text-gray-200'} />
                      ))}
                      <span className="font-bold text-foreground text-xs ml-2">{review.rating}.0</span>
                    </div>
                    <span className="text-xs font-bold text-text-secondary ml-3">{review.date}</span>
                  </div>
               </div>
               <button className="text-text-secondary hover:text-primary-blue p-2 rounded-full hover:bg-surface-light transition-colors z-10">
                  <MoreHorizontal size={20} />
               </button>
             </div>
             
             <p className="text-text-secondary leading-relaxed font-medium mb-4 z-10 flex-1">"{review.text}"</p>
             
             {/* Review Photos by Student */}
             {(review as any).images && (review as any).images.length > 0 && (
               <div className="flex gap-2.5 mb-6 overflow-x-auto pb-1 z-10">
                 {(review as any).images.map((img: string, idx: number) => (
                   <div key={idx} className="w-24 h-20 rounded-xl overflow-hidden border border-border shrink-0 shadow-xs group/img">
                     <img src={img} alt="review photo" className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-300" />
                   </div>
                 ))}
               </div>
             )}
             
             <div className="flex items-center justify-between border-t border-border pt-6 z-10">
               <div className="flex items-center gap-2">
                 <div className="w-8 h-8 rounded-full bg-primary-blue text-white overflow-hidden flex items-center justify-center font-bold text-[10px] shrink-0 border border-border">
                   {(review as any).avatar ? (
                     <img src={(review as any).avatar} alt={review.author} className="w-full h-full object-cover" />
                   ) : (
                     <>{review.author.split(' ')[0][0]}{review.author.split(' ')[1] ? review.author.split(' ')[1][0] : ''}</>
                   )}
                 </div>
                 <span className="text-sm font-bold text-foreground">{review.author}</span>
               </div>
               
               <div className="flex gap-3 text-xs font-bold text-text-secondary">
                 <button className="flex items-center px-4 py-2 rounded-xl border border-border hover:border-primary-orange hover:text-primary-orange transition-colors bg-white shadow-sm group/btn">
                    <ThumbsUp size={14} className="mr-2 text-text-secondary group-hover/btn:text-primary-orange transition-colors"/> Helpful (3)
                 </button>
                 <button className="flex items-center px-4 py-2 rounded-xl border border-border hover:border-primary-blue hover:text-primary-blue transition-colors bg-white shadow-sm group/btn">
                    <MessageCircle size={14} className="mr-2 text-text-secondary group-hover/btn:text-primary-blue transition-colors"/> Comment
                 </button>
               </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
