using Microsoft.EntityFrameworkCore;
using pessoa_dependentes_serverside.Models;

namespace pessoa_dependentes_serverside.Data
{
    public class Context : DbContext
    {
        public Context(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Pessoa> Pessoas { get; set; }
        public DbSet<Dependente> Dependentes { get; set; }
    }
}