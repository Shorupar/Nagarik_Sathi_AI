-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "vector";

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_token VARCHAR(255) UNIQUE NOT NULL,
    language_preference VARCHAR(20) DEFAULT 'roman_nepali',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Government Services Table
CREATE TABLE IF NOT EXISTS government_services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(100) UNIQUE NOT NULL,
    title_en VARCHAR(255) NOT NULL,
    title_ne VARCHAR(255) NOT NULL,
    department_name VARCHAR(255) NOT NULL,
    official_portal_url VARCHAR(500) NOT NULL,
    base_fee_npr NUMERIC(10, 2) DEFAULT 0.00,
    processing_days INT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Service Knowledge Chunks (Vector Embeddings - 768 Dimensions)
CREATE TABLE IF NOT EXISTS service_knowledge_chunks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    service_id UUID REFERENCES government_services(id) ON DELETE CASCADE,
    document_title VARCHAR(255) NOT NULL,
    source_url VARCHAR(500) NOT NULL,
    content_chunk TEXT NOT NULL,
    embedding VECTOR(768),
    last_verified_date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. HNSW Index for Fast Cosine Vector Similarity Search
CREATE INDEX IF NOT EXISTS service_chunks_hnsw_idx 
ON service_knowledge_chunks USING hnsw (embedding vector_cosine_ops);