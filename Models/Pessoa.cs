using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace pessoa_dependentes_serverside.Models
{
    public class Pessoa
    {
        [Key]
        public Guid Id { get; set; }
        public string Nome { get; set; }
        [Required]
        [Display(Name = "Data Nascimento")]
        [DisplayFormat(DataFormatString = "{0:MM/dd/yyyy}")]
        [DataType(DataType.Date)]
        public DateTime DataNascimento { get; set; }
        [Required]
        public string CPF { get; set; }
        public ICollection<Pessoa> Pessoas { get; set; }
    }
}