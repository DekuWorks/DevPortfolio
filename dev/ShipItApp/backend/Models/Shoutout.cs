namespace ShipItApp.Models
{
    public class Shoutout
    {
        public int Id { get; set; }
        public string UserName { get; set; } = string.Empty;
        public string FileName { get; set; } = string.Empty;
        public DateTime UploadedAt { get; set; }
    }
} 