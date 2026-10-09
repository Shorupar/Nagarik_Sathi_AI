import uuid

from pgvector.sqlalchemy import Vector
from sqlalchemy import Column, Date, DateTime, ForeignKey, Integer, Numeric, String, Text, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    pass


class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    session_token = Column(String(255), unique=True, nullable=False)
    language_preference = Column(String(20), default="roman_nepali")
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class GovernmentService(Base):
    __tablename__ = "government_services"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    slug = Column(String(100), unique=True, nullable=False)
    title_en = Column(String(255), nullable=False)
    title_ne = Column(String(255), nullable=False)
    department_name = Column(String(255), nullable=False)
    official_portal_url = Column(String(500), nullable=False)
    base_fee_npr = Column(Numeric(10, 2), default=0.00)
    processing_days = Column(Integer)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class ServiceKnowledgeChunk(Base):
    __tablename__ = "service_knowledge_chunks"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    service_id = Column(UUID(as_uuid=True), ForeignKey("government_services.id", ondelete="CASCADE"))
    document_title = Column(String(255), nullable=False)
    source_url = Column(String(500), nullable=False)
    content_chunk = Column(Text, nullable=False)
    embedding = Column(Vector(768))
    last_verified_date = Column(Date, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())