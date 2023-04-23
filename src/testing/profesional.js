import { hash } from "bcrypt";
import AREA from "../models/AREAS.js";
import PROFESSIONAL from "../models/PROFESSIONAL.js";
import SKILLS from "../models/SKILLS.js";
import dataAreas from "./areas.js";
import dataSkills from "./skills.js";

const user = [
  {
    email: "salud.psiconnect@gmail.com",
    name: "Braian",
    lastName: "Valdez",
    description:
      "El mejor psicologo que podras encontrar en esta web. si quieres saber mas mandame un msg a: https://www.linkedin.com/in/braian-valdez-365679239/",
    linkedin: "https://www.linkedin.com/in/braian-valdez-365679239/",
    password: "Test1234",
    area: ["Ansiedad", "Autoestima"],
    state: "avalible",
    avatar:
      "https://construyored.com/storage/usuarios/images/large/15547722395cabf10fb0617.png",
  },
  {
    name: "Dianna",
    lastName: "Graham",
    price: "60",
    email: "diannagraham@tingles.com",
    description:
      "Cupidatat ad amet dolore aliqua velit ad. Reprehenderit labore cupidatat veniam ad ipsum reprehenderit Lorem dolor deserunt ea laboris nulla. Ipsum mollit culpa ad excepteur pariatur ex dolore dolore magna deserunt consectetur laborum. Officia aute magna exercitation ipsum aliqua commodo reprehenderit et Lorem tempor deserunt. Incididunt duis nostrud consectetur tempor minim eu pariatur. Cupidatat cupidatat anim cillum nisi minim velit fugiat dolore anim excepteur voluptate ipsum proident. Amet id mollit proident aliquip enim magna labore pariatur id eiusmod adipisicing voluptate enim.\r\n",
    linkedin: "https://www.linkedin.com/in/jonathandanielarce/",
    password: "Test1234",
    area: "Ansiedad",
    state: "avalible",
    avatar:
      "https://construyored.com/storage/usuarios/images/large/15547722395cabf10fb0617.png",
  },
  {
    name: "Lucille",
    lastName: "Stephenson",
    email: "lucillestephenson@tingles.com",
    price: "50",
    description:
      "Reprehenderit aliquip elit ea eu proident exercitation ex cupidatat exercitation. Enim sit nulla labore irure ut aliqua mollit eu do ullamco commodo. Occaecat nulla ipsum anim eiusmod do anim sint fugiat aute pariatur eu irure aliquip laboris. Sint et nulla ut et consectetur. Pariatur quis amet deserunt irure adipisicing tempor qui occaecat cupidatat et voluptate exercitation quis.\r\n",
    linkedin: "https://www.linkedin.com/in/jonathandanielarce/",
    password: "Test1234",
    area: "Ansiedad",
    state: "avalible",
    avatar: "https://cdn-images.resumelab.com/pages/15_foto_rles.jpg",
  },
  {
    name: "Rosalind",
    lastName: "Whitaker",
    email: "rosalindwhitaker@tingles.com",
    description:
      "Sunt in velit enim dolore laborum occaecat ad culpa amet sunt Lorem occaecat nulla irure. Ullamco consectetur consectetur duis ea dolor reprehenderit in pariatur culpa voluptate aliqua eu. Laboris occaecat exercitation in voluptate in excepteur magna consequat consectetur. Irure dolor elit non anim dolor. Nulla velit veniam mollit consequat voluptate et aliqua aute. Minim consectetur culpa ex velit duis velit.\r\n",
    linkedin: "https://www.linkedin.com/in/jonathandanielarce/",
    password: "Test1234",
    area: "Ansiedad",
    state: "avalible",
    avatar: "https://cdn-images.resumelab.com/pages/15_foto_rles.jpg",
  },
  {
    name: "Mcdowell",
    lastName: "Abbott",
    email: "mcdowellabbott@tingles.com",
    description:
      "Sit ex labore amet eiusmod. Quis irure laborum proident mollit dolor labore magna amet. Amet reprehenderit ea elit commodo amet consequat adipisicing adipisicing officia exercitation deserunt anim exercitation pariatur. Id elit cupidatat cupidatat exercitation id in sunt pariatur qui consequat.\r\n",
    linkedin: "https://www.linkedin.com/in/jonathandanielarce/",
    password: "Test1234",
    area: "Ansiedad",
    state: "avalible",
    avatar:
      "https://res.cloudinary.com/dhkfa798t/image/upload/v1675414590/Smonkey/heroimg_qv9zgi.png",
  },
  {
    name: "Janis",
    lastName: "Mcclain",
    email: "janismcclain@tingles.com",
    description:
      "Aliqua voluptate excepteur ea proident cillum officia ea esse ad voluptate Lorem. Eiusmod mollit do veniam in. Enim mollit cillum irure ad. Cillum ullamco veniam elit est anim aliquip nulla. Do irure aliquip commodo cupidatat nulla sunt minim fugiat velit.\r\n",
    linkedin: "https://www.linkedin.com/in/jonathandanielarce/",
    password: "Test1234",
    area: "Ansiedad",
    state: "avalible",
    avatar:
      "https://res.cloudinary.com/dhkfa798t/image/upload/v1675414590/Smonkey/heroimg_qv9zgi.png",
  },
  {
    name: "Jana",
    lastName: "Boyd",
    email: "janaboyd@tingles.com",
    description:
      "Eu proident laboris occaecat fugiat esse ullamco excepteur pariatur. In qui aute qui consectetur in irure culpa ullamco amet pariatur in consequat id tempor. Ipsum dolore excepteur sit excepteur irure qui dolor pariatur Lorem eiusmod incididunt nostrud. Sunt consectetur eiusmod ex minim et mollit sint exercitation elit aliquip est. Lorem aliquip non et magna mollit qui nulla aliquip elit qui laborum est. Nulla fugiat nostrud laboris commodo elit Lorem Lorem amet id. Sit reprehenderit culpa veniam labore nostrud enim cillum nisi ad est est.\r\n",
    linkedin: "https://www.linkedin.com/in/jonathandanielarce/",
    password: "Test1234",
    area: "Ansiedad",
    state: "avalible",
    avatar:
      "https://res.cloudinary.com/dhkfa798t/image/upload/v1675414590/Smonkey/heroimg_qv9zgi.png",
  },

  {
    name: "Short",
    lastName: "Fleming",
    email: "shortfleming@tingles.com",
    description:
      "Do esse commodo est enim eiusmod incididunt ipsum sint non eiusmod irure. Anim consequat officia officia deserunt nisi magna ea reprehenderit esse fugiat amet fugiat ex. Nisi do excepteur ipsum quis dolor do enim esse esse qui id Lorem tempor. Laboris dolor tempor cillum qui irure. Consequat pariatur esse consectetur ut anim qui laborum do ad eu dolor.\r\n",
    linkedin: "https://www.linkedin.com/in/jonathandanielarce/",
    password: "Test1234",
    area: "Depresion",
    state: "avalible",
    avatar: "https://cdn-images.resumelab.com/pages/15_foto_rles.jpg",
  },
  {
    name: "Alvarez",
    lastName: "Cooper",
    email: "alvarezcooper@tingles.com",
    description:
      "Minim cillum id eu aute ipsum reprehenderit id. Reprehenderit cupidatat cillum ea nulla anim. Irure ullamco nulla do voluptate magna sunt esse incididunt. Sit enim sit labore pariatur labore. Fugiat incididunt ullamco sint sit tempor.\r\n",
    linkedin: "https://www.linkedin.com/in/jonathandanielarce/",
    password: "Test1234",
    area: "Depresion",
    state: "avalible",
    avatar:
      "https://s36496.pcdn.co/wp-content/uploads/2017/11/9-si-foto-cv.png",
  },
  {
    name: "Ola",
    lastName: "Mueller",
    email: "olamueller@tingles.com",
    description:
      "Est Lorem do pariatur fugiat. Nulla consequat deserunt ex proident officia aliqua consequat cupidatat magna nostrud culpa minim. Et esse dolore pariatur duis est nisi fugiat non laborum aliqua. Elit ullamco dolore laboris ut minim. Dolore pariatur eiusmod laboris dolor pariatur irure quis voluptate laboris officia nulla.\r\n",
    linkedin: "https://www.linkedin.com/in/jonathandanielarce/",
    password: "Test1234",
    area: "Depresion",
    state: "avalible",
    avatar:
      "https://opem.b-cdn.net/wp-content/uploads/2022/10/foto-curriculum.jpg",
  },
  {
    name: "Hull",
    lastName: "Owen",
    email: "hullowen@tingles.com",
    description:
      "Magna nisi do proident ullamco ipsum consectetur labore nostrud velit et fugiat nostrud ex voluptate. Labore minim proident est voluptate. Officia magna exercitation sit fugiat veniam occaecat et dolor enim aliqua in aute id.\r\n",
    linkedin: "https://www.linkedin.com/in/jonathandanielarce/",
    password: "Test1234",
    area: "Depresion",
    state: "avalible",
    avatar: "https://cdn-images.resumelab.com/pages/15_foto_rles.jpg",
  },
  {
    name: "Charmaine",
    lastName: "Noble",
    price: "60",
    email: "charmainenoble@tingles.com",
    description:
      "Dolore culpa est et consectetur ad. Irure laborum Lorem sit ex Lorem officia cupidatat duis tempor mollit eu magna laboris. Velit minim eu qui eu commodo ipsum officia eiusmod sint consequat commodo.\r\n",
    linkedin: "https://www.linkedin.com/in/jonathandanielarce/",
    password: "Test1234",
    area: "Depresion",
    state: "avalible",
    avatar:
      "https://construyored.com/storage/usuarios/images/large/15547722395cabf10fb0617.png",
  },
  {
    name: "Gallagher",
    lastName: "Hewitt",
    email: "gallagherhewitt@tingles.com",
    description:
      "Culpa ullamco est minim adipisicing velit sit dolor commodo incididunt reprehenderit esse. Aute voluptate incididunt cillum eiusmod occaecat quis nostrud nisi. Consequat quis veniam nulla excepteur eu irure aliqua proident cillum reprehenderit officia. Exercitation sit cillum ipsum dolore eiusmod reprehenderit cillum amet dolore. Ad anim ad magna do sint. Qui sint proident laborum dolore duis quis voluptate irure cillum ullamco. Consectetur in veniam anim consectetur nisi et anim elit laborum ipsum id ullamco.\r\n",
    linkedin: "https://www.linkedin.com/in/jonathandanielarce/",
    password: "Test1234",
    area: "Depresion",
    state: "avalible",
    avatar:
      "https://s36496.pcdn.co/wp-content/uploads/2017/11/9-si-foto-cv.png",
  },
  {
    name: "Hernandez",
    lastName: "Olson",
    email: "hernandezolson@tingles.com",
    description:
      "Mollit in est sunt aliquip. Sit sint exercitation anim sint quis nulla quis ut nostrud cupidatat ut aliquip officia quis. Officia aliquip ipsum ad sunt qui id duis. Sint nostrud occaecat sint ullamco. Exercitation voluptate veniam velit ea deserunt pariatur id magna cupidatat et incididunt. Irure consequat ea est culpa duis tempor labore veniam mollit est duis esse cupidatat id. Esse dolore deserunt in magna id anim cupidatat laborum Lorem incididunt elit pariatur.\r\n",
    linkedin: "https://www.linkedin.com/in/jonathandanielarce/",
    password: "Test1234",
    area: "Depresion",
    state: "avalible",
    avatar:
      "https://s36496.pcdn.co/wp-content/uploads/2017/11/9-si-foto-cv.png",
  },

  {
    name: "Banks",
    lastName: "Phelps",
    email: "banksphelps@tingles.com",
    description:
      "Eiusmod minim incididunt ex cupidatat pariatur ad. Dolor sit aute ad officia exercitation velit dolore do fugiat ut elit commodo. Dolor deserunt ullamco cillum quis consectetur commodo consequat minim adipisicing nisi. Nisi incididunt commodo Lorem ex id anim nisi Lorem. Commodo qui cillum adipisicing nulla eu anim cillum non Lorem consequat irure ullamco.\r\n",
    linkedin: "https://www.linkedin.com/in/jonathandanielarce/",
    password: "Test1234",
    area: "Autoestima",
    state: "avalible",
    avatar:
      "https://opem.b-cdn.net/wp-content/uploads/2022/10/foto-curriculum.jpg",
  },
  {
    name: "Chandra",
    lastName: "Carter",
    email: "chandracarter@tingles.com",
    description:
      "Sit voluptate minim velit cillum veniam occaecat nisi. Laborum nostrud sint cupidatat Lorem ipsum laboris ea proident ex sint proident est non dolore. Eiusmod anim aute eiusmod duis ex.\r\n",
    linkedin: "https://www.linkedin.com/in/jonathandanielarce/",
    password: "Test1234",
    area: "Autoestima",
    state: "avalible",
    avatar:
      "https://res.cloudinary.com/dhkfa798t/image/upload/v1675414590/Smonkey/heroimg_qv9zgi.png",
  },
  {
    name: "Alicia",
    lastName: "Callahan",
    price: "60",
    email: "aliciacallahan@tingles.com",
    description:
      "Minim ipsum deserunt amet irure reprehenderit pariatur aliquip dolore mollit officia. Aliqua reprehenderit irure ad sunt id fugiat dolor veniam aliquip excepteur cillum occaecat sit. Dolore deserunt irure officia nisi ad.\r\n",
    linkedin: "https://www.linkedin.com/in/jonathandanielarce/",
    password: "Test1234",
    area: "Autoestima",
    state: "avalible",
    avatar:
      "https://res.cloudinary.com/dhkfa798t/image/upload/v1675414590/Smonkey/heroimg_qv9zgi.png",
  },
  {
    name: "Priscilla",
    lastName: "Davenport",
    email: "priscilladavenport@tingles.com",
    description:
      "Voluptate eu amet ad cupidatat magna esse aliqua nisi. Commodo pariatur sint minim commodo enim. Eu cillum magna non deserunt nisi dolore id eu sint.\r\n",
    linkedin: "https://www.linkedin.com/in/jonathandanielarce/",
    password: "Test1234",
    area: "Autoestima",
    state: "avalible",
    avatar:
      "https://res.cloudinary.com/dhkfa798t/image/upload/v1675414590/Smonkey/heroimg_qv9zgi.png",
  },
  {
    name: "Elinor",
    lastName: "Burt",
    price: "70",
    email: "elinorburt@tingles.com",
    description:
      "Eiusmod ex dolore ipsum irure reprehenderit. Fugiat voluptate nisi tempor minim occaecat et nulla. Laborum cupidatat aliqua ad fugiat consectetur do consequat voluptate aute enim veniam quis Lorem. Aliqua exercitation mollit irure ut enim pariatur occaecat anim veniam aliquip. Adipisicing magna ea ea minim officia ipsum incididunt. Eu minim elit ea incididunt aliqua aliqua pariatur minim cillum consectetur.\r\n",
    linkedin: "https://www.linkedin.com/in/jonathandanielarce/",
    password: "Test1234",
    area: "Autoestima",
    state: "avalible",
    avatar:
      "https://s36496.pcdn.co/wp-content/uploads/2017/11/9-si-foto-cv.png",
  },
  {
    name: "Campbell",
    lastName: "Reed",
    email: "campbellreed@tingles.com",
    description:
      "Quis deserunt est eiusmod incididunt occaecat. Incididunt et est consequat magna occaecat esse eiusmod. Veniam mollit fugiat non ea cupidatat qui officia labore ad est adipisicing voluptate fugiat. Exercitation deserunt deserunt Lorem id veniam aliqua consectetur do sint Lorem.\r\n",
    linkedin: "https://www.linkedin.com/in/jonathandanielarce/",
    password: "Test1234",
    area: "Autoestima",
    state: "avalible",
    avatar:
      "https://s36496.pcdn.co/wp-content/uploads/2017/11/9-si-foto-cv.png",
  },
  {
    name: "Padilla",
    lastName: "Whitfield",
    email: "padillawhitfield@tingles.com",
    description:
      "Incididunt aliquip ut est fugiat veniam ea ipsum officia voluptate dolor labore do. Proident commodo voluptate exercitation non sunt proident et laborum veniam veniam quis. Id exercitation nisi aliquip voluptate aliqua. Anim nisi deserunt minim irure minim velit. Laboris anim id elit velit nisi. Sit sint sunt est nulla ea laboris sit est duis ipsum irure ad do enim. Ea laboris fugiat laborum incididunt aliquip fugiat aliquip est.\r\n",
    linkedin: "https://www.linkedin.com/in/jonathandanielarce/",
    password: "Test1234",
    area: "Autoestima",
    state: "avalible",
    avatar:
      "https://construyored.com/storage/usuarios/images/large/15547722395cabf10fb0617.png",
  },

  {
    name: "Long",
    lastName: "Harris",
    price: "60",
    email: "longharris@tingles.com",
    description:
      "Ad consequat elit sit exercitation. Proident cupidatat id elit laboris incididunt proident laborum nulla aliqua quis aliquip ullamco aliqua. Id aliquip nisi in veniam non ea ad veniam esse et reprehenderit id voluptate dolor. Adipisicing sunt nulla est sit aliqua. Consequat tempor ut do anim exercitation minim elit. Laboris commodo et esse nisi nulla in ad sint ea eu ullamco fugiat eiusmod.\r\n",
    linkedin: "https://www.linkedin.com/in/jonathandanielarce/",
    password: "Test1234",
    area: "Familiar",
    state: "avalible",
    avatar:
      "https://res.cloudinary.com/dhkfa798t/image/upload/v1675414590/Smonkey/heroimg_qv9zgi.png",
  },
  {
    name: "Marcie",
    lastName: "Rivers",
    email: "marcierivers@tingles.com",
    description:
      "Cillum exercitation ad velit ipsum exercitation consequat dolore ipsum esse amet et cillum pariatur do. Mollit qui in culpa sunt do sunt eiusmod mollit Lorem. Eiusmod cillum in velit voluptate quis velit mollit magna. Nostrud est culpa ex in excepteur deserunt nostrud.\r\n",
    linkedin: "https://www.linkedin.com/in/jonathandanielarce/",
    password: "Test1234",
    area: "Familiar",
    state: "avalible",
    avatar:
      "https://construyored.com/storage/usuarios/images/large/15547722395cabf10fb0617.png",
  },
  {
    name: "Bass",
    lastName: "Schneider",
    price: "50",
    email: "bassschneider@tingles.com",
    description:
      "Exercitation cillum consequat id elit consectetur anim aliquip aute qui sunt cupidatat non nostrud. Et dolore cillum duis mollit proident consequat incididunt. Dolor id ullamco nulla eu exercitation enim consectetur velit dolor dolor enim. Nulla pariatur do proident reprehenderit laborum duis ipsum esse veniam sint. Deserunt ea et exercitation ad qui et mollit exercitation. Do fugiat dolor consequat culpa fugiat incididunt Lorem.\r\n",
    linkedin: "https://www.linkedin.com/in/jonathandanielarce/",
    password: "Test1234",
    area: "Familiar",
    state: "avalible",
    avatar:
      "https://opem.b-cdn.net/wp-content/uploads/2022/10/foto-curriculum.jpg",
  },
  {
    name: "Parrish",
    lastName: "Spence",
    email: "parrishspence@tingles.com",
    description:
      "Labore laborum sit tempor tempor id ut incididunt deserunt voluptate cillum in dolor eu. Consectetur ut laborum nulla exercitation ad deserunt laborum aliqua ea irure velit. Commodo ad laborum minim proident labore et magna culpa dolore officia.\r\n",
    linkedin: "https://www.linkedin.com/in/jonathandanielarce/",
    password: "Test1234",
    area: "Familiar",
    state: "avalible",
    avatar:
      "https://res.cloudinary.com/dhkfa798t/image/upload/v1675414590/Smonkey/heroimg_qv9zgi.png",
  },
  {
    name: "Merrill",
    lastName: "Weber",
    email: "merrillweber@tingles.com",
    description:
      "Qui qui fugiat dolor exercitation cillum eiusmod dolor esse pariatur Lorem do laborum. Id veniam commodo ad do ipsum labore id proident culpa. Est anim incididunt irure excepteur irure reprehenderit aliquip consequat. Cupidatat magna irure labore aliquip cillum sit. Est et est adipisicing voluptate magna cupidatat est ea qui consectetur cupidatat amet. Fugiat veniam excepteur reprehenderit dolor elit occaecat sit culpa Lorem nisi aute. Tempor adipisicing dolor ullamco minim exercitation adipisicing incididunt eiusmod consectetur cupidatat laboris laborum reprehenderit.\r\n",
    linkedin: "https://www.linkedin.com/in/jonathandanielarce/",
    password: "Test1234",
    area: "Familiar",
    state: "avalible",
    avatar:
      "https://s36496.pcdn.co/wp-content/uploads/2017/11/9-si-foto-cv.png",
  },
  {
    name: "Santiago",
    lastName: "Porter",
    email: "santiagoporter@tingles.com",
    description:
      "Sunt incididunt aute in tempor elit minim. Fugiat non dolor aliquip tempor laborum ullamco dolor nulla magna esse. Ad excepteur proident excepteur cillum reprehenderit magna sunt non aute veniam ea nulla. Pariatur consectetur ullamco excepteur est Lorem laboris aliquip cillum cupidatat voluptate duis occaecat. Laborum incididunt ad proident reprehenderit cupidatat id mollit pariatur sint eiusmod ut duis magna labore.\r\n",
    linkedin: "https://www.linkedin.com/in/jonathandanielarce/",
    password: "Test1234",
    area: "Familiar",
    state: "avalible",
    avatar:
      "https://opem.b-cdn.net/wp-content/uploads/2022/10/foto-curriculum.jpg",
  },
  {
    name: "George",
    lastName: "Joyce",
    email: "georgejoyce@tingles.com",
    description:
      "Fugiat cupidatat ex consequat eu Lorem consequat voluptate duis cupidatat elit. Cillum ea duis sunt pariatur aliquip. Reprehenderit ex magna ad proident do non exercitation ex duis. Id labore tempor enim sunt culpa fugiat pariatur veniam. Mollit cillum in officia ea.\r\n",
    linkedin: "https://www.linkedin.com/in/jonathandanielarce/",
    password: "Test1234",
    area: "Familiar",
    state: "avalible",
    avatar:
      "https://opem.b-cdn.net/wp-content/uploads/2022/10/foto-curriculum.jpg",
  },

  {
    name: "Michele",
    lastName: "Bishop",
    email: "michelebishop@tingles.com",
    description:
      "Aliquip cupidatat qui nisi est excepteur est aute do proident duis ad proident sint adipisicing. Ea reprehenderit quis ea ut proident amet labore ad incididunt Lorem adipisicing aliquip ea anim. Excepteur pariatur laborum excepteur ex ea culpa consequat.\r\n",
    linkedin: "https://www.linkedin.com/in/jonathandanielarce/",
    password: "Test1234",
    area: "Genero",
    state: "avalible",
    avatar: "https://cdn-images.resumelab.com/pages/15_foto_rles.jpg",
  },
  {
    name: "Valenzuela",
    lastName: "Clarke",
    email: "valenzuelaclarke@tingles.com",
    description:
      "Incididunt do enim non adipisicing consectetur velit eiusmod ea reprehenderit. Ut Lorem esse consequat in aliquip tempor ad id magna sunt fugiat culpa sit amet. Ex ad sunt nostrud adipisicing. Commodo aliqua minim ipsum ad mollit fugiat eu proident voluptate consequat nisi nostrud fugiat exercitation. Irure adipisicing voluptate labore non cupidatat pariatur irure in amet dolore Lorem magna proident velit.\r\n",
    linkedin: "https://www.linkedin.com/in/jonathandanielarce/",
    password: "Test1234",
    area: "Genero",
    state: "avalible",
    avatar:
      "https://opem.b-cdn.net/wp-content/uploads/2022/10/foto-curriculum.jpg",
  },
  {
    name: "Richardson",
    lastName: "Hobbs",
    email: "richardsonhobbs@tingles.com",
    description:
      "Occaecat commodo consequat veniam fugiat tempor incididunt occaecat pariatur ullamco aliquip velit dolore pariatur. Est pariatur commodo aute labore officia qui sit minim ipsum incididunt. Elit sint proident proident consectetur commodo dolor esse pariatur anim qui ea id. Ex ex ad aliquip eu esse laborum anim reprehenderit eiusmod consectetur anim proident. Deserunt est occaecat Lorem aliqua cupidatat duis dolor laboris deserunt Lorem consequat deserunt velit in. Aliqua occaecat veniam pariatur pariatur veniam.\r\n",
    linkedin: "https://www.linkedin.com/in/jonathandanielarce/",
    password: "Test1234",
    area: "Genero",
    state: "avalible",
    avatar:
      "https://s36496.pcdn.co/wp-content/uploads/2017/11/9-si-foto-cv.png",
  },
  {
    name: "Holly",
    lastName: "Hale",
    email: "hollyhale@tingles.com",
    description:
      "Esse veniam incididunt ea elit aliqua. Laborum officia in officia laborum laboris ad. Reprehenderit adipisicing culpa proident voluptate nulla sint proident nostrud non.\r\n",
    linkedin: "https://www.linkedin.com/in/jonathandanielarce/",
    password: "Test1234",
    area: "Genero",
    state: "avalible",
    avatar: "https://cdn-images.resumelab.com/pages/15_foto_rles.jpg",
  },
  {
    name: "Reeves",
    lastName: "Berry",
    price: "60",
    email: "reevesberry@tingles.com",
    description:
      "In Lorem anim elit cupidatat ad nulla est est eu in cupidatat amet id. Aute eu occaecat nisi qui occaecat. Aute mollit occaecat cillum do est deserunt.\r\n",
    linkedin: "https://www.linkedin.com/in/jonathandanielarce/",
    password: "Test1234",
    area: "Genero",
    state: "avalible",
    avatar:
      "https://res.cloudinary.com/dhkfa798t/image/upload/v1675414590/Smonkey/heroimg_qv9zgi.png",
  },
  {
    name: "Kristina",
    lastName: "Sullivan",
    price: "30",
    email: "kristinasullivan@tingles.com",
    description:
      "Ipsum nisi adipisicing eu duis amet minim officia dolore laborum velit. Adipisicing ad anim sit adipisicing nisi commodo labore occaecat. Non reprehenderit minim labore incididunt culpa ullamco. Et officia ex minim culpa duis ullamco dolor aute anim dolore aliqua. Tempor exercitation ex deserunt ea duis exercitation laborum do veniam adipisicing eu.\r\n",
    linkedin: "https://www.linkedin.com/in/jonathandanielarce/",
    password: "Test1234",
    area: "Genero",
    state: "avalible",
    avatar:
      "https://res.cloudinary.com/dhkfa798t/image/upload/v1675414590/Smonkey/heroimg_qv9zgi.png",
  },
  {
    name: "Patrick",
    lastName: "Conley",
    email: "patrickconley@tingles.com",
    description:
      "Tempor deserunt consequat in commodo dolor nostrud. Officia esse eu irure duis anim reprehenderit qui esse excepteur ex dolore dolore sunt et. In cupidatat ullamco magna magna reprehenderit culpa velit velit quis consequat nostrud exercitation id amet. Dolor amet do duis magna excepteur Lorem et duis cillum reprehenderit qui ea laborum sint. Quis fugiat sint occaecat voluptate sit sunt dolore velit tempor laborum dolore laborum. Laborum labore culpa ipsum magna est esse nisi sint irure id sunt adipisicing.\r\n",
    linkedin: "https://www.linkedin.com/in/jonathandanielarce/",
    password: "Test1234",
    area: "Genero",
    state: "avalible",
    avatar:
      "https://s36496.pcdn.co/wp-content/uploads/2017/11/9-si-foto-cv.png",
  },
];

const skills = dataSkills.map((el) => el.skill);

const areas = dataAreas.map((el) => el.area);

export async function mapProfesionalTesting() {
  user.map(async (u) => {
    const randomIndexSkill = Math.round(Math.random() * (skills.length - 1));
    const randomIndexSkillTwo = Math.round(Math.random() * (skills.length - 1));
    const randomIndexArea = Math.round(Math.random() * (areas.length - 1));

    const hashedPassword = await hash(u.password, 10);
    const pro = await PROFESSIONAL.create({ ...u, password: hashedPassword });

    const a = await AREA.findOne({ where: { area: u.area } });
    const aTwo = await AREA.findOne({
      where: { area: areas[randomIndexArea] },
    });
    const s = await SKILLS.findOne({
      where: { skill: skills[randomIndexSkill] },
    });
    const sTwo = await SKILLS.findOne({
      where: { skill: skills[randomIndexSkillTwo] },
    });

    await pro.addSkills(sTwo);
    await pro.addSkills(s);
    await pro.addArea(a);
    await pro.addArea(aTwo);
  });
}
