from sqlalchemy import Column, Integer, String, Float
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class CropYieldPrediction(db.Model):
    __tablename__ = 'crop_yield_predictions'

    id = Column(Integer, primary_key=True)
    state = Column(String(50), nullable=False)
    district = Column(String(50), nullable=False)
    village = Column(String(100), nullable=True)
    pincode = Column(String(10), nullable=True)
    farm_size = Column(Float, nullable=False)
    unit = Column(String(20), default='Hectare')
    crop_name = Column(String(50), nullable=False)
    variety = Column(String(50), nullable=True)
    sowing_date = Column(String(10), nullable=True)
    season = Column(String(20), nullable=False)
    soil_type = Column(String(50), nullable=False)
    fertilizer_type = Column(String(50), nullable=True)
    soil_ph = Column(Float, nullable=True)
    organic_carbon = Column(Float, nullable=True)
    irrigation_source = Column(String(50), nullable=False)
    irrigation_frequency = Column(String(20), nullable=False)
    water_availability = Column(String(20), nullable=False)
    predicted_yield = Column(Float, nullable=True)  # To store the predicted yield value

    def __repr__(self):
        return f'<CropYieldPrediction {self.id}: {self.crop_name}>'