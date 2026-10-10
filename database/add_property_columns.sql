-- Run this in your Supabase SQL Editor to add map and image support to the PROPERTY table

ALTER TABLE PROPERTY 
ADD COLUMN IF NOT EXISTS latitude NUMERIC(10, 7),
ADD COLUMN IF NOT EXISTS longitude NUMERIC(10, 7),
ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Seed the existing mock properties with coordinates and images so they don't break the map
UPDATE PROPERTY SET 
latitude = 26.8380368, longitude = 75.6546479, image_url = 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80' WHERE property_id = 1;

UPDATE PROPERTY SET 
latitude = 26.8293025, longitude = 75.654102, image_url = 'https://images.unsplash.com/photo-1502672260266-1c1de2d96674?auto=format&fit=crop&w=800&q=80' WHERE property_id = 2;

UPDATE PROPERTY SET 
latitude = 26.8267777, longitude = 75.6577877, image_url = 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80' WHERE property_id = 3;

UPDATE PROPERTY SET 
latitude = 26.837, longitude = 75.659, image_url = 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80' WHERE property_id = 4;

UPDATE PROPERTY SET 
latitude = 26.821, longitude = 75.642, image_url = 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80' WHERE property_id = 5;
