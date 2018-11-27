namespace Pihalve.PlaylistManager.Library.Model
{
    public enum Operator
    {
        Contains,
        DoesNotContain,
        Is,
        IsNot,
        StartsWith,
        EndsWith
    }

    public class QueryCondition
    {
        public string Field { get; set; }
        public Operator Operator { get; set; }
        public string Value { get; set; }
    }
}
