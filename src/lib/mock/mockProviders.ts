import { Provider } from '../types';

// VERIFY ALL NUMBERS BEFORE PUBLISHING
export const EMERGENCY_HELPLINES = [
  {
    name: 'Tele-MANAS',
    description: 'National 24/7 Mental Health Helpline (Free & Confidential)',
    number: '14416',
    available: '24/7',
    languages: 'English, Hindi, Marathi + 17 regional languages'
  },
  {
    name: 'National Emergency',
    description: 'All-in-one Emergency Response Support System',
    number: '112',
    available: '24/7',
    languages: 'All Indian languages'
  },
  {
    name: 'Ambulance Emergency',
    description: 'Medical Emergency & Trauma Transport',
    number: '108',
    available: '24/7',
    languages: 'Marathi, Hindi, English'
  },
  {
    name: 'Women Helpline',
    description: 'National Commission for Women 24/7 Helpline',
    number: '181',
    available: '24/7',
    languages: 'Marathi, Hindi, English'
  }
];

export const SAMPLE_PUNE_PROVIDERS: Provider[] = [
  {
    id: 'prov-1',
    name: 'Kamala Nehru General Hospital',
    type: 'Gynecology & General Medicine',
    area: 'Mangalwar Peth',
    city: 'Pune',
    languages: ['Marathi', 'Hindi', 'English'],
    costBand: 'free',
    facility: 'public',
    femaleDoctorAvailable: true,
    source: 'Pune Municipal Corporation (PMC)',
    verifiedOn: '15 Feb 2026',
    isSample: true,
    phone: '+91 20 2605 8484',
    address: 'Near Old Bazar, Mangalwar Peth, Pune 411011',
    testCostEstimate: 'Free or nominal (₹10 - ₹50 for OPD & CBC)'
  },
  {
    id: 'prov-2',
    name: 'Sahyadri Super Speciality Hospital',
    type: 'Obstetrics, Gynecology & Hematology',
    area: 'Deccan Gymkhana',
    city: 'Pune',
    languages: ['English', 'Marathi', 'Hindi'],
    costBand: 'private',
    facility: 'private',
    femaleDoctorAvailable: true,
    source: 'NABH Accredited Directory',
    verifiedOn: '12 Jan 2026',
    isSample: true,
    phone: '+91 20 6721 3000',
    address: 'Plot No. 30-C, Erandwane, Karve Road, Pune 411004',
    testCostEstimate: 'Consultation ₹800 - ₹1,200 | CBC & Ferritin ~₹900'
  },
  {
    id: 'prov-3',
    name: 'KEM Hospital & Research Centre',
    type: 'Women & Child Health, Endocrinology',
    area: 'Rasta Peth',
    city: 'Pune',
    languages: ['Marathi', 'Hindi', 'English'],
    costBand: 'low',
    facility: 'private',
    femaleDoctorAvailable: true,
    source: 'Charitable Trust Registry',
    verifiedOn: '20 Jan 2026',
    isSample: true,
    phone: '+91 20 6603 7300',
    address: '489, Sardar Moodliar Road, Rasta Peth, Pune 411011',
    testCostEstimate: 'Consultation ₹300 - ₹500 | Subsidized Lab Panel ~₹400'
  },
  {
    id: 'prov-4',
    name: 'Ruby Hall Clinic',
    type: 'Advanced Gynecology, Endocrine & Diagnostics',
    area: 'Sassoon Road',
    city: 'Pune',
    languages: ['English', 'Hindi', 'Marathi'],
    costBand: 'private',
    facility: 'private',
    femaleDoctorAvailable: true,
    source: 'NABH Directory',
    verifiedOn: '04 Mar 2026',
    isSample: true,
    phone: '+91 20 6645 5100',
    address: '40, Sassoon Road, Sangamvadi, Pune 411001',
    testCostEstimate: 'Consultation ₹1,000 | Comprehensive Hormone Panel ~₹2,200'
  },
  {
    id: 'prov-5',
    name: 'Dr. Ananya Joshi Women’s Care Clinic',
    type: 'Reproductive Health & PCOS Clinic',
    area: 'Kothrud',
    city: 'Pune',
    languages: ['Marathi', 'English', 'Hindi'],
    costBand: 'private',
    facility: 'private',
    femaleDoctorAvailable: true,
    source: 'IMA Pune Chapter',
    verifiedOn: '18 Feb 2026',
    isSample: true,
    phone: '+91 98230 44120',
    address: 'Shop 4, Mayur Colony, Near Joggers Park, Kothrud, Pune 411038',
    testCostEstimate: 'Consultation ₹600 | Personalized Cycle Review'
  },
  {
    id: 'prov-6',
    name: 'Sassoon General Hospital & BJ Medical College',
    type: 'Tertiary Government Hospital & Crisis Care',
    area: 'Near Pune Station',
    city: 'Pune',
    languages: ['Marathi', 'Hindi', 'English'],
    costBand: 'free',
    facility: 'public',
    femaleDoctorAvailable: true,
    source: 'Government of Maharashtra Health Dept',
    verifiedOn: '01 Feb 2026',
    isSample: true,
    phone: '+91 20 2612 8000',
    address: 'Station Road, Opp Pune Railway Station, Pune 411001',
    testCostEstimate: 'Free emergency triage & government subsidized testing'
  },
  {
    id: 'prov-7',
    name: 'Cloudnine Hospital',
    type: 'Maternity, Perinatal & Postpartum Wellness',
    area: 'Shivajinagar',
    city: 'Pune',
    languages: ['English', 'Hindi', 'Marathi'],
    costBand: 'private',
    facility: 'private',
    femaleDoctorAvailable: true,
    source: 'Maternity Care Network',
    verifiedOn: '25 Jan 2026',
    isSample: true,
    phone: '+91 20 4915 9999',
    address: 'Survey No. 1119/A, FC Road, Shivajinagar, Pune 411005',
    testCostEstimate: 'Consultation ₹900 | Postpartum Care & Lactation Support'
  },
  {
    id: 'prov-8',
    name: 'Deenanath Mangeshkar Hospital',
    type: 'Multispecialty & Adolescent Gynecology',
    area: 'Erandwane',
    city: 'Pune',
    languages: ['Marathi', 'Hindi', 'English'],
    costBand: 'low',
    facility: 'private',
    femaleDoctorAvailable: true,
    source: 'Charitable Trust Registry',
    verifiedOn: '10 Feb 2026',
    isSample: true,
    phone: '+91 20 4015 1000',
    address: 'Near Mhatre Bridge, Erandwane, Pune 411004',
    testCostEstimate: 'Consultation ₹450 | Ultrasound Pelvis ~₹800'
  }
];
