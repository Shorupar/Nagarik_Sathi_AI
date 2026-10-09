from fastapi import APIRouter
from app.schemas.schemas import DateConversionRequest, DateConversionResponse

router = APIRouter()

@router.post("/convert-date", response_model=DateConversionResponse)
def convert_date(payload: DateConversionRequest):
    if payload.conversion_type == "BS_TO_AD":
        ad_year = payload.year - 57
        return DateConversionResponse(
            converted_date=f"{ad_year:04d}-{payload.month:02d}-{payload.day:02d}",
            type="AD"
        )
    else:
        bs_year = payload.year + 57
        return DateConversionResponse(
            converted_date=f"{bs_year:04d}-{payload.month:02d}-{payload.day:02d}",
            type="BS"
        )