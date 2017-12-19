export function getClientLanguage(){
  if(navigator.browserLanguage)
    return navigator.browserLanguage;
  if(navigator.language)  
    return navigator.language;
}