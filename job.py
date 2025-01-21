def get_input():
    # Input for applications
    applications = []
    num_applications = int(input("Enter the number of applications: "))
    for i in range(num_applications):
        name = input(f"Enter name for applicant {i + 1}: ")
        skills_input = input(f"Enter skills for applicant {i + 1} (comma separated): ")
        skills = [skill.strip() for skill in skills_input.split(',')]
        experience = int(input(f"Enter experience for applicant {i + 1} (in years): "))
        applications.append({"name": name, "skills": skills, "experience": experience})
    
    # Input for required skills
    required_skills_input = input("Enter required skills (comma separated): ")
    required_skills = set([skill.strip() for skill in required_skills_input.split(',')])
    
    # Input for minimum experience
    minimum_experience = int(input("Enter minimum experience required (in years): "))
    
    return applications, required_skills, minimum_experience

# Function to filter applications based on input
def filter_applications(applications, required_skills, minimum_experience):
    shortlisted = []
    for application in applications:
        if (required_skills.issubset(application["skills"]) and
                application["experience"] >= minimum_experience):
            shortlisted.append(application)
    return shortlisted

# Get user input
applications, required_skills, minimum_experience = get_input()

# Filter applications based on input criteria
shortlisted_candidates = filter_applications(applications, required_skills, minimum_experience)

# Output the shortlisted candidates
print("\nShortlisted Candidates:")
for candidate in shortlisted_candidates:
    print(f"Name: {candidate['name']}, Experience: {candidate['experience']} years")