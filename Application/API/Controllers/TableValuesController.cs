using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.TableValues;
using MediatR;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TableValuesController : ControllerBase
    {
        private readonly IMediator _mediator;

        public TableValuesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<List<TableValue>>> GetTableValues()
        {
            return await _mediator.Send(new GetTableValues.Query());
        }
    }
}
