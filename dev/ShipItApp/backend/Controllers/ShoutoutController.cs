using Microsoft.AspNetCore.Mvc;
using ShipItApp.Models;
using System.Text.Json;

namespace ShipItApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ShoutoutController : ControllerBase
    {
        private static List<Shoutout> _shoutouts = new List<Shoutout>();
        private static int _nextId = 1;
        private readonly IWebHostEnvironment _environment;

        public ShoutoutController(IWebHostEnvironment environment)
        {
            _environment = environment;
        }

        [HttpPost]
        public async Task<IActionResult> UploadShoutout(IFormFile file, [FromForm] string userName = "Anonymous")
        {
            try
            {
                if (file == null || file.Length == 0)
                {
                    return BadRequest(new { message = "No file uploaded" });
                }

                // Validate file type
                var allowedExtensions = new[] { ".mp3", ".wav", ".m4a", ".mp4", ".avi", ".mov", ".wmv" };
                var fileExtension = Path.GetExtension(file.FileName).ToLowerInvariant();
                
                if (!allowedExtensions.Contains(fileExtension))
                {
                    return BadRequest(new { message = "Invalid file type. Only audio and video files are allowed." });
                }

                // Create uploads directory if it doesn't exist
                var uploadsPath = Path.Combine(_environment.WebRootPath, "uploads");
                if (!Directory.Exists(uploadsPath))
                {
                    Directory.CreateDirectory(uploadsPath);
                }

                // Generate unique filename
                var fileName = $"{DateTime.Now:yyyyMMddHHmmss}_{Guid.NewGuid()}{fileExtension}";
                var filePath = Path.Combine(uploadsPath, fileName);

                // Save file
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                // Create shoutout record
                var shoutout = new Shoutout
                {
                    Id = _nextId++,
                    UserName = userName,
                    FileName = fileName,
                    UploadedAt = DateTime.UtcNow
                };

                _shoutouts.Add(shoutout);

                return Ok(new 
                { 
                    message = "Shoutout uploaded successfully",
                    shoutout = new
                    {
                        id = shoutout.Id,
                        userName = shoutout.UserName,
                        fileName = shoutout.FileName,
                        uploadedAt = shoutout.UploadedAt,
                        fileUrl = $"/uploads/{fileName}"
                    }
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"Error uploading file: {ex.Message}" });
            }
        }

        [HttpGet]
        public IActionResult GetShoutouts()
        {
            try
            {
                var shoutouts = _shoutouts.Select(s => new
                {
                    id = s.Id,
                    userName = s.UserName,
                    fileName = s.FileName,
                    uploadedAt = s.UploadedAt,
                    fileUrl = $"/uploads/{s.FileName}"
                }).ToList();

                return Ok(new { shoutouts });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"Error retrieving shoutouts: {ex.Message}" });
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetShoutout(int id)
        {
            try
            {
                var shoutout = _shoutouts.FirstOrDefault(s => s.Id == id);
                
                if (shoutout == null)
                {
                    return NotFound(new { message = "Shoutout not found" });
                }

                return Ok(new
                {
                    id = shoutout.Id,
                    userName = shoutout.UserName,
                    fileName = shoutout.FileName,
                    uploadedAt = shoutout.UploadedAt,
                    fileUrl = $"/uploads/{shoutout.FileName}"
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"Error retrieving shoutout: {ex.Message}" });
            }
        }
    }
} 