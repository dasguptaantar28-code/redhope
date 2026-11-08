// Bangladesh Geographic Data: Divisions, Districts, and Upazilas/Thanas

export interface Division {
  id: string;
  name: string;
  bn_name: string;
}

export interface District {
  id: string;
  division_id: string;
  name: string;
  bn_name: string;
}

export interface Upazila {
  id: string;
  district_id: string;
  name: string;
  bn_name: string;
}

export const BANGLADESH_DIVISIONS: Division[] = [
  { id: "dhaka", name: "Dhaka", bn_name: "ঢাকা" },
  { id: "chattogram", name: "Chattogram", bn_name: "চট্টগ্রাম" },
  { id: "rajshahi", name: "Rajshahi", bn_name: "রাজশাহী" },
  { id: "khulna", name: "Khulna", bn_name: "খুলনা" },
  { id: "barishal", name: "Barishal", bn_name: "বরিশাল" },
  { id: "sylhet", name: "Sylhet", bn_name: "সিলেট" },
  { id: "rangpur", name: "Rangpur", bn_name: "রংপুর" },
  { id: "mymensingh", name: "Mymensingh", bn_name: "ময়মনসিংহ" },
];

export const BANGLADESH_DISTRICTS: District[] = [
  // Dhaka Division
  { id: "dhaka_dist", division_id: "dhaka", name: "Dhaka", bn_name: "ঢাকা" },
  { id: "gazipur", division_id: "dhaka", name: "Gazipur", bn_name: "গাজীপুর" },
  { id: "narayanganj", division_id: "dhaka", name: "Narayanganj", bn_name: "নারায়ণগঞ্জ" },
  { id: "tangail", division_id: "dhaka", name: "Tangail", bn_name: "টাঙ্গাইল" },
  { id: "kishoreganj", division_id: "dhaka", name: "Kishoreganj", bn_name: "কিশোরগঞ্জ" },
  { id: "manikganj", division_id: "dhaka", name: "Manikganj", bn_name: "মানিকগঞ্জ" },
  { id: "munshiganj", division_id: "dhaka", name: "Munshiganj", bn_name: "মুন্সীগঞ্জ" },
  { id: "narsingdi", division_id: "dhaka", name: "Narsingdi", bn_name: "নরসিংদী" },
  { id: "faridpur", division_id: "dhaka", name: "Faridpur", bn_name: "ফরিদপুর" },
  { id: "gopalganj", division_id: "dhaka", name: "Gopalganj", bn_name: "গোপালগঞ্জ" },
  { id: "madaripur", division_id: "dhaka", name: "Madaripur", bn_name: "মাদারীপুর" },
  { id: "rajbari", division_id: "dhaka", name: "Rajbari", bn_name: "রাজবাড়ী" },
  { id: "shariatpur", division_id: "dhaka", name: "Shariatpur", bn_name: "শরীয়তপুর" },

  // Chattogram Division
  { id: "chattogram_dist", division_id: "chattogram", name: "Chattogram", bn_name: "চট্টগ্রাম" },
  { id: "coxs_bazar", division_id: "chattogram", name: "Cox's Bazar", bn_name: "কক্সবাজার" },
  { id: "cumilla", division_id: "chattogram", name: "Cumilla", bn_name: "কুমিল্লা" },
  { id: "feni", division_id: "chattogram", name: "Feni", bn_name: "ফেনী" },
  { id: "brahmanbaria", division_id: "chattogram", name: "Brahmanbaria", bn_name: "ব্রাহ্মণবাড়িয়া" },
  { id: "chandpur", division_id: "chattogram", name: "Chandpur", bn_name: "চাঁদপুর" },
  { id: "lakshmipur", division_id: "chattogram", name: "Lakshmipur", bn_name: "লক্ষ্মীপুর" },
  { id: "noakhali", division_id: "chattogram", name: "Noakhali", bn_name: "নোয়াখালী" },
  { id: "khagrachhari", division_id: "chattogram", name: "Khagrachhari", bn_name: "খাগড়াছড়ি" },
  { id: "rangamati", division_id: "chattogram", name: "Rangamati", bn_name: "রাঙ্গামাটি" },
  { id: "bandarban", division_id: "chattogram", name: "Bandarban", bn_name: "বান্দরবান" },

  // Rajshahi Division
  { id: "rajshahi_dist", division_id: "rajshahi", name: "Rajshahi", bn_name: "রাজশাহী" },
  { id: "bogra", division_id: "rajshahi", name: "Bogura", bn_name: "বগুড়া" },
  { id: "pabna", division_id: "rajshahi", name: "Pabna", bn_name: "পাবনা" },
  { id: "sirajganj", division_id: "rajshahi", name: "Sirajganj", bn_name: "সিরাজগঞ্জ" },
  { id: "naogaon", division_id: "rajshahi", name: "Naogaon", bn_name: "নওগাঁ" },
  { id: "natore", division_id: "rajshahi", name: "Natore", bn_name: "নাটোর" },
  { id: "chapai_nawabganj", division_id: "rajshahi", name: "Chapai Nawabganj", bn_name: "চাঁপাইনবাবগঞ্জ" },
  { id: "joypurhat", division_id: "rajshahi", name: "Joypurhat", bn_name: "জয়পুরহাট" },

  // Khulna Division
  { id: "khulna_dist", division_id: "khulna", name: "Khulna", bn_name: "খুলনা" },
  { id: "jashore", division_id: "khulna", name: "Jashore", bn_name: "যশোর" },
  { id: "satkhira", division_id: "khulna", name: "Satkhira", bn_name: "সাতক্ষীরা" },
  { id: "bagerhat", division_id: "khulna", name: "Bagerhat", bn_name: "বাগেরহাট" },
  { id: "kushtia", division_id: "khulna", name: "Kushtia", bn_name: "কুষ্টিয়া" },
  { id: "jhenaidah", division_id: "khulna", name: "Jhenaidah", bn_name: "ঝিনাইদহ" },
  { id: "chuadanga", division_id: "khulna", name: "Chuadanga", bn_name: "চুয়াডাঙ্গা" },
  { id: "meherpur", division_id: "khulna", name: "Meherpur", bn_name: "মেহেরপুর" },
  { id: "narail", division_id: "khulna", name: "Narail", bn_name: "নড়াইল" },
  { id: "magura", division_id: "khulna", name: "Magura", bn_name: "মাগুরা" },

  // Barishal Division
  { id: "barishal_dist", division_id: "barishal", name: "Barishal", bn_name: "বরিশাল" },
  { id: "bhola", division_id: "barishal", name: "Bhola", bn_name: "ভোলা" },
  { id: "patuakhali", division_id: "barishal", name: "Patuakhali", bn_name: "পটুয়াখালী" },
  { id: "pirojpur", division_id: "barishal", name: "Pirojpur", bn_name: "পিরোজপুর" },
  { id: "barguna", division_id: "barishal", name: "Barguna", bn_name: "বরগুনা" },
  { id: "jhalokati", division_id: "barishal", name: "Jhalokati", bn_name: "ঝালকাঠি" },

  // Sylhet Division
  { id: "sylhet_dist", division_id: "sylhet", name: "Sylhet", bn_name: "সিলেট" },
  { id: "moulvibazar", division_id: "sylhet", name: "Moulvibazar", bn_name: "মৌলভীবাজার" },
  { id: "habiganj", division_id: "sylhet", name: "Habiganj", bn_name: "হবিগঞ্জ" },
  { id: "sunamganj", division_id: "sylhet", name: "Sunamganj", bn_name: "সুনামগঞ্জ" },

  // Rangpur Division
  { id: "rangpur_dist", division_id: "rangpur", name: "Rangpur", bn_name: "রংপুর" },
  { id: "dinajpur", division_id: "rangpur", name: "Dinajpur", bn_name: "দিনাজপুর" },
  { id: "gaibandha", division_id: "rangpur", name: "Gaibandha", bn_name: "গাইবান্ধা" },
  { id: "kurigram", division_id: "rangpur", name: "Kurigram", bn_name: "কুড়িগ্রাম" },
  { id: "lalmonirhat", division_id: "rangpur", name: "Lalmonirhat", bn_name: "লালমনিরহাট" },
  { id: "nilphamari", division_id: "rangpur", name: "Nilphamari", bn_name: "নীলফামারী" },
  { id: "panchagarh", division_id: "rangpur", name: "Panchagarh", bn_name: "পঞ্চগড়" },
  { id: "thakurgaon", division_id: "rangpur", name: "Thakurgaon", bn_name: "ঠাকুরগাঁও" },

  // Mymensingh Division
  { id: "mymensingh_dist", division_id: "mymensingh", name: "Mymensingh", bn_name: "ময়মনসিংহ" },
  { id: "jamalpur", division_id: "mymensingh", name: "Jamalpur", bn_name: "জামালপুর" },
  { id: "netrokona", division_id: "mymensingh", name: "Netrokona", bn_name: "নেত্রকোণা" },
  { id: "sherpur", division_id: "mymensingh", name: "Sherpur", bn_name: "শেরপুর" },
];

export const BANGLADESH_UPAZILAS: Upazila[] = [
  // Dhaka District Upazilas / Thanas
  { id: "dhanmondi", district_id: "dhaka_dist", name: "Dhanmondi", bn_name: "ধানমন্ডি" },
  { id: "mirpur", district_id: "dhaka_dist", name: "Mirpur", bn_name: "মিরপুর" },
  { id: "uttara", district_id: "dhaka_dist", name: "Uttara", bn_name: "উত্তরা" },
  { id: "gulshan", district_id: "dhaka_dist", name: "Gulshan", bn_name: "গুলশান" },
  { id: "banani", district_id: "dhaka_dist", name: "Banani", bn_name: "বনানী" },
  { id: "motijheel", district_id: "dhaka_dist", name: "Motijheel", bn_name: "মতিঝিল" },
  { id: "mohammadpur", district_id: "dhaka_dist", name: "Mohammadpur", bn_name: "মোহাম্মদপুর" },
  { id: "badda", district_id: "dhaka_dist", name: "Badda", bn_name: "বাড্ডা" },
  { id: "khilgaon", district_id: "dhaka_dist", name: "Khilgaon", bn_name: "খিলগাঁও" },
  { id: "shahbagh", district_id: "dhaka_dist", name: "Shahbagh", bn_name: "শাহবাগ" },
  { id: "savar", district_id: "dhaka_dist", name: "Savar", bn_name: "সাভার" },
  { id: "dhamrai", district_id: "dhaka_dist", name: "Dhamrai", bn_name: "ধামরাই" },
  { id: "keraniganj", district_id: "dhaka_dist", name: "Keraniganj", bn_name: "কেরানীগঞ্জ" },
  { id: "dohar", district_id: "dhaka_dist", name: "Dohar", bn_name: "দোহার" },
  { id: "nawabganj", district_id: "dhaka_dist", name: "Nawabganj", bn_name: "নবাবগঞ্জ" },

  // Gazipur
  { id: "gazipur_sadar", district_id: "gazipur", name: "Gazipur Sadar", bn_name: "গাজীপুর সদর" },
  { id: "kaliakair", district_id: "gazipur", name: "Kaliakair", bn_name: "কালিয়াকৈর" },
  { id: "kapasia", district_id: "gazipur", name: "Kapasia", bn_name: "কাপাসিয়া" },
  { id: "sreepur", district_id: "gazipur", name: "Sreepur", bn_name: "শ্রীপুর" },
  { id: "kaliganj_g", district_id: "gazipur", name: "Kaliganj", bn_name: "কালীগঞ্জ" },

  // Narayanganj
  { id: "narayanganj_sadar", district_id: "narayanganj", name: "Narayanganj Sadar", bn_name: "নারায়ণগঞ্জ সদর" },
  { id: "sonargaon", district_id: "narayanganj", name: "Sonargaon", bn_name: "সোনারগাঁও" },
  { id: "rupganj", district_id: "narayanganj", name: "Rupganj", bn_name: "রূপগঞ্জ" },
  { id: "araihazar", district_id: "narayanganj", name: "Araihazar", bn_name: "আড়াইহাজার" },
  { id: "bandar", district_id: "narayanganj", name: "Bandar", bn_name: "বন্দর" },

  // Chattogram
  { id: "chattogram_sadar", district_id: "chattogram_dist", name: "Kotwali / Sadar", bn_name: "কোতোয়ালী / সদর" },
  { id: "panchlaish", district_id: "chattogram_dist", name: "Panchlaish", bn_name: "পাঁচলাইশ" },
  { id: "halishahar", district_id: "chattogram_dist", name: "Halishahar", bn_name: "হালিশহর" },
  { id: "chandgaon", district_id: "chattogram_dist", name: "Chandgaon", bn_name: "চান্দগাঁও" },
  { id: "hathazari", district_id: "chattogram_dist", name: "Hathazari", bn_name: "হাটহাজারী" },
  { id: "sitakunda", district_id: "chattogram_dist", name: "Sitakunda", bn_name: "সীতাকুণ্ড" },
  { id: "patiya", district_id: "chattogram_dist", name: "Patiya", bn_name: "পটিয়া" },

  // Sylhet
  { id: "sylhet_sadar", district_id: "sylhet_dist", name: "Sylhet Sadar", bn_name: "সিলেট সদর" },
  { id: "beanibazar", district_id: "sylhet_dist", name: "Beanibazar", bn_name: "বিয়ানীবাজার" },
  { id: "golapganj", district_id: "sylhet_dist", name: "Golapganj", bn_name: "গোলাপগঞ্জ" },
  { id: "biswanath", district_id: "sylhet_dist", name: "Biswanath", bn_name: "বিশ্বনাথ" },

  // Rajshahi
  { id: "rajshahi_sadar", district_id: "rajshahi_dist", name: "Boalia / Sadar", bn_name: "বোয়ালিয়া / সদর" },
  { id: "paba", district_id: "rajshahi_dist", name: "Paba", bn_name: "পবা" },
  { id: "godagari", district_id: "rajshahi_dist", name: "Godagari", bn_name: "গোদাগাড়ী" },
  { id: "tanore", district_id: "rajshahi_dist", name: "Tanore", bn_name: "তানোর" },

  // Khulna
  { id: "khulna_sadar", district_id: "khulna_dist", name: "Khulna Sadar", bn_name: "খুলনা সদর" },
  { id: "sonadanga", district_id: "khulna_dist", name: "Sonadanga", bn_name: "সোনাডাঙ্গা" },
  { id: "daulatpur", district_id: "khulna_dist", name: "Daulatpur", bn_name: "দৌলতপুর" },
  { id: "dumuria", district_id: "khulna_dist", name: "Dumuria", bn_name: "ডুমুরিয়া" },

  // Barishal
  { id: "barishal_sadar", district_id: "barishal_dist", name: "Barishal Sadar", bn_name: "বরিশাল সদর" },
  { id: "bakerganj", district_id: "barishal_dist", name: "Bakerganj", bn_name: "বাকেরগঞ্জ" },
  { id: "babuganj", district_id: "barishal_dist", name: "Babuganj", bn_name: "বাবুগঞ্জ" },

  // Rangpur
  { id: "rangpur_sadar", district_id: "rangpur_dist", name: "Rangpur Sadar", bn_name: "রংপুর সদর" },
  { id: "mithapukur", district_id: "rangpur_dist", name: "Mithapukur", bn_name: "মিঠাপুকুর" },
  { id: "pirganj", district_id: "rangpur_dist", name: "Pirganj", bn_name: "পীরগঞ্জ" },

  // Mymensingh
  { id: "mymensingh_sadar", district_id: "mymensingh_dist", name: "Mymensingh Sadar", bn_name: "ময়মনসিংহ সদর" },
  { id: "muktagachha", district_id: "mymensingh_dist", name: "Muktagachha", bn_name: "মুক্তাগাছা" },
  { id: "fulbaria", district_id: "mymensingh_dist", name: "Fulbaria", bn_name: "ফুলবাড়িয়া" },
];

export function getDivisions(): Division[] {
  return BANGLADESH_DIVISIONS;
}

export function getDistricts(divisionId?: string): District[] {
  if (!divisionId) return BANGLADESH_DISTRICTS;
  return BANGLADESH_DISTRICTS.filter((d) => d.division_id === divisionId);
}

export function getUpazilas(districtId?: string): Upazila[] {
  if (!districtId) return BANGLADESH_UPAZILAS;
  const filtered = BANGLADESH_UPAZILAS.filter((u) => u.district_id === districtId);
  if (filtered.length === 0) {
    // Provide a default Sadar upazila for any district without specific entries
    const dist = BANGLADESH_DISTRICTS.find((d) => d.id === districtId);
    return [
      {
        id: `${districtId}_sadar`,
        district_id: districtId,
        name: `${dist?.name || "District"} Sadar`,
        bn_name: `${dist?.bn_name || "সদর"} সদর`,
      },
    ];
  }
  return filtered;
}

export function getDistrictNameById(id: string): string {
  const dist = BANGLADESH_DISTRICTS.find((d) => d.id === id);
  return dist ? dist.name : id;
}

export function getDivisionNameById(id: string): string {
  const div = BANGLADESH_DIVISIONS.find((d) => d.id === id);
  return div ? div.name : id;
}

export const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"] as const;
export type BloodGroup = typeof BLOOD_GROUPS[number];
