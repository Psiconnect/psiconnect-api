import AREA from "../models/AREAS.js";

const Data = [
  {
  area:'Depresion',
  image:"https://res.cloudinary.com/dcdywqotf/image/upload/v1675267920/areas/Depresion_gud0dp.svg",
  description: 'La depresión es un trastorno mental común que se caracteriza por una sensación persistente de tristeza, desesperanza, desesperación y falta de interés en las actividades diarias. La depresión puede manifestarse de diferentes maneras en diferentes personas, pero algunos de los síntomas más comunes son: la fatiga, falta de energía y sensación de agotamiento; dificultad para concentrarse, recordar detalles y tomar decisiones; problemas de sueño, como insomnio o dormir demasiado; cambios en el apetito y el peso corporal, y sentimientos de culpa, inutilidad y desesperanza. Si crees que estás experimentando síntomas de depresión, te recomendamos solicitar la ayuda de nuestros profesionales avocados a esta area.'
},
  {
  area:'Ansiedad',
  image:"https://res.cloudinary.com/dcdywqotf/image/upload/v1675267920/areas/Ansiedad_eseo02.svg",
  description: 'La ansiedad es una respuesta emocional natural que experimenta el cuerpo cuando se siente amenazado o en peligro. Es una sensación de preocupación, inquietud, miedo o aprensión que puede surgir en situaciones cotidianas o estresantes. Ésta puede manifestarse físicamente en el cuerpo, como sudoración excesiva, aumento de la frecuencia cardíaca, temblores, tensión muscular, náuseas, entre otros síntomas. Si sientes que la ansiedad está afectando tu vida diaria, te recomendamos solicitar la ayuda de nuestros profesionales avocados a esta area.'
},
  {
  area:'Autoestima',
  image:"https://res.cloudinary.com/dcdywqotf/image/upload/v1675267920/areas/Autoestima_vtrhtn.svg",
  description: 'Los trastornos o problemas de autoestima son comunes y pueden afectar la forma en que una persona se siente consigo misma, así como su comportamiento y relaciones con los demás. Algunas problemáticas relacionadas con la autoestima son el perfeccionismo, el narcisismo, la baja autoestima, la ansiedad social y la comparación social. Los problemas de autoestima pueden tener consecuencias negativas en la vida de una persona, como dificultades para relacionarse con los demás, baja autoconfianza, problemas de salud mental y emocional y bajo rendimiento académico o laboral. Para saber más sobre estas problemáticas y desarrollar una autoestima más saludable, te recomendamos contactarte con alguno de nuestros profesionales avocados a esta area.'
},
  {
  area:'Familiar',
  image:"https://res.cloudinary.com/dcdywqotf/image/upload/v1675267920/areas/Terapia_Familiar_r7uudx.svg",
  description: 'Los conflictos entre los miembros de la familia son comunes y pueden ser causados por diversas razones, como diferencias de opinión, problemas de comunicación, falta de límites, celos, entre otros. La psicología familiar puede ayudar a las familias a identificar y resolver estos conflictos de manera efectiva. Otro problema que trata esta area está relacionada con las dificultades en el matrimonio o en relaciones de pareja: Las relaciones de pareja pueden enfrentar problemas como la infidelidad, la falta de comunicación, la falta de apoyo emocional, entre otros. Es importante recibir la ayuda de un profesional para superar estos problemas y fortalecer su relación. Si crees que estas transitando problemas con tu familia, puedes solicitar la ayuda de nuestros profesionales para reolverlos y mejorar sus relaciones, fomentando la comunicación, el apoyo mutuo, el respeto y el amor en el contexto de la familia.'
},
  {
  area:'Genero',
  image:"https://res.cloudinary.com/dcdywqotf/image/upload/v1675267920/areas/ComunidadLGBT_vloo89.svg",
  description: 'La identidad de género es la forma en que una persona se identifica en términos de su género, que puede no coincidir con el sexo que se le asignó al nacer. Las problematicas más comunes relacionadas con la identidad de género incluyen: la discriminanción (la discriminación, hostigamiento y violencia hacia algunas personas debido a su identidad de género pueden ser evidentes en el lugar de trabajo, en las escuelas, en las interacciones cotidianas y en otros ámbitos), la falta de apoyo (esto puede hacer que sea más difícil para muchas personas aceptar y expresar su identidad de género, lo que puede llevar a problemas emocionales, sociales y de salud mental), y la exclusión social (las personas transgénero y no binarias pueden sentirse excluidas de la sociedad en general, y de sus comunidades específicas, lo que puede llevar a sentimientos de aislamiento, soledad y depresión). Si necesitas ayuda para afrontar alguno de estos problemas, contáctate con uno de nuestros profesionales avocados a esta area.'
},

];

export async function mapAreaTesting() {

  Data.map(async (u) => {
    await AREA.create(u);
  });
}
