using System;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.TableValues;
using Domain.TableValues;
using MediatR;
using Microsoft.Azure.Cosmos.Table;

namespace API.Controllers
{
    [ApiController]
    public class TableValuesController : ControllerBase
    {
        private readonly IMediator _mediator;

        public TableValuesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [Route("api/devices/{id}/values")]
        [HttpGet]
        public async Task<ActionResult<GetTableValues.TableValuesEnvelope>> GetTableValues(string id, [FromQuery] TableValuesQueryStringParams filter, [FromQuery] TableContinuationToken offsetToken)
        {
            return await _mediator.Send(new GetTableValues.Query(){Id = id, Params = filter, OffsetToken = offsetToken});
        }
    }
}
