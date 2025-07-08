// Brown, Marcus
// 6.21.2025
// Project 1: ADF
// 3.6 Data Integration 2
// Synopsis: Users controller for user management endpoints.

using Microsoft.AspNetCore.Mvc;
using ADF_2506_BrownMarcus_.Models;
using ADF_2506_BrownMarcus_.Services;

namespace ADF_2506_BrownMarcus_.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _userService.GetAllUsersAsync();
            return Ok(new { users = users.Select(u => new
            {
                id = u.Id,
                name = u.Name,
                email = u.Email,
                role = u.Role,
                firstName = u.FirstName,
                lastName = u.LastName,
                fullName = u.GetFullName(),
                isActive = u.IsActive,
                createdAt = u.CreatedAt,
                lastLoginAt = u.LastLoginAt
            })});
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _userService.GetUserByIdAsync(id);
            
            if (user == null)
                return NotFound(new { message = "User not found" });

            return Ok(new { user = new
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
            }});
        }

        [HttpGet("role/{role}")]
        public async Task<IActionResult> GetUsersByRole(UserRole role)
        {
            var users = await _userService.GetUsersByRoleAsync(role);
            return Ok(new { users = users.Select(u => new
            {
                id = u.Id,
                name = u.Name,
                email = u.Email,
                role = u.Role,
                firstName = u.FirstName,
                lastName = u.LastName,
                fullName = u.GetFullName(),
                isActive = u.IsActive,
                createdAt = u.CreatedAt,
                lastLoginAt = u.LastLoginAt
            })});
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] User user)
        {
            if (id != user.Id)
                return BadRequest(new { message = "ID mismatch" });

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var updatedUser = await _userService.UpdateUserAsync(user);
                return Ok(new { 
                    user = new
                    {
                        id = updatedUser.Id,
                        name = updatedUser.Name,
                        email = updatedUser.Email,
                        role = updatedUser.Role,
                        firstName = updatedUser.FirstName,
                        lastName = updatedUser.LastName,
                        fullName = updatedUser.GetFullName()
                    },
                    message = "User updated successfully" 
                });
            }
            catch (ArgumentException ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var result = await _userService.DeleteUserAsync(id);
            
            if (!result)
                return NotFound(new { message = "User not found" });

            return Ok(new { message = "User deleted successfully" });
        }

        [HttpGet("stats")]
        public async Task<IActionResult> GetUserStats()
        {
            var allUsers = await _userService.GetAllUsersAsync();
            var usersList = allUsers.ToList();

            var stats = new
            {
                totalUsers = usersList.Count,
                activeUsers = usersList.Count(u => u.IsActive),
                usersByRole = usersList.GroupBy(u => u.Role)
                    .Select(g => new { role = g.Key, count = g.Count() }),
                recentLogins = usersList.Where(u => u.LastLoginAt.HasValue)
                    .OrderByDescending(u => u.LastLoginAt)
                    .Take(5)
                    .Select(u => new { 
                        name = u.GetFullName(), 
                        lastLogin = u.LastLoginAt 
                    })
            };

            return Ok(new { stats });
        }
    }
} 