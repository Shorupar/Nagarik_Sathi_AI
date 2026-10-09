from fastapi import APIRouter
from app.schemas.schemas import ServiceItem

router = APIRouter()

UPDATED_CATALOG = [
    {
        "slug": "passport",
        "title_en": "Passport Application",
        "title_ne": "राहदानी आवेदन",
        "department_name": "Department of Passports",
        "official_portal_url": "https://nepalpassport.gov.np",
        "fee": "NPR 5,000 (30-45 Working Days) / NPR 12,000 (Fast Track)",
        "processing_time": "3 to 15 Working Days",
        "required_docs": [
            "Original Nepali Citizenship Certificate",
            "16-Digit National Identity Number (NIN)",
            "Pre-enrollment Slip from nepalpassport.gov.np",
            "Old Passport (For Renewal)",
        ],
    },
    {
        "slug": "nid",
        "title_en": "National Identity Card (Rastriya Parichayapatra)",
        "title_ne": "राष्ट्रिय परिचयपत्र",
        "department_name": "Department of National ID & Civil Registration (DoNIDCR)",
        "official_portal_url": "https://enrollment.donidcr.gov.np",
        "fee": "Free (First Time)",
        "processing_time": "Same-day biometric capture",
        "required_docs": [
            "Original Citizenship Certificate",
            "Pre-enrollment Token Slip",
            "Marriage Certificate (If marital status changed)",
        ],
    },
    {
        "slug": "license",
        "title_en": "Driving License",
        "title_ne": "सवारी चालक अनुमतिपत्र",
        "department_name": "Department of Transportation Management (DoTM)",
        "official_portal_url": "https://dotm.gov.np/",
        "fee": [
            "Bike / Scooter (A/K): Rs. 3,000 licence fee",
            "Car / Jeep / Van (B): Rs. 4,000 licence fee",
            "New application fee: Rs. 1,000",
        ],
        "processing_time": "1 to 4 Working Days",
        "required_docs": [
            "Citizenship Scan Copy",
            "Passport Size Digital Photo",
            "Nepali Mobile Number",
        ],
    },
]

@router.get("/", response_model=list[ServiceItem])
def get_services():
    return UPDATED_CATALOG