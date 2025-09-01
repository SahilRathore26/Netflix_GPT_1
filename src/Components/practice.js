<div className="absolute w-screen h-[45%]">
        <img
          className="w-full h-full object-fill"
          alt="bg-image"
          src={CARD_CDN_URL + movieInfo.backdrop_path}
        />

        {/* Neeche se blur effect */}
        <div
          className="absolute bottom-0 left-0 w-full h-28 
                  bg-gradient-to-t from-neutral-900"
        ></div>
      </div>
      <div className="px-14 relative top-[310px] z-10 text-center">
        <h1 className="text-3xl font-bold mb-4">{movieInfo.title}</h1>
        
      </div>