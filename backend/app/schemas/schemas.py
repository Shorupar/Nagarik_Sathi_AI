from pydantic import BaseModel
from typing import List, Optional, Union

class Message(BaseModel):
    sender: str
    text: str

class ChatPayload(BaseModel):
    messages: List[Message]
    session_id: Optional[str] = None

class DateConversionRequest(BaseModel):
    year: int
    month: int
    day: int
    conversion_type: str = "BS_TO_AD"

class DateConversionResponse(BaseModel):
    converted_date: str
    type: str

class ServiceItem(BaseModel):
    slug: str
    title_en: str
    title_ne: str
    department_name: str
    official_portal_url: str
    fee: Union[str, List[str]]
    processing_time: str
    required_docs: List[str]