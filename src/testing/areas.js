import AREA from "../models/AREAS.js";

const Data = [
  {
  name:'Depresion',
  image:"https://res.cloudinary.com/dcdywqotf/image/upload/v1675267920/areas/Depresion_gud0dp.svg"
},
  {
  name:'Ansiedad',
  image:"https://res.cloudinary.com/dcdywqotf/image/upload/v1675267920/areas/Ansiedad_eseo02.svg"
},
  {
  name:'Autoestima',
  image:"https://res.cloudinary.com/dcdywqotf/image/upload/v1675267920/areas/Autoestima_vtrhtn.svg"
},
  {
  name:'Familiar',
  image:"https://res.cloudinary.com/dcdywqotf/image/upload/v1675267920/areas/Terapia_Familiar_r7uudx.svg"
},
  {
  name:'Genero',
  image:"https://res.cloudinary.com/dcdywqotf/image/upload/v1675267920/areas/ComunidadLGBT_vloo89.svg"
},
];

export async function mapAreaTesting() {

  Data.map(async (u) => {
    await AREA.create({area: u });
  });
}
