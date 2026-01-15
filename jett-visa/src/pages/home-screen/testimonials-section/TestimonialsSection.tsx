import React from 'react';
import TestimonialCard from './TestimonialCard';
import StarIcon from '@/assets/images/icons/ratingStarIcon.png';
// import { testimonialsArabicMock, testimonialsMock } from '@utility/mock/testimonialsMock';
import { useTranslation } from 'react-i18next';

// Define testimonial type
interface Testimonial {
    content: string;
    author: string;
    rating: number;
}

// Static test data - will be replaced with API integration later
const testimonialsMock: Testimonial[] = [
    {
        content: "Amazing service! Got my visa approved quickly and the process was so smooth. Highly recommend!",
        author: "Sarah Johnson",
        rating: 5
    },
    {
        content: "The team was very helpful throughout the entire process. Made traveling so much easier.",
        author: "Michael Chen",
        rating: 5
    },
    {
        content: "Fast, reliable, and professional. I'll definitely use this service again for my next trip.",
        author: "Emma Williams",
        rating: 5
    },
    {
        content: "Great experience from start to finish. The online process was straightforward and efficient.",
        author: "David Brown",
        rating: 5
    },
    {
        content: "Excellent customer support and quick turnaround time. Very satisfied with the service.",
        author: "Lisa Anderson",
        rating: 5
    }
];

const testimonialsArabicMock: Testimonial[] = [
    {
        content: "خدمة رائعة! تمت الموافقة على تأشيرتي بسرعة وكانت العملية سلسة للغاية. أنصح بشدة!",
        author: "سارة أحمد",
        rating: 5
    },
    {
        content: "كان الفريق مفيدًا جدًا طوال العملية. جعل السفر أسهل بكثير.",
        author: "محمد علي",
        rating: 5
    },
    {
        content: "سريع وموثوق ومهني. سأستخدم هذه الخدمة مرة أخرى في رحلتي القادمة.",
        author: "فاطمة حسن",
        rating: 5
    },
    {
        content: "تجربة رائعة من البداية إلى النهاية. كانت العملية عبر الإنترنت واضحة وفعالة.",
        author: "خالد إبراهيم",
        rating: 5
    },
    {
        content: "دعم عملاء ممتاز ووقت استجابة سريع. راضٍ جدًا عن الخدمة.",
        author: "نورا محمد",
        rating: 5
    }
];

const TestimonialsSection = React.memo(() => {
    const { t, i18n } = useTranslation();
    const currentLang = i18n.language;
    const testimonials = currentLang === 'ar' ? testimonialsArabicMock : testimonialsMock;

    // Convert StaticImageData to string for img src
    const starIconSrc = typeof StarIcon === 'string' ? StarIcon : (StarIcon as any)?.src || StarIcon;

    return (
        <section className="max-w-[1120px] mx-auto px-8 py-5 bg-white md:px-8 md:py-5 sm:px-4 sm:py-4">
            <h3 className="font-poppins font-semibold text-[#00366B] text-3xl mb-4 md:text-3xl md:mb-4 sm:text-xl sm:mb-3">{t('testimonials')}</h3>

            <div className="flex overflow-x-auto gap-4 pr-2 scrollbar-hide pb-2 md:gap-4 sm:gap-3">
                {testimonials.map((testimonial: Testimonial, index: number) => (
                    <TestimonialCard
                        key={index}
                        content={testimonial.content}
                        author={testimonial.author}
                        rating={testimonial.rating}
                        starIcon={starIconSrc}
                    />
                ))}
            </div>
        </section>
    );
});

export default TestimonialsSection;
