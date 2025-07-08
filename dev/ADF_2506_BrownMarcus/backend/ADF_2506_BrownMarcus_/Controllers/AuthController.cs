// Brown, Marcus
// 6.21.2025
// Project 1: ADF
// 3.6 Data Integration 2
// Synopsis: Authentication controller for login and registration endpoints.

using Microsoft.AspNetCore.Mvc;
using ADF_2506_BrownMarcus_.Models;
using ADF_2506_BrownMarcus_.Services;

namespace ADF_2506_BrownMarcus_.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IUserService _userService;

        public AuthController(IAuthService authService, IUserService userService)
        {
            _authService = authService;
            _userService = userService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = await _authService.AuthenticateAsync(request.Username, request.Password);
            
            if (user == null)
                return Unauthorized(new { message = "Invalid username or password" });

            return Ok(new
            {
                user = new
                {
                    id = user.Id,
                    name = user.Name,
                    email = user.Email,
                    role = user.Role,
                    firstName = user.FirstName,
                    lastName = user.LastName,
                    fullName = user.GetFullName()
                },
                message = "Login successful"
            });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User user)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Check if user already exists
            if (await _userService.UserExistsAsync(user.Name, user.Email))
                return BadRequest(new { message = "Username or email already exists" });

            var createdUser = await _userService.CreateUserAsync(user);

            return CreatedAtAction(nameof(GetUser), new { id = createdUser.Id }, new
            {
                user = new
                {
                    id = createdUser.Id,
                    name = createdUser.Name,
                    email = createdUser.Email,
                    role = createdUser.Role,
                    firstName = createdUser.FirstName,
                    lastName = createdUser.LastName,
                    fullName = createdUser.GetFullName()
                },
                message = "User created successfully"
            });
        }

        [HttpGet("user/{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _userService.GetUserByIdAsync(id);
            
            if (user == null)
                return NotFound(new { message = "User not found" });

            return Ok(new
            {
                user = new
                {
                    id = user.Id,
                    name = user.Name,
                    email = user.Email,
                    role = user.Role,
                    firstName = user.FirstName,
                    lastName = user.LastName,
                    phoneNumber = user.PhoneNumber,
                    dateOfBirth = user.DateOfBirth,
                    address = user.Address,
                    emergencyContact = user.EmergencyContact,
                    emergencyPhone = user.EmergencyPhone,
                    certificationNumber = user.CertificationNumber,
                    certificationExpiry = user.CertificationExpiry,
                    specializations = user.Specializations,
                    department = user.Department,
                    subjectArea = user.SubjectArea,
                    createdAt = user.CreatedAt,
                    lastLoginAt = user.LastLoginAt,
                    isActive = user.IsActive,
                    fullName = user.GetFullName()
                }
            });
        }
    }

    public class LoginRequest
    {
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
} 