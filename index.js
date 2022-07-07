import fetch from "node-fetch";
import { load } from "cheerio";

// function to get the raw data
const getRawData = (URL) => {
  return fetch(URL)
    .then((response) => response.text())
    .then((data) => {
      return data;
    });
};

// URL for data
const URL = "https://hipodromo.eticaenlinea.cl/";
const textExpected =
  "Para un óptimo funcionamiento de la plataforma, se recomienda la utilización del navegador Google Chrome";

// start of the program
const getHtmlText = async () => {
  const hipodromoEticaPage = await getRawData(URL);
  const hipoEticaPageParsed = load(hipodromoEticaPage);
  const textFetched = hipoEticaPageParsed("div .box-content center p").html();

  if (textFetched === textExpected) {
    console.log({
      message: "Text Found",
      textFromElement: textFetched,
      status: true,
    });
  } else {
    console.log({
      message: "Text not Found",
      status: false,
    });
  }
};

// invoking the main function
getHtmlText();
