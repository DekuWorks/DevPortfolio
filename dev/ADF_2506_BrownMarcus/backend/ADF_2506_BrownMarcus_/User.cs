// Brown, Marcus
// 6.21.2025
// Project 1: ADF
// 3.6 Data Integration 2 (Updated)
// Synopsis: Enhanced User class with role-based functionality and validation.

using System.ComponentModel.DataAnnotations;

namespace ADF_2506_BrownMarcus_.Models
{
    public enum UserRole
    {
        User,
        Parent,
        Caregiver,
        Administrator,
        Teacher
    }

    public class User
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Username is required")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Username must be between 3 and 50 characters")]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "Password is required")]
        [StringLength(100, MinimumLength = 6, ErrorMessage = "Password must be at least 6 characters")]
        public string Password { get; set; } = string.Empty;

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email format")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Role is required")]
        public UserRole Role { get; set; } = UserRole.User;

        // Role-specific fields
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? PhoneNumber { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string? Address { get; set; }

        // Parent-specific fields
        public string? EmergencyContact { get; set; }
        public string? EmergencyPhone { get; set; }

        // Caregiver-specific fields
        public string? CertificationNumber { get; set; }
        public DateTime? CertificationExpiry { get; set; }
        public string? Specializations { get; set; }

        // Teacher-specific fields
        public string? Department { get; set; }
        public string? SubjectArea { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? LastLoginAt { get; set; }
        public bool IsActive { get; set; } = true;

        public User() { }

        public User(string name, string password, string email, UserRole role = UserRole.User)
        {
            Name = name;
            Password = password;
            Email = email;
            Role = role;
        }

        public string GetFullName()
        {
            if (!string.IsNullOrEmpty(FirstName) && !string.IsNullOrEmpty(LastName))
                return $"{FirstName} {LastName}";
            return Name;
        }

        public bool IsRole(UserRole role)
        {
            return Role == role;
        }

        public bool HasAnyRole(params UserRole[] roles)
        {
            return roles.Contains(Role);
        }
    }
}
