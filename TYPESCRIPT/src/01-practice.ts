function domainName(s: string){
    return s.replace('http://', "").replace('https://', "").replace('www.', "").split(".")[0];
}
console.log(domainName("www.xakep.ru"));