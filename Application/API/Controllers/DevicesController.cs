using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Devices;
using Domain.DevicesDtos;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Devices;
using Microsoft.Azure.Devices.Shared;

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
        public async Task<ActionResult<List<DeviceResponse>>> GetAllDevices()
        {
            return await _mediator.Send(new GetAll.Query());
        }
        
        [HttpPost]
        public async Task<ActionResult<DeviceResponse>> NewDevice(NewDevice.Command command)
        {
            return await _mediator.Send(command);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Edit (string id, Edit.Command command)
        {
            command.DeviceId = id;
            return await _mediator.Send(command);
        } 

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> DeleteDevice(string id)
        {
            return await _mediator.Send(new Delete.Command{Id = id});
        }
    }
}