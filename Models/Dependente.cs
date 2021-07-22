using System;
using System.ComponentModel.DataAnnotations;

namespace pessoa_dependentes_serverside.Models
{
    public class Dependente
    {
        [Required]
        public Guid Id { get; set; }
        [Required]
        public string Nome { get; set; }
        [Required]
        public string Parentesco { get; set; }
        [Required]
        [Display(Name = "Data Nascimento")]
        [DisplayFormat(DataFormatString = "{0:MM/dd/yyyy}")]
        [DataType(DataType.Date)]
        public DateTime DataNascimento { get; set; }
        public Guid PessoaId { get; set; }
        public Pessoa Pessoa { get; set; }
    }
}