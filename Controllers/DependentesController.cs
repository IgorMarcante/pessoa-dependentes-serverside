using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using pessoa_dependentes_serverside.Data;
using pessoa_dependentes_serverside.Models;

namespace pessoa_dependentes_serverside.Controllers
{
    public class DependentesController : Controller
    {
        private readonly Context _context;

        public DependentesController(Context context)
        {
            _context = context;
        }

        public async Task<JsonResult> GetList(Guid Id)
        {
            var context = _context.Dependentes.Where(c => c.PessoaId == Id).OrderBy(c => c.Id);
            return Json(await context.ToListAsync());
        }
        public async Task<JsonResult> GetItem(Guid Id)
        {
            return Json(await _context.Dependentes.FindAsync(Id));
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] Dependente dependente)
        {
            if (ModelState.IsValid)
            {
                dependente.Id = Guid.NewGuid();
                _context.Add(dependente);
                await _context.SaveChangesAsync();
            }

            return Json(dependente);
        }


        [HttpPut]
        public async Task<IActionResult> Put(Guid id, [FromBody] Dependente dependente)
        {
            if (id != dependente.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(dependente);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!DependenteExists(dependente.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return Json(dependente);
            }
    
             return Json(dependente);
        }


        // POST: Dependentes/Delete/5
        [HttpDelete]
        public async Task<IActionResult> Delete(Guid id)
        {
            var dependente = await _context.Dependentes.FindAsync(id);
            _context.Dependentes.Remove(dependente);
            await _context.SaveChangesAsync();
            return Json(dependente);
        }

        private bool DependenteExists(Guid id)
        {
            return _context.Dependentes.Any(e => e.Id == id);
        }
    }
}
