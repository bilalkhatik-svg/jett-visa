import type { Nationality, Destination } from '@/utility/types/find-visa/Visa';
import CardImg from '@/assets/images/germany-card-img.webp';

export const nationalities: Nationality[] = [
  {
    id: 'IN',
    nationality: 'Indian',
    residency: 'India',
    flag: 'https://flagcdn.com/w40/in.png',
    isoCode: 'IN',
    currencyCode: 'INR',
    continent: 'Asia',
    popularCities: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata'],
    acronyms: ['IND']
  },
  {
    id: 'AE',
    nationality: 'Emirati',
    residency: 'United Arab Emirates',
    flag: 'https://flagcdn.com/w40/ae.png',
    isoCode: 'AE',
    currencyCode: 'AED',
    continent: 'Asia',
    popularCities: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman'],
    acronyms: ['UAE']
  },
  {
    id: 'US',
    nationality: 'American',
    residency: 'United States',
    flag: 'https://flagcdn.com/w40/us.png',
    isoCode: 'US',
    currencyCode: 'USD',
    continent: 'North America',
    popularCities: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Miami'],
    acronyms: ['USA']
  },
  {
    id: 'GB',
    nationality: 'British',
    residency: 'United Kingdom',
    flag: 'https://flagcdn.com/w40/gb.png',
    isoCode: 'GB',
    currencyCode: 'GBP',
    continent: 'Europe',
    popularCities: ['London', 'Manchester', 'Birmingham', 'Edinburgh', 'Liverpool'],
    acronyms: ['UK', 'GBR']
  },
  {
    id: 'SA',
    nationality: 'Saudi',
    residency: 'Saudi Arabia',
    flag: 'https://flagcdn.com/w40/sa.png',
    isoCode: 'SA',
    currencyCode: 'SAR',
    continent: 'Asia',
    popularCities: ['Riyadh', 'Jeddah', 'Mecca', 'Medina', 'Dammam'],
    acronyms: ['KSA']
  },
  {
    id: 'CA',
    nationality: 'Canadian',
    residency: 'Canada',
    flag: 'https://flagcdn.com/w40/ca.png',
    isoCode: 'CA',
    currencyCode: 'CAD',
    continent: 'North America',
    popularCities: ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa'],
    acronyms: ['CAN']
  },
  {
    id: 'AU',
    nationality: 'Australian',
    residency: 'Australia',
    flag: 'https://flagcdn.com/w40/au.png',
    isoCode: 'AU',
    currencyCode: 'AUD',
    continent: 'Oceania',
    popularCities: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide'],
    acronyms: ['AUS']
  },
  {
    id: 'FR',
    nationality: 'French',
    residency: 'France',
    flag: 'https://flagcdn.com/w40/fr.png',
    isoCode: 'FR',
    currencyCode: 'EUR',
    continent: 'Europe',
    popularCities: ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice'],
    acronyms: ['FRA']
  },
  {
    id: 'DE',
    nationality: 'German',
    residency: 'Germany',
    flag: 'https://flagcdn.com/w40/de.png',
    isoCode: 'DE',
    currencyCode: 'EUR',
    continent: 'Europe',
    popularCities: ['Berlin', 'Munich', 'Hamburg', 'Frankfurt', 'Cologne'],
    acronyms: ['DEU', 'GER']
  },
  {
    id: 'IT',
    nationality: 'Italian',
    residency: 'Italy',
    flag: 'https://flagcdn.com/w40/it.png',
    isoCode: 'IT',
    currencyCode: 'EUR',
    continent: 'Europe',
    popularCities: ['Rome', 'Milan', 'Naples', 'Turin', 'Florence'],
    acronyms: ['ITA']
  },
  {
    id: 'ES',
    nationality: 'Spanish',
    residency: 'Spain',
    flag: 'https://flagcdn.com/w40/es.png',
    isoCode: 'ES',
    currencyCode: 'EUR',
    continent: 'Europe',
    popularCities: ['Madrid', 'Barcelona', 'Valencia', 'Seville', 'Bilbao'],
    acronyms: ['ESP']
  },
  {
    id: 'JP',
    nationality: 'Japanese',
    residency: 'Japan',
    flag: 'https://flagcdn.com/w40/jp.png',
    isoCode: 'JP',
    currencyCode: 'JPY',
    continent: 'Asia',
    popularCities: ['Tokyo', 'Osaka', 'Kyoto', 'Yokohama', 'Nagoya'],
    acronyms: ['JPN']
  },
  {
    id: 'CN',
    nationality: 'Chinese',
    residency: 'China',
    flag: 'https://flagcdn.com/w40/cn.png',
    isoCode: 'CN',
    currencyCode: 'CNY',
    continent: 'Asia',
    popularCities: ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen', 'Chengdu'],
    acronyms: ['CHN']
  },
  {
    id: 'KR',
    nationality: 'Korean',
    residency: 'South Korea',
    flag: 'https://flagcdn.com/w40/kr.png',
    isoCode: 'KR',
    currencyCode: 'KRW',
    continent: 'Asia',
    popularCities: ['Seoul', 'Busan', 'Incheon', 'Daegu', 'Daejeon'],
    acronyms: ['KOR']
  },
  {
    id: 'BR',
    nationality: 'Brazilian',
    residency: 'Brazil',
    flag: 'https://flagcdn.com/w40/br.png',
    isoCode: 'BR',
    currencyCode: 'BRL',
    continent: 'South America',
    popularCities: ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Salvador', 'Fortaleza'],
    acronyms: ['BRA']
  },
  {
    id: 'MX',
    nationality: 'Mexican',
    residency: 'Mexico',
    flag: 'https://flagcdn.com/w40/mx.png',
    isoCode: 'MX',
    currencyCode: 'MXN',
    continent: 'North America',
    popularCities: ['Mexico City', 'Guadalajara', 'Monterrey', 'Cancún', 'Tijuana'],
    acronyms: ['MEX']
  },
  {
    id: 'ZA',
    nationality: 'South African',
    residency: 'South Africa',
    flag: 'https://flagcdn.com/w40/za.png',
    isoCode: 'ZA',
    currencyCode: 'ZAR',
    continent: 'Africa',
    popularCities: ['Johannesburg', 'Cape Town', 'Durban', 'Pretoria', 'Port Elizabeth'],
    acronyms: ['RSA', 'ZAF']
  },
  {
    id: 'EG',
    nationality: 'Egyptian',
    residency: 'Egypt',
    flag: 'https://flagcdn.com/w40/eg.png',
    isoCode: 'EG',
    currencyCode: 'EGP',
    continent: 'Africa',
    popularCities: ['Cairo', 'Alexandria', 'Giza', 'Luxor', 'Aswan'],
    acronyms: ['EGY']
  },
  {
    id: 'NZ',
    nationality: 'New Zealander',
    residency: 'New Zealand',
    flag: 'https://flagcdn.com/w40/nz.png',
    isoCode: 'NZ',
    currencyCode: 'NZD',
    continent: 'Oceania',
    popularCities: ['Auckland', 'Wellington', 'Christchurch', 'Hamilton', 'Tauranga'],
    acronyms: ['NZL']
  },
  {
    id: 'SG',
    nationality: 'Singaporean',
    residency: 'Singapore',
    flag: 'https://flagcdn.com/w40/sg.png',
    isoCode: 'SG',
    currencyCode: 'SGD',
    continent: 'Asia',
    popularCities: ['Singapore'],
    acronyms: ['SGP']
  },
];

export const continents: string[] = [
  'Asia',
  'Africa',
  'North America',
  'South America',
  'Antarctica',
  'Europe',
  'Oceania',
];

export const continentLanguageMap: Record<string, string> = {
  'آسيا': 'Asia',
  'أفريقيا': 'Africa',
  'أمريكا الشمالية': 'North America',
  'أمريكا الجنوبية': 'South America',
  'القطب الجنوبي': 'Antarctica',
  'أوروبا': 'Europe',
  'أوقيانوسيا': 'Oceania',
};

export const mockDestinations: Destination[] = [
  {
    id: '1',
    country: 'India',
    countryCode: 'IN',
    image: typeof CardImg === 'string' ? CardImg : CardImg.src,
    chips: [
      { type: 'mode', label: 'e-Visa', value: 'evisa' },
      { type: 'price', label: 'Starts ₹1500', value: '1500' },
      { type: 'processing', label: 'Right away', value: '0' }
    ],
    active: true,
    continent: 'Asia'
  },
  {
    id: '2',
    country: 'Japan',
    countryCode: 'JP',
    image: typeof CardImg === 'string' ? CardImg : CardImg.src,
    chips: [
      { type: 'mode', label: 'e-Visa', value: 'evisa' },
      { type: 'price', label: 'Starts ₹3500', value: '3500' },
      { type: 'processing', label: 'Next week', value: '7' }
    ],
    active: true,
    continent: 'Asia'
  },
  {
    id: '3',
    country: 'Singapore',
    countryCode: 'SG',
    image: typeof CardImg === 'string' ? CardImg : CardImg.src,
    chips: [
      { type: 'mode', label: 'e-Visa', value: 'evisa' },
      { type: 'price', label: 'Starts ₹2500', value: '2500' },
      { type: 'processing', label: 'Right away', value: '0' }
    ],
    active: true,
    continent: 'Asia'
  },
  {
    id: '4',
    country: 'Thailand',
    countryCode: 'TH',
    image: typeof CardImg === 'string' ? CardImg : CardImg.src,
    chips: [
      { type: 'mode', label: 'e-Visa', value: 'evisa' },
      { type: 'price', label: 'Starts ₹2000', value: '2000' },
      { type: 'processing', label: 'In 3 days', value: '3' }
    ],
    active: true,
    continent: 'Asia'
  },
  {
    id: '5',
    country: 'Malaysia',
    countryCode: 'MY',
    image: typeof CardImg === 'string' ? CardImg : CardImg.src,
    chips: [
      { type: 'mode', label: 'e-Visa', value: 'evisa' },
      { type: 'price', label: 'Starts ₹1800', value: '1800' },
      { type: 'processing', label: 'In 2 days', value: '2' }
    ],
    active: true,
    continent: 'Asia'
  },
  {
    id: '6',
    country: 'South Korea',
    countryCode: 'KR',
    image: typeof CardImg === 'string' ? CardImg : CardImg.src,
    chips: [
      { type: 'mode', label: 'e-Visa', value: 'evisa' },
      { type: 'price', label: 'Starts ₹4000', value: '4000' },
      { type: 'processing', label: 'In 5 days', value: '5' }
    ],
    active: true,
    continent: 'Asia'
  },
  {
    id: '7',
    country: 'Germany',
    countryCode: 'DE',
    image: typeof CardImg === 'string' ? CardImg : CardImg.src,
    chips: [
      { type: 'mode', label: 'Sticker visa', value: 'sticker' },
      { type: 'price', label: 'Starts ₹2100', value: '2100' },
      { type: 'processing', label: 'In 3 days', value: '3' }
    ],
    active: true,
    continent: 'Europe'
  },
  {
    id: '8',
    country: 'France',
    countryCode: 'FR',
    image: typeof CardImg === 'string' ? CardImg : CardImg.src,
    chips: [
      { type: 'mode', label: 'Sticker visa', value: 'sticker' },
      { type: 'price', label: 'Starts ₹5500', value: '5500' },
      { type: 'processing', label: 'In 5 days', value: '5' }
    ],
    active: true,
    continent: 'Europe'
  },
  {
    id: '9',
    country: 'United Kingdom',
    countryCode: 'GB',
    image: typeof CardImg === 'string' ? CardImg : CardImg.src,
    chips: [
      { type: 'mode', label: 'Sticker visa', value: 'sticker' },
      { type: 'price', label: 'Starts ₹9500', value: '9500' },
      { type: 'processing', label: 'In 7 days', value: '7' }
    ],
    active: true,
    continent: 'Europe'
  },
  {
    id: '10',
    country: 'Italy',
    countryCode: 'IT',
    image: typeof CardImg === 'string' ? CardImg : CardImg.src,
    chips: [
      { type: 'mode', label: 'Sticker visa', value: 'sticker' },
      { type: 'price', label: 'Starts ₹4800', value: '4800' },
      { type: 'processing', label: 'In 6 days', value: '6' }
    ],
    active: true,
    continent: 'Europe'
  },
  {
    id: '11',
    country: 'Spain',
    countryCode: 'ES',
    image: typeof CardImg === 'string' ? CardImg : CardImg.src,
    chips: [
      { type: 'mode', label: 'Sticker visa', value: 'sticker' },
      { type: 'price', label: 'Starts ₹5200', value: '5200' },
      { type: 'processing', label: 'In 8 days', value: '8' }
    ],
    active: true,
    continent: 'Europe'
  },
  {
    id: '12',
    country: 'United States',
    countryCode: 'US',
    image: typeof CardImg === 'string' ? CardImg : CardImg.src,
    chips: [
      { type: 'mode', label: 'Sticker visa', value: 'sticker' },
      { type: 'price', label: 'Starts ₹12000', value: '12000' },
      { type: 'processing', label: 'Within a month', value: '30' }
    ],
    active: true,
    continent: 'North America'
  },
  {
    id: '13',
    country: 'Canada',
    countryCode: 'CA',
    image: typeof CardImg === 'string' ? CardImg : CardImg.src,
    chips: [
      { type: 'mode', label: 'e-Visa', value: 'evisa' },
      { type: 'price', label: 'Starts ₹6500', value: '6500' },
      { type: 'processing', label: 'In 10 days', value: '10' }
    ],
    active: true,
    continent: 'North America'
  },
  {
    id: '14',
    country: 'Brazil',
    countryCode: 'BR',
    image: typeof CardImg === 'string' ? CardImg : CardImg.src,
    chips: [
      { type: 'mode', label: 'Sticker visa', value: 'sticker' },
      { type: 'price', label: 'Starts ₹4500', value: '4500' },
      { type: 'processing', label: 'In 14 days', value: '14' }
    ],
    active: true,
    continent: 'South America'
  },
  {
    id: '15',
    country: 'Argentina',
    countryCode: 'AR',
    image: typeof CardImg === 'string' ? CardImg : CardImg.src,
    chips: [
      { type: 'mode', label: 'e-Visa', value: 'evisa' },
      { type: 'price', label: 'Starts ₹3800', value: '3800' },
      { type: 'processing', label: 'In 7 days', value: '7' }
    ],
    active: true,
    continent: 'South America'
  },
  {
    id: '16',
    country: 'Chile',
    countryCode: 'CL',
    image: typeof CardImg === 'string' ? CardImg : CardImg.src,
    chips: [
      { type: 'mode', label: 'e-Visa', value: 'evisa' },
      { type: 'price', label: 'Starts ₹4200', value: '4200' },
      { type: 'processing', label: 'In 10 days', value: '10' }
    ],
    active: true,
    continent: 'South America'
  },
  {
    id: '17',
    country: 'South Africa',
    countryCode: 'ZA',
    image: typeof CardImg === 'string' ? CardImg : CardImg.src,
    chips: [
      { type: 'mode', label: 'e-Visa', value: 'evisa' },
      { type: 'price', label: 'Starts ₹5000', value: '5000' },
      { type: 'processing', label: 'In 5 days', value: '5' }
    ],
    active: true,
    continent: 'Africa'
  },
  {
    id: '18',
    country: 'Egypt',
    countryCode: 'EG',
    image: typeof CardImg === 'string' ? CardImg : CardImg.src,
    chips: [
      { type: 'mode', label: 'e-Visa', value: 'evisa' },
      { type: 'price', label: 'Starts ₹3200', value: '3200' },
      { type: 'processing', label: 'In 3 days', value: '3' }
    ],
    active: true,
    continent: 'Africa'
  },
  {
    id: '19',
    country: 'Kenya',
    countryCode: 'KE',
    image: typeof CardImg === 'string' ? CardImg : CardImg.src,
    chips: [
      { type: 'mode', label: 'e-Visa', value: 'evisa' },
      { type: 'price', label: 'Starts ₹3500', value: '3500' },
      { type: 'processing', label: 'In 4 days', value: '4' }
    ],
    active: true,
    continent: 'Africa'
  },
  {
    id: '20',
    country: 'Morocco',
    countryCode: 'MA',
    image: typeof CardImg === 'string' ? CardImg : CardImg.src,
    chips: [
      { type: 'mode', label: 'Sticker visa', value: 'sticker' },
      { type: 'price', label: 'Starts ₹2800', value: '2800' },
      { type: 'processing', label: 'In 6 days', value: '6' }
    ],
    active: true,
    continent: 'Africa'
  },
  {
    id: '21',
    country: 'Australia',
    countryCode: 'AU',
    image: typeof CardImg === 'string' ? CardImg : CardImg.src,
    chips: [
      { type: 'mode', label: 'e-Visa', value: 'evisa' },
      { type: 'price', label: 'Starts ₹8500', value: '8500' },
      { type: 'processing', label: 'Next week', value: '7' }
    ],
    active: true,
    continent: 'Oceania'
  },
  {
    id: '22',
    country: 'New Zealand',
    countryCode: 'NZ',
    image: typeof CardImg === 'string' ? CardImg : CardImg.src,
    chips: [
      { type: 'mode', label: 'e-Visa', value: 'evisa' },
      { type: 'price', label: 'Starts ₹7500', value: '7500' },
      { type: 'processing', label: 'Next week', value: '7' }
    ],
    active: true,
    continent: 'Oceania'
  }
];