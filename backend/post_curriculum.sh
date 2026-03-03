curl -X POST "http://localhost:8000/curriculum/" \
-H "Content-Type: application/json" \
-d '{"name": "John Doe", "email": "johndoe@email.com", "phone": "+1234567890", "edu_info": ["Bachelor of Science in Computer Science, XYZ University, 2020", "Master of Business Administration, ABC University, 2022"], "exp_info": ["Software Engineer at Company A (2020-2022)", "Business Analyst at Company B (2022-present)"], "skills_info": ["Python", "Data Analysis", "Project Management", "Communication"]}'
