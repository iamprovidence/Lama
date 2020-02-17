﻿using Domains.DataTransferObjects.Photos;

using System.Threading.Tasks;
using System.Collections.Generic;

namespace HttpServices.Interfaces
{
    public interface IPhotosService
    {
        Task<IEnumerable<PhotoListDTO>> GetCurrentUserPhotosAsync();
    }
}