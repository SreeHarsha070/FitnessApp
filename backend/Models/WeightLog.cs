using System.ComponentModel.DataAnnotations;

namespace FitTrack90.Backend.Models
{
    public class WeightLog
    {
        [Key]
        public int Id { get; set; }
        public Guid UserId { get; set; } = Guid.Empty;
        public DateTime Date { get; set; }
        public double Weight { get; set; }
    }
}
