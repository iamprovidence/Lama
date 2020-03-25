using AutoMapper;

using System;
using System.Linq;
using System.Collections.Generic;

using Domains.Aggregation;
using Domains.DataTransferObjects.Albums;
using Domains.DataTransferObjects.Photos;

namespace AggregatorServices.Services
{
    public class AlbumAggregator : Interfaces.IAlbumAggregator
    {
        private readonly IMapper _mapper;

        public AlbumAggregator(IMapper mapper)
        {
            _mapper = mapper;
        }

        public IEnumerable<AlbumList> Combine(IEnumerable<AlbumListDTO> albums, IEnumerable<PhotoListDTO> photos)
        {
            IDictionary<Guid, string> photoUrl = photos.ToDictionary(k => k.Id, v => v.PhotoUrl256);

            IEnumerable<AlbumList> albumsList = albums.Select(a =>
            {
                AlbumList album = _mapper.Map<AlbumList>(a);
                if (a.PhotoId.HasValue && photoUrl.ContainsKey(a.PhotoId.Value))
                {
                    album.CoverUrl = photoUrl[a.PhotoId.Value];
                }
                return album;
            });

            return albumsList;
        }
    }
}
