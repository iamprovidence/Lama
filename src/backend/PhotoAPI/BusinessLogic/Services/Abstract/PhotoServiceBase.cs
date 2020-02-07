using AutoMapper;

using BusinessLogic.Interfaces;

using DataAccess.Interfaces;

namespace BusinessLogic.Services.Abstract
{
    public abstract class PhotoServiceBase
    {
        protected readonly IMapper _mapper;
        protected readonly IAuthService _authService;
        protected readonly IElasticService _elasticService;
        protected readonly IPhotoBlobStorage _blobStorage;
        protected readonly IImageService _imageService;

        protected PhotoServiceBase(
            IMapper mapper,
            IAuthService authService,
            IElasticService elasticService,
            IPhotoBlobStorage blobStorage,
            IImageService imageService)
        {
            _mapper = mapper;
            _authService = authService;
            _elasticService = elasticService;
            _blobStorage = blobStorage;
            _imageService = imageService;
        }

    }
}
