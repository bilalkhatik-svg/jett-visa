"use client";

import React, { useEffect, useRef } from 'react';
import TestimonialCard from './TestimonialCard';
import StarIcon from '@/assets/images/icons/ratingStarIcon.png';
// import { testimonialsArabicMock, testimonialsMock } from '@utility/mock/testimonialsMock';
import { useTranslation } from '@/utils/i18nStub';

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
    const scrollRef = useRef<HTMLDivElement>(null);

    // Convert StaticImageData to string for img src
    const starIconSrc = typeof StarIcon === 'string' ? StarIcon : (StarIcon as any)?.src || StarIcon;

    useEffect(() => {
        const container = scrollRef.current;
        if (!container) {
            return;
        }

        let isPaused = false;
        const speed = 1;

        const intervalId = window.setInterval(() => {
            if (isPaused) {
                return;
            }
            const maxScrollLeft = container.scrollWidth - container.clientWidth;
            if (maxScrollLeft <= 0) {
                return;
            }
            if (container.scrollLeft >= maxScrollLeft - 1) {
                container.scrollLeft = 0;
            } else {
                container.scrollLeft += speed;
            }
        }, 20);

        const handleMouseEnter = () => {
            isPaused = true;
        };
        const handleMouseLeave = () => {
            isPaused = false;
        };

        container.addEventListener('mouseenter', handleMouseEnter);
        container.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.clearInterval(intervalId);
            container.removeEventListener('mouseenter', handleMouseEnter);
            container.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [testimonials]);

    return (
        <section className="w-full max-w-[1120px] mx-auto opacity-100" >
            <h2
  className="
    font-poppins font-semibold
    text-[#003B71]
    text-[28px]
    leading-[1]
    tracking-normal
    mb-8
  "
>{"Testimonials"}</h2>

            <div
                ref={scrollRef}
                className="flex overflow-x-auto gap-6 pb-4 pr-4 scrollbar-hide md:gap-6 sm:gap-4"
            >
                {testimonials.map((testimonial: Testimonial, index: number) => {
                    const isLast = index === testimonials.length - 1;
                    return (
                        <div 
                            key={index} 
                            className="flex-shrink-0"
                            style={isLast ? { marginRight: '4px' } : {}}
                        >
                            <TestimonialCard
                                content={testimonial.content}
                                author={testimonial.author}
                                rating={testimonial.rating}
                                starIcon={starIconSrc}
                            />
                        </div>
                    );
                })}
            </div>
        </section>
    );
});

export default TestimonialsSection;
