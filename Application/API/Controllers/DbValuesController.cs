using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Application.DbValues;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DbValuesController : ControllerBase
    {
        private readonly IMediator _mediator;

        public DbValuesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<List<DbValue>>> GetAll()
        {
            return await _mediator.Send(new GetAll.Query());
        }
    }
}