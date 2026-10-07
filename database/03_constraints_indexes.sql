USE uninest;

-- Constraints for STUDENT
ALTER TABLE STUDENT
ADD CONSTRAINT chk_student_status CHECK (verification_status IN ('VERIFIED', 'PENDING', 'REJECTED'));

-- Constraints for LANDLORD
ALTER TABLE LANDLORD
ADD CONSTRAINT chk_landlord_status CHECK (verification_status IN ('VERIFIED', 'PENDING', 'REJECTED'));

-- Constraints for PROPERTY
ALTER TABLE PROPERTY
ADD CONSTRAINT chk_rent CHECK (rent_per_person > 0),
ADD CONSTRAINT chk_dist CHECK (distance_from_college >= 0),
ADD CONSTRAINT chk_deposit CHECK (deposit >= 0),
ADD CONSTRAINT chk_elec CHECK (electricity_estimate >= 0),
ADD CONSTRAINT chk_inet CHECK (internet_cost >= 0),
ADD CONSTRAINT chk_maint CHECK (maintenance_cost >= 0),
ADD CONSTRAINT chk_cap CHECK (total_capacity > 0),
ADD CONSTRAINT chk_avail CHECK (available_slots >= 0 AND available_slots <= total_capacity),
ADD CONSTRAINT chk_rating CHECK (rating >= 0 AND rating <= 5),
ADD CONSTRAINT chk_prop_status CHECK (verification_status IN ('VERIFIED', 'PENDING', 'REJECTED'));

-- Constraints for STUDENT_PREFERENCE
ALTER TABLE STUDENT_PREFERENCE
ADD CONSTRAINT chk_pref_budget CHECK (min_budget >= 0 AND max_budget >= min_budget),
ADD CONSTRAINT chk_pref_clean CHECK (cleanliness_level BETWEEN 1 AND 5),
ADD CONSTRAINT chk_pref_noise CHECK (noise_tolerance BETWEEN 1 AND 5),
ADD CONSTRAINT chk_pref_study CHECK (study_habit BETWEEN 1 AND 5),
ADD CONSTRAINT chk_pref_guest CHECK (guest_preference BETWEEN 1 AND 5);

-- Constraints for ROOMMATE_MATCH
ALTER TABLE ROOMMATE_MATCH
ADD CONSTRAINT chk_match_diff CHECK (student_id_1 != student_id_2),
ADD CONSTRAINT chk_match_status CHECK (status IN ('PENDING', 'ACCEPTED', 'REJECTED', 'EXPIRED')),
ADD CONSTRAINT chk_match_cscore CHECK (compatibility_score BETWEEN 0 AND 100),
ADD CONSTRAINT chk_match_bscore CHECK (budget_score BETWEEN 0 AND 100),
ADD CONSTRAINT chk_match_lscore CHECK (lifestyle_score BETWEEN 0 AND 100),
ADD CONSTRAINT chk_match_hscore CHECK (housing_score BETWEEN 0 AND 100);

-- Constraints for BOOKING
ALTER TABLE BOOKING
ADD CONSTRAINT chk_bkg_type CHECK (booking_type IN ('VISIT', 'RESERVE')),
ADD CONSTRAINT chk_bkg_status CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED', 'CANCELLED', 'COMPLETED'));

-- Constraints for LEASE
ALTER TABLE LEASE
ADD CONSTRAINT chk_lease_dates CHECK (end_date > start_date),
ADD CONSTRAINT chk_lease_rent CHECK (monthly_rent > 0),
ADD CONSTRAINT chk_lease_deposit CHECK (security_deposit >= 0),
ADD CONSTRAINT chk_lease_status CHECK (status IN ('ACTIVE', 'EXPIRED', 'TERMINATED'));

-- Constraints for REVIEW
ALTER TABLE REVIEW
ADD CONSTRAINT chk_rev_rating CHECK (rating BETWEEN 1 AND 5),
ADD CONSTRAINT chk_rev_clean CHECK (cleanliness_rating BETWEEN 1 AND 5),
ADD CONSTRAINT chk_rev_safety CHECK (safety_rating BETWEEN 1 AND 5),
ADD CONSTRAINT chk_rev_owner CHECK (owner_rating BETWEEN 1 AND 5),
ADD CONSTRAINT chk_rev_inet CHECK (internet_rating BETWEEN 1 AND 5);

-- Indexes
CREATE INDEX idx_student_email ON STUDENT(college_email);
CREATE INDEX idx_property_landlord ON PROPERTY(landlord_id);
CREATE INDEX idx_property_type ON PROPERTY(property_type);
CREATE INDEX idx_property_loc ON PROPERTY(location);
CREATE INDEX idx_property_dist ON PROPERTY(distance_from_college);
CREATE INDEX idx_property_rent ON PROPERTY(rent_per_person);
CREATE INDEX idx_property_avail ON PROPERTY(available_slots);
CREATE INDEX idx_property_status ON PROPERTY(verification_status);
CREATE INDEX idx_booking_student ON BOOKING(student_id);
CREATE INDEX idx_booking_property ON BOOKING(property_id);
CREATE INDEX idx_booking_status ON BOOKING(status);
CREATE INDEX idx_lease_student ON LEASE(student_id);
CREATE INDEX idx_lease_property ON LEASE(property_id);
CREATE INDEX idx_lease_status ON LEASE(status);
CREATE INDEX idx_review_property ON REVIEW(property_id);
CREATE INDEX idx_match_stu1 ON ROOMMATE_MATCH(student_id_1);
CREATE INDEX idx_match_stu2 ON ROOMMATE_MATCH(student_id_2);
