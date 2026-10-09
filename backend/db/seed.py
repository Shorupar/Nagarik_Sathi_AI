import asyncio
import uuid
from datetime import date
from sqlalchemy import text
from app.database import AsyncSessionLocal, engine

async def seed_data():
    async with AsyncSessionLocal() as session:
        async with session.begin():
            # Check if services already exist
            result = await session.execute(text("SELECT COUNT(*) FROM government_services;"))
            count = result.scalar()
            
            if count > 0:
                print("Database already contains data. Skipping seeding.")
                return

            print("Seeding initial government services...")

            # Insert Services
            passport_id = str(uuid.uuid4())
            nid_id = str(uuid.uuid4())
            pan_id = str(uuid.uuid4())

            services_sql = text("""
                INSERT INTO government_services 
                (id, slug, title_en, title_ne, department_name, official_portal_url, base_fee_npr, processing_days)
                VALUES 
                (:p_id, 'passport', 'e-Passport Application', 'विद्युतीय राहदानी (e-Passport)', 'Department of Passports', 'https://nepalpassport.gov.np', 5000.00, 15),
                (:n_id, 'nid', 'National Identity Card', 'राष्ट्रिय परिचयपत्र', 'DoNIDCR', 'https://enrollment.donidcr.gov.np', 0.00, 1),
                (:pa_id, 'pan', 'Personal PAN', 'व्यक्तिगत स्थायी लेखा नम्बर', 'Inland Revenue Department', 'https://ird.gov.np', 0.00, 2);
            """)

            await session.execute(services_sql, {"p_id": passport_id, "n_id": nid_id, "pa_id": pan_id})

            # Insert Knowledge Chunks
            chunks_sql = text("""
                INSERT INTO service_knowledge_chunks 
                (service_id, document_title, source_url, content_chunk, last_verified_date)
                VALUES 
                (:p_id, 'e-Passport Guidelines', 'https://nepalpassport.gov.np', 'To apply for a Nepali e-Passport, you need an original Citizenship Certificate, a 16-digit National Identity Number (NIN), and a pre-enrollment appointment slip. Regular processing costs NPR 5,000 for 34 pages.', :v_date),
                (:n_id, 'National ID Rules', 'https://enrollment.donidcr.gov.np', 'National Identity Card (Rastriya Parichayapatra) requires pre-enrollment online followed by live biometric capture (photograph, fingerprints, iris scan) at your designated district administration office.', :v_date),
                (:pa_id, 'PAN Guidelines', 'https://ird.gov.np', 'Personal PAN is completely free of cost. You need a scanned copy of your Nepali Citizenship certificate and a recent passport-sized digital photograph to register on the IRD portal.', :v_date);
            """)

            await session.execute(chunks_sql, {"p_id": passport_id, "n_id": nid_id, "pa_id": pan_id, "v_date": date.today()})

            print("Database successfully seeded with initial records!")

if __name__ == "__main__":
    asyncio.run(seed_data())