// src/environments/environment.ts

export const environment = {
  production: false,
  tmdb: {
    api: {
      baseUrl: 'https://api.themoviedb.org/3',
      imageBaseUrl: 'https://image.tmdb.org/t/p',
      apiKey: 'b590bd999dbf15a61ef1ad9a324b5624',
      accessToken:
        'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNTkwZDA5OTlkYmYxNWE2MWVmMWFkOWEzMjRiNTYyNCIsIm5iZiI6MTczNTk5NTM2NS40LCJzdWIiOiI2Nzc5MmZlNThmZDZmNTEwOWQ3Mjc4NjQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.dLlXqs5qWNtneVRywtaOKow-IG48fVLbJAVSEhp-wwk', // Your access token
    },
  },
};
