using System.ComponentModel.DataAnnotations;

namespace ShipItApp.Validation
{
    public static class ValidationHelper
    {
        public static class FileValidation
        {
            private static readonly string[] AllowedAudioExtensions = { ".mp3", ".wav", ".m4a", ".aac", ".ogg" };
            private static readonly string[] AllowedVideoExtensions = { ".mp4", ".avi", ".mov", ".wmv", ".flv", ".webm" };
            private static readonly long MaxFileSizeBytes = 100 * 1024 * 1024; // 100MB

            public static ValidationResult ValidateAudioVideoFile(IFormFile file)
            {
                if (file == null || file.Length == 0)
                {
                    return new ValidationResult("No file provided");
                }

                if (file.Length > MaxFileSizeBytes)
                {
                    return new ValidationResult($"File size exceeds maximum allowed size of {MaxFileSizeBytes / (1024 * 1024)}MB");
                }

                var extension = Path.GetExtension(file.FileName).ToLowerInvariant();
                var allowedExtensions = AllowedAudioExtensions.Concat(AllowedVideoExtensions).ToArray();

                if (!allowedExtensions.Contains(extension))
                {
                    return new ValidationResult($"File type not allowed. Allowed types: {string.Join(", ", allowedExtensions)}");
                }

                return ValidationResult.Success!;
            }

            public static bool IsAudioFile(string fileName)
            {
                var extension = Path.GetExtension(fileName).ToLowerInvariant();
                return AllowedAudioExtensions.Contains(extension);
            }

            public static bool IsVideoFile(string fileName)
            {
                var extension = Path.GetExtension(fileName).ToLowerInvariant();
                return AllowedVideoExtensions.Contains(extension);
            }
        }

        public static class UserInputValidation
        {
            public static ValidationResult ValidateUserName(string userName)
            {
                if (string.IsNullOrWhiteSpace(userName))
                {
                    return new ValidationResult("Username cannot be empty");
                }

                if (userName.Length < 3)
                {
                    return new ValidationResult("Username must be at least 3 characters long");
                }

                if (userName.Length > 50)
                {
                    return new ValidationResult("Username cannot exceed 50 characters");
                }

                // Check for valid characters (alphanumeric, underscore, hyphen)
                if (!System.Text.RegularExpressions.Regex.IsMatch(userName, @"^[a-zA-Z0-9_-]+$"))
                {
                    return new ValidationResult("Username can only contain letters, numbers, underscores, and hyphens");
                }

                return ValidationResult.Success!;
            }

            public static ValidationResult ValidateSearchQuery(string query)
            {
                if (string.IsNullOrWhiteSpace(query))
                {
                    return new ValidationResult("Search query cannot be empty");
                }

                if (query.Length > 200)
                {
                    return new ValidationResult("Search query cannot exceed 200 characters");
                }

                return ValidationResult.Success!;
            }

            public static ValidationResult ValidateTag(string tag)
            {
                if (string.IsNullOrWhiteSpace(tag))
                {
                    return new ValidationResult("Tag cannot be empty");
                }

                if (tag.Length > 30)
                {
                    return new ValidationResult("Tag cannot exceed 30 characters");
                }

                // Check for valid tag format (alphanumeric, hyphens, underscores)
                if (!System.Text.RegularExpressions.Regex.IsMatch(tag, @"^[a-zA-Z0-9_-]+$"))
                {
                    return new ValidationResult("Tag can only contain letters, numbers, underscores, and hyphens");
                }

                return ValidationResult.Success!;
            }
        }

        public static class ApiValidation
        {
            public static ValidationResult ValidatePagination(int page, int pageSize)
            {
                if (page < 1)
                {
                    return new ValidationResult("Page number must be greater than 0");
                }

                if (pageSize < 1 || pageSize > 100)
                {
                    return new ValidationResult("Page size must be between 1 and 100");
                }

                return ValidationResult.Success!;
            }

            public static ValidationResult ValidateId(int id)
            {
                if (id <= 0)
                {
                    return new ValidationResult("ID must be a positive integer");
                }

                return ValidationResult.Success!;
            }
        }
    }
} 