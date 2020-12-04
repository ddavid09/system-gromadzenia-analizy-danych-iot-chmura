using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Devices;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Devices;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DevicesController : Controller
    {
        private readonly IMediator _mediator;

        public DevicesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<List<Device>>> GetAllDevices()
        {
            return await _mediator.Send(new GetAll.Query());
        }
        
        [HttpPost]
        public async Task<ActionResult<Device>> AddDevice(Add.Command command)
        {
            return await _mediator.Send(command);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> DeleteDevice(string id)
        {
            return await _mediator.Send(new Delete.Command{Id = id});
        }
    }
}